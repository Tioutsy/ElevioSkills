import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  unique,
  uniqueIndex,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { coursesTable } from "./courses";
import { companiesTable } from "./companies";
import { employeesTable } from "./employees";

export const challengesTable = pgTable("challenges", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  code: text("code").unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  theme: text("theme").notNull().default("green"),
  focus: text("focus").notNull(),
  unit: text("unit").notNull().default("actions"),
  goalTarget: integer("goal_target").notNull().default(1),
  points: integer("points").notNull().default(0),
  badgeName: text("badge_name"),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  category: text("category").notNull().default(""),
  linkedCourseId: integer("linked_course_id").references(() => coursesTable.id, { onDelete: "set null" }),
  durationLabel: text("duration_label").notNull().default(""),
  instructions: text("instructions").notNull().default(""),
  evidencePrompt: text("evidence_prompt").notNull().default(""),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const challengeParticipantsTable = pgTable(
  "challenge_participants",
  {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id")
      .notNull()
      .references(() => challengesTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    progress: integer("progress").notNull().default(0),
    completed: boolean("completed").notNull().default(false),
    pointsEarned: integer("points_earned").notNull().default(0),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    status: text("status").notNull().default("in_progress"),
    evidenceText: text("evidence_text"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewedBy: text("reviewed_by"),
    reviewNote: text("review_note"),
    pointsAwarded: integer("points_awarded").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (t) => ({
    uniqParticipantCompany: unique().on(t.challengeId, t.userId, t.companyId),
  }),
);

export const insertChallengeSchema = createInsertSchema(challengesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challengesTable.$inferSelect;
export type ChallengeParticipant =
  typeof challengeParticipantsTable.$inferSelect;

// =========================================================================
// Sprint 14.3 — Company Challenges & Competitive Missions Schema Models
// =========================================================================

/**
 * Approved ELEVIO Challenge Templates Catalogue
 */
export const challengeTemplatesTable = pgTable(
  "challenge_templates",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull().unique(),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    description: text("description").notNull().default(""),
    category: text("category").notNull().default("Sustainability"),
    icon: text("icon").notNull().default("target"),
    theme: text("theme").notNull().default("green"),
    rewardPoints: integer("reward_points").notNull().default(100),
    defaultDurationDays: integer("default_duration_days").notNull().default(30),
    requiredCourseSlug: text("required_course_slug"),
    criteriaConfig: jsonb("criteria_config"),
    orderIndex: integer("order_index").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    templateCodeIdx: index("challenge_templates_code_idx").on(t.code),
  })
);

export type ChallengeTemplate = typeof challengeTemplatesTable.$inferSelect;

/**
 * Company-Specific Challenge Instances
 */
export const companyChallengesTable = pgTable(
  "company_challenges",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    templateId: integer("template_id")
      .references(() => challengeTemplatesTable.id, { onDelete: "set null" }),
    code: text("code").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    category: text("category").notNull().default("Sustainability"),
    icon: text("icon").notNull().default("target"),
    theme: text("theme").notNull().default("green"),
    rewardPoints: integer("reward_points").notNull().default(100),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    status: text("status").notNull().default("ACTIVE"), // 'UPCOMING' | 'ACTIVE' | 'CLOSED' | 'CANCELLED'
    createdBy: text("created_by").notNull(),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    closedAt: timestamp("closed_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    cancelledBy: text("cancelled_by"),
    cancellationReason: text("cancellation_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    companyChallengeCompanyStatusIdx: index("company_challenges_comp_status_idx").on(t.companyId, t.status),
    companyChallengeDatesIdx: index("company_challenges_dates_idx").on(t.startDate, t.endDate),
  })
);

export type CompanyChallenge = typeof companyChallengesTable.$inferSelect;

/**
 * Structured Criteria for Company Challenges
 */
export const companyChallengeCriteriaTable = pgTable(
  "company_challenge_criteria",
  {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id")
      .notNull()
      .references(() => companyChallengesTable.id, { onDelete: "cascade" }),
    criterionType: text("criterion_type").notNull(), // 'COURSE_COMPLETION' | 'QUIZ_PASS' | 'WORKPLACE_ACTION_COMPLETION' | 'INTERACTION_COMPLETION' | 'CHALLENGE_ASSESSMENT_PASS'
    interactionId: text("interaction_id"),
    courseId: integer("course_id")
      .references(() => coursesTable.id, { onDelete: "set null" }),
    courseSlug: text("course_slug"),
    courseTitle: text("course_title"),
    assessmentThreshold: integer("assessment_threshold"), // e.g. 90 for >=90%, 70 for pass, or 4 for 4/5
    allowPriorCompletion: boolean("allow_prior_completion").notNull().default(false),
    requiredCount: integer("required_count").notNull().default(1),
    orderIndex: integer("order_index").notNull().default(0),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    challengeCriteriaIdx: index("company_challenge_criteria_chal_idx").on(t.challengeId, t.orderIndex),
  })
);

export type CompanyChallengeCriterion = typeof companyChallengeCriteriaTable.$inferSelect;

/**
 * Employee Challenge Progress & Completion State
 */
export const employeeChallengeProgressTable = pgTable(
  "employee_challenge_progress",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    challengeId: integer("challenge_id")
      .notNull()
      .references(() => companyChallengesTable.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employeesTable.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("IN_PROGRESS"), // 'IN_PROGRESS' | 'COMPLETED'
    completedCriteriaCount: integer("completed_criteria_count").notNull().default(0),
    totalCriteriaCount: integer("total_criteria_count").notNull().default(1),
    progressPct: integer("progress_pct").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    pointsAwarded: integer("points_awarded").notNull().default(0),
    ledgerTransactionId: integer("ledger_transaction_id"),
    lastEvaluatedAt: timestamp("last_evaluated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    uniqEmployeeChallenge: uniqueIndex("employee_challenge_progress_uniq").on(t.challengeId, t.employeeId),
    empChallengeCompanyIdx: index("employee_challenge_comp_emp_idx").on(t.companyId, t.employeeId),
  })
);

export type EmployeeChallengeProgress = typeof employeeChallengeProgressTable.$inferSelect;
