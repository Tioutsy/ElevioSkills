import {
  db,
  companiesTable,
  departmentsTable,
  employeesTable,
  employeeDepartmentHistoryTable,
  companySeasonsTable,
  departmentSeasonStandingsTable,
  elevioScoreLedgerTable,
  type CompanySeason,
} from "@workspace/db";
import { eq, and, gte, lte, desc, sql, inArray, isNull, or } from "drizzle-orm";
import { logAuditEvent } from "./auditLogService.js";
import { getOrCreateActiveCompanySeason } from "./leaderboardService.js";

export const TEAM_SCORE_FORMULA_V1 = "TEAM_SCORE_V1";
export const MIN_DEPARTMENT_SIZE = 3;
export const MIN_PARTICIPATION_RATE = 50; // 50%
export const MIN_ACTIVE_PARTICIPANTS = 3;

export interface DepartmentStandingItem {
  departmentId: number;
  departmentName: string;
  rank: number | null;
  teamScore: number;
  performanceScore: number;
  participationScore: number;
  participationRate: number;
  averageSeasonalScore: number;
  eligibleEmployeesCount: number;
  activeParticipantsCount: number;
  isEligible: boolean;
  eligibilityStatus: "RANKED" | "NOT_ENOUGH_PARTICIPANTS" | "BELOW_MIN_PARTICIPATION";
  neededToQualify?: {
    moreEmployeesNeeded: number;
    moreParticipantsNeeded: number;
    message: string;
  };
}

export interface LearnerDepartmentRankingResponse {
  enabled: boolean;
  companyName?: string;
  season?: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    status: string;
  };
  userTeam?: {
    departmentId: number;
    departmentName: string;
    rank: number | null;
    teamScore: number;
    participationRate: number;
    isEligible: boolean;
    eligibilityStatus: string;
    userSeasonalPoints: number;
    neededToQualify?: {
      moreEmployeesNeeded: number;
      moreParticipantsNeeded: number;
      message: string;
    };
  } | null;
  rankings?: DepartmentStandingItem[];
  formulaSummary?: {
    version: string;
    performanceWeight: string;
    participationWeight: string;
    description: string;
  };
  message?: string;
}

export interface AdminDepartmentPerformanceResponse {
  enabled: boolean;
  season: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  departments: DepartmentStandingItem[];
  summary: {
    totalDepartments: number;
    rankedDepartments: number;
    totalEligibleEmployees: number;
    totalActiveParticipants: number;
    overallParticipationRate: number;
    topTeamScore: number;
  };
}

// ==========================================
// 1. DEPARTMENT MEMBERSHIP HISTORY MANAGEMENT
// ==========================================

export async function recordDepartmentTransfer(params: {
  companyId: number;
  employeeId: number;
  newDepartmentId: number | null;
  effectiveDate?: Date;
}): Promise<void> {
  const { companyId, employeeId, newDepartmentId } = params;
  const now = params.effectiveDate ?? new Date();

  // 1. Close current active history record
  await db
    .update(employeeDepartmentHistoryTable)
    .set({ effectiveTo: now })
    .where(
      and(
        eq(employeeDepartmentHistoryTable.employeeId, employeeId),
        isNull(employeeDepartmentHistoryTable.effectiveTo)
      )
    );

  // 2. Validate department ownership & retrieve department name if assigned
  let deptName: string | null = null;
  if (newDepartmentId) {
    const [dept] = await db
      .select({ name: departmentsTable.name })
      .from(departmentsTable)
      .where(
        and(
          eq(departmentsTable.id, newDepartmentId),
          eq(departmentsTable.companyId, companyId)
        )
      )
      .limit(1);

    if (!dept) {
      throw new Error(`Department ${newDepartmentId} does not belong to company ${companyId}`);
    }
    deptName = dept.name;

    await db.insert(employeeDepartmentHistoryTable).values({
      companyId,
      employeeId,
      departmentId: newDepartmentId,
      effectiveFrom: now,
      effectiveTo: null,
    });
  }

  // 3. Update employee record department details
  await db
    .update(employeesTable)
    .set({
      departmentId: newDepartmentId,
      department: deptName,
      updatedAt: new Date(),
    })
    .where(and(eq(employeesTable.id, employeeId), eq(employeesTable.companyId, companyId)));
}

