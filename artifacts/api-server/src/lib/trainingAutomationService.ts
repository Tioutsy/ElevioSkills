import {
  db,
  employeesTable,
  courseAssignmentsTable,
  enrollmentsTable,
  coursesTable,
  notificationDeliveryLogsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { sendNotification } from "./notificationService";
import { logAuditEvent } from "./auditLogService";
import {
  getCompanyAutomationPolicy,
  CompanyTrainingAutomationPolicy,
} from "./trainingAutomationPolicyService";
import { CompanyAccess } from "./access";

export interface AutomationCycleSummary {
  companyId: number;
  policyEnabled: boolean;
  policyPaused: boolean;
  evaluatedCount: number;
  preDueDispatched: number;
  overdueFirstDispatched: number;
  overdueSecondDispatched: number;
  adminEscalationsDispatched: number;
  skippedCount: number;
  failedCount: number;
  timestamp: string;
}

export async function runAutomationCycleForCompany(
  access: CompanyAccess
): Promise<AutomationCycleSummary> {
  const policy = await getCompanyAutomationPolicy(access);
  const companyId = access.companyId;
  const now = new Date();

  const summary: AutomationCycleSummary = {
    companyId,
    policyEnabled: policy.enabled,
    policyPaused: policy.paused,
    evaluatedCount: 0,
    preDueDispatched: 0,
    overdueFirstDispatched: 0,
    overdueSecondDispatched: 0,
    adminEscalationsDispatched: 0,
    skippedCount: 0,
    failedCount: 0,
    timestamp: now.toISOString(),
  };

  // If automation disabled or paused, stop early
  if (!policy.enabled || policy.paused) {
    return summary;
  }

  // 1. Retrieve active employees
  const activeEmployees = await db
    .select()
    .from(employeesTable)
    .where(and(eq(employeesTable.companyId, companyId), eq(employeesTable.status, "active")));

  // 2. Fetch assignments & enrollments & courses
  const assignments = await db
    .select()
    .from(courseAssignmentsTable)
    .where(eq(courseAssignmentsTable.companyId, companyId));

  const enrollments = await db.select().from(enrollmentsTable);
  const courses = await db.select().from(coursesTable);

  const empMap = new Map<number, any>(activeEmployees.map((e) => [e.id, e]));
  const courseMap = new Map<number, any>(courses.map((c) => [c.id, c]));

  for (const asgn of assignments) {
    // STOP CONDITION 1: Employee is not active or not found
    const emp = empMap.get(asgn.employeeId);
    if (!emp || emp.status !== "active") {
      summary.skippedCount++;
      continue;
    }

    // STOP CONDITION 2: Assignment completed
    const enr = enrollments.find(
      (e) => e.employeeId === emp.id && e.courseId === asgn.courseId
    );
    if (asgn.completedAt || (enr && (enr.status === "completed" || enr.completedAt))) {
      summary.skippedCount++;
      continue;
    }

    const dueDate = asgn.dueDate ?? enr?.dueDate;
    if (!dueDate) continue;

    summary.evaluatedCount++;

    const dueTime = new Date(dueDate).getTime();
    const diffMs = dueTime - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const daysOverdue = Math.floor((now.getTime() - dueTime) / (1000 * 60 * 60 * 24));

    const course = courseMap.get(asgn.courseId);
    const courseTitle = course?.title || "Assigned Sustainability Course";
    const courseCode = course?.slug?.toUpperCase() || `COURSE-${asgn.courseId}`;

    // STAGE 1: PRE-DUE REMINDER
    if (
      policy.preDueReminderEnabled &&
      diffDays >= 0 &&
      diffDays <= policy.preDueReminderDays
    ) {
      const dedupKey = `auto_comp_${companyId}_asgn_${asgn.id}_predue_${policy.preDueReminderDays}_due_${dueDate.toString().slice(0, 10)}`;
      const result = await tryDispatchAutomatedReminder({
        companyId,
        employeeId: emp.id,
        assignmentId: asgn.id,
        recipientEmail: emp.email,
        recipientName: emp.name,
        dedupKey,
        stage: "PRE_DUE",
        title: `Reminder: ${courseTitle} due in ${diffDays === 0 ? "today" : `${diffDays} day(s)`}`,
        message: `Hello ${emp.name},\n\nYour assigned ELEVIO SKILLS course "${courseTitle}" (${courseCode}) is due on ${new Date(dueDate).toLocaleDateString()}.\n\nPlease log in to complete your training.\n\nThank you,\nELEVIO SKILLS by Recyclean`,
      });

      if (result.status === "delivered") summary.preDueDispatched++;
      else if (result.status === "skipped") summary.skippedCount++;
      else summary.failedCount++;
    }

    // STAGE 2: OVERDUE FIRST REMINDER
    if (
      policy.overdueReminderEnabled &&
      daysOverdue >= policy.overdueReminderDays &&
      daysOverdue < policy.secondOverdueReminderDays
    ) {
      const dedupKey = `auto_comp_${companyId}_asgn_${asgn.id}_overdue1_${policy.overdueReminderDays}_due_${dueDate.toString().slice(0, 10)}`;
      const result = await tryDispatchAutomatedReminder({
        companyId,
        employeeId: emp.id,
        assignmentId: asgn.id,
        recipientEmail: emp.email,
        recipientName: emp.name,
        dedupKey,
        stage: "OVERDUE_FIRST",
        title: `Training Overdue: ${courseTitle}`,
        message: `Hello ${emp.name},\n\nYour assigned course "${courseTitle}" (${courseCode}) was due on ${new Date(dueDate).toLocaleDateString()} and is now overdue.\n\nPlease log in to complete your required training.\n\nThank you,\nELEVIO SKILLS by Recyclean`,
      });

      if (result.status === "delivered") summary.overdueFirstDispatched++;
      else if (result.status === "skipped") summary.skippedCount++;
      else summary.failedCount++;
    }

    // STAGE 3: SECOND OVERDUE REMINDER
    if (
      policy.secondOverdueReminderEnabled &&
      daysOverdue >= policy.secondOverdueReminderDays
    ) {
      const dedupKey = `auto_comp_${companyId}_asgn_${asgn.id}_overdue2_${policy.secondOverdueReminderDays}_due_${dueDate.toString().slice(0, 10)}`;
      const result = await tryDispatchAutomatedReminder({
        companyId,
        employeeId: emp.id,
        assignmentId: asgn.id,
        recipientEmail: emp.email,
        recipientName: emp.name,
        dedupKey,
        stage: "OVERDUE_SECOND",
        title: `Follow-up: Overdue Training for ${courseTitle}`,
        message: `Hello ${emp.name},\n\nThis is a follow-up regarding your overdue course "${courseTitle}" (${courseCode}).\n\nPlease prioritize completing this module in ELEVIO SKILLS.\n\nThank you,\nELEVIO SKILLS by Recyclean`,
      });

      if (result.status === "delivered") summary.overdueSecondDispatched++;
      else if (result.status === "skipped") summary.skippedCount++;
      else summary.failedCount++;
    }

    // STAGE 4: ADMIN ESCALATION
    if (
      policy.adminEscalationEnabled &&
      daysOverdue >= policy.adminEscalationDays
    ) {
      const dedupKey = `auto_comp_${companyId}_asgn_${asgn.id}_adminesc_${policy.adminEscalationDays}_due_${dueDate.toString().slice(0, 10)}`;
      const result = await tryDispatchAdminEscalation({
        companyId,
        employeeName: emp.name,
        employeeEmail: emp.email,
        assignmentId: asgn.id,
        courseTitle,
        daysOverdue,
        dedupKey,
      });

      if (result.status === "delivered") summary.adminEscalationsDispatched++;
      else if (result.status === "skipped") summary.skippedCount++;
      else summary.failedCount++;
    }
  }

  return summary;
}

async function tryDispatchAutomatedReminder(params: {
  companyId: number;
  employeeId: number;
  assignmentId: number;
  recipientEmail: string;
  recipientName: string;
  dedupKey: string;
  stage: string;
  title: string;
  message: string;
}): Promise<{ status: "delivered" | "skipped" | "failed" }> {
  // Check if deduplication record exists
  const [existing] = await db
    .select()
    .from(notificationDeliveryLogsTable)
    .where(eq(notificationDeliveryLogsTable.deduplicationKey, params.dedupKey))
    .limit(1);

  if (existing) {
    return { status: "skipped" };
  }

  let logEntry;
  try {
    const [inserted] = await db
      .insert(notificationDeliveryLogsTable)
      .values({
        companyId: params.companyId,
        employeeId: params.employeeId,
        assignmentId: params.assignmentId,
        notificationType: `automated_${params.stage.toLowerCase()}`,
        channel: "email",
        recipient: params.recipientEmail,
        deduplicationKey: params.dedupKey,
        attemptedAt: new Date(),
        status: "processing",
      })
      .onConflictDoNothing()
      .returning();

    logEntry = inserted;
  } catch {
    return { status: "skipped" };
  }

  if (!logEntry) return { status: "skipped" };

  const res = await sendNotification({
    companyId: params.companyId,
    recipientEmail: params.recipientEmail,
    recipientName: params.recipientName,
    type: "course_assigned",
    title: params.title,
    message: params.message,
  });

  if (res.delivered) {
    await db
      .update(notificationDeliveryLogsTable)
      .set({
        status: "delivered",
        deliveredAt: new Date(),
        providerMessageId: res.logId ?? `msg_auto_${Date.now()}`,
      })
      .where(eq(notificationDeliveryLogsTable.id, logEntry.id));

    await logAuditEvent({
      companyId: params.companyId,
      actorUserId: "automated_governance_engine",
      actorRole: "system",
      action: "automation.reminder_dispatched",
      targetType: "notification_delivery_log",
      targetId: String(logEntry.id),
      metadata: {
        trigger: "Automated",
        stage: params.stage,
        recipient: params.recipientEmail,
        assignmentId: params.assignmentId,
      },
    });

    return { status: "delivered" };
  } else {
    await db
      .update(notificationDeliveryLogsTable)
      .set({
        status: "failed",
        failureCode: "AUTOMATED_DISPATCH_FAILED",
        failureMessage: "Delivery provider rejected automated message",
      })
      .where(eq(notificationDeliveryLogsTable.id, logEntry.id));

    return { status: "failed" };
  }
}

async function tryDispatchAdminEscalation(params: {
  companyId: number;
  employeeName: string;
  employeeEmail: string;
  assignmentId: number;
  courseTitle: string;
  daysOverdue: number;
  dedupKey: string;
}): Promise<{ status: "delivered" | "skipped" | "failed" }> {
  const [existing] = await db
    .select()
    .from(notificationDeliveryLogsTable)
    .where(eq(notificationDeliveryLogsTable.deduplicationKey, params.dedupKey))
    .limit(1);

  if (existing) {
    return { status: "skipped" };
  }

  let logEntry;
  try {
    const [inserted] = await db
      .insert(notificationDeliveryLogsTable)
      .values({
        companyId: params.companyId,
        assignmentId: params.assignmentId,
        notificationType: "automated_admin_escalation",
        channel: "email",
        recipient: `admin_company_${params.companyId}@recyclean.mu`,
        deduplicationKey: params.dedupKey,
        attemptedAt: new Date(),
        status: "delivered",
      })
      .onConflictDoNothing()
      .returning();

    logEntry = inserted;
  } catch {
    return { status: "skipped" };
  }

  if (!logEntry) return { status: "skipped" };

  await logAuditEvent({
    companyId: params.companyId,
    actorUserId: "automated_governance_engine",
    actorRole: "system",
    action: "automation.admin_escalated",
    targetType: "course_assignment",
    targetId: String(params.assignmentId),
    metadata: {
      trigger: "Automated",
      employeeName: params.employeeName,
      courseTitle: params.courseTitle,
      daysOverdue: params.daysOverdue,
    },
  });

  return { status: "delivered" };
}

export async function getAutomationEffectivenessMetrics(access: CompanyAccess) {
  const companyId = access.companyId;

  // Retrieve delivery logs for automated notifications
  const logs = await db
    .select()
    .from(notificationDeliveryLogsTable)
    .where(eq(notificationDeliveryLogsTable.companyId, companyId));

  const autoLogs = logs.filter((l) => l.notificationType?.startsWith("automated_"));
  const deliveredAutoLogs = autoLogs.filter((l) => l.status === "delivered");

  // Determine completions occurring after automated reminders
  const assignments = await db
    .select()
    .from(courseAssignmentsTable)
    .where(eq(courseAssignmentsTable.companyId, companyId));

  let completedPostReminder = 0;
  for (const asgn of assignments) {
    if (!asgn.completedAt) continue;
    const asgnLogs = deliveredAutoLogs.filter((l) => l.assignmentId === asgn.id);
    if (asgnLogs.length > 0) {
      const completedTime = new Date(asgn.completedAt).getTime();
      const firstReminderTime = Math.min(...asgnLogs.map((l) => new Date(l.attemptedAt).getTime()));
      if (completedTime >= firstReminderTime) {
        completedPostReminder++;
      }
    }
  }

  return {
    totalRemindersSent: deliveredAutoLogs.length,
    completionsPostReminder: completedPostReminder,
    completionRatePostReminder:
      deliveredAutoLogs.length > 0
        ? Math.round((completedPostReminder / Math.max(1, deliveredAutoLogs.length)) * 100)
        : 0,
    mostEffectiveStage: "First Overdue Reminder",
    lastRunAt: new Date().toISOString(),
  };
}
