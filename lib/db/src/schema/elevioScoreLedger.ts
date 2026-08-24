import { pgTable, text, serial, integer, boolean, timestamp, jsonb, uniqueIndex, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const elevioScoreLedgerTable = pgTable(
  "elevio_score_ledger",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").notNull(),
    employeeId: integer("employee_id").notNull(),
    clerkUserId: text("clerk_user_id"),
    eventType: text("event_type").notNull(), // "COURSE_COMPLETED" | "QUIZ_PASSED" | "QUIZ_SCORE_BONUS" | "FIRST_ATTEMPT_PASS" | "WORKPLACE_ACTION_COMPLETED"
    sourceEntityType: text("source_entity_type").notNull(), // "course_completion" | "quiz_attempt" | "learner_commitment"
    sourceEntityId: text("source_entity_id").notNull(),
    courseId: integer("course_id"),
    points: integer("points").notNull(),
    scoringRuleVersion: text("scoring_rule_version").notNull().default("v1"),
    idempotencyKey: text("idempotency_key").notNull(),
    metadata: jsonb("metadata"),
    isReversed: boolean("is_reversed").notNull().default(false),
    reversedAt: timestamp("reversed_at", { withTimezone: true }),
    reversalReason: text("reversal_reason"),
    reversalReferenceId: integer("reversal_reference_id"),
    eventTimestamp: timestamp("event_timestamp", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    uniqueIdempotencyKey: uniqueIndex("elevio_score_ledger_idempotency_key_uniq").on(t.idempotencyKey),
    companyEmployeeIdx: index("elevio_score_ledger_company_emp_idx").on(t.companyId, t.employeeId),
    eventTypeIdx: index("elevio_score_ledger_event_type_idx").on(t.eventType),
  })
);

export const insertElevioScoreLedgerSchema = createInsertSchema(elevioScoreLedgerTable).omit({
  id: true,
  createdAt: true,
});
export type InsertElevioScoreLedger = z.infer<typeof insertElevioScoreLedgerSchema>;
export type ElevioScoreLedger = typeof elevioScoreLedgerTable.$inferSelect;
