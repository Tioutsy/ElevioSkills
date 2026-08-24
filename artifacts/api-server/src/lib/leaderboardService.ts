import {
  db,
  companiesTable,
  employeesTable,
  companySeasonsTable,
  companySeasonSnapshotsTable,
  elevioScoreLedgerTable,
  type CompanySeason,
} from "@workspace/db";
import { eq, and, gte, lte, desc, sql, inArray } from "drizzle-orm";
import { logAuditEvent } from "./auditLogService.js";
import { evaluateClosedSeasonAchievements } from "./achievementsService.js";

export type PrivacyMode = "full_name" | "initial" | "anonymous";

export interface FormattedLeaderboardEntry {
  rank: number;
  displayName: string;
  department: string | null;
  seasonalScore: number;
  lifetimeScore: number;
  isCurrentUser: boolean;
  movement: {
    direction: "up" | "down" | "same" | "new";
    delta: number;
    text: string;
  };
}

export interface CurrentUserPosition {
  rank: number | null;
  seasonalScore: number;
  lifetimeScore: number;
  totalParticipants: number;
  movement: {
    direction: "up" | "down" | "same" | "new";
    delta: number;
    text: string;
  };
  pointsToNextRank: number | null;
  nextRankTarget: number | null;
  targetMessage: string;
  isEligible: boolean;
}

export interface CompanyLeaderboardResponse {
  enabled: boolean;
  companyName?: string;
  privacyMode?: PrivacyMode;
  season?: {
    id: number;
    title: string;
    seasonType: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    status: string;
  };
  totalParticipants?: number;
  currentUser?: CurrentUserPosition;
  topPerformers?: FormattedLeaderboardEntry[];
  userRow?: FormattedLeaderboardEntry | null;
  message?: string;
}