export async function getEmployeeDepartmentAtTimestamp(
  employeeId: number,
  eventTimestamp: Date
): Promise<number | null> {
  const [record] = await db
    .select({ departmentId: employeeDepartmentHistoryTable.departmentId })
    .from(employeeDepartmentHistoryTable)
    .where(
      and(
        eq(employeeDepartmentHistoryTable.employeeId, employeeId),
        lte(employeeDepartmentHistoryTable.effectiveFrom, eventTimestamp),
        or(
          isNull(employeeDepartmentHistoryTable.effectiveTo),
          gte(employeeDepartmentHistoryTable.effectiveTo, eventTimestamp)
        )
      )
    )
    .orderBy(desc(employeeDepartmentHistoryTable.effectiveFrom))
    .limit(1);

  if (record?.departmentId) {
    return record.departmentId;
  }

  // Fallback to employee's current department if history record not found
  const [emp] = await db
    .select({ departmentId: employeesTable.departmentId })
    .from(employeesTable)
    .where(eq(employeesTable.id, employeeId))
    .limit(1);

  return emp?.departmentId ?? null;
}

// ==========================================
// 2. DEPARTMENT STANDINGS CALCULATION (V1)
// ==========================================

export async function calculateDepartmentStandings(
  companyId: number,
  seasonId?: number,
  options?: { previewAll?: boolean }
): Promise<{
  enabled: boolean;
  season: CompanySeason;
  standings: DepartmentStandingItem[];
  formulaVersion: string;
}> {
  // 1. Fetch Company & Settings
  const [company] = await db
    .select({
      id: companiesTable.id,
      name: companiesTable.name,
      departmentCompetitionEnabled: companiesTable.departmentCompetitionEnabled,
      departmentCompetitionActivatedAt: companiesTable.departmentCompetitionActivatedAt,
    })
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId))
    .limit(1);

  if (!company) {
    throw new Error(`Company ${companyId} not found`);
  }

  const enabled = company.departmentCompetitionEnabled;
  if (!enabled && !options?.previewAll) {
    const season = seasonId
      ? (await db.select().from(companySeasonsTable).where(eq(companySeasonsTable.id, seasonId)).limit(1))[0]
      : await getOrCreateActiveCompanySeason(companyId);

    return {
      enabled: false,
      season: season || ({} as any),
      standings: [],
      formulaVersion: TEAM_SCORE_FORMULA_V1,
    };
  }

  // 2. Resolve Season
  let season: CompanySeason | undefined;
  if (seasonId) {
    const [found] = await db
      .select()
      .from(companySeasonsTable)
      .where(and(eq(companySeasonsTable.id, seasonId), eq(companySeasonsTable.companyId, companyId)))
      .limit(1);
    season = found;
  }
  if (!season) {
    season = await getOrCreateActiveCompanySeason(companyId);
  }

  // 3. Determine Effective Season Competition Boundaries
  let compStartDate = season.startDate;
  if (
    company.departmentCompetitionActivatedAt &&
    company.departmentCompetitionActivatedAt.getTime() > season.startDate.getTime() &&
    company.departmentCompetitionActivatedAt.getTime() <= season.endDate.getTime()
  ) {
    compStartDate = company.departmentCompetitionActivatedAt;
  }
  const compEndDate = season.endDate;

  // 4. Fetch All Active Departments
  const departments = await db
    .select({
      id: departmentsTable.id,
      name: departmentsTable.name,
      status: departmentsTable.status,
    })
    .from(departmentsTable)
    .where(
      and(
        eq(departmentsTable.companyId, companyId),
        eq(departmentsTable.status, "active")
      )
    )
    .orderBy(departmentsTable.name);

  // 5. Fetch All Eligible Employees in Company (Active, non-deactivated)
  const eligibleEmployees = await db
    .select({
      id: employeesTable.id,
      departmentId: employeesTable.departmentId,
      status: employeesTable.status,
    })
    .from(employeesTable)
    .where(
      and(
        eq(employeesTable.companyId, companyId),
        eq(employeesTable.status, "active")
      )
    );

  const eligibleEmployeeIds = new Set(eligibleEmployees.map((e) => e.id));

  // 6. Fetch Department History records intersecting the competition window
  const historyRecords = await db
    .select()
    .from(employeeDepartmentHistoryTable)
    .where(
      and(
        eq(employeeDepartmentHistoryTable.companyId, companyId),
        lte(employeeDepartmentHistoryTable.effectiveFrom, compEndDate),
        or(
          isNull(employeeDepartmentHistoryTable.effectiveTo),
          gte(employeeDepartmentHistoryTable.effectiveTo, compStartDate)
        )
      )
    );

  // Map of departmentId -> Set of eligible employee IDs
  const deptEligibleMembers = new Map<number, Set<number>>();
  departments.forEach((d) => deptEligibleMembers.set(d.id, new Set<number>()));

  // Map employees into departments using history or current departmentId
  for (const emp of eligibleEmployees) {
    const empHistory = historyRecords.filter((h) => h.employeeId === emp.id);
    if (empHistory.length > 0) {
      for (const h of empHistory) {
        if (deptEligibleMembers.has(h.departmentId)) {
          deptEligibleMembers.get(h.departmentId)!.add(emp.id);
        }
      }
    } else if (emp.departmentId && deptEligibleMembers.has(emp.departmentId)) {
      deptEligibleMembers.get(emp.departmentId)!.add(emp.id);
    }
  }

  // 7. Fetch All Qualifying Score Ledger Events in Season Competition Window
  const scoreEvents = await db
    .select({
      id: elevioScoreLedgerTable.id,
      employeeId: elevioScoreLedgerTable.employeeId,
      points: elevioScoreLedgerTable.points,
      eventTimestamp: elevioScoreLedgerTable.eventTimestamp,
      isReversed: elevioScoreLedgerTable.isReversed,
    })
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.companyId, companyId),
        gte(elevioScoreLedgerTable.eventTimestamp, compStartDate),
        lte(elevioScoreLedgerTable.eventTimestamp, compEndDate),
        eq(elevioScoreLedgerTable.isReversed, false)
      )
    );

  // Map of departmentId -> { totalPoints, activeParticipants: Set<employeeId> }
  const deptScores = new Map<number, { totalPoints: number; activeParticipants: Set<number> }>();
  departments.forEach((d) => deptScores.set(d.id, { totalPoints: 0, activeParticipants: new Set<number>() }));

  for (const evt of scoreEvents) {
    if (!eligibleEmployeeIds.has(evt.employeeId)) continue;
    if (evt.points <= 0) continue;

    // Resolve which department the employee belonged to at eventTimestamp
    const deptId = await getEmployeeDepartmentAtTimestamp(evt.employeeId, evt.eventTimestamp);
    if (deptId && deptScores.has(deptId)) {
      const entry = deptScores.get(deptId)!;
      entry.totalPoints += evt.points;
      entry.activeParticipants.add(evt.employeeId);
    }
  }

  // 8. Compute Raw Metrics & Eligibility for Each Department
  interface RawDeptData {
    departmentId: number;
    departmentName: string;
    eligibleCount: number;
    activeCount: number;
    totalPoints: number;
    averageSeasonalScore: number;
    participationRate: number;
    isEligible: boolean;
    eligibilityStatus: "RANKED" | "NOT_ENOUGH_PARTICIPANTS" | "BELOW_MIN_PARTICIPATION";
    neededToQualify?: {
      moreEmployeesNeeded: number;
      moreParticipantsNeeded: number;
      message: string;
    };
  }

  const rawDepts: RawDeptData[] = departments.map((d) => {
    const eligibleCount = deptEligibleMembers.get(d.id)?.size || 0;
    const scoreData = deptScores.get(d.id) || { totalPoints: 0, activeParticipants: new Set<number>() };
    const activeCount = scoreData.activeParticipants.size;
    const totalPoints = scoreData.totalPoints;
    const averageSeasonalScore = eligibleCount > 0 ? Number((totalPoints / eligibleCount).toFixed(2)) : 0;
    const participationRate = eligibleCount > 0 ? Number(((activeCount / eligibleCount) * 100).toFixed(2)) : 0;

    let eligibilityStatus: "RANKED" | "NOT_ENOUGH_PARTICIPANTS" | "BELOW_MIN_PARTICIPATION" = "RANKED";
    let isEligible = true;
    let neededToQualify: { moreEmployeesNeeded: number; moreParticipantsNeeded: number; message: string } | undefined;

    if (eligibleCount < MIN_DEPARTMENT_SIZE) {
      isEligible = false;
      eligibilityStatus = "NOT_ENOUGH_PARTICIPANTS";
      const moreNeeded = MIN_DEPARTMENT_SIZE - eligibleCount;
      neededToQualify = {
        moreEmployeesNeeded: moreNeeded,
        moreParticipantsNeeded: 0,
        message: `${moreNeeded} more employee${moreNeeded > 1 ? "s" : ""} must be assigned for ranking.`,
      };
    } else if (participationRate < MIN_PARTICIPATION_RATE || activeCount < MIN_ACTIVE_PARTICIPANTS) {
      isEligible = false;
      eligibilityStatus = "BELOW_MIN_PARTICIPATION";
      const requiredActive = Math.max(MIN_ACTIVE_PARTICIPANTS, Math.ceil(eligibleCount * 0.5));
      const moreNeeded = Math.max(0, requiredActive - activeCount);
      neededToQualify = {
        moreEmployeesNeeded: 0,
        moreParticipantsNeeded: moreNeeded,
        message: `${moreNeeded} more employee${moreNeeded > 1 ? "s" : ""} need${moreNeeded === 1 ? "s" : ""} to participate to enter ranking.`,
      };
    }

    return {
      departmentId: d.id,
      departmentName: d.name,
      eligibleCount,
      activeCount,
      totalPoints,
      averageSeasonalScore,
      participationRate,
      isEligible,
      eligibilityStatus,
      neededToQualify,
    };
  });

  // 9. Find Highest Department Average Benchmark among qualifying (or all) departments
  const qualifyingDepts = rawDepts.filter((d) => d.isEligible);
  const benchmarkCandidates = qualifyingDepts.length > 0 ? qualifyingDepts : rawDepts.filter((d) => d.eligibleCount > 0);
  const highestAverageScore = benchmarkCandidates.reduce((max, d) => Math.max(max, d.averageSeasonalScore), 0);

  // 10. Compute Normalized Scores (TEAM_SCORE_V1)
  const computedStandings: DepartmentStandingItem[] = rawDepts.map((d) => {
    let performanceScore = 0;
    if (highestAverageScore > 0 && d.eligibleCount > 0) {
      performanceScore = Number(((d.averageSeasonalScore / highestAverageScore) * 700).toFixed(2));
    }
    const participationScore = Number(((d.participationRate / 100) * 300).toFixed(2));
    const teamScore = Math.min(1000, Math.round(performanceScore + participationScore));

    return {
      departmentId: d.departmentId,
      departmentName: d.departmentName,
      rank: null, // assigned below
      teamScore,
      performanceScore,
      participationScore,
      participationRate: d.participationRate,
      averageSeasonalScore: d.averageSeasonalScore,
      eligibleEmployeesCount: d.eligibleCount,
      activeParticipantsCount: d.activeCount,
      isEligible: d.isEligible,
      eligibilityStatus: d.eligibilityStatus,
      neededToQualify: d.neededToQualify,
    };
  });

  // 11. Assign Standard Competition Ranking (1, 2, 2, 4) for Eligible Departments
  const rankedDepts = computedStandings
    .filter((d) => d.isEligible)
    .sort((a, b) => b.teamScore - a.teamScore || b.averageSeasonalScore - a.averageSeasonalScore || a.departmentName.localeCompare(b.departmentName));

  let currentRank = 1;
  for (let i = 0; i < rankedDepts.length; i++) {
    if (i > 0 && rankedDepts[i].teamScore < rankedDepts[i - 1].teamScore) {
      currentRank = i + 1;
    }
    rankedDepts[i].rank = currentRank;
  }

  const unrankedDepts = computedStandings
    .filter((d) => !d.isEligible)
    .sort((a, b) => b.participationRate - a.participationRate || a.departmentName.localeCompare(b.departmentName));

  const allStandings = [...rankedDepts, ...unrankedDepts];

  return {
    enabled,
    season,
    standings: allStandings,
    formulaVersion: TEAM_SCORE_FORMULA_V1,
  };
}

