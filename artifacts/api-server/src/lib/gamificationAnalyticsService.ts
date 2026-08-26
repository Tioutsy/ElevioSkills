import {
  db,
  companiesTable,
  employeesTable,
  elevioScoreLedgerTable,
  companySeasonsTable,
  companySeasonSnapshotsTable,
  departmentsTable,
  departmentSeasonStandingsTable,
  employeeDepartmentHistoryTable,
  companyChallengesTable,
  challengeTemplatesTable,
  employeeChallengeProgressTable,
  courseInteractionProgressTable,
  badgeDefinitionsTable,
  employeeBadgesTable,
  coursesTable,
  companySubscriptionsTable,
  companyPilotPassesTable,
  gamificationAnomaliesTable,
  type GamificationAnomaly,
  type InsertGamificationAnomaly,
} from "@workspace/db";
import { eq, and, sql, desc, asc, gte, lte, isNull, inArray, count } from "drizzle-orm";
import { logger } from "./logger.js";
import { logAuditEvent } from "./auditLogService.js";
import { getScoreCategory, syncEmployeeElevioScore } from "./scoringService.js";
import { getOrCreateActiveCompanySeason, getMonthBounds } from "./leaderboardService.js";
import { calculateDepartmentStandings, TEAM_SCORE_FORMULA_V1 } from "./departmentCompetitionService.js";

// ============================================================
// 1. PLATFORM ADMIN: GAMIFICATION HEALTH METRICS
// ============================================================

export interface PlatformGamificationHealthResponse {
  period: {
    startDate: string;
    endDate: string;
  };
  scoring: {
    scoreEventsThisMonth: number;
    activeScoringEmployees: number;
    totalPointsAwarded: number;
    totalPointsReversed: number;
    reversedTransactionsCount: number;
    challengeBonusPointsAwarded: number;
    averageSeasonalScore: number;
    unusualScoreFlagsCount: number;
  };
  competition: {
    companiesWithIndividualCompetition: number;
    companiesWithDepartmentCompetition: number;
    activeSeasonsCount: number;
    closedSeasonsCount: number;
    eligibleDepartmentCompetitionsCount: number;
    departmentsBelowThresholdCount: number;
  };
  challenges: {
    activeChallengesCount: number;
    overallCompletionRate: number;
    totalChallengePointsAwarded: number;
    expiredIncompleteChallengesCount: number;
    topChallengeTemplates: Array<{
      templateCode: string;
      title: string;
      activatedCount: number;
      completedCount: number;
      completionRate: number;
    }>;
  };
  interactions: {
    totalAttempts: number;
    completionRate: number;
    firstAttemptSuccessRate: number;
    abandonmentRate: number;
    difficultInteractionsCount: number;
    highestFailureInteractions: Array<{
      interactionId: string;
      courseId: number;
      courseTitle?: string;
      interactionType: string;
      attempts: number;
      firstAttemptSuccessRate: number;
      averageRetries: number;
      abandonmentRate: number;
    }>;
  };
  achievements: {
    totalAwarded: number;
    seasonalAwarded: number;
    unearnedBadgeDefinitionsCount: number;
    mostCommonAchievements: Array<{
      badgeCode: string;
      name: string;
      category: string;
      earnedCount: number;
    }>;
  };
  anomaliesSummary: {
    openCount: number;
    reviewedCount: number;
    highSeverityCount: number;
  };
}