// ==========================================
// DATE & SEASON UTILITIES
// ==========================================

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getMonthTitle(date: Date = new Date()): string {
  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function getMonthBounds(date: Date = new Date()): { startDate: Date; endDate: Date } {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
  return { startDate, endDate };
}

export function getDaysRemaining(endDate: Date, now: Date = new Date()): number {
  const diffMs = endDate.getTime() - now.getTime();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// ==========================================
// DISPLAY NAME MASKING
// ==========================================

export function formatDisplayName(
  rawName: string,
  rank: number,
  mode: PrivacyMode = "initial",
  isCurrentUser: boolean = false
): string {
  const trimmed = (rawName || "").trim();
  if (!trimmed) return isCurrentUser ? "You" : `Learner ${rank}`;

  if (mode === "full_name") {
    return isCurrentUser ? `${trimmed} (You)` : trimmed;
  }

  if (mode === "anonymous") {
    return isCurrentUser ? `You (Learner ${rank})` : `Learner ${rank}`;
  }

  // mode === "initial" -> "Sarah Ramdin" => "Sarah R."
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return isCurrentUser ? `${parts[0]} (You)` : parts[0];
  }
  const first = parts[0];
  const lastInitial = parts[parts.length - 1][0].toUpperCase();
  const formatted = `${first} ${lastInitial}.`;
  return isCurrentUser ? `${formatted} (You)` : formatted;
}

// ==========================================
// SEASON LIFECYCLE MANAGEMENT
// ==========================================

export async function getOrCreateActiveCompanySeason(
  companyId: number,
  options?: { isMidMonthActivation?: boolean; activationDate?: Date }
): Promise<CompanySeason> {
  const now = options?.activationDate ?? new Date();
  const monthTitle = getMonthTitle(now);
  const { startDate: naturalStart, endDate: naturalEnd } = getMonthBounds(now);

  // 1. Look for an active season
  const [existingActive] = await db
    .select()
    .from(companySeasonsTable)
    .where(
      and(
        eq(companySeasonsTable.companyId, companyId),
        eq(companySeasonsTable.status, "ACTIVE")
      )
    )
    .orderBy(desc(companySeasonsTable.startDate))
    .limit(1);

  if (existingActive) {
    // If the active season has expired, close it and evaluate seasonal achievements
    if (now.getTime() > existingActive.endDate.getTime()) {
      await db
        .update(companySeasonsTable)
        .set({ status: "CLOSED", closedAt: now, updatedAt: now })
        .where(eq(companySeasonsTable.id, existingActive.id));

      await evaluateClosedSeasonAchievements({
        companyId,
        seasonId: existingActive.id,
      });
    } else {
      return existingActive;
    }
  }

  // 2. Determine start date (mid-month activation vs natural month start)
  let seasonStart = naturalStart;
  if (options?.isMidMonthActivation && now.getTime() > naturalStart.getTime()) {
    seasonStart = now;
  }

  // 3. Create or reuse for this month
  const [created] = await db
    .insert(companySeasonsTable)
    .values({
      companyId,
      seasonType: "MONTHLY",
      title: monthTitle,
      startDate: seasonStart,
      endDate: naturalEnd,
      status: "ACTIVE",
      metadata: { isMidMonthActivation: !!options?.isMidMonthActivation },
    })
    .onConflictDoUpdate({
      target: [
        companySeasonsTable.companyId,
        companySeasonsTable.seasonType,
        companySeasonsTable.title,
      ],
      set: {
        status: "ACTIVE",
        updatedAt: now,
      },
    })
    .returning();

  return created;
}

// ==========================================
// LEADERBOARD RANKING CALCULATIONS
// ==========================================

interface RawRankedEmployee {
  employeeId: number;
  name: string;
  department: string | null;
  status: string;
  lifetimeScore: number;
  seasonalScore: number;
}

export async function calculateCompanyLeaderboard(
  companyId: number,
  requestingEmployeeId?: number,
  requestedSeasonId?: number
): Promise<CompanyLeaderboardResponse> {
  const [company] = await db
    .select({
      id: companiesTable.id,
      name: companiesTable.name,
      leaderboardEnabled: companiesTable.leaderboardEnabled,
      leaderboardPrivacyMode: companiesTable.leaderboardPrivacyMode,
    })
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId))
    .limit(1);

  if (!company) {
    return { enabled: false, message: "Company not found" };
  }

  if (!company.leaderboardEnabled) {
    return {
      enabled: false,
      companyName: company.name,
      privacyMode: (company.leaderboardPrivacyMode as PrivacyMode) || "initial",
      message: "Company ranking is currently disabled by your organisation.",
    };
  }

  let activeSeason: CompanySeason;
  if (requestedSeasonId) {
    const [found] = await db
      .select()
      .from(companySeasonsTable)
      .where(and(eq(companySeasonsTable.id, requestedSeasonId), eq(companySeasonsTable.companyId, companyId)))
      .limit(1);
    activeSeason = found || (await getOrCreateActiveCompanySeason(companyId));
  } else {
    activeSeason = await getOrCreateActiveCompanySeason(companyId);
  }
  const privacyMode = (company.leaderboardPrivacyMode as PrivacyMode) || "initial";

  // 1. Fetch all active employees in this company (excluding deactivated/deleted)
  const activeEmployees = await db
    .select({
      id: employeesTable.id,
      name: employeesTable.name,
      department: employeesTable.department,
      status: employeesTable.status,
      elevioScore: employeesTable.elevioScore,
    })
    .from(employeesTable)
    .where(
      and(
        eq(employeesTable.companyId, companyId),
        eq(employeesTable.status, "active")
      )
    );

  if (activeEmployees.length === 0) {
    return {
      enabled: true,
      companyName: company.name,
      privacyMode,
      season: {
        id: activeSeason.id,
        title: activeSeason.title,
        seasonType: activeSeason.seasonType,
        startDate: activeSeason.startDate.toISOString(),
        endDate: activeSeason.endDate.toISOString(),
        daysRemaining: getDaysRemaining(activeSeason.endDate),
        status: activeSeason.status,
      },
      totalParticipants: 0,
      topPerformers: [],
      message: "No active learners found in your organisation.",
    };
  }

  // 2. Fetch all valid non-reversed ledger points within the active season
  const ledgerRows = await db
    .select({
      employeeId: elevioScoreLedgerTable.employeeId,
      totalPoints: sql<number>`COALESCE(SUM(${elevioScoreLedgerTable.points}), 0)::integer`,
    })
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.companyId, companyId),
        eq(elevioScoreLedgerTable.isReversed, false),
        gte(elevioScoreLedgerTable.eventTimestamp, activeSeason.startDate),
        lte(elevioScoreLedgerTable.eventTimestamp, activeSeason.endDate)
      )
    )
    .groupBy(elevioScoreLedgerTable.employeeId);

  const scoreMap = new Map<number, number>();
  for (const row of ledgerRows) {
    scoreMap.set(row.employeeId, Number(row.totalPoints));
  }

  // 3. Combine employee details and seasonal scores
  const participants: RawRankedEmployee[] = activeEmployees.map((emp) => ({
    employeeId: emp.id,
    name: emp.name,
    department: emp.department,
    status: emp.status,
    lifetimeScore: emp.elevioScore ?? 0,
    seasonalScore: scoreMap.get(emp.id) ?? 0,
  }));

  // 4. Sort participants by seasonalScore DESC, then tiebreak by name
  participants.sort((a, b) => b.seasonalScore - a.seasonalScore || a.name.localeCompare(b.name));

  // 5. Fetch recent snapshot for movement calculation
  const yesterdayIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const snapshots = await db
    .select({
      employeeId: companySeasonSnapshotsTable.employeeId,
      rank: companySeasonSnapshotsTable.rank,
    })
    .from(companySeasonSnapshotsTable)
    .where(
      and(
        eq(companySeasonSnapshotsTable.companyId, companyId),
        eq(companySeasonSnapshotsTable.seasonId, activeSeason.id),
        eq(companySeasonSnapshotsTable.snapshotDate, yesterdayIso)
      )
    );

  const snapshotRankMap = new Map<number, number>();
  for (const s of snapshots) {
    snapshotRankMap.set(s.employeeId, s.rank);
  }

  // 6. Assign standard competition ranks (1, 2, 2, 4)
  const rankedList: (RawRankedEmployee & {
    rank: number;
    movement: { direction: "up" | "down" | "same" | "new"; delta: number; text: string };
  })[] = [];

  let currentRank = 1;
  for (let i = 0; i < participants.length; i++) {
    if (i > 0 && participants[i].seasonalScore < participants[i - 1].seasonalScore) {
      currentRank = i + 1;
    }

    const empId = participants[i].employeeId;
    const prevRank = snapshotRankMap.get(empId);
    let movement: { direction: "up" | "down" | "same" | "new"; delta: number; text: string };

    if (prevRank === undefined) {
      movement = { direction: "same", delta: 0, text: "— No change" };
    } else if (prevRank > currentRank) {
      const delta = prevRank - currentRank;
      movement = { direction: "up", delta, text: `↑ ${delta}` };
    } else if (prevRank < currentRank) {
      const delta = currentRank - prevRank;
      movement = { direction: "down", delta, text: `↓ ${delta}` };
    } else {
      movement = { direction: "same", delta: 0, text: "— No change" };
    }

    rankedList.push({
      ...participants[i],
      rank: currentRank,
      movement,
    });
  }

  // 7. Format top performers (top 10)
  const topPerformers: FormattedLeaderboardEntry[] = rankedList.slice(0, 10).map((r) => ({
    rank: r.rank,
    displayName: formatDisplayName(
      r.name,
      r.rank,
      privacyMode,
      requestingEmployeeId === r.employeeId
    ),
    department: r.department,
    seasonalScore: r.seasonalScore,
    lifetimeScore: r.lifetimeScore,
    isCurrentUser: requestingEmployeeId === r.employeeId,
    movement: r.movement,
  }));

  // 8. Build current user position info
  let currentUserPosition: CurrentUserPosition | undefined;
  let userRow: FormattedLeaderboardEntry | null = null;

  if (requestingEmployeeId) {
    const userRankedIndex = rankedList.findIndex((r) => r.employeeId === requestingEmployeeId);
    if (userRankedIndex !== -1) {
      const userItem = rankedList[userRankedIndex];
      const userRank = userItem.rank;
      const userScore = userItem.seasonalScore;

      // Find the distinct score strictly above user's score
      let pointsToNextRank: number | null = null;
      let nextRankTarget: number | null = null;
      let targetMessage = "You're currently leading your company this month.";

      if (userRank > 1) {
        // Find nearest higher distinct score
        for (let i = userRankedIndex - 1; i >= 0; i--) {
          if (rankedList[i].seasonalScore > userScore) {
            const higherScore = rankedList[i].seasonalScore;
            nextRankTarget = rankedList[i].rank;
            pointsToNextRank = higherScore - userScore + 1; // +1 to overtake
            targetMessage = `${pointsToNextRank} points to move ahead of #${nextRankTarget}`;
            break;
          }
        }
      }

      currentUserPosition = {
        rank: userRank,
        seasonalScore: userScore,
        lifetimeScore: userItem.lifetimeScore,
        totalParticipants: rankedList.length,
        movement: userItem.movement,
        pointsToNextRank,
        nextRankTarget,
        targetMessage,
        isEligible: true,
      };

      userRow = {
        rank: userRank,
        displayName: formatDisplayName(userItem.name, userRank, privacyMode, true),
        department: userItem.department,
        seasonalScore: userScore,
        lifetimeScore: userItem.lifetimeScore,
        isCurrentUser: true,
        movement: userItem.movement,
      };
    } else {
      currentUserPosition = {
        rank: null,
        seasonalScore: 0,
        lifetimeScore: 0,
        totalParticipants: rankedList.length,
        movement: { direction: "same", delta: 0, text: "— No change" },
        pointsToNextRank: null,
        nextRankTarget: null,
        targetMessage: "Complete courses and workplace actions to earn your monthly rank.",
        isEligible: false,
      };
    }
  }

  return {
    enabled: true,
    companyName: company.name,
    privacyMode,
    season: {
      id: activeSeason.id,
      title: activeSeason.title,
      seasonType: activeSeason.seasonType,
      startDate: activeSeason.startDate.toISOString(),
      endDate: activeSeason.endDate.toISOString(),
      daysRemaining: getDaysRemaining(activeSeason.endDate),
      status: activeSeason.status,
    },
    totalParticipants: rankedList.length,
    currentUser: currentUserPosition,
    topPerformers,
    userRow: userRow && !topPerformers.some((p) => p.isCurrentUser) ? userRow : null,
  };
}