// ==========================================
// 3. LEARNER DEPARTMENT RANKING API
// ==========================================

export async function getLearnerDepartmentRanking(
  companyId: number,
  employeeId?: number
): Promise<LearnerDepartmentRankingResponse> {
  const result = await calculateDepartmentStandings(companyId);

  if (!result.enabled) {
    return {
      enabled: false,
      message: "Department competition is not enabled for your company.",
    };
  }

  const [company] = await db
    .select({ name: companiesTable.name })
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId))
    .limit(1);

  const now = new Date();
  const diffMs = result.season.endDate.getTime() - now.getTime();
  const daysRemaining = diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;

  // Resolve Learner Context
  let userTeam: LearnerDepartmentRankingResponse["userTeam"] = null;

  if (employeeId) {
    const [employee] = await db
      .select({
        id: employeesTable.id,
        departmentId: employeesTable.departmentId,
        department: employeesTable.department,
      })
      .from(employeesTable)
      .where(eq(employeesTable.id, employeeId))
      .limit(1);

    if (employee?.departmentId) {
      const teamStanding = result.standings.find((s) => s.departmentId === employee.departmentId);
      
      // Calculate user's individual seasonal contribution
      const [userPointsRow] = await db
        .select({
          total: sql<number>`COALESCE(SUM(${elevioScoreLedgerTable.points}), 0)::integer`,
        })
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.companyId, companyId),
            eq(elevioScoreLedgerTable.employeeId, employeeId),
            gte(elevioScoreLedgerTable.eventTimestamp, result.season.startDate),
            lte(elevioScoreLedgerTable.eventTimestamp, result.season.endDate),
            eq(elevioScoreLedgerTable.isReversed, false)
          )
        );

      const userSeasonalPoints = userPointsRow?.total || 0;

      if (teamStanding) {
        userTeam = {
          departmentId: teamStanding.departmentId,
          departmentName: teamStanding.departmentName,
          rank: teamStanding.rank,
          teamScore: teamStanding.teamScore,
          participationRate: teamStanding.participationRate,
          isEligible: teamStanding.isEligible,
          eligibilityStatus: teamStanding.eligibilityStatus,
          userSeasonalPoints,
          neededToQualify: teamStanding.neededToQualify,
        };
      } else {
        userTeam = {
          departmentId: employee.departmentId,
          departmentName: employee.department || "Your Department",
          rank: null,
          teamScore: 0,
          participationRate: 0,
          isEligible: false,
          eligibilityStatus: "NOT_ENOUGH_PARTICIPANTS",
          userSeasonalPoints,
        };
      }
    }
  }

  return {
    enabled: true,
    companyName: company?.name,
    season: {
      id: result.season.id,
      title: result.season.title,
      startDate: result.season.startDate.toISOString(),
      endDate: result.season.endDate.toISOString(),
      daysRemaining,
      status: result.season.status,
    },
    userTeam,
    rankings: result.standings,
    formulaSummary: {
      version: TEAM_SCORE_FORMULA_V1,
      performanceWeight: "70%",
      participationWeight: "30%",
      description: "Team Score combines average learning performance with department participation, so departments of different sizes can compete fairly.",
    },
  };
}

