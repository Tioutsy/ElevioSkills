import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";

let baseUrl = "";
let authTokenGetter: (() => Promise<string | null>) | null = null;

export function setBaseUrl(url: string) {
  baseUrl = url;
}

export function setAuthTokenGetter(getter: () => Promise<string | null>) {
  authTokenGetter = getter;
}

export async function customFetch<T = any>(path: string, options?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> || {}),
  };

  if (authTokenGetter) {
    try {
      const token = await authTokenGetter();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch {}
  }

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const errJson = await res.json();
      if (errJson?.message || errJson?.error) {
        errorMsg = errJson.message || errJson.error;
      }
    } catch {}
    throw new Error(errorMsg);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text() as unknown as T;
}

// Query Key Helpers
export function getListChallengesQueryKey() {
  return ["challenges"];
}

export function getListLeaderboardsQueryKey() {
  return ["leaderboards"];
}

export function getGetMyCompanyQueryKey() {
  return ["my-company"];
}

export function getListEmployeesQueryKey() {
  return ["company-employees"];
}

export function getVerifyCertificateQueryKey(code: string) {
  return ["verify-certificate", code];
}

// Common types
export interface Course {
  id: number;
  slug: string;
  title: string;
  code?: string;
  description: string;
  category?: string;
  durationMinutes?: number;
  level?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
  lessonsCount?: number;
  badgeImageUrl?: string;
  badgeName?: string;
  badgeDescription?: string;
  skillsAcquired?: string[];
  sdgGoals?: number[];
  prerequisites?: string[];
  [key: string]: any;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department?: string;
  jobTitle?: string;
  companyId?: number;
  role?: string;
  status?: string;
  [key: string]: any;
}

export interface Enrollment {
  id: number;
  courseId: number;
  userId?: string;
  employeeId?: number;
  status: "not_started" | "in_progress" | "completed";
  progressPct: number;
  completedAt?: string | null;
  assignedAt?: string;
  course?: Course;
  [key: string]: any;
}

export interface LearningPathDetail {
  id: number;
  title: string;
  description: string;
  slug: string;
  courses?: Course[];
  [key: string]: any;
}

export interface QueryOpts {
  query?: Partial<UseQueryOptions<any>>;
}

export interface MutationOpts<TData = any, TVariables = any> {
  mutation?: Partial<UseMutationOptions<TData, Error, TVariables>>;
}

function toQueryString(params?: Record<string, any>): string {
  if (!params) return "";
  const sp = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== null && val !== undefined && val !== "") {
      sp.append(key, String(val));
    }
  }
  const str = sp.toString();
  return str ? `?${str}` : "";
}

// Generic Hook Creator Helper
function makeQueryHook(queryKey: any[], path: string | ((param?: any) => string), hookOpts?: { alwaysEnabled?: boolean }) {
  return (param?: any, options?: QueryOpts) => {
    const url = typeof path === "function" ? path(param) : path;
    const key = typeof path === "function" ? [...queryKey, param] : [...queryKey, param].filter(Boolean);
    const isEnabled = options?.query?.enabled !== undefined
      ? options.query.enabled
      : (hookOpts?.alwaysEnabled || typeof path !== "function" || Boolean(param));
    return useQuery({
      queryKey: key,
      queryFn: () => customFetch(url),
      enabled: isEnabled,
      ...options?.query,
    });
  };
}

function makeMutationHook<TData = any, TVariables = any>(method: string, pathFn: (data: TVariables) => string) {
  return (options?: MutationOpts<TData, TVariables>) => {
    return useMutation({
      mutationFn: (data: TVariables) =>
        customFetch<TData>(pathFn(data), {
          method,
          body: data ? JSON.stringify(data) : undefined,
        }),
      ...options?.mutation,
    });
  };
}

// Queries
export const useListCourses = makeQueryHook(["courses"], (p) => "/api/courses" + toQueryString(p), { alwaysEnabled: true });
export const useGetCourse = makeQueryHook(["course"], (id) => `/api/courses/${id}`);
export const useListCategories = makeQueryHook(["categories"], "/api/categories");
export const useListEnrollments = makeQueryHook(["enrollments"], "/api/enrollments");
export const useGetEnrollment = makeQueryHook(["enrollment"], (id) => `/api/enrollments/${id}`);
export const useGetProgress = makeQueryHook(["progress"], (id) => `/api/progress/${id}`);
export const useGetCourseProgressSummary = makeQueryHook(["progress-summary"], (id) => `/api/progress/${id}/summary`);
export const useGetCommitments = makeQueryHook(["commitments"], (id) => `/api/courses/${id}/commitments`);
export const useListCertificates = makeQueryHook(["certificates"], "/api/certificates");
export const useVerifyCertificate = (code: string, options?: QueryOpts) =>
  useQuery({
    queryKey: getVerifyCertificateQueryKey(code),
    queryFn: () => customFetch(`/api/certificates/verify/${code}`),
    enabled: Boolean(code),
    ...options?.query,
  });