// ==========================================
// COMPANY ADMIN LEADERBOARD VIEW
// ==========================================

export async function getCompanyAdminLeaderboard(companyId: number) {
  const [company] = await db
    .select({
      id: companiesTable.id,
      name: companiesTable.name,
      leaderboardEnabled: companiesTable.leaderboardEnabled,
      leaderboardPrivacyMode: companiesTable.leaderboardPrivacyMode,
    })
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId))
    .limit(1);

  if (!company) {
    throw new Error("Company not found");
  }

  const activeSeason = await getOrCreateActiveCompanySeason(companyId);

  // Fetch all active company employees
  const employees = await db
    .select({
      id: employeesTable.id,
      name: employeesTable.name,
      email: employeesTable.email,
      department: employeesTable.department,
      jobTitle: employeesTable.jobTitle,
      role: employeesTable.role,
      status: employeesTable.status,
      elevioScore: employeesTable.elevioScore,
    })
    .from(employeesTable)
    .where(
      and(
        eq(employeesTable.companyId, companyId),
        eq(employeesTable.status, "active")
      )
    );

  // Fetch seasonal points from ledger
  const ledgerRows = await db
    .select({
      employeeId: elevioScoreLedgerTable.employeeId,
      totalPoints: sql<number>`COALESCE(SUM(${elevioScoreLedgerTable.points}), 0)::integer`,
    })
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.companyId, companyId),
        eq(elevioScoreLedgerTable.isReversed, false),
        gte(elevioScoreLedgerTable.eventTimestamp, activeSeason.startDate),
        lte(elevioScoreLedgerTable.eventTimestamp, activeSeason.endDate)
      )
    )
    .groupBy(elevioScoreLedgerTable.employeeId);

  const scoreMap = new Map<number, number>();
  for (const row of ledgerRows) {
    scoreMap.set(row.employeeId, Number(row.totalPoints));
  }

  const list = employees.map((emp) => ({
    employeeId: emp.id,
    name: emp.name,
    email: emp.email,
    department: emp.department,
    jobTitle: emp.jobTitle,
    role: emp.role,
    status: emp.status,
    lifetimeScore: emp.elevioScore ?? 0,
    seasonalScore: scoreMap.get(emp.id) ?? 0,
  }));

  list.sort((a, b) => b.seasonalScore - a.seasonalScore || a.name.localeCompare(b.name));

  let currentRank = 1;
  const standings = list.map((item, index) => {
    if (index > 0 && item.seasonalScore < list[index - 1].seasonalScore) {
      currentRank = index + 1;
    }
    return {
      rank: currentRank,
      ...item,
    };
  });

  return {
    enabled: company.leaderboardEnabled,
    privacyMode: company.leaderboardPrivacyMode,
    season: {
      id: activeSeason.id,
      title: activeSeason.title,
      startDate: activeSeason.startDate.toISOString(),
      endDate: activeSeason.endDate.toISOString(),
      daysRemaining: getDaysRemaining(activeSeason.endDate),
      status: activeSeason.status,
    },
    totalEmployees: employees.length,
    participatingCount: standings.filter((s) => s.seasonalScore > 0).length,
    standings,
  };
}

