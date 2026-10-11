import { db, employeesTable, companiesTable, enrollmentsTable, courseAssignmentsTable, coursesTable, quizAttemptsTable } from "@workspace/db";
import { eq, and, or } from "drizzle-orm";
import { CompanyAccess } from "../access";
import { GeminiSkillsGapProvider, SkillsGapInput, EmployeeSkillsProfile } from "./skillsGapProvider";
import { mapCourseToTopics } from "./skillsTaxonomy";

export async function generateEmployeeSkillsProfile(
  employeeId: number,
  access: CompanyAccess
): Promise<EmployeeSkillsProfile> {
  // 1. Fetch Employee Record & Check Access
  const [emp] = await db
    .select()
    .from(employeesTable)
    .where(eq(employeesTable.id, employeeId));

  if (!emp) {
    throw new Error("Employee record not found.");
  }

  // Cross-tenant isolation check
  if (access.role !== "platform_admin" && emp.companyId !== access.companyId) {
    throw new Error("Access denied: Employee belongs to a different organisation.");
  }

  // 2. Fetch Company Context
  const companyId = emp.companyId || access.companyId;
  const [company] = await db
    .select()
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId));

  // 3. Fetch Completed & Assigned Courses
  const enrollments = await db
    .select({
      courseId: enrollmentsTable.courseId,
      status: enrollmentsTable.status,
      completedAt: enrollmentsTable.completedAt,
    })
    .from(enrollmentsTable)
    .where(
      and(
        eq(enrollmentsTable.employeeId, employeeId),
        eq(enrollmentsTable.status, "completed")
      )
    );

  const assignments = await db
    .select({
      courseId: courseAssignmentsTable.courseId,
      dueDate: courseAssignmentsTable.dueDate,
    })
    .from(courseAssignmentsTable)
    .where(eq(courseAssignmentsTable.employeeId, employeeId));

  // 4. Fetch Course Catalog & Details
  const allCourses = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.isPublished, true));

  const courseMap = new Map<number, any>(allCourses.map((c: any) => [c.id, c]));

  const completedCourses = enrollments.map((e) => {
    const c = courseMap.get(e.courseId);
    return {
      courseId: e.courseId,
      courseCode: c?.courseCode || `ELH-${String(e.courseId).padStart(2, "0")}`,
      title: c?.title || `Course #${e.courseId}`,
      completedAt: e.completedAt ? new Date(e.completedAt).toISOString() : undefined,
    };
  });

  const assignedCourses = assignments.map((a) => {
    const c = courseMap.get(a.courseId);
    return {
      courseId: a.courseId,
      courseCode: c?.courseCode || `ELH-${String(a.courseId).padStart(2, "0")}`,
      title: c?.title || `Course #${a.courseId}`,
      dueDate: a.dueDate ? new Date(a.dueDate).toISOString() : undefined,
      status: "assigned" as const,
    };
  });

  // 5. Fetch Quiz Performance
  const quizClauses = [];
  if (emp.clerkUserId) quizClauses.push(eq(quizAttemptsTable.userId, emp.clerkUserId));
  if (emp.email) quizClauses.push(eq(quizAttemptsTable.userId, emp.email));

  const quizPerformance: Array<{
    courseId: number;
    courseTitle: string;
    score: number;
    passed: boolean;
  }> = [];

  if (quizClauses.length > 0) {
    const attempts = await db
      .select({
        courseId: quizAttemptsTable.courseId,
        score: quizAttemptsTable.score,
        passed: quizAttemptsTable.passed,
      })
      .from(quizAttemptsTable)
      .where(or(...quizClauses));

    for (const att of attempts) {
      const c = courseMap.get(att.courseId);
      quizPerformance.push({
        courseId: att.courseId,
        courseTitle: c?.title || `Course #${att.courseId}`,
        score: att.score ?? 0,
        passed: att.passed ?? false,
      });
    }
  }

  // 6. Build Catalog Format
  const catalog = allCourses.map((c: any) => ({
    id: c.id,
    courseCode: c.courseCode || `ELH-${String(c.id).padStart(2, "0")}`,
    title: c.title,
    description: c.description || "",
    level: c.level || "Beginner",
    topics: mapCourseToTopics(c).map((t) => t.id),
  }));

  const seniorityLevel =
    emp.role === "admin"
      ? "Senior Executive"
      : emp.role === "manager"
      ? "Managerial"
      : "Staff";

  const input: SkillsGapInput = {
    company: {
      sector: company?.industry || "General Industry",
      trainingPriorities: company?.trainingPriorities || [],
    },
    employee: {
      employeeId: emp.id,
      companyId: emp.companyId || access.companyId,
      name: emp.name,
      email: emp.email,
      department: emp.department || "General Operations",
      roleCategory: emp.role || "employee",
      jobTitle: emp.jobTitle || "Employee",
      seniority: seniorityLevel,
    },
    learningEvidence: {
      completedCourses,
      assignedCourses,
      quizPerformance,
    },
    catalog,
  };

  const provider = new GeminiSkillsGapProvider();
  return provider.analyzeSkillsGap(input);
}
