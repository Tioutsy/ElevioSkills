import app from "./app";
import { logger } from "./lib/logger";
import { ensureFoundationsCourse } from "./lib/ensureFoundationsCourse";
import { ensureWasteSortingCourse } from "./lib/ensureWasteSortingCourse";
import { ensureEnergyEfficiencyCourse } from "./lib/ensureEnergyEfficiencyCourse";
import { ensureWaterConservationCourse } from "./lib/ensureWaterConservationCourse";
import { ensureSustainableProcurementCourse } from "./lib/ensureSustainableProcurementCourse";
import { ensureGreenOfficePracticesCourse } from "./lib/ensureGreenOfficePracticesCourse";
import { ensureCarbonFootprintCourse } from "./lib/ensureCarbonFootprintCourse";
import { ensureBiodiversityCourse } from "./lib/ensureBiodiversityCourse";
import { ensureEsgBasicsCourse } from "./lib/ensureEsgBasicsCourse";
import { ensureEnvironmentalComplianceCourse } from "./lib/ensureEnvironmentalComplianceCourse";
import { ensureClimateRiskCourse } from "./lib/ensureClimateRiskCourse";
import { ensureCircularEconomyCourse } from "./lib/ensureCircularEconomyCourse";
import { ensureFinalSustainabilityCertificationCourse } from "./lib/ensureFinalSustainabilityCertificationCourse";
import { ensureActionPlanningCourse } from "./lib/ensureActionPlanningCourse";
import { ensureDepartmentalSustainabilityGoalsCourse } from "./lib/ensureDepartmentalSustainabilityGoalsCourse";
import { ensureWorkplaceSustainabilityTeamCourse } from "./lib/ensureWorkplaceSustainabilityTeamCourse";
import { ensureCommunicatingSustainabilityAtWorkCourse } from "./lib/ensureCommunicatingSustainabilityAtWorkCourse";
import { ensureTrackingSustainabilityActionsCourse } from "./lib/ensureTrackingSustainabilityActionsCourse";
import { ensureSustainabilityDataCollectionCourse } from "./lib/ensureSustainabilityDataCollectionCourse";
import { ensureSustainabilityPerformanceReviewCourse } from "./lib/ensureSustainabilityPerformanceReviewCourse";
import { ensureSustainabilityRolesAccountabilityCourse } from "./lib/ensureSustainabilityRolesAccountabilityCourse";
import { ensureEmployeeSustainabilityEngagementCourse } from "./lib/ensureEmployeeSustainabilityEngagementCourse";
import { ensureEffectiveGreenTeamsCourse } from "./lib/ensureEffectiveGreenTeamsCourse";
import { ensureWorkplaceSustainabilityInitiativesCourse } from "./lib/ensureWorkplaceSustainabilityInitiativesCourse";
import { ensureSustainabilityForHrTeamsCourse } from "./lib/ensureSustainabilityForHrTeamsCourse";
import { ensureSustainabilityForFinanceTeamsCourse } from "./lib/ensureSustainabilityForFinanceTeamsCourse";
import { ensureSustainabilityForProcurementAndPurchasingTeamsCourse } from "./lib/ensureSustainabilityForProcurementAndPurchasingTeamsCourse";
import { ensureSustainabilityForOperationsAndFrontlineTeamsCourse } from "./lib/ensureSustainabilityForOperationsAndFrontlineTeamsCourse";
import { ensureSustainabilityForFacilitiesAndPropertyTeamsCourse } from "./lib/ensureSustainabilityForFacilitiesAndPropertyTeamsCourse";
import { ensureSustainabilityForSalesAndMarketingTeamsCourse } from "./lib/ensureSustainabilityForSalesAndMarketingTeamsCourse";
import { ensureSocialResponsibilityAtWorkCourse } from "./lib/ensureSocialResponsibilityAtWorkCourse";
import { ensureEthicsGovernanceCourse } from "./lib/ensureEthicsGovernanceCourse";
import { ensureEsgDataCourse } from "./lib/ensureEsgDataCourse";
import { ensureEsgInMyJobCourse } from "./lib/ensureEsgInMyJobCourse";
import { ensureAppliedCourseBadges } from "./lib/ensureAppliedCourseBadges";
import { ensureWorkplaceSustainabilityLeadershipCourse } from "./lib/ensureWorkplaceSustainabilityLeadershipCourse";
import { ensureCohort15_2_10BRemediation } from "./lib/ensureCohort15_2_10BRemediation";
import { ensureCohort15_2_10CRemediation } from "./lib/ensureCohort15_2_10CRemediation";
import { ensureCohort15_2_10DRemediation } from "./lib/ensureCohort15_2_10DRemediation";
import { ensureCohort15_2_10ERemediation } from "./lib/ensureCohort15_2_10ERemediation";
import { ensureCohort15_2_10FRemediation } from "./lib/ensureCohort15_2_10FRemediation";
import { ensureCohort15_2_10GRemediation } from "./lib/ensureCohort15_2_10GRemediation";
import { ensureCohort15_2_10HRemediation } from "./lib/ensureCohort15_2_10HRemediation";
import { ensureCohort15_2_10IRemediation } from "./lib/ensureCohort15_2_10IRemediation";
import { ensureCohort15_2_10JRemediation } from "./lib/ensureCohort15_2_10JRemediation";
import { ensureCohort15_2_10KRemediation } from "./lib/ensureCohort15_2_10KRemediation";
import { ensureCohort15_2_10LRemediation } from "./lib/ensureCohort15_2_10LRemediation";
import { seedInitialSectors } from "./routes/platformAdmin";
import { ensureCatalogueSkeletons } from "./lib/ensureCatalogueSkeletons";
import { ensureCoreSustainabilityPath } from "./lib/ensureCoreSustainabilityPath";
import { ensureDefaultCompany } from "./lib/ensureDefaultCompany";
import { ensurePlans } from "./lib/ensurePlans";
import { ensureChallenges } from "./lib/ensureChallenges";
import { ensureAchievementDefinitions } from "./lib/achievementsService";
import { ensureChallengeTemplates } from "./lib/challengeService.js";
import { ensureInsightsMigrated } from "./lib/ensureInsightsMigrated";
import { ensureCategoriesAndAssignments } from "./lib/ensureCategoriesAndAssignments";
import { ensureHybridSubscriptions } from "./lib/ensureHybridSubscriptions";
import { syncSequences } from "./lib/syncSequences";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications";
import { ensureCourseImages } from "./lib/ensureCourseImages";
import { ensureMorievaBrandMigration } from "./lib/ensureMorievaBrandMigration";
import { verifyDatabaseIntegrity } from "./lib/verifyDatabaseIntegrity";
import { startInvitationDispatchWorker } from "./lib/invitationDispatchWorker";
import { unpublishCourses36to139 } from "./scripts/unpublishCourses36to139";