// ==========================================
// 4. COMPANY ADMIN PERFORMANCE ANALYTICS
// ==========================================

export async function getCompanyDepartmentPerformance(
  companyId: number,
  seasonId?: number
): Promise<AdminDepartmentPerformanceResponse> {
  const result = await calculateDepartmentStandings(companyId, seasonId, { previewAll: true });

  const ranked = result.standings.filter((s) => s.isEligible);
  const totalEligible = result.standings.reduce((sum, s) => sum + s.eligibleEmployeesCount, 0);
  const totalActive = result.standings.reduce((sum, s) => sum + s.activeParticipantsCount, 0);
  const overallParticipationRate = totalEligible > 0 ? Number(((totalActive / totalEligible) * 100).toFixed(2)) : 0;
  const topTeamScore = ranked.length > 0 ? ranked[0].teamScore : 0;

  return {
    enabled: result.enabled,
    season: {
      id: result.season.id,
      title: result.season.title,
      startDate: result.season.startDate.toISOString(),
      endDate: result.season.endDate.toISOString(),
      status: result.season.status,
    },
    departments: result.standings,
    summary: {
      totalDepartments: result.standings.length,
      rankedDepartments: ranked.length,
      totalEligibleEmployees: totalEligible,
      totalActiveParticipants: totalActive,
      overallParticipationRate,
      topTeamScore,
    },
  };
}

