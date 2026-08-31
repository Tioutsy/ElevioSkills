import { pgTable, text, serial, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { coursesTable } from "./courses";

/**
 * Tenant-scoped Strategic Focus Areas.
 * Allows Company Admins to select up to 2 strategic focus competencies (e.g. Water, Carbon),
 * which boosts course relevance scoring for their employees.
 */
export const companyStrategicPrioritiesTable = pgTable("company_strategic_priorities", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companiesTable.id, { onDelete: "cascade" }),
  priorityCompetency: text("priority_competency").notNull(), // e.g. COMP_WATER, COMP_ENERGY
  boostWeight: integer("boost_weight").notNull().default(20),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  companyPriorityUnique: unique("company_priority_unique").on(t.companyId, t.priorityCompetency),
}));

/**
 * Tenant-scoped Mandatory Course Assignments.
 * Allows Company Admins to mandate specific courses across their organization
 * or target specific departments / seniority levels.
 */
export const companyMandatoryCoursesTable = pgTable("company_mandatory_courses", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companiesTable.id, { onDelete: "cascade" }),
  courseId: integer("course_id").notNull().references(() => coursesTable.id, { onDelete: "cascade" }),
  targetDepartment: text("target_department"), // null = all departments
  targetSeniority: text("target_seniority"),   // null = all seniority levels
  deadlineDays: integer("deadline_days").default(30),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  companyCourseMandatoryUnique: unique("company_course_mandatory_unique").on(t.companyId, t.courseId, t.targetDepartment, t.targetSeniority),
}));
