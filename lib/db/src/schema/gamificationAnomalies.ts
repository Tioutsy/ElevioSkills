import { pgTable, text, serial, integer, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { companiesTable } from "./companies";
import { employeesTable } from "./employees";

export const gamificationAnomaliesTable = pgTable(
  "gamification_anomalies",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id").references(() => employeesTable.id, { onDelete: "cascade" }),
    anomalyType: text("anomaly_type").notNull(), // "SCORE_MISMATCH" | "SUSPICIOUS_VELOCITY" | "DUPLICATE_SCORING_ATTEMPT" | "SEASON_INTEGRITY" | "CHALLENGE_FAIRNESS" | "DIFFICULT_INTERACTION" | "COMPETITION_CONCENTRATION"
    severity: text("severity").notNull().default("REVIEW"), // "INFO" | "REVIEW" | "HIGH"
    description: text("description").notNull(),
    metadata: jsonb("metadata"),
    status: text("status").notNull().default("OPEN"), // "OPEN" | "REVIEWED" | "DISMISSED" | "RESOLVED"
    detectedAt: timestamp("detected_at", { withTimezone: true }).notNull().defaultNow(),
    reviewedBy: text("reviewed_by"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    resolutionNote: text("resolution_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    companyStatusIdx: index("idx_gamification_anomalies_company_status").on(t.companyId, t.status),
    typeStatusIdx: index("idx_gamification_anomalies_type_status").on(t.anomalyType, t.status),
    detectedAtIdx: index("idx_gamification_anomalies_detected_at").on(t.detectedAt),
  })
);

export const insertGamificationAnomalySchema = createInsertSchema(gamificationAnomaliesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertGamificationAnomaly = z.infer<typeof insertGamificationAnomalySchema>;
export type GamificationAnomaly = typeof gamificationAnomaliesTable.$inferSelect;
