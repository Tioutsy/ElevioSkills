import { useAuth, useUser } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";

export type UserRole = "platform_admin" | "company_admin" | "manager" | "employee" | "unlinked";

export interface AuthoritativeUserAccess {
  userId: string | null;
  email: string | null;
  role: UserRole;
  roleLabel: string;
  companyId: number | null;
  companyName: string | null;
  employeeId: number | null;
  employeeName: string | null;
  isPlatformAdmin: boolean;
  isCompanyAdmin: boolean;
  isManager: boolean;
  isLearner: boolean;
  capabilities: {
    canManageCompany: boolean;
    canManageEmployees: boolean;
    canViewReports: boolean;
    canAssignCourses: boolean;
    canReviewChallenges: boolean;
  };
}

export function getRawRole(user: any): string | null {
  if (!user) return null;
  return (
    user?.role ??
    user?.publicMetadata?.role ??
    user?.metadata?.role ??
    user?.unsafeMetadata?.role ??
    null
  );
}

export function isPlatformAdmin(user: any): boolean {
  if (!user) return false;
  if (user?.isPlatformAdmin === true) return true;
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null;
  if (email && email.toLowerCase() === "slennon2206@gmail.com") return true;
  const role = getRawRole(user);
  return role === "platform_admin" || role === "super_admin";
}

export function isCompanyAdmin(user: any): boolean {
  if (!user) return false;
  if (isPlatformAdmin(user)) return false;
  if (user?.isCompanyAdmin === true) return true;
  const role = getRawRole(user);
  return role === "company_admin" || role === "admin";
}

export function isManager(user: any): boolean {
  if (!user) return false;
  if (isPlatformAdmin(user)) return false;
  if (user?.isManager === true) return true;
  const role = getRawRole(user);
  return role === "manager";
}

export function isLearner(user: any): boolean {
  if (!user) return true;
  if (isPlatformAdmin(user)) return false;
  if (user?.isLearner === true) return true;
  const role = getRawRole(user);
  return role === "employee" || role === "learner" || (!isCompanyAdmin(user) && !isManager(user));
}

export function getUserRoleLabel(user: any): string {
  if (!user) return "Learner";
  if (typeof user?.roleLabel === "string" && user.roleLabel.trim()) {
    return user.roleLabel;
  }
  if (isPlatformAdmin(user)) return "Platform Administrator";
  if (isCompanyAdmin(user)) return "Company Administrator";
  if (isManager(user)) return "Manager";
  return "Learner";
}

export function hasCapability(user: any, capability: string): boolean {
  if (user?.capabilities && typeof user.capabilities === "object") {
    if (capability === "employees.manage" || capability === "employees.create") return Boolean(user.capabilities.canManageEmployees);
    if (capability === "company.manage") return Boolean(user.capabilities.canManageCompany);
    if (capability === "reports.team") return Boolean(user.capabilities.canViewReports);
    if (capability === "courses.assign") return Boolean(user.capabilities.canAssignCourses);
    if (capability === "challenges.review") return Boolean(user.capabilities.canReviewChallenges);
    if (capability === "company.view") return Boolean(user.capabilities.canManageCompany || user.isManager || user.isCompanyAdmin || user.isPlatformAdmin);
    if (capability === "engagement.view" || capability === "leaderboards.view") return true;
    if (capability === "certificates.download") return true;
  }

  if (isPlatformAdmin(user)) return true;
  if (isCompanyAdmin(user)) return true;
  if (isManager(user)) {
    return [
      "company.view",
      "employees.view",
      "reports.team",
      "certificates.download",
      "courses.assign",
      "challenges.review",
      "engagement.view",
      "leaderboards.view",
    ].includes(capability);
  }
  return ["certificates.download"].includes(capability);
}

/**
 * useAuthRole — Single Authoritative Source of Truth for Role & Capabilities
 * Synchronously provides fast claims fallback while reactively fetching
 * the authoritative database record from GET /api/auth/me.
 */
export function useAuthRole() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const query = useQuery<AuthoritativeUserAccess>({
    queryKey: ["/api/auth/me", user?.id],
    queryFn: () => customFetch<AuthoritativeUserAccess>("/api/auth/me"),
    enabled: isLoaded && Boolean(isSignedIn),
    staleTime: 30_000,
    retry: 1,
  });

  const userEmail =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null;
  const isBootstrapSuperAdmin = Boolean(
    userEmail && userEmail.toLowerCase() === "slennon2206@gmail.com"
  );

  const rawRole = getRawRole(user);
  const fallbackIsPlatformAdmin =
    rawRole === "platform_admin" || rawRole === "super_admin" || isBootstrapSuperAdmin;
  const fallbackIsCompanyAdmin = !fallbackIsPlatformAdmin && (rawRole === "company_admin" || rawRole === "admin");
  const fallbackIsManager = !fallbackIsPlatformAdmin && rawRole === "manager";

  const data = query.data;

  const isSuper = data ? data.isPlatformAdmin : fallbackIsPlatformAdmin;
  const isCompAdmin = !isSuper && (data ? data.isCompanyAdmin : fallbackIsCompanyAdmin);
  const isMgr = !isSuper && (data ? data.isManager : fallbackIsManager);
  const isLrn = !isSuper && (data ? data.isLearner : (!isCompAdmin && !isMgr));

  let roleLabel = "Learner";
  if (isSuper) roleLabel = "Platform Administrator";
  else if (isCompAdmin) roleLabel = "Company Administrator";
  else if (isMgr) roleLabel = "Manager";

  return {
    ...query,
    role: isSuper ? "platform_admin" : (data?.role ?? (isCompAdmin ? "company_admin" : isMgr ? "manager" : "employee")),
    roleLabel: data?.roleLabel ?? roleLabel,
    companyId: isSuper ? null : (data?.companyId ?? null),
    companyName: isSuper ? null : (data?.companyName ?? null),
    employeeId: isSuper ? null : (data?.employeeId ?? null),
    employeeName: isSuper ? (data?.employeeName || "Sharon Lennon") : (data?.employeeName ?? null),
    isPlatformAdmin: isSuper,
    isCompanyAdmin: isCompAdmin,
    isManager: isMgr,
    isLearner: isLrn,
    capabilities: data?.capabilities ?? {
      canManageCompany: isSuper || isCompAdmin,
      canManageEmployees: isSuper || isCompAdmin,
      canViewReports: isSuper || isCompAdmin || isMgr,
      canAssignCourses: isSuper || isCompAdmin || isMgr,
      canReviewChallenges: isSuper || isCompAdmin || isMgr,
    },
  };
}