// ==========================================
// 5. SETTINGS & ACTIVATION VALIDATION
// ==========================================

export async function updateDepartmentCompetitionSettings(params: {
  companyId: number;
  enabled: boolean;
  actorClerkUserId?: string;
}): Promise<{ enabled: boolean; activatedAt: Date | null }> {
  const { companyId, enabled, actorClerkUserId } = params;
  const now = new Date();

  if (enabled) {
    // Validate minimum requirements for friendly competition:
    // At least 2 active departments
    const activeDepts = await db
      .select({ id: departmentsTable.id, name: departmentsTable.name })
      .from(departmentsTable)
      .where(and(eq(departmentsTable.companyId, companyId), eq(departmentsTable.status, "active")));

    if (activeDepts.length < 2) {
      throw new Error("Department competition requires at least 2 active departments in your company.");
    }

    // Check if at least 2 departments have >= 3 eligible employees
    const employees = await db
      .select({ id: employeesTable.id, departmentId: employeesTable.departmentId })
      .from(employeesTable)
      .where(and(eq(employeesTable.companyId, companyId), eq(employeesTable.status, "active")));

    const deptCounts = new Map<number, number>();
    for (const emp of employees) {
      if (emp.departmentId) {
        deptCounts.set(emp.departmentId, (deptCounts.get(emp.departmentId) || 0) + 1);
      }
    }

    let qualifyingCount = 0;
    for (const dept of activeDepts) {
      if ((deptCounts.get(dept.id) || 0) >= MIN_DEPARTMENT_SIZE) {
        qualifyingCount++;
      }
    }

    if (qualifyingCount < 2) {
      throw new Error(
        `Department competition requires at least 2 departments with ${MIN_DEPARTMENT_SIZE} or more eligible learners.`
      );
    }
  }

  const activatedAt = enabled ? now : null;

  await db
    .update(companiesTable)
    .set({
      departmentCompetitionEnabled: enabled,
      departmentCompetitionActivatedAt: activatedAt,
      updatedAt: now,
    })
    .where(eq(companiesTable.id, companyId));

  await logAuditEvent({
    companyId,
    actorUserId: actorClerkUserId || "system",
    actorRole: "admin",
    action: enabled ? "DEPARTMENT_COMPETITION_ENABLED" : "DEPARTMENT_COMPETITION_DISABLED",
    targetType: "company_settings",
    targetId: String(companyId),
    metadata: {
      enabled,
      activatedAt: activatedAt?.toISOString() || null,
      formulaVersion: TEAM_SCORE_FORMULA_V1,
    },
  });

  return { enabled, activatedAt };
}