export async function getPlatformGamificationHealth(
  startDateFilter?: Date,
  endDateFilter?: Date
): Promise<PlatformGamificationHealthResponse> {
  const { startDate: defaultStart, endDate: defaultEnd } = getMonthBounds();
  const startDate = startDateFilter ?? defaultStart;
  const endDate = endDateFilter ?? defaultEnd;

  // 1. Scoring aggregations
  const scoringQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE is_reversed = false AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate})::integer AS "scoreEventsThisMonth",
      COUNT(DISTINCT employee_id) FILTER (WHERE is_reversed = false AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate})::integer AS "activeScoringEmployees",
      COALESCE(SUM(points) FILTER (WHERE is_reversed = false AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate}), 0)::integer AS "totalPointsAwarded",
      COALESCE(SUM(points) FILTER (WHERE is_reversed = true AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate}), 0)::integer AS "totalPointsReversed",
      COUNT(*) FILTER (WHERE is_reversed = true AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate})::integer AS "reversedTransactionsCount",
      COALESCE(SUM(points) FILTER (WHERE is_reversed = false AND event_type = 'CHALLENGE_COMPLETED' AND event_timestamp >= ${startDate} AND event_timestamp <= ${endDate}), 0)::integer AS "challengeBonusPointsAwarded"
    FROM "elevio_score_ledger";
  `);
  const scoringRow: any = (scoringQuery.rows || scoringQuery)[0] || {};

  // Average seasonal score across active competitors
  const avgScoreQuery = await db.execute(sql`
    SELECT COALESCE(AVG(score_sum), 0)::numeric(8,2) AS "averageSeasonalScore"
    FROM (
      SELECT employee_id, SUM(points) AS score_sum
      FROM "elevio_score_ledger"
      WHERE is_reversed = false
        AND event_timestamp >= ${startDate}
        AND event_timestamp <= ${endDate}
      GROUP BY employee_id
    ) sub;
  `);
  const avgScoreRow: any = (avgScoreQuery.rows || avgScoreQuery)[0] || {};

  // 2. Competition metrics
  const companiesCompQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE leaderboard_enabled = true)::integer AS "individualEnabled",
      COUNT(*) FILTER (WHERE department_competition_enabled = true)::integer AS "departmentEnabled"
    FROM "companies";
  `);
  const compRow: any = (companiesCompQuery.rows || companiesCompQuery)[0] || {};

  const seasonsQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE status = 'ACTIVE')::integer AS "activeSeasons",
      COUNT(*) FILTER (WHERE status = 'CLOSED')::integer AS "closedSeasons"
    FROM "company_seasons";
  `);
  const seasonRow: any = (seasonsQuery.rows || seasonsQuery)[0] || {};

  const deptStandingsQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE is_eligible = true)::integer AS "eligibleCount",
      COUNT(*) FILTER (WHERE is_eligible = false)::integer AS "belowThresholdCount"
    FROM "department_season_standings";
  `);
  const deptRow: any = (deptStandingsQuery.rows || deptStandingsQuery)[0] || {};

  // 3. Challenge metrics
  const challengeQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE LOWER(status) = 'active')::integer AS "activeChallenges",
      COUNT(*) FILTER (WHERE LOWER(status) IN ('closed', 'cancelled'))::integer AS "expiredIncomplete"
    FROM "company_challenges";
  `);
  const chRow: any = (challengeQuery.rows || challengeQuery)[0] || {};

  const chProgressQuery = await db.execute(sql`
    SELECT
      COUNT(*)::integer AS "totalStarted",
      COUNT(*) FILTER (WHERE status = 'COMPLETED')::integer AS "totalCompleted",
      COALESCE(SUM(points_awarded), 0)::integer AS "pointsAwarded"
    FROM "employee_challenge_progress";
  `);
  const chProgRow: any = (chProgressQuery.rows || chProgressQuery)[0] || {};
  const totalChStarted = Number(chProgRow.totalStarted || 0);
  const totalChCompleted = Number(chProgRow.totalCompleted || 0);
  const chCompletionRate = totalChStarted > 0 ? Math.round((totalChCompleted / totalChStarted) * 100) : 0;

  // Top challenge templates
  const topTemplatesQuery = await db.execute(sql`
    SELECT
      ct.code AS "templateCode",
      ct.title AS "title",
      COUNT(cc.id)::integer AS "activatedCount",
      COUNT(ecp.id) FILTER (WHERE ecp.status = 'COMPLETED')::integer AS "completedCount"
    FROM "challenge_templates" ct
    LEFT JOIN "company_challenges" cc ON cc.template_id = ct.id
    LEFT JOIN "employee_challenge_progress" ecp ON ecp.challenge_id = cc.id
    GROUP BY ct.code, ct.title
    ORDER BY "completedCount" DESC
    LIMIT 5;
  `);
  const topTemplates = (topTemplatesQuery.rows || topTemplatesQuery).map((r: any) => {
    const act = Number(r.activatedCount || 0);
    const comp = Number(r.completedCount || 0);
    return {
      templateCode: String(r.templateCode),
      title: String(r.title),
      activatedCount: act,
      completedCount: comp,
      completionRate: act > 0 ? Math.round((comp / act) * 100) : 0,
    };
  });

  // 4. Interaction analytics
  const interactionStatsQuery = await db.execute(sql`
    SELECT
      COALESCE(SUM(attempt_count), 0)::integer AS "totalAttempts",
      COUNT(*) FILTER (WHERE passed = true)::integer AS "completedCount",
      COUNT(*) FILTER (WHERE passed = true AND attempt_count = 1)::integer AS "firstPassCount",
      COUNT(*) FILTER (WHERE passed = false AND attempt_count >= 2)::integer AS "abandonedCount",
      COUNT(*)::integer AS "totalRecords"
    FROM "course_interaction_progress";
  `);
  const intRow: any = (interactionStatsQuery.rows || interactionStatsQuery)[0] || {};
  const totalIntRecords = Number(intRow.totalRecords || 0);
  const totalIntAttempts = Number(intRow.totalAttempts || 0);
  const completedIntCount = Number(intRow.completedCount || 0);
  const firstPassIntCount = Number(intRow.firstPassCount || 0);
  const abandonedIntCount = Number(intRow.abandonedCount || 0);

  const intCompletionRate = totalIntRecords > 0 ? Math.round((completedIntCount / totalIntRecords) * 100) : 0;
  const intFirstPassRate = totalIntRecords > 0 ? Math.round((firstPassIntCount / totalIntRecords) * 100) : 0;
  const intAbandonRate = totalIntRecords > 0 ? Math.round((abandonedIntCount / totalIntRecords) * 100) : 0;

  // Highest failure / difficult interactions
  const difficultIntQuery = await db.execute(sql`
    SELECT
      cip.interaction_id AS "interactionId",
      cip.course_id AS "courseId",
      c.title AS "courseTitle",
      cip.interaction_type AS "interactionType",
      COUNT(*)::integer AS "recordsCount",
      COALESCE(SUM(cip.attempt_count), 0)::integer AS "totalAttempts",
      COALESCE(AVG(cip.attempt_count), 1)::numeric(4,1) AS "averageRetries",
      COUNT(*) FILTER (WHERE cip.passed = true AND cip.attempt_count = 1)::integer AS "firstPassCount",
      COUNT(*) FILTER (WHERE cip.passed = false AND cip.attempt_count >= 2)::integer AS "abandonedCount"
    FROM "course_interaction_progress" cip
    LEFT JOIN "courses" c ON c.id = cip.course_id
    GROUP BY cip.interaction_id, cip.course_id, c.title, cip.interaction_type
    HAVING COUNT(*) >= 2
    ORDER BY (COUNT(*) FILTER (WHERE cip.passed = true AND cip.attempt_count = 1)::float / COUNT(*)::float) ASC
    LIMIT 5;
  `);
  const highestFailureInteractions = (difficultIntQuery.rows || difficultIntQuery).map((r: any) => {
    const recs = Number(r.recordsCount || 0);
    const firstPass = Number(r.firstPassCount || 0);
    const abandoned = Number(r.abandonedCount || 0);
    return {
      interactionId: String(r.interactionId),
      courseId: Number(r.courseId),
      courseTitle: r.courseTitle ? String(r.courseTitle) : undefined,
      interactionType: String(r.interactionType),
      attempts: Number(r.totalAttempts || 0),
      firstAttemptSuccessRate: recs > 0 ? Math.round((firstPass / recs) * 100) : 0,
      averageRetries: Number(r.averageRetries || 1),
      abandonmentRate: recs > 0 ? Math.round((abandoned / recs) * 100) : 0,
    };
  });

  // 5. Achievement stats
  const badgeStatsQuery = await db.execute(sql`
    SELECT
      COUNT(*)::integer AS "totalAwarded",
      COUNT(*) FILTER (WHERE season_id IS NOT NULL)::integer AS "seasonalAwarded"
    FROM "employee_badges";
  `);
  const badgeRow: any = (badgeStatsQuery.rows || badgeStatsQuery)[0] || {};

  const unearnedBadgesQuery = await db.execute(sql`
    SELECT COUNT(*)::integer AS "unearnedCount"
    FROM "badge_definitions" bd
    WHERE NOT EXISTS (
      SELECT 1 FROM "employee_badges" eb WHERE eb.badge_id = bd.id
    );
  `);
  const unearnedRow: any = (unearnedBadgesQuery.rows || unearnedBadgesQuery)[0] || {};

  const commonBadgesQuery = await db.execute(sql`
    SELECT
      bd.code AS "badgeCode",
      bd.name AS "name",
      bd.category AS "category",
      COUNT(eb.id)::integer AS "earnedCount"
    FROM "badge_definitions" bd
    JOIN "employee_badges" eb ON eb.badge_id = bd.id
    GROUP BY bd.code, bd.name, bd.category
    ORDER BY "earnedCount" DESC
    LIMIT 5;
  `);
  const mostCommonAchievements = (commonBadgesQuery.rows || commonBadgesQuery).map((r: any) => ({
    badgeCode: String(r.badgeCode),
    name: String(r.name),
    category: String(r.category),
    earnedCount: Number(r.earnedCount || 0),
  }));

  // 6. Anomalies summary
  const anomaliesQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE status = 'OPEN')::integer AS "openCount",
      COUNT(*) FILTER (WHERE status = 'REVIEWED')::integer AS "reviewedCount",
      COUNT(*) FILTER (WHERE severity = 'HIGH' AND status = 'OPEN')::integer AS "highSeverityCount",
      COUNT(*) FILTER (WHERE anomaly_type = 'SUSPICIOUS_VELOCITY' AND status = 'OPEN')::integer AS "unusualScoreFlags"
    FROM "gamification_anomalies";
  `);
  const anomalyRow: any = (anomaliesQuery.rows || anomaliesQuery)[0] || {};

  return {
    period: {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    },
    scoring: {
      scoreEventsThisMonth: Number(scoringRow.scoreEventsThisMonth || 0),
      activeScoringEmployees: Number(scoringRow.activeScoringEmployees || 0),
      totalPointsAwarded: Number(scoringRow.totalPointsAwarded || 0),
      totalPointsReversed: Number(scoringRow.totalPointsReversed || 0),
      reversedTransactionsCount: Number(scoringRow.reversedTransactionsCount || 0),
      challengeBonusPointsAwarded: Number(scoringRow.challengeBonusPointsAwarded || 0),
      averageSeasonalScore: Number(avgScoreRow.averageSeasonalScore || 0),
      unusualScoreFlagsCount: Number(anomalyRow.unusualScoreFlags || 0),
    },
    competition: {
      companiesWithIndividualCompetition: Number(compRow.individualEnabled || 0),
      companiesWithDepartmentCompetition: Number(compRow.departmentEnabled || 0),
      activeSeasonsCount: Number(seasonRow.activeSeasons || 0),
      closedSeasonsCount: Number(seasonRow.closedSeasons || 0),
      eligibleDepartmentCompetitionsCount: Number(deptRow.eligibleCount || 0),
      departmentsBelowThresholdCount: Number(deptRow.belowThresholdCount || 0),
    },
    challenges: {
      activeChallengesCount: Number(chRow.activeChallenges || 0),
      overallCompletionRate: chCompletionRate,
      totalChallengePointsAwarded: Number(chProgRow.pointsAwarded || 0),
      expiredIncompleteChallengesCount: Number(chRow.expiredIncomplete || 0),
      topChallengeTemplates: topTemplates,
    },
    interactions: {
      totalAttempts: totalIntAttempts,
      completionRate: intCompletionRate,
      firstAttemptSuccessRate: intFirstPassRate,
      abandonmentRate: intAbandonRate,
      difficultInteractionsCount: highestFailureInteractions.length,
      highestFailureInteractions,
    },
    achievements: {
      totalAwarded: Number(badgeRow.totalAwarded || 0),
      seasonalAwarded: Number(badgeRow.seasonalAwarded || 0),
      unearnedBadgeDefinitionsCount: Number(unearnedRow.unearnedCount || 0),
      mostCommonAchievements,
    },
    anomaliesSummary: {
      openCount: Number(anomalyRow.openCount || 0),
      reviewedCount: Number(anomalyRow.reviewedCount || 0),
      highSeverityCount: Number(anomalyRow.highSeverityCount || 0),
    },
  };
}