export const useListCompanyCertificates = makeQueryHook(["company-certificates"], "/api/company/certificates");
export const useGetImpactMetrics = makeQueryHook(["impact-metrics"], "/api/impact");
export const useListBlogPosts = makeQueryHook(["blog-posts"], "/api/blog");
export const useGetBlogPost = makeQueryHook(["blog-post"], (slug) => `/api/blog/${slug}`);
export const useListLearningPaths = makeQueryHook(["learning-paths"], "/api/learning-paths");
export const useGetFeaturedCourses = makeQueryHook(["featured-courses"], "/api/courses?featured=true");
export const useListAchievementBadges = makeQueryHook(["achievement-badges"], "/api/me/achievements");
export const useGetMyPoints = makeQueryHook(["my-points"], "/api/me/points");
export const useGetAdminAnalytics = makeQueryHook(["admin-analytics"], "/api/admin/analytics");
export const useGetCourseQuiz = makeQueryHook(["course-quiz"], (id) => `/api/courses/${id}/quiz`);
export const useGetMyCompany = makeQueryHook(getGetMyCompanyQueryKey(), "/api/company/me");
export const useGetSustainabilityScore = makeQueryHook(["sustainability-score"], "/api/sustainability/score");
export const useGetDashboardStats = makeQueryHook(["dashboard-stats"], "/api/company/dashboard/stats");
export const useGetCompletionTrend = makeQueryHook(["completion-trend"], "/api/company/dashboard/completion-trend");
export const useGetDepartmentParticipation = makeQueryHook(["department-participation"], "/api/company/dashboard/department-participation");
export const useGetEsgImpact = makeQueryHook(["esg-impact"], "/api/company/dashboard/esg-impact");

export const useListChallenges = makeQueryHook(getListChallengesQueryKey(), "/api/challenges");
export const useListLeaderboards = makeQueryHook(getListLeaderboardsQueryKey(), "/api/leaderboards");
export const useListEmployees = makeQueryHook(getListEmployeesQueryKey(), "/api/company/employees");

// Platform Admin Queries
export const usePlatformAdminListCourses = makeQueryHook(["platform-admin-courses"], "/api/platform-admin/courses");
export const usePlatformAdminListInsightArticles = makeQueryHook(["platform-admin-insight-articles"], "/api/platform-admin/insights/articles");
export const usePlatformAdminListInsightCategories = makeQueryHook(["platform-admin-insight-categories"], "/api/platform-admin/insights/categories");
export const usePlatformAdminListLearningPaths = makeQueryHook(["platform-admin-learning-paths"], "/api/platform-admin/learning-paths");
export const usePlatformAdminListLessons = makeQueryHook(["platform-admin-lessons"], (courseId) => `/api/platform-admin/courses/${courseId}/lessons`);
export const usePlatformAdminListQuizQuestions = makeQueryHook(["platform-admin-quiz-questions"], (courseId) => `/api/platform-admin/courses/${courseId}/quiz`);
export const usePlatformAdminListSdgContributions = makeQueryHook(["platform-admin-sdg-contributions"], "/api/platform-admin/sdg/contributions");
export const usePlatformAdminListSdgGoals = makeQueryHook(["platform-admin-sdg-goals"], "/api/platform-admin/sdg/goals");
export const usePlatformAdminListSdgTargets = makeQueryHook(["platform-admin-sdg-targets"], "/api/platform-admin/sdg/targets");
export const usePlatformAdminListSectors = makeQueryHook(["platform-admin-sectors"], "/api/platform-admin/sectors");

// Mutations
export const useCreateEnrollment = makeMutationHook("POST", () => "/api/enrollments");
export const useUpdateProgress = makeMutationHook("POST", (d) => `/api/progress/${d.courseId}`);
export const useSaveCommitments = makeMutationHook("POST", (d) => `/api/courses/${d.courseId}/commitments`);
export const useSubmitQuiz = makeMutationHook("POST", (d) => `/api/courses/${d.courseId}/quiz/submit`);
export const useCreateLead = makeMutationHook("POST", () => "/api/leads");