// ==========================================
// 6. SEASON CLOSURE & IMMUTABLE SNAPSHOTTING
// ==========================================

export async function closeAndSnapshotDepartmentSeason(
  companyId: number,
  seasonId: number
): Promise<DepartmentStandingItem[]> {
  const result = await calculateDepartmentStandings(companyId, seasonId, { previewAll: true });
  const snapshotDate = new Date().toISOString().split("T")[0];

  for (const standing of result.standings) {
    await db
      .insert(departmentSeasonStandingsTable)
      .values({
        seasonId,
        companyId,
        departmentId: standing.departmentId,
        departmentNameSnapshot: standing.departmentName,
        rank: standing.rank || 0,
        teamScore: standing.teamScore,
        performanceScore: String(standing.performanceScore),
        participationScore: String(standing.participationScore),
        participationRate: String(standing.participationRate),
        averageSeasonalScore: String(standing.averageSeasonalScore),
        eligibleEmployeesCount: standing.eligibleEmployeesCount,
        activeParticipantsCount: standing.activeParticipantsCount,
        isEligible: standing.isEligible,
        eligibilityStatus: standing.eligibilityStatus,
        formulaVersion: TEAM_SCORE_FORMULA_V1,
        snapshotDate,
      })
      .onConflictDoUpdate({
        target: [departmentSeasonStandingsTable.seasonId, departmentSeasonStandingsTable.departmentId],
        set: {
          departmentNameSnapshot: standing.departmentName,
          rank: standing.rank || 0,
          teamScore: standing.teamScore,
          performanceScore: String(standing.performanceScore),
          participationScore: String(standing.participationScore),
          participationRate: String(standing.participationRate),
          averageSeasonalScore: String(standing.averageSeasonalScore),
          eligibleEmployeesCount: standing.eligibleEmployeesCount,
          activeParticipantsCount: standing.activeParticipantsCount,
          isEligible: standing.isEligible,
          eligibilityStatus: standing.eligibilityStatus,
          formulaVersion: TEAM_SCORE_FORMULA_V1,
          snapshotDate,
          updatedAt: new Date(),
        },
      });
  }

  return result.standings;
}