// ============================================================
// 2. COMPANY ADMIN: ENGAGEMENT & COMPETITION ANALYTICS
// ============================================================

export interface CompanyGamificationAnalyticsResponse {
  companyId: number;
  companyName: string;
  season?: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  learningEngagement: {
    totalEligibleEmployees: number;
    activeLearnersCount: number;
    participationRate: number;
    averageSeasonalScore: number;
    completedCoursesCount: number;
    activeChallengeParticipantsCount: number;
    workplaceActionsCount: number;
  };
  individualCompetition: {
    enabled: boolean;
    privacyMode: string;
    activeCompetitorsCount: number;
    top10ScoreConcentrationPct: number;
    scoreDistribution: {
      zero: number;
      oneTo199: number;
      twoHundredTo499: number;
      fiveHundredTo999: number;
      oneThousandPlus: number;
    };
  };
  departmentCompetition: {
    enabled: boolean;
    totalDepartments: number;
    rankedDepartmentsCount: number;
    unrankedDepartmentsCount: number;
    averageTeamScore: number;
    departments: Array<{
      departmentId: number;
      departmentName: string;
      rank: number | null;
      teamScore: number;
      performanceScore: number;
      participationScore: number;
      participationRate: number;
      averageScore: number;
      eligibleEmployeesCount: number;
      activeParticipantsCount: number;
      isEligible: boolean;
      concentrationWarning?: string;
    }>;
  };
  challenges: {
    activeChallengesCount: number;
    completedChallengesCount: number;
    completionRate: number;
    totalPointsAwarded: number;
  };
  interactiveLearning: {
    interactionsAttemptedCount: number;
    interactionsCompletedCount: number;
    firstAttemptPassRate: number;
    difficultInteractions: Array<{
      interactionId: string;
      interactionType: string;
      attemptsCount: number;
      firstAttemptPassRate: number;
    }>;
  };
}

