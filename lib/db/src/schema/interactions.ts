import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  uniqueIndex,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { companiesTable } from "./companies";
import { employeesTable } from "./employees";
import { coursesTable, lessonsTable } from "./courses";

/**
 * Course Interaction Progress & Attempts Table
 * Stores learner interactions, choices, scores, and completion status.
 */
export const courseInteractionProgressTable = pgTable(
  "course_interaction_progress",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employeesTable.id, { onDelete: "cascade" }),
    userId: text("user_id"),
    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.id, { onDelete: "cascade" }),
    lessonId: integer("lesson_id").references(() => lessonsTable.id, { onDelete: "cascade" }),
    interactionId: text("interaction_id").notNull(),
    interactionType: text("interaction_type").notNull(), // 'DECISION_SCENARIO' | 'SORTING' | 'MATCHING' | 'SEQUENCING' | 'PRIORITISATION' | 'MULTI_STEP_SCENARIO' | 'CHALLENGE_ASSESSMENT'
    status: text("status").notNull().default("IN_PROGRESS"), // 'IN_PROGRESS' | 'COMPLETED' | 'PASSED' | 'FAILED'
    score: integer("score"), // e.g. 4 (for 4 of 5) or 80 (for 80%)
    maxScore: integer("max_score"),
    passed: boolean("passed").notNull().default(true),
    attemptCount: integer("attempt_count").notNull().default(1),
    statePayload: jsonb("state_payload"), // Stores saved selections / matches for reload state recovery
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    uniqEmployeeCourseInteraction: uniqueIndex("course_interaction_progress_emp_course_idx").on(
      t.employeeId,
      t.courseId,
      t.interactionId
    ),
    interactionCompanyCourseIdx: index("course_interaction_comp_course_idx").on(
      t.companyId,
      t.courseId
    ),
    interactionTypeStatusIdx: index("course_interaction_type_status_idx").on(
      t.interactionType,
      t.status
    ),
  })
);

export const insertCourseInteractionProgressSchema = createInsertSchema(
  courseInteractionProgressTable
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCourseInteractionProgress = z.infer<
  typeof insertCourseInteractionProgressSchema
>;
export type CourseInteractionProgress = typeof courseInteractionProgressTable.$inferSelect;