// ==========================================
// SETTINGS UPDATE WITH AUDIT
// ==========================================

export async function updateCompanyCompetitionSettings(params: {
  companyId: number;
  enabled: boolean;
  privacyMode?: PrivacyMode;
  actorUserId: string;
  actorRole: string;
}) {
  const [existing] = await db
    .select({
      leaderboardEnabled: companiesTable.leaderboardEnabled,
      leaderboardPrivacyMode: companiesTable.leaderboardPrivacyMode,
    })
    .from(companiesTable)
    .where(eq(companiesTable.id, params.companyId))
    .limit(1);

  if (!existing) {
    throw new Error("Company not found");
  }

  const newPrivacyMode = params.privacyMode ?? (existing.leaderboardPrivacyMode as PrivacyMode) ?? "initial";

  const [updated] = await db
    .update(companiesTable)
    .set({
      leaderboardEnabled: params.enabled,
      leaderboardPrivacyMode: newPrivacyMode,
      updatedAt: new Date(),
    })
    .where(eq(companiesTable.id, params.companyId))
    .returning();

  // If newly enabling competition, initialize active season starting from now (mid-month activation)
  if (params.enabled && !existing.leaderboardEnabled) {
    await getOrCreateActiveCompanySeason(params.companyId, {
      isMidMonthActivation: true,
      activationDate: new Date(),
    });
  }

  await logAuditEvent({
    companyId: params.companyId,
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: "company.competition_settings_updated",
    targetType: "company",
    targetId: params.companyId,
    metadata: {
      previous: {
        enabled: existing.leaderboardEnabled,
        privacyMode: existing.leaderboardPrivacyMode,
      },
      current: {
        enabled: params.enabled,
        privacyMode: newPrivacyMode,
      },
    },
  });

  return {
    enabled: updated.leaderboardEnabled,
    privacyMode: updated.leaderboardPrivacyMode,
  };
}

