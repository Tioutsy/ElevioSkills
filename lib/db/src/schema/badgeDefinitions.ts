import { pgTable, text, serial, integer, timestamp, uniqueIndex, index, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { employeesTable } from "./employees";
import { companiesTable } from "./companies";

export const badgeDefinitionsTable = pgTable("badge_definitions", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("award"),
  category: text("category").notNull().default("Learning"), // Learning, Knowledge, Action, Consistency, Competition
  criteriaType: text("criteria_type").notNull(),
  threshold: integer("threshold").notNull().default(0),
  courseIds: integer("course_ids").array().notNull().default([]),
  orderIndex: integer("order_index").notNull().default(0),
  code: text("code").unique(),
  isSeasonal: boolean("is_seasonal").notNull().default(false),
  tier: text("tier"),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertBadgeDefinitionSchema = createInsertSchema(badgeDefinitionsTable).omit({ id: true });
export type InsertBadgeDefinition = z.infer<typeof insertBadgeDefinitionSchema>;
export type BadgeDefinition = typeof badgeDefinitionsTable.$inferSelect;

export const employeeBadgesTable = pgTable("employee_badges", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull().references(() => employeesTable.id, { onDelete: "cascade" }),
  companyId: integer("company_id").notNull().references(() => companiesTable.id, { onDelete: "cascade" }),
  badgeId: integer("badge_id").notNull().references(() => badgeDefinitionsTable.id, { onDelete: "cascade" }),
  seasonId: integer("season_id"),
  earnedAt: timestamp("earned_at", { withTimezone: true }).notNull().defaultNow(),
  awardSource: text("award_source").notNull(),
  metadata: text("metadata"), // JSON string or descriptor (e.g. {"place": 1, "seasonTitle": "August 2026"})
}, (t) => [
  uniqueIndex("uniq_employee_badge_non_seasonal")
    .on(t.employeeId, t.badgeId)
    .where(sql`"season_id" IS NULL`),
  uniqueIndex("uniq_employee_badge_seasonal")
    .on(t.employeeId, t.badgeId, t.seasonId)
    .where(sql`"season_id" IS NOT NULL`),
  index("idx_employee_badges_employee_badge").on(t.employeeId, t.badgeId),
  index("idx_employee_badges_company_earned").on(t.companyId, t.earnedAt),
  index("idx_employee_badges_season").on(t.seasonId),
]);

export const insertEmployeeBadgeSchema = createInsertSchema(employeeBadgesTable).omit({ id: true, earnedAt: true });
export type InsertEmployeeBadge = z.infer<typeof insertEmployeeBadgeSchema>;
export type EmployeeBadge = typeof employeeBadgesTable.$inferSelect;

