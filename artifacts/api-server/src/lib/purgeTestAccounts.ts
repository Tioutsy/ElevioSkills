import { db } from "@workspace/db";
import {
  companiesTable,
  employeesTable,
  enrollmentsTable,
  lessonProgressTable,
  courseAssignmentsTable,
  certificatesTable,
} from "@workspace/db";
import { eq, or, like, inArray, sql } from "drizzle-orm";
import { logger } from "./logger";

export async function purgeTestAccountsAndTenants(): Promise<{
  deletedEmployeesCount: number;
  deletedCompaniesCount: number;
}> {
  logger.info("[Purge Test Accounts] Starting test accounts and QA tenants cleanup...");

  try {
    // 1. Direct atomic SQL execution for instant consistency across relational cascade
    await db.execute(sql`
      -- Remove lesson progress for target test employees
      DELETE FROM "lesson_progress"
      WHERE "enrollment_id" IN (
        SELECT en.id FROM "enrollments" en
        INNER JOIN "employees" emp ON en.employee_id = emp.id
        WHERE LOWER(emp.email) = 'infracare.mu@gmail.com'
           OR emp.email LIKE '%@ecolearnhub.test'
           OR emp.name = 'Infracare Administrator'
      );

      -- Remove enrollments for target test employees
      DELETE FROM "enrollments"
      WHERE "employee_id" IN (
        SELECT emp.id FROM "employees" emp
        WHERE LOWER(emp.email) = 'infracare.mu@gmail.com'
           OR emp.email LIKE '%@ecolearnhub.test'
           OR emp.name = 'Infracare Administrator'
      );

      -- Remove course assignments for target test employees
      DELETE FROM "course_assignments"
      WHERE "employee_id" IN (
        SELECT emp.id FROM "employees" emp
        WHERE LOWER(emp.email) = 'infracare.mu@gmail.com'
           OR emp.email LIKE '%@ecolearnhub.test'
           OR emp.name = 'Infracare Administrator'
      );

      -- Remove certificates for target test employees
      DELETE FROM "certificates"
      WHERE "employee_id" IN (
        SELECT emp.id FROM "employees" emp
        WHERE LOWER(emp.email) = 'infracare.mu@gmail.com'
           OR emp.email LIKE '%@ecolearnhub.test'
           OR emp.name = 'Infracare Administrator'
      ) OR "user_id" LIKE '%15211a%' OR "company_name" LIKE '%QA Test Tenant%';

      -- Delete target test employees
      DELETE FROM "employees"
      WHERE LOWER("email") = 'infracare.mu@gmail.com'
         OR "email" LIKE '%@ecolearnhub.test'
         OR "name" = 'Infracare Administrator';

      -- Also remove QA tenant companies that have no real business data
      DELETE FROM "companies"
      WHERE "name" LIKE '%QA Test Tenant%'
         OR "name" LIKE '%Sprint 15.2.11A%'
         OR "slug" LIKE '%qa-infracare%'
         OR "slug" LIKE '%test-tenant%';
    `);
  } catch (sqlErr) {
    logger.warn({ err: sqlErr }, "[Purge Test Accounts] Direct SQL execution encountered error, continuing with ORM purge...");
  }

  // 2. ORM level safety check and count
  const testCompanies = await db
    .select({ id: companiesTable.id, name: companiesTable.name })
    .from(companiesTable)
    .where(
      or(
        like(companiesTable.name, "%QA Test Tenant%"),
        like(companiesTable.name, "%Sprint 15.2.11A%"),
        like(companiesTable.slug, "%qa-infracare%"),
        like(companiesTable.slug, "%test-tenant%")
      )
    );

  const testCompanyIds = testCompanies.map((c) => c.id);

  const testEmployees = await db
    .select({ id: employeesTable.id, email: employeesTable.email, name: employeesTable.name })
    .from(employeesTable)
    .where(
      or(
        sql`LOWER(${employeesTable.email}) = 'infracare.mu@gmail.com'`,
        like(employeesTable.email, "%@ecolearnhub.test"),
        eq(employeesTable.name, "Infracare Administrator"),
        testCompanyIds.length > 0 ? inArray(employeesTable.companyId, testCompanyIds) : sql`false`
      )
    );

  const employeeIds = testEmployees.map((e) => e.id);

  if (employeeIds.length > 0) {
    const enrollments = await db
      .select({ id: enrollmentsTable.id })
      .from(enrollmentsTable)
      .where(inArray(enrollmentsTable.employeeId, employeeIds));
    const enrollmentIds = enrollments.map((e) => e.id);

    if (enrollmentIds.length > 0) {
      await db.delete(lessonProgressTable).where(inArray(lessonProgressTable.enrollmentId, enrollmentIds));
      await db.delete(enrollmentsTable).where(inArray(enrollmentsTable.id, enrollmentIds));
    }

    await db.delete(courseAssignmentsTable).where(inArray(courseAssignmentsTable.employeeId, employeeIds));
    await db.delete(certificatesTable).where(inArray(certificatesTable.employeeId, employeeIds));
    await db.delete(employeesTable).where(inArray(employeesTable.id, employeeIds));
  }

  if (testCompanyIds.length > 0) {
    await db.delete(companiesTable).where(inArray(companiesTable.id, testCompanyIds));
  }

  logger.info(
    {
      purgedEmployees: employeeIds.length,
      purgedCompanies: testCompanyIds.length,
    },
    "[Purge Test Accounts] Completed cleanup of test accounts and dummy QA tenants."
  );

  return {
    deletedEmployeesCount: employeeIds.length,
    deletedCompaniesCount: testCompanyIds.length,
  };
}
