import { pgTable, serial, integer, text, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { companiesTable } from "./companies";
import { employeesTable } from "./employees";

export const companySeasonsTable = pgTable(
  "company_seasons",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    seasonType: text("season_type").notNull().default("MONTHLY"),
    title: text("title").notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    status: text("status").notNull().default("ACTIVE"), // 'UPCOMING' | 'ACTIVE' | 'CLOSED'
    closedAt: timestamp("closed_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index("company_seasons_company_status_idx").on(table.companyId, table.status),
    index("company_seasons_company_dates_idx").on(table.companyId, table.startDate, table.endDate),
    uniqueIndex("company_seasons_unique_title_idx").on(table.companyId, table.seasonType, table.title),
  ]
);

export const companySeasonSnapshotsTable = pgTable(
  "company_season_snapshots",
  {
    id: serial("id").primaryKey(),
    seasonId: integer("season_id")
      .notNull()
      .references(() => companySeasonsTable.id, { onDelete: "cascade" }),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employeesTable.id, { onDelete: "cascade" }),
    rank: integer("rank").notNull(),
    score: integer("score").notNull(),
    snapshotDate: text("snapshot_date").notNull(), // 'YYYY-MM-DD'
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("season_snapshots_lookup_idx").on(table.companyId, table.seasonId, table.employeeId),
    index("season_snapshots_date_idx").on(table.companyId, table.snapshotDate),
  ]
);

export const insertCompanySeasonSchema = createInsertSchema(companySeasonsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertCompanySeason = z.infer<typeof insertCompanySeasonSchema>;
export type CompanySeason = typeof companySeasonsTable.$inferSelect;

export const insertCompanySeasonSnapshotSchema = createInsertSchema(companySeasonSnapshotsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertCompanySeasonSnapshot = z.infer<typeof insertCompanySeasonSnapshotSchema>;
export type CompanySeasonSnapshot = typeof companySeasonSnapshotsTable.$inferSelect;
