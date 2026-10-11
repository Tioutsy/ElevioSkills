import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  companyName: text("company_name").notNull(),
  phone: text("phone"),
  industry: text("industry"),
  employeeRange: text("employee_range"),
  interest: text("interest").notNull().default("trial"),
  message: text("message"),
  planId: integer("plan_id"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertLeadSchema = z.object({
  name: z.string(),
  email: z.string(),
  companyName: z.string(),
  phone: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  employeeRange: z.string().optional().nullable(),
  interest: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  planId: z.number().optional().nullable(),
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
