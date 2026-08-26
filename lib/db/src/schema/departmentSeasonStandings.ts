import { pgTable, serial, integer, text, timestamp, numeric, boolean, uniqueIndex, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { companiesTable } from "./companies";
import { departmentsTable } from "./departments";
import { companySeasonsTable } from "./companySeasons";

/**
 * Department Season Standings & Snapshots Table
 * Stores normalized team performance scores, ranks, and metadata
 * for both active tracking and immutable closed season history.
 */
export const departmentSeasonStandingsTable = pgTable(
  "department_season_standings",
  {
    id: serial("id").primaryKey(),
    seasonId: integer("season_id")
      .notNull()
      .references(() => companySeasonsTable.id, { onDelete: "cascade" }),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    departmentId: integer("department_id")
      .notNull()
      .references(() => departmentsTable.id, { onDelete: "cascade" }),
    departmentNameSnapshot: text("department_name_snapshot").notNull(),
    rank: integer("rank").notNull(),
    teamScore: integer("team_score").notNull(), // 0–1000
    performanceScore: numeric("performance_score", { precision: 6, scale: 2 }).notNull(), // 0–700
    participationScore: numeric("participation_score", { precision: 6, scale: 2 }).notNull(), // 0–300
    participationRate: numeric("participation_rate", { precision: 5, scale: 2 }).notNull(), // e.g. 91.50%
    averageSeasonalScore: numeric("average_seasonal_score", { precision: 8, scale: 2 }).notNull(),
    eligibleEmployeesCount: integer("eligible_employees_count").notNull(),
    activeParticipantsCount: integer("active_participants_count").notNull(),
    isEligible: boolean("is_eligible").notNull().default(true),
    eligibilityStatus: text("eligibility_status").notNull().default("RANKED"), // 'RANKED' | 'NOT_ENOUGH_PARTICIPANTS' | 'BELOW_MIN_PARTICIPATION'
    formulaVersion: text("formula_version").notNull().default("TEAM_SCORE_V1"),
    snapshotDate: text("snapshot_date").notNull(), // 'YYYY-MM-DD'
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex("uniq_dept_season_standing").on(t.seasonId, t.departmentId),
    index("idx_dept_season_standings_company_season").on(t.companyId, t.seasonId),
    index("idx_dept_season_standings_rank").on(t.companyId, t.seasonId, t.rank),
  ]
);

export const insertDepartmentSeasonStandingSchema = createInsertSchema(departmentSeasonStandingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertDepartmentSeasonStanding = z.infer<typeof insertDepartmentSeasonStandingSchema>;
export type DepartmentSeasonStanding = typeof departmentSeasonStandingsTable.$inferSelect;