const defaultPort = 8080;
const rawPort = process.env["PORT"];
let port = defaultPort;

if (rawPort !== undefined && rawPort !== null && String(rawPort).trim() !== "") {
  const parsed = Number(rawPort);
  if (!Number.isNaN(parsed) && parsed > 0) {
    port = parsed;
  } else {
    logger.warn({ rawPort }, `Invalid PORT value "${rawPort}". Using default ${defaultPort}.`);
  }
}

const host = process.env["HOST"] ?? "0.0.0.0";

async function start(): Promise<void> {
  // Start HTTP listener immediately so Render health checks pass during startup database tasks
  const server = app.listen(port, host, () => {
    logger.info({ port, host }, `Server listening on ${host}`);
  });

  try {
    // Ensure any schema modifications that were missed by the remote migration runner are applied
    await ensureSchemaModifications();

    // Run database schema integrity verification
    const report = await verifyDatabaseIntegrity();
    if (!report.valid) {
      logger.error({ issues: report.issues }, "Database schema verification failed. Startup aborted.");
      process.exit(1);
    }

    if (report.issues.length === 0) {
      logger.info("Database schema verification completed successfully.");
    } else {
      logger.info("Database schema is current. No modifications required.");
    }

    // Synchronize auto-increment sequences with actual table data
    await syncSequences();

    // Seed plans if table is empty
    await ensurePlans();

    // Seed default company if none exists
    await ensureDefaultCompany();

    // Seed challenges
    await ensureChallenges();

    // Seed challenge templates
    await ensureChallengeTemplates();

    // Seed achievement definitions
    await ensureAchievementDefinitions();

    // Ensure required course content exists
    await ensureFoundationsCourse();
    await ensureWasteSortingCourse();
    await ensureEnergyEfficiencyCourse();
    await ensureWaterConservationCourse();
    await ensureSustainableProcurementCourse();
    await ensureGreenOfficePracticesCourse();
    await ensureCarbonFootprintCourse();
    await ensureBiodiversityCourse();
    await ensureEsgBasicsCourse();
    await ensureEnvironmentalComplianceCourse();
    await ensureCircularEconomyCourse();
    await seedInitialSectors();
    await ensureCatalogueSkeletons();
    await ensureFinalSustainabilityCertificationCourse();
    await ensureActionPlanningCourse();
    await ensureDepartmentalSustainabilityGoalsCourse();
    await ensureWorkplaceSustainabilityTeamCourse();
    await ensureCommunicatingSustainabilityAtWorkCourse();
    await ensureTrackingSustainabilityActionsCourse();
    await ensureSustainabilityDataCollectionCourse();
    await ensureSustainabilityPerformanceReviewCourse();
    await ensureSustainabilityRolesAccountabilityCourse();
    await ensureEmployeeSustainabilityEngagementCourse();
    await ensureEffectiveGreenTeamsCourse();
    await ensureWorkplaceSustainabilityInitiativesCourse();
    await ensureSustainabilityForHrTeamsCourse();
    await ensureSustainabilityForFinanceTeamsCourse();
    await ensureSustainabilityForProcurementAndPurchasingTeamsCourse();
    await ensureSustainabilityForOperationsAndFrontlineTeamsCourse();
    await ensureSustainabilityForFacilitiesAndPropertyTeamsCourse();
    await ensureSustainabilityForSalesAndMarketingTeamsCourse();
    await ensureClimateRiskCourse();
    await ensureSocialResponsibilityAtWorkCourse();
    await ensureEthicsGovernanceCourse();
    await ensureEsgDataCourse();
    await ensureEsgInMyJobCourse();
    await ensureAppliedCourseBadges();
    await ensureWorkplaceSustainabilityLeadershipCourse();
    await ensureCoreSustainabilityPath();
    await ensureCategoriesAndAssignments();
    await ensureHybridSubscriptions();
    await ensureInsightsMigrated();

    // Sprint 15.2.10 Cohort remediations — idempotent, ledger-guarded
    await ensureCohort15_2_10BRemediation();
    await ensureCohort15_2_10CRemediation();
    await ensureCohort15_2_10DRemediation();
    await ensureCohort15_2_10ERemediation();
    await ensureCohort15_2_10FRemediation();
    await ensureCohort15_2_10GRemediation();
    await ensureCohort15_2_10HRemediation();
    await ensureCohort15_2_10IRemediation();
    await ensureCohort15_2_10JRemediation();
    await ensureCohort15_2_10KRemediation();
    await ensureCohort15_2_10LRemediation();
    if (process.env.UNPUBLISH_STAGED_COURSES_ON_BOOT === "true") {
      await unpublishCourses36to139();
    }

    // Ensure course thumbnail images are set
    await ensureCourseImages();

    // Ensure idempotent Morieva Skills brand migration on persisted content
    await ensureMorievaBrandMigration();

    logger.info("Database initialization and course seeding completed.");
  } catch (err) {
    logger.error({ err }, "Error during background database seeding sequence");
  }

  // Start background invitation dispatch worker
  startInvitationDispatchWorker();

  server.on("error", (err) => {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  });
}

void start();
