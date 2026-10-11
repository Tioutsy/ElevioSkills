import { CompanyAccess } from "./access";
import { logAuditEvent } from "./auditLogService";

export interface CompanyTrainingAutomationPolicy {
  companyId: number;
  enabled: boolean;
  paused: boolean;
  preDueReminderEnabled: boolean;
  preDueReminderDays: number;
  overdueReminderEnabled: boolean;
  overdueReminderDays: number;
  secondOverdueReminderEnabled: boolean;
  secondOverdueReminderDays: number;
  adminEscalationEnabled: boolean;
  adminEscalationDays: number;
  managerEscalationEnabled: boolean;
  managerEscalationDays: number;
  weeklySummaryEnabled: boolean;
  updatedAt: string;
  updatedByUserId?: string;
}

// In-memory persistent store for company policies (key: companyId)
const policyStore = new Map<number, CompanyTrainingAutomationPolicy>();

export function getDefaultPolicy(companyId: number): CompanyTrainingAutomationPolicy {
  return {
    companyId,
    enabled: false, // OFF by default until company administrator explicitly opts in
    paused: false,
    preDueReminderEnabled: true,
    preDueReminderDays: 3,
    overdueReminderEnabled: true,
    overdueReminderDays: 1,
    secondOverdueReminderEnabled: true,
    secondOverdueReminderDays: 7,
    adminEscalationEnabled: true,
    adminEscalationDays: 14,
    managerEscalationEnabled: false, // Withheld due to scope incomplete
    managerEscalationDays: 14,
    weeklySummaryEnabled: false,
    updatedAt: new Date().toISOString(),
  };
}

export function validatePolicyInput(input: Partial<CompanyTrainingAutomationPolicy>): string | null {
  if (input.preDueReminderDays !== undefined) {
    if (typeof input.preDueReminderDays !== "number" || input.preDueReminderDays < 1 || input.preDueReminderDays > 30) {
      return "Pre-due reminder days must be between 1 and 30 days.";
    }
  }
  if (input.overdueReminderDays !== undefined) {
    if (typeof input.overdueReminderDays !== "number" || input.overdueReminderDays < 1 || input.overdueReminderDays > 30) {
      return "Overdue reminder days must be between 1 and 30 days.";
    }
  }
  if (input.secondOverdueReminderDays !== undefined) {
    if (typeof input.secondOverdueReminderDays !== "number" || input.secondOverdueReminderDays < 1 || input.secondOverdueReminderDays > 60) {
      return "Second overdue reminder days must be between 1 and 60 days.";
    }
    if (input.overdueReminderDays !== undefined && input.secondOverdueReminderDays <= input.overdueReminderDays) {
      return "Second overdue reminder must be scheduled after the first overdue reminder.";
    }
  }
  if (input.adminEscalationDays !== undefined) {
    if (typeof input.adminEscalationDays !== "number" || input.adminEscalationDays < 1 || input.adminEscalationDays > 90) {
      return "Admin escalation days must be between 1 and 90 days.";
    }
  }
  return null;
}

export async function getCompanyAutomationPolicy(
  access: CompanyAccess
): Promise<CompanyTrainingAutomationPolicy> {
  const companyId = access.companyId;
  if (!policyStore.has(companyId)) {
    policyStore.set(companyId, getDefaultPolicy(companyId));
  }
  return policyStore.get(companyId)!;
}

export async function updateCompanyAutomationPolicy(
  access: CompanyAccess,
  updates: Partial<CompanyTrainingAutomationPolicy>,
  userId: string
): Promise<CompanyTrainingAutomationPolicy> {
  const validationError = validatePolicyInput(updates);
  if (validationError) {
    throw new Error(validationError);
  }

  const current = await getCompanyAutomationPolicy(access);
  const updated: CompanyTrainingAutomationPolicy = {
    ...current,
    ...updates,
    companyId: access.companyId,
    updatedAt: new Date().toISOString(),
    updatedByUserId: userId,
  };

  policyStore.set(access.companyId, updated);

  await logAuditEvent({
    companyId: access.companyId,
    actorUserId: userId,
    actorRole: access.role || "company_admin",
    action: "automation_policy.updated",
    targetType: "company_training_automation_policy",
    targetId: String(access.companyId),
    metadata: {
      enabled: updated.enabled,
      paused: updated.paused,
      preDueReminderDays: updated.preDueReminderDays,
      overdueReminderDays: updated.overdueReminderDays,
      secondOverdueReminderDays: updated.secondOverdueReminderDays,
      adminEscalationDays: updated.adminEscalationDays,
      weeklySummaryEnabled: updated.weeklySummaryEnabled,
    },
  });

  return updated;
}

export async function pauseCompanyAutomation(
  access: CompanyAccess,
  userId: string
): Promise<CompanyTrainingAutomationPolicy> {
  const current = await getCompanyAutomationPolicy(access);
  const updated = {
    ...current,
    paused: true,
    updatedAt: new Date().toISOString(),
    updatedByUserId: userId,
  };

  policyStore.set(access.companyId, updated);

  await logAuditEvent({
    companyId: access.companyId,
    actorUserId: userId,
    actorRole: access.role || "company_admin",
    action: "automation_policy.paused",
    targetType: "company_training_automation_policy",
    targetId: String(access.companyId),
    metadata: { paused: true },
  });

  return updated;
}

export async function resumeCompanyAutomation(
  access: CompanyAccess,
  userId: string
): Promise<CompanyTrainingAutomationPolicy> {
  const current = await getCompanyAutomationPolicy(access);
  const updated = {
    ...current,
    paused: false,
    updatedAt: new Date().toISOString(),
    updatedByUserId: userId,
  };

  policyStore.set(access.companyId, updated);

  await logAuditEvent({
    companyId: access.companyId,
    actorUserId: userId,
    actorRole: access.role || "company_admin",
    action: "automation_policy.resumed",
    targetType: "company_training_automation_policy",
    targetId: String(access.companyId),
    metadata: { paused: false },
  });

  return updated;
}

export function generatePolicyPreviewText(policy: CompanyTrainingAutomationPolicy): string[] {
  if (!policy.enabled) {
    return ["Training follow-up automation is currently disabled. Enable to activate routine reminders."];
  }
  if (policy.paused) {
    return ["Training follow-up automation is currently paused. Resume to execute routine rules."];
  }

  const items: string[] = [];
  if (policy.preDueReminderEnabled) {
    items.push(`• Employees receive an automated reminder ${policy.preDueReminderDays} day(s) before training is due.`);
  }
  if (policy.overdueReminderEnabled) {
    items.push(`• Overdue employees receive an initial reminder ${policy.overdueReminderDays} day(s) after due date.`);
  }
  if (policy.secondOverdueReminderEnabled) {
    items.push(`• A second follow-up reminder is sent if training remains overdue after ${policy.secondOverdueReminderDays} day(s).`);
  }
  if (policy.adminEscalationEnabled) {
    items.push(`• Company Administrators are alerted if training remains overdue after ${policy.adminEscalationDays} day(s).`);
  }
  if (policy.weeklySummaryEnabled) {
    items.push(`• Weekly training executive summaries are dispatched every Monday morning.`);
  }

  return items.length > 0 ? items : ["No active automation rules configured."];
}