export async function getCompanyGamificationAnalytics(
  companyId: number,
  seasonId?: number
): Promise<CompanyGamificationAnalyticsResponse> {
  const [company] = await db
    .select({
      id: companiesTable.id,
      name: companiesTable.name,
      leaderboardEnabled: companiesTable.leaderboardEnabled,
      leaderboardPrivacyMode: companiesTable.leaderboardPrivacyMode,
      departmentCompetitionEnabled: companiesTable.departmentCompetitionEnabled,
    })
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId))
    .limit(1);

  if (!company) {
    throw new Error(`Company with ID ${companyId} not found`);
  }

  const season = seasonId
    ? (await db.select().from(companySeasonsTable).where(eq(companySeasonsTable.id, seasonId)).limit(1))[0]
    : await getOrCreateActiveCompanySeason(companyId);

  const startDate = season.startDate;
  const endDate = season.endDate;

  // 1. Employee Engagement & Scores in Season
  const employeesQuery = await db.execute(sql`
    SELECT
      e.id,
      e.name,
      e.department_id AS "departmentId",
      COALESCE(SUM(esl.points) FILTER (WHERE esl.is_reversed = false AND esl.event_timestamp >= ${startDate} AND esl.event_timestamp <= ${endDate}), 0)::integer AS "seasonalScore"
    FROM "employees" e
    LEFT JOIN "elevio_score_ledger" esl ON esl.employee_id = e.id
    WHERE e.company_id = ${companyId}
      AND e.status = 'active'
    GROUP BY e.id, e.name, e.department_id;
  `);
  const empRows = (employeesQuery.rows || employeesQuery) as Array<{
    id: number;
    name: string;
    departmentId: number | null;
    seasonalScore: number;
  }>;

  const totalEligible = empRows.length;
  const activeLearners = empRows.filter((e) => Number(e.seasonalScore) > 0);
  const activeLearnersCount = activeLearners.length;
  const participationRate = totalEligible > 0 ? Math.round((activeLearnersCount / totalEligible) * 100) : 0;

  const totalSeasonalScoreSum = activeLearners.reduce((sum, e) => sum + Number(e.seasonalScore), 0);
  const avgSeasonalScore = activeLearnersCount > 0 ? Math.round(totalSeasonalScoreSum / activeLearnersCount) : 0;

  // Score distribution bands
  const distribution = {
    zero: 0,
    oneTo199: 0,
    twoHundredTo499: 0,
    fiveHundredTo999: 0,
    oneThousandPlus: 0,
  };

  for (const emp of empRows) {
    const sc = Number(emp.seasonalScore);
    if (sc === 0) distribution.zero++;
    else if (sc < 200) distribution.oneTo199++;
    else if (sc < 500) distribution.twoHundredTo499++;
    else if (sc < 1000) distribution.fiveHundredTo999++;
    else distribution.oneThousandPlus++;
  }

  // Top 10 concentration
  const sortedScores = [...empRows].map((e) => Number(e.seasonalScore)).sort((a, b) => b - a);
  const top10Sum = sortedScores.slice(0, 10).reduce((sum, val) => sum + val, 0);
  const top10ConcentrationPct = totalSeasonalScoreSum > 0 ? Math.round((top10Sum / totalSeasonalScoreSum) * 100) : 0;

  // Events count breakdown
  const eventsCountQuery = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE event_type = 'COURSE_COMPLETED')::integer AS "coursesCompleted",
      COUNT(*) FILTER (WHERE event_type = 'WORKPLACE_ACTION_COMPLETED')::integer AS "actionsCompleted"
    FROM "elevio_score_ledger"
    WHERE company_id = ${companyId}
      AND is_reversed = false
      AND event_timestamp >= ${startDate}
      AND event_timestamp <= ${endDate};
  `);
  const evRow: any = (eventsCountQuery.rows || eventsCountQuery)[0] || {};

  // 2. Department Competition Breakdown & Explainability
  let deptAnalytics: any = {
    enabled: company.departmentCompetitionEnabled,
    totalDepartments: 0,
    rankedDepartmentsCount: 0,
    unrankedDepartmentsCount: 0,
    averageTeamScore: 0,
    departments: [],
  };

  try {
    const deptStandingsResult = await calculateDepartmentStandings(companyId, season.id, { previewAll: true });
    const standings = deptStandingsResult.standings;
    const ranked = standings.filter((d) => d.isEligible && d.rank !== null);
    const unranked = standings.filter((d) => !d.isEligible);
    const avgTeamScore =
      ranked.length > 0 ? Math.round(ranked.reduce((sum, d) => sum + d.teamScore, 0) / ranked.length) : 0;

    // Check concentration per department
    const deptsMapped = standings.map((dept) => {
      const deptEmployees = empRows.filter((e) => e.departmentId === dept.departmentId && Number(e.seasonalScore) > 0);
      const totalDeptPoints = deptEmployees.reduce((sum, e) => sum + Number(e.seasonalScore), 0);
      let concentrationWarning: string | undefined;

      if (totalDeptPoints > 0 && deptEmployees.length > 1) {
        const topEmpPoints = Math.max(...deptEmployees.map((e) => Number(e.seasonalScore)));
        const topSharePct = Math.round((topEmpPoints / totalDeptPoints) * 100);
        if (topSharePct >= 60) {
          concentrationWarning = `Team performance is concentrated: ~${topSharePct}% of points come from a single learner.`;
        }
      }

      return {
        departmentId: dept.departmentId,
        departmentName: dept.departmentName,
        rank: dept.rank,
        teamScore: dept.teamScore,
        performanceScore: dept.performanceScore,
        participationScore: dept.participationScore,
        participationRate: dept.participationRate,
        averageScore: dept.averageSeasonalScore,
        eligibleEmployeesCount: dept.eligibleEmployeesCount,
        activeParticipantsCount: dept.activeParticipantsCount,
        isEligible: dept.isEligible,
        concentrationWarning,
      };
    });

    deptAnalytics = {
      enabled: company.departmentCompetitionEnabled,
      totalDepartments: standings.length,
      rankedDepartmentsCount: ranked.length,
      unrankedDepartmentsCount: unranked.length,
      averageTeamScore: avgTeamScore,
      departments: deptsMapped,
    };
  } catch (err: any) {
    logger.warn({ err: err.message, companyId }, "Could not compute department standings for analytics");
  }

  // 3. Challenge analytics
  const challengesQuery = await db.execute(sql`
    SELECT
      COUNT(DISTINCT cc.id) FILTER (WHERE LOWER(cc.status) = 'active')::integer AS "activeChallenges",
      COUNT(ecp.id) FILTER (WHERE ecp.status = 'COMPLETED')::integer AS "completedChallenges",
      COUNT(DISTINCT ecp.employee_id)::integer AS "challengeParticipants",
      COALESCE(SUM(ecp.points_awarded), 0)::integer AS "pointsAwarded",
      COUNT(ecp.id)::integer AS "totalAssigned"
    FROM "company_challenges" cc
    LEFT JOIN "employee_challenge_progress" ecp ON ecp.challenge_id = cc.id
    WHERE cc.company_id = ${companyId};
  `);
  const chCoRow: any = (challengesQuery.rows || challengesQuery)[0] || {};
  const totalAssigned = Number(chCoRow.totalAssigned || 0);
  const completedCh = Number(chCoRow.completedChallenges || 0);
  const chRate = totalAssigned > 0 ? Math.round((completedCh / totalAssigned) * 100) : 0;

  // 4. Interactive Learning
  const intCoQuery = await db.execute(sql`
    SELECT
      COALESCE(SUM(attempt_count), 0)::integer AS "attemptsCount",
      COUNT(*) FILTER (WHERE passed = true)::integer AS "completedCount",
      COUNT(*) FILTER (WHERE passed = true AND attempt_count = 1)::integer AS "firstPassCount",
      COUNT(*)::integer AS "totalRecords"
    FROM "course_interaction_progress"
    WHERE company_id = ${companyId};
  `);
  const intCoRow: any = (intCoQuery.rows || intCoQuery)[0] || {};
  const intCoTotal = Number(intCoRow.totalRecords || 0);
  const intCoFirstPass = Number(intCoRow.firstPassCount || 0);
  const firstPassPct = intCoTotal > 0 ? Math.round((intCoFirstPass / intCoTotal) * 100) : 0;

  const difficultIntCoQuery = await db.execute(sql`
    SELECT
      interaction_id AS "interactionId",
      interaction_type AS "interactionType",
      COALESCE(SUM(attempt_count), 0)::integer AS "attemptsCount",
      COUNT(*) FILTER (WHERE passed = true AND attempt_count = 1)::integer AS "firstPassCount",
      COUNT(*)::integer AS "recordsCount"
    FROM "course_interaction_progress"
    WHERE company_id = ${companyId}
    GROUP BY interaction_id, interaction_type
    HAVING COUNT(*) >= 2
    ORDER BY (COUNT(*) FILTER (WHERE passed = true AND attempt_count = 1)::float / COUNT(*)::float) ASC
    LIMIT 3;
  `);
  const difficultInteractions = (difficultIntCoQuery.rows || difficultIntCoQuery).map((r: any) => {
    const rc = Number(r.recordsCount || 0);
    const fp = Number(r.firstPassCount || 0);
    return {
      interactionId: String(r.interactionId),
      interactionType: String(r.interactionType),
      attemptsCount: Number(r.attemptsCount || 0),
      firstAttemptPassRate: rc > 0 ? Math.round((fp / rc) * 100) : 0,
    };
  });

  return {
    companyId,
    companyName: company.name,
    season: {
      id: season.id,
      title: season.title,
      startDate: season.startDate.toISOString().split("T")[0],
      endDate: season.endDate.toISOString().split("T")[0],
      status: season.status,
    },
    learningEngagement: {
      totalEligibleEmployees: totalEligible,
      activeLearnersCount,
      participationRate,
      averageSeasonalScore: avgSeasonalScore,
      completedCoursesCount: Number(evRow.coursesCompleted || 0),
      activeChallengeParticipantsCount: Number(chCoRow.challengeParticipants || 0),
      workplaceActionsCount: Number(evRow.actionsCompleted || 0),
    },
    individualCompetition: {
      enabled: company.leaderboardEnabled,
      privacyMode: company.leaderboardPrivacyMode,
      activeCompetitorsCount: activeLearnersCount,
      top10ScoreConcentrationPct: top10ConcentrationPct,
      scoreDistribution: distribution,
    },
    departmentCompetition: deptAnalytics,
    challenges: {
      activeChallengesCount: Number(chCoRow.activeChallenges || 0),
      completedChallengesCount: completedCh,
      completionRate: chRate,
      totalPointsAwarded: Number(chCoRow.pointsAwarded || 0),
    },
    interactiveLearning: {
      interactionsAttemptedCount: Number(intCoRow.attemptsCount || 0),
      interactionsCompletedCount: Number(intCoRow.completedCount || 0),
      firstAttemptPassRate: firstPassPct,
      difficultInteractions,
    },
  };
}

// ============================================================
// 3. FAIRNESS DIAGNOSTICS & ANOMALY DETECTION ENGINE
// ============================================================

export interface DetectedAnomalyItem {
  companyId: number;
  companyName?: string;
  employeeId?: number | null;
  employeeName?: string | null;
  anomalyType:
    | "SCORE_MISMATCH"
    | "SUSPICIOUS_VELOCITY"
    | "DUPLICATE_SCORING_ATTEMPT"
    | "SEASON_INTEGRITY"
    | "CHALLENGE_FAIRNESS"
    | "DIFFICULT_INTERACTION"
    | "COMPETITION_CONCENTRATION";
  severity: "INFO" | "REVIEW" | "HIGH";
  description: string;
  metadata?: Record<string, any>;
}

/**
 * Runs full deterministic fairness diagnostics across the system or for a specific company.
 * STRICT PRINCIPLE: Never automatically punishes learners or reverses scores. Flags are for review only.
 */
export async function runGamificationDiagnostics(companyIdFilter?: number): Promise<{
  diagnosticsRunAt: string;
  anomaliesDetectedCount: number;
  anomalies: DetectedAnomalyItem[];
}> {
  const anomalies: DetectedAnomalyItem[] = [];

  // ------------------------------------------------------------
  // A. SCORE RECONCILIATION CHECK (Materialized vs Ledger sum)
  // ------------------------------------------------------------
  const mismatchQuery = await db.execute(sql`
    SELECT
      e.id AS "employeeId",
      e.name AS "employeeName",
      e.company_id AS "companyId",
      c.name AS "companyName",
      e.elevio_score AS "cachedScore",
      COALESCE(sub.ledger_sum, 0)::integer AS "ledgerScore"
    FROM "employees" e
    JOIN "companies" c ON c.id = e.company_id
    LEFT JOIN (
      SELECT employee_id, SUM(points)::integer AS ledger_sum
      FROM "elevio_score_ledger"
      WHERE is_reversed = false
      GROUP BY employee_id
    ) sub ON sub.employee_id = e.id
    WHERE e.status = 'active'
      AND e.elevio_score != COALESCE(sub.ledger_sum, 0)
      ${companyIdFilter ? sql`AND e.company_id = ${companyIdFilter}` : sql``}
    LIMIT 50;
  `);

  for (const row of (mismatchQuery.rows || mismatchQuery) as any[]) {
    anomalies.push({
      companyId: Number(row.companyId),
      companyName: String(row.companyName),
      employeeId: Number(row.employeeId),
      employeeName: String(row.employeeName),
      anomalyType: "SCORE_MISMATCH",
      severity: "HIGH",
      description: `Materialized ELEVIO Score (${row.cachedScore}) differs from ledger source of truth (${row.ledgerScore}) by ${Number(row.cachedScore) - Number(row.ledgerScore)} pts. Controlled recalculation recommended.`,
      metadata: {
        cachedScore: Number(row.cachedScore),
        ledgerScore: Number(row.ledgerScore),
        delta: Number(row.cachedScore) - Number(row.ledgerScore),
      },
    });
  }

  // ------------------------------------------------------------
  // B. SUSPICIOUS SCORE VELOCITY CHECK
  // Rule: >= 5 course completions within 10 minutes OR >= 500 points in 1 hour
  // ------------------------------------------------------------
  const velocityQuery = await db.execute(sql`
    SELECT
      esl.employee_id AS "employeeId",
      esl.company_id AS "companyId",
      e.name AS "employeeName",
      c.name AS "companyName",
      COUNT(*)::integer AS "rapidEventsCount",
      SUM(esl.points)::integer AS "rapidPointsSum",
      MIN(esl.event_timestamp) AS "firstEventAt",
      MAX(esl.event_timestamp) AS "lastEventAt"
    FROM "elevio_score_ledger" esl
    JOIN "employees" e ON e.id = esl.employee_id
    JOIN "companies" c ON c.id = esl.company_id
    WHERE esl.is_reversed = false
      AND esl.event_type = 'COURSE_COMPLETED'
      ${companyIdFilter ? sql`AND esl.company_id = ${companyIdFilter}` : sql``}
    GROUP BY esl.employee_id, esl.company_id, e.name, c.name, date_trunc('hour', esl.event_timestamp)
    HAVING COUNT(*) >= 5
    LIMIT 20;
  `);

  for (const row of (velocityQuery.rows || velocityQuery) as any[]) {
    anomalies.push({
      companyId: Number(row.companyId),
      companyName: String(row.companyName),
      employeeId: Number(row.employeeId),
      employeeName: String(row.employeeName),
      anomalyType: "SUSPICIOUS_VELOCITY",
      severity: "REVIEW",
      description: `Rapid score accumulation detected: learner completed ${row.rapidEventsCount} courses (${row.rapidPointsSum} pts) in under an hour. Review recommended.`,
      metadata: {
        rapidEventsCount: Number(row.rapidEventsCount),
        rapidPointsSum: Number(row.rapidPointsSum),
        firstEventAt: row.firstEventAt,
        lastEventAt: row.lastEventAt,
      },
    });
  }

  // ------------------------------------------------------------
  // C. SEASON INTEGRITY CHECK (Overlapping active seasons)
  // ------------------------------------------------------------
  const seasonIntegrityQuery = await db.execute(sql`
    SELECT
      cs.company_id AS "companyId",
      c.name AS "companyName",
      COUNT(*)::integer AS "activeSeasonsCount"
    FROM "company_seasons" cs
    JOIN "companies" c ON c.id = cs.company_id
    WHERE cs.status = 'ACTIVE'
      ${companyIdFilter ? sql`AND cs.company_id = ${companyIdFilter}` : sql``}
    GROUP BY cs.company_id, c.name
    HAVING COUNT(*) > 1;
  `);

  for (const row of (seasonIntegrityQuery.rows || seasonIntegrityQuery) as any[]) {
    anomalies.push({
      companyId: Number(row.companyId),
      companyName: String(row.companyName),
      anomalyType: "SEASON_INTEGRITY",
      severity: "HIGH",
      description: `Multiple concurrently active seasons (${row.activeSeasonsCount}) found for company. Please close older seasons to maintain scoring clarity.`,
      metadata: {
        activeSeasonsCount: Number(row.activeSeasonsCount),
      },
    });
  }

  // ------------------------------------------------------------
  // D. CHALLENGE FAIRNESS CHECK (Inaccessible course in active challenge)
  // ------------------------------------------------------------
  const challengeFairnessQuery = await db.execute(sql`
    SELECT
      cc.id AS "challengeId",
      cc.title AS "challengeTitle",
      cc.company_id AS "companyId",
      c.name AS "companyName",
      ccc.course_id AS "courseId",
      crs.title AS "courseTitle"
    FROM "company_challenges" cc
    JOIN "companies" c ON c.id = cc.company_id
    JOIN "company_challenge_criteria" ccc ON ccc.challenge_id = cc.id
    JOIN "courses" crs ON crs.id = ccc.course_id
    WHERE LOWER(cc.status) = 'active'
      AND UPPER(ccc.criterion_type) = 'COURSE_COMPLETION'
      AND crs.is_published = false
      ${companyIdFilter ? sql`AND cc.company_id = ${companyIdFilter}` : sql``}
    LIMIT 20;
  `);

  for (const row of (challengeFairnessQuery.rows || challengeFairnessQuery) as any[]) {
    anomalies.push({
      companyId: Number(row.companyId),
      companyName: String(row.companyName),
      anomalyType: "CHALLENGE_FAIRNESS",
      severity: "REVIEW",
      description: `Challenge "${row.challengeTitle}" requires completing unpublished course "${row.courseTitle}" (ID ${row.courseId}), making completion impossible for learners.`,
      metadata: {
        challengeId: Number(row.challengeId),
        challengeTitle: String(row.challengeTitle),
        courseId: Number(row.courseId),
        courseTitle: String(row.courseTitle),
      },
    });
  }

  // ------------------------------------------------------------
  // E. DIFFICULT INTERACTION CHECK (High failure or drop-off)
  // ------------------------------------------------------------
  const difficultQuery = await db.execute(sql`
    SELECT
      cip.interaction_id AS "interactionId",
      cip.course_id AS "courseId",
      c.title AS "courseTitle",
      cip.company_id AS "companyId",
      cmp.name AS "companyName",
      COUNT(*)::integer AS "totalLearners",
      COUNT(*) FILTER (WHERE cip.passed = true AND cip.attempt_count = 1)::integer AS "firstPassCount",
      COUNT(*) FILTER (WHERE cip.passed = false AND cip.attempt_count >= 2)::integer AS "abandonedCount"
    FROM "course_interaction_progress" cip
    JOIN "courses" c ON c.id = cip.course_id
    JOIN "companies" cmp ON cmp.id = cip.company_id
    ${companyIdFilter ? sql`WHERE cip.company_id = ${companyIdFilter}` : sql``}
    GROUP BY cip.interaction_id, cip.course_id, c.title, cip.company_id, cmp.name
    HAVING COUNT(*) >= 5
       AND (COUNT(*) FILTER (WHERE cip.passed = true AND cip.attempt_count = 1)::float / COUNT(*)::float) < 0.40
    LIMIT 10;
  `);

  for (const row of (difficultQuery.rows || difficultQuery) as any[]) {
    const total = Number(row.totalLearners);
    const passRate = Math.round((Number(row.firstPassCount) / total) * 100);
    anomalies.push({
      companyId: Number(row.companyId),
      companyName: String(row.companyName),
      anomalyType: "DIFFICULT_INTERACTION",
      severity: "INFO",
      description: `Interaction "${row.interactionId}" in "${row.courseTitle}" has an unusually low first-attempt pass rate (${passRate}% across ${total} learners). Content review recommended.`,
      metadata: {
        interactionId: String(row.interactionId),
        courseId: Number(row.courseId),
        firstAttemptSuccessRate: passRate,
        totalLearners: total,
      },
    });
  }

  // Persist new anomalies to database idempotently
  for (const a of anomalies) {
    try {
      await recordOrUpdateAnomaly(a);
    } catch (e: any) {
      logger.warn({ err: e.message }, "Could not persist anomaly record");
    }
  }

  return {
    diagnosticsRunAt: new Date().toISOString(),
    anomaliesDetectedCount: anomalies.length,
    anomalies,
  };
}

/**
 * Persists an operational anomaly record without duplicating identical open entries.
 */
export async function recordOrUpdateAnomaly(params: {
  companyId: number;
  employeeId?: number | null;
  anomalyType: string;
  severity: string;
  description: string;
  metadata?: Record<string, any>;
}): Promise<GamificationAnomaly | null> {
  // Check if open anomaly of same type and employee already exists
  const existing = await db
    .select()
    .from(gamificationAnomaliesTable)
    .where(
      and(
        eq(gamificationAnomaliesTable.companyId, params.companyId),
        params.employeeId ? eq(gamificationAnomaliesTable.employeeId, params.employeeId) : isNull(gamificationAnomaliesTable.employeeId),
        eq(gamificationAnomaliesTable.anomalyType, params.anomalyType),
        eq(gamificationAnomaliesTable.status, "OPEN")
      )
    )
    .limit(1);

  if (existing.length > 0) {
    // Update existing open anomaly
    const [updated] = await db
      .update(gamificationAnomaliesTable)
      .set({
        description: params.description,
        metadata: params.metadata,
        severity: params.severity,
        updatedAt: new Date(),
      })
      .where(eq(gamificationAnomaliesTable.id, existing[0].id))
      .returning();
    return updated;
  }

  const [inserted] = await db
    .insert(gamificationAnomaliesTable)
    .values({
      companyId: params.companyId,
      employeeId: params.employeeId ?? null,
      anomalyType: params.anomalyType,
      severity: params.severity,
      description: params.description,
      metadata: params.metadata ?? null,
      status: "OPEN",
      detectedAt: new Date(),
    })
    .returning();

  return inserted;
}

// ============================================================
// 4. CONTROLLED SCORE RECONCILIATION & REPAIR
// ============================================================

/**
 * Platform Admin tool to recalculate an employee's materialized score from the ledger source of truth.
 * CRITICAL: This does NOT create any ledger records. It only repairs the cached elevio_score column.
 */
export async function recalculateEmployeeScore(params: {
  employeeId: number;
  reason: string;
  actorUserId: string;
  actorRole: string;
}): Promise<{
  employeeId: number;
  companyId: number;
  beforeScore: number;
  afterScore: number;
  repairedAt: string;
}> {
  if (!params.reason || typeof params.reason !== "string" || params.reason.trim().length < 5) {
    throw new Error("A valid reason (minimum 5 characters) is required for score recalculation");
  }

  const [employee] = await db
    .select({
      id: employeesTable.id,
      companyId: employeesTable.companyId,
      name: employeesTable.name,
      elevioScore: employeesTable.elevioScore,
    })
    .from(employeesTable)
    .where(eq(employeesTable.id, params.employeeId))
    .limit(1);

  if (!employee) {
    throw new Error(`Employee ${params.employeeId} not found`);
  }

  const beforeScore = employee.elevioScore;
  const afterScore = await syncEmployeeElevioScore(params.employeeId);

  // Auto-resolve any open SCORE_MISMATCH anomaly for this employee
  await db
    .update(gamificationAnomaliesTable)
    .set({
      status: "RESOLVED",
      reviewedBy: params.actorUserId,
      reviewedAt: new Date(),
      resolutionNote: `Score recalculated from ${beforeScore} to ${afterScore} pts. Reason: ${params.reason.trim()}`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(gamificationAnomaliesTable.employeeId, params.employeeId),
        eq(gamificationAnomaliesTable.anomalyType, "SCORE_MISMATCH"),
        eq(gamificationAnomaliesTable.status, "OPEN")
      )
    );

  await logAuditEvent({
    companyId: employee.companyId,
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: "employee.score_recalculated",
    targetType: "employee",
    targetId: String(employee.id),
    metadata: {
      beforeScore,
      afterScore,
      delta: afterScore - beforeScore,
      reason: params.reason.trim(),
    },
  });

  logger.info(
    {
      employeeId: employee.id,
      companyId: employee.companyId,
      beforeScore,
      afterScore,
      actorUserId: params.actorUserId,
      reason: params.reason,
    },
    "Controlled employee score recalculation completed"
  );

  return {
    employeeId: employee.id,
    companyId: employee.companyId,
    beforeScore,
    afterScore,
    repairedAt: new Date().toISOString(),
  };
}

// ============================================================
// 5. ANOMALY REVIEW WORKFLOW
// ============================================================

export async function reviewGamificationAnomaly(params: {
  anomalyId: number;
  status: "REVIEWED" | "DISMISSED" | "RESOLVED";
  resolutionNote?: string;
  actorUserId: string;
  actorRole: string;
}): Promise<GamificationAnomaly> {
  const [existing] = await db
    .select()
    .from(gamificationAnomaliesTable)
    .where(eq(gamificationAnomaliesTable.id, params.anomalyId))
    .limit(1);

  if (!existing) {
    throw new Error(`Anomaly with ID ${params.anomalyId} not found`);
  }

  // Require meaningful resolution note for RESOLVED or high-severity DISMISSED
  if (params.status === "RESOLVED" || (params.status === "DISMISSED" && existing.severity === "HIGH")) {
    if (!params.resolutionNote || typeof params.resolutionNote !== "string" || params.resolutionNote.trim().length < 5) {
      throw new Error(`A resolution note (minimum 5 characters) is required when setting status to ${params.status}`);
    }
  }

  const [updated] = await db
    .update(gamificationAnomaliesTable)
    .set({
      status: params.status,
      reviewedBy: params.actorUserId,
      reviewedAt: new Date(),
      resolutionNote: params.resolutionNote?.trim() ?? null,
      updatedAt: new Date(),
    })
    .where(eq(gamificationAnomaliesTable.id, params.anomalyId))
    .returning();

  await logAuditEvent({
    companyId: existing.companyId,
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: `gamification_anomaly.${params.status.toLowerCase()}`,
    targetType: "gamification_anomalies",
    targetId: String(existing.id),
    metadata: {
      anomalyType: existing.anomalyType,
      previousStatus: existing.status,
      newStatus: params.status,
      resolutionNote: params.resolutionNote,
    },
  });

  return updated;
}

export async function listGamificationAnomalies(params?: {
  companyId?: number;
  status?: string;
  anomalyType?: string;
  severity?: string;
  limit?: number;
  offset?: number;
}): Promise<{ total: number; anomalies: any[] }> {
  const limit = Math.min(100, Math.max(1, params?.limit ?? 50));
  const offset = Math.max(0, params?.offset ?? 0);

  const conditions = [];
  if (params?.companyId) conditions.push(eq(gamificationAnomaliesTable.companyId, params.companyId));
  if (params?.status) conditions.push(eq(gamificationAnomaliesTable.status, params.status));
  if (params?.anomalyType) conditions.push(eq(gamificationAnomaliesTable.anomalyType, params.anomalyType));
  if (params?.severity) conditions.push(eq(gamificationAnomaliesTable.severity, params.severity));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select({
      id: gamificationAnomaliesTable.id,
      companyId: gamificationAnomaliesTable.companyId,
      companyName: companiesTable.name,
      employeeId: gamificationAnomaliesTable.employeeId,
      employeeName: employeesTable.name,
      anomalyType: gamificationAnomaliesTable.anomalyType,
      severity: gamificationAnomaliesTable.severity,
      description: gamificationAnomaliesTable.description,
      metadata: gamificationAnomaliesTable.metadata,
      status: gamificationAnomaliesTable.status,
      detectedAt: gamificationAnomaliesTable.detectedAt,
      reviewedBy: gamificationAnomaliesTable.reviewedBy,
      reviewedAt: gamificationAnomaliesTable.reviewedAt,
      resolutionNote: gamificationAnomaliesTable.resolutionNote,
    })
    .from(gamificationAnomaliesTable)
    .leftJoin(companiesTable, eq(gamificationAnomaliesTable.companyId, companiesTable.id))
    .leftJoin(employeesTable, eq(gamificationAnomaliesTable.employeeId, employeesTable.id))
    .where(whereClause)
    .orderBy(desc(gamificationAnomaliesTable.detectedAt))
    .limit(limit)
    .offset(offset);

  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(gamificationAnomaliesTable)
    .where(whereClause);

  return {
    total: Number(totalCount),
    anomalies: rows,
  };
}

// ============================================================
// 6. CSV AUDIT & ENGAGEMENT EXPORTS (WITH INJECTION PROTECTION & PRIVACY)
// ============================================================

/**
 * Escapes CSV cell values and protects against CSV formula injection (including leading whitespace).
 */
export function escapeCsv(val: any): string {
  if (val === null || val === undefined) return "";
  let str = String(val);

  // Prevent spreadsheet formula injection by prepending ' if string or trimmed string starts with formula symbols
  const trimmed = str.trimStart();
  if (/^[=+\-@\t\r]/.test(str) || (trimmed.length > 0 && /^[=+\-@\t\r]/.test(trimmed))) {
    str = `'${str}`;
  }

  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates Platform Admin CSV export of all score transactions & audit history.
 */