export const useAddEmployee = makeMutationHook("POST", () => "/api/company/employees");
export const useUpdateEmployee = makeMutationHook("PUT", (d) => `/api/company/employees/${d.id}`);
export const useRemoveEmployee = makeMutationHook("DELETE", (d) => `/api/company/employees/${d.id}`);
export const useUpdateMyCompany = makeMutationHook("PUT", () => "/api/company/me");

// Platform Admin Mutations
export const usePlatformAdminCreateInsightArticle = makeMutationHook("POST", () => "/api/platform-admin/insights/articles");
export const usePlatformAdminCreateInsightCategory = makeMutationHook("POST", () => "/api/platform-admin/insights/categories");
export const usePlatformAdminCreateLearningPath = makeMutationHook("POST", () => "/api/platform-admin/learning-paths");
export const usePlatformAdminCreateLesson = makeMutationHook("POST", (d) => `/api/platform-admin/courses/${d.courseId}/lessons`);
export const usePlatformAdminCreateQuizQuestion = makeMutationHook("POST", (d) => `/api/platform-admin/courses/${d.courseId}/quiz`);
export const usePlatformAdminCreateSdgContribution = makeMutationHook("POST", () => "/api/platform-admin/sdg/contributions");
export const usePlatformAdminCreateSdgGoal = makeMutationHook("POST", () => "/api/platform-admin/sdg/goals");
export const usePlatformAdminCreateSdgTarget = makeMutationHook("POST", () => "/api/platform-admin/sdg/targets");
export const usePlatformAdminCreateSector = makeMutationHook("POST", () => "/api/platform-admin/sectors");

export const usePlatformAdminReorderLessons = makeMutationHook("POST", (d) => `/api/platform-admin/courses/${d.courseId}/lessons/reorder`);
export const usePlatformAdminReorderQuizQuestions = makeMutationHook("POST", (d) => `/api/platform-admin/courses/${d.courseId}/quiz/reorder`);
export const usePlatformAdminUpdateCourseMetadata = makeMutationHook("PUT", (d) => `/api/platform-admin/courses/${d.id}`);
export const usePlatformAdminUpdateInsightArticle = makeMutationHook("PUT", (d) => `/api/platform-admin/insights/articles/${d.id}`);
export const usePlatformAdminUpdateInsightArticleStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/insights/articles/${d.id}/status`);
export const usePlatformAdminUpdateInsightCategory = makeMutationHook("PUT", (d) => `/api/platform-admin/insights/categories/${d.id}`);
export const usePlatformAdminUpdateInsightCategoryStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/insights/categories/${d.id}/status`);
export const usePlatformAdminUpdateLearningPath = makeMutationHook("PUT", (d) => `/api/platform-admin/learning-paths/${d.id}`);
export const usePlatformAdminUpdateLearningPathCourses = makeMutationHook("PUT", (d) => `/api/platform-admin/learning-paths/${d.id}/courses`);
export const usePlatformAdminUpdateLearningPathStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/learning-paths/${d.id}/status`);
export const usePlatformAdminUpdateLesson = makeMutationHook("PUT", (d) => `/api/platform-admin/lessons/${d.id}`);
export const usePlatformAdminUpdateQuizQuestion = makeMutationHook("PUT", (d) => `/api/platform-admin/quiz-questions/${d.id}`);
export const usePlatformAdminUpdateSdgContribution = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/contributions/${d.id}`);
export const usePlatformAdminUpdateSdgContributionStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/contributions/${d.id}/status`);
export const usePlatformAdminUpdateSdgGoal = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/goals/${d.id}`);
export const usePlatformAdminUpdateSdgGoalStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/goals/${d.id}/status`);
export const usePlatformAdminUpdateSdgTarget = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/targets/${d.id}`);
export const usePlatformAdminUpdateSdgTargetStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/sdg/targets/${d.id}/status`);
export const usePlatformAdminUpdateSector = makeMutationHook("PUT", (d) => `/api/platform-admin/sectors/${d.id}`);
export const usePlatformAdminUpdateSectorStatus = makeMutationHook("PUT", (d) => `/api/platform-admin/sectors/${d.id}/status`);