export async function getDepartmentSeasonHistory(
  companyId: number
): Promise<
  {
    seasonId: number;
    seasonTitle: string;
    startDate: string;
    endDate: string;
    standings: {
      departmentId: number;
      departmentName: string;
      rank: number;
      teamScore: number;
      participationRate: number;
      averageSeasonalScore: number;
      isEligible: boolean;
      eligibilityStatus: string;
    }[];
  }[]
> {
  const closedStandings = await db
    .select({
      seasonId: departmentSeasonStandingsTable.seasonId,
      seasonTitle: companySeasonsTable.title,
      startDate: companySeasonsTable.startDate,
      endDate: companySeasonsTable.endDate,
      departmentId: departmentSeasonStandingsTable.departmentId,
      departmentName: departmentSeasonStandingsTable.departmentNameSnapshot,
      rank: departmentSeasonStandingsTable.rank,
      teamScore: departmentSeasonStandingsTable.teamScore,
      participationRate: departmentSeasonStandingsTable.participationRate,
      averageSeasonalScore: departmentSeasonStandingsTable.averageSeasonalScore,
      isEligible: departmentSeasonStandingsTable.isEligible,
      eligibilityStatus: departmentSeasonStandingsTable.eligibilityStatus,
    })
    .from(departmentSeasonStandingsTable)
    .innerJoin(companySeasonsTable, eq(companySeasonsTable.id, departmentSeasonStandingsTable.seasonId))
    .where(
      and(
        eq(departmentSeasonStandingsTable.companyId, companyId),
        eq(companySeasonsTable.status, "CLOSED")
      )
    )
    .orderBy(desc(companySeasonsTable.startDate), departmentSeasonStandingsTable.rank);

  const seasonsMap = new Map<number, any>();
  for (const row of closedStandings) {
    if (!seasonsMap.has(row.seasonId)) {
      seasonsMap.set(row.seasonId, {
        seasonId: row.seasonId,
        seasonTitle: row.seasonTitle,
        startDate: row.startDate.toISOString(),
        endDate: row.endDate.toISOString(),
        standings: [],
      });
    }
    seasonsMap.get(row.seasonId).standings.push({
      departmentId: row.departmentId,
      departmentName: row.departmentName,
      rank: row.rank,
      teamScore: row.teamScore,
      participationRate: Number(row.participationRate),
      averageSeasonalScore: Number(row.averageSeasonalScore),
      isEligible: row.isEligible,
      eligibilityStatus: row.eligibilityStatus,
    });
  }

  return Array.from(seasonsMap.values());
}