export async function generatePlatformGamificationAuditCsv(companyIdFilter?: number): Promise<string> {
  const transactions = await db
    .select({
      id: elevioScoreLedgerTable.id,
      eventTimestamp: elevioScoreLedgerTable.eventTimestamp,
      companyId: elevioScoreLedgerTable.companyId,
      companyName: companiesTable.name,
      employeeId: elevioScoreLedgerTable.employeeId,
      employeeName: employeesTable.name,
      eventType: elevioScoreLedgerTable.eventType,
      sourceEntityType: elevioScoreLedgerTable.sourceEntityType,
      sourceEntityId: elevioScoreLedgerTable.sourceEntityId,
      points: elevioScoreLedgerTable.points,
      isReversed: elevioScoreLedgerTable.isReversed,
      reversedAt: elevioScoreLedgerTable.reversedAt,
      reversalReason: elevioScoreLedgerTable.reversalReason,
      idempotencyKey: elevioScoreLedgerTable.idempotencyKey,
    })
    .from(elevioScoreLedgerTable)
    .leftJoin(companiesTable, eq(elevioScoreLedgerTable.companyId, companiesTable.id))
    .leftJoin(employeesTable, eq(elevioScoreLedgerTable.employeeId, employeesTable.id))
    .where(companyIdFilter ? eq(elevioScoreLedgerTable.companyId, companyIdFilter) : undefined)
    .orderBy(desc(elevioScoreLedgerTable.eventTimestamp))
    .limit(5000);

  const metadataHeaders = [
    `# ELEVIO Skills Platform Gamification Ledger Audit Export`,
    `# Generation Date: ${new Date().toISOString()}`,
    `# Filter Company ID: ${companyIdFilter ?? "All Organisations"}`,
    `# Record Count: ${transactions.length}`,
    "",
  ];

  const headers = [
    "Transaction ID",
    "Timestamp",
    "Company ID",
    "Company Name",
    "Employee ID",
    "Employee Name",
    "Event Type",
    "Category",
    "Points",
    "Reversed",
    "Reversed At",
    "Reversal Reason",
    "Idempotency Key",
  ];

  const rows = transactions.map((t) => [
    t.id,
    t.eventTimestamp ? t.eventTimestamp.toISOString() : "",
    t.companyId,
    escapeCsv(t.companyName),
    t.employeeId,
    escapeCsv(t.employeeName),
    t.eventType,
    getScoreCategory(t.eventType),
    t.points,
    t.isReversed ? "YES" : "NO",
    t.reversedAt ? t.reversedAt.toISOString() : "",
    escapeCsv(t.reversalReason),
    escapeCsv(t.idempotencyKey),
  ]);

  return [
    ...metadataHeaders,
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");
}

/**
 * Generates Company Admin engagement & competition summary CSV export with privacy controls.
 */
export async function generateCompanyEngagementCsv(companyId: number, seasonId?: number): Promise<string> {
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
    throw new Error(`Company ${companyId} not found`);
  }

  const season = seasonId
    ? (await db.select().from(companySeasonsTable).where(eq(companySeasonsTable.id, seasonId)).limit(1))[0]
    : await getOrCreateActiveCompanySeason(companyId);

  const startDate = season.startDate;
  const endDate = season.endDate;

  const employeeData = await db.execute(sql`
    SELECT
      e.id AS "employeeId",
      e.name AS "employeeName",
      e.email AS "email",
      d.name AS "departmentName",
      e.job_title AS "jobTitle",
      COALESCE(SUM(esl.points) FILTER (WHERE esl.is_reversed = false AND esl.event_timestamp >= ${startDate} AND esl.event_timestamp <= ${endDate}), 0)::integer AS "seasonalScore",
      e.elevio_score AS "lifetimeScore",
      COUNT(DISTINCT eb.id)::integer AS "achievementsCount",
      COUNT(DISTINCT ecp.id) FILTER (WHERE ecp.status = 'COMPLETED')::integer AS "challengesCompleted",
      COUNT(DISTINCT esl.id) FILTER (WHERE esl.event_type = 'WORKPLACE_ACTION_COMPLETED' AND esl.is_reversed = false)::integer AS "actionsCompleted"
    FROM "employees" e
    LEFT JOIN "departments" d ON d.id = e.department_id
    LEFT JOIN "elevio_score_ledger" esl ON esl.employee_id = e.id
    LEFT JOIN "employee_badges" eb ON eb.employee_id = e.id
    LEFT JOIN "employee_challenge_progress" ecp ON ecp.employee_id = e.id
    WHERE e.company_id = ${companyId}
      AND e.status = 'active'
    GROUP BY e.id, e.name, e.email, d.name, e.job_title, e.elevio_score
    ORDER BY "seasonalScore" DESC;
  `);

  const metadataHeaders = [
    `# ELEVIO Skills Company Engagement & Competition Export`,
    `# Generation Date: ${new Date().toISOString()}`,
    `# Organisation: ${company.name}`,
    `# Season: ${season.title} (${startDate.toISOString().split("T")[0]} to ${endDate.toISOString().split("T")[0]})`,
    "",
  ];

  const headers = [
    "Rank",
    "Employee ID",
    "Name",
    "Email",
    "Department",
    "Job Title",
    "Seasonal Score",
    "Lifetime Score",
    "Achievements Count",
    "Challenges Completed",
    "Actions Completed",
    "Privacy Status",
  ];

  const rows = (employeeData.rows || employeeData).map((e: any, idx: number) => {
    const currentRank = Number(e.seasonalScore) > 0 ? idx + 1 : "—";
    
    // Privacy handling
    let displayName = e.employeeName;
    let displayEmail = e.email;
    const privacySetting = company.leaderboardPrivacyMode || "full_name";

    if (privacySetting === "anonymous") {
      displayName = `Learner #${e.employeeId}`;
      displayEmail = "[Hidden - Opted Out]";
    } else if (privacySetting === "initial" && e.employeeName) {
      const parts = String(e.employeeName).trim().split(/\s+/);
      displayName = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
    }

    return [
      currentRank,
      e.employeeId,
      escapeCsv(displayName),
      escapeCsv(displayEmail),
      escapeCsv(e.departmentName || "Unassigned"),
      escapeCsv(e.jobTitle || "—"),
      e.seasonalScore,
      e.lifetimeScore,
      e.achievementsCount,
      e.challengesCompleted,
      e.actionsCompleted,
      escapeCsv(privacySetting),
    ];
  });

  return [
    ...metadataHeaders,
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");
}
