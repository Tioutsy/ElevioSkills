import { pgTable, serial, integer, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { companiesTable } from "./companies";
import { employeesTable } from "./employees";
import { departmentsTable } from "./departments";

/**
 * Employee Department Membership History Table
 * Records historical department assignments with effective date ranges
 * to guarantee accurate event-timestamp attribution for department team competitions.
 */
export const employeeDepartmentHistoryTable = pgTable(
  "employee_department_history",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companiesTable.id, { onDelete: "cascade" }),
    employeeId: integer("employee_id")
      .notNull()
      .references(() => employeesTable.id, { onDelete: "cascade" }),
    departmentId: integer("department_id")
      .notNull()
      .references(() => departmentsTable.id, { onDelete: "cascade" }),
    effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull(),
    effectiveTo: timestamp("effective_to", { withTimezone: true }), // NULL indicates current active assignment
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_emp_dept_history_company_dept").on(t.companyId, t.departmentId),
    index("idx_emp_dept_history_emp_dates").on(t.employeeId, t.effectiveFrom, t.effectiveTo),
  ]
);

export const insertEmployeeDepartmentHistorySchema = createInsertSchema(employeeDepartmentHistoryTable).omit({
  id: true,
  createdAt: true,
});
export type InsertEmployeeDepartmentHistory = z.infer<typeof insertEmployeeDepartmentHistorySchema>;
export type EmployeeDepartmentHistory = typeof employeeDepartmentHistoryTable.$inferSelect;