// ==========================================
// SEASON HISTORY
// ==========================================

export async function getCompanySeasonHistory(companyId: number, employeeId?: number) {
  const closedSeasons = await db
    .select({
      id: companySeasonsTable.id,
      title: companySeasonsTable.title,
      seasonType: companySeasonsTable.seasonType,
      startDate: companySeasonsTable.startDate,
      endDate: companySeasonsTable.endDate,
      status: companySeasonsTable.status,
      closedAt: companySeasonsTable.closedAt,
    })
    .from(companySeasonsTable)
    .where(
      and(
        eq(companySeasonsTable.companyId, companyId),
        eq(companySeasonsTable.status, "CLOSED")
      )
    )
    .orderBy(desc(companySeasonsTable.endDate));

  if (closedSeasons.length === 0) {
    return [];
  }

  // Calculate historical standings per closed season
  const history = await Promise.all(
    closedSeasons.map(async (season) => {
      const rows = await db
        .select({
          employeeId: elevioScoreLedgerTable.employeeId,
          totalPoints: sql<number>`COALESCE(SUM(${elevioScoreLedgerTable.points}), 0)::integer`,
        })
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.companyId, companyId),
            eq(elevioScoreLedgerTable.isReversed, false),
            gte(elevioScoreLedgerTable.eventTimestamp, season.startDate),
            lte(elevioScoreLedgerTable.eventTimestamp, season.endDate)
          )
        )
        .groupBy(elevioScoreLedgerTable.employeeId)
        .orderBy(desc(sql`SUM(${elevioScoreLedgerTable.points})`));

      let userRank: number | null = null;
      let userScore = 0;

      if (employeeId) {
        let currentRank = 1;
        for (let i = 0; i < rows.length; i++) {
          if (i > 0 && rows[i].totalPoints < rows[i - 1].totalPoints) {
            currentRank = i + 1;
          }
          if (rows[i].employeeId === employeeId) {
            userRank = currentRank;
            userScore = Number(rows[i].totalPoints);
            break;
          }
        }
      }

      return {
        id: season.id,
        title: season.title,
        seasonType: season.seasonType,
        startDate: season.startDate.toISOString(),
        endDate: season.endDate.toISOString(),
        totalParticipants: rows.length,
        topScore: rows.length > 0 ? Number(rows[0].totalPoints) : 0,
        userRank,
        userScore,
      };
    })
  );

  return history;
}
