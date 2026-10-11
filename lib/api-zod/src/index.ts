import { z } from "zod";

export const CourseSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  name: z.string().optional(),
});

export const HealthCheckResponse = z.object({
  status: z.string(),
  timestamp: z.string().optional(),
  version: z.string().optional(),
});

export const CreateEnrollmentBody = z.object({
  courseId: z.number(),
  employeeId: z.number().optional(),
  userId: z.string().optional(),
});

export const SubmitQuizBody = z.object({
  answers: z.array(z.any()),
  timeSpentSeconds: z.number().optional(),
});

export const CreateCheckoutSessionBody = z.object({
  planId: z.number().optional(),
  slug: z.string().optional(),
  interval: z.enum(["monthly", "annual"]).optional(),
  seatCount: z.number().optional(),
});

export const SaveCommitmentsBody = z.object({
  commitments: z.array(z.any()),
});

export const ListCoursesQueryParams = z.object({
  categoryId: z.coerce.number().optional(),
  search: z.string().optional(),
  featured: z.preprocess((val) => val === "true" || val === true, z.boolean().optional()),
  locale: z.string().optional(),
});

export const CreateCourseBody = z.object({
  title: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  durationMinutes: z.number().optional(),
  level: z.string().optional(),
  priceUsd: z.union([z.number(), z.string()]).optional(),
});

export const UpdateCourseBody = CreateCourseBody.partial();

export const CreateCompanyBody = z.object({
  name: z.string(),
  slug: z.string().optional(),
  domain: z.string().optional(),
  industry: z.string().optional(),
  logoUrl: z.string().optional(),
  isPublicProfile: z.boolean().optional(),
  leaderboardEnabled: z.boolean().optional(),
  recyclingServiceStartDate: z.string().optional().nullable(),
  recyclingServiceStatus: z.string().optional().nullable(),
  recycleanCustomerRef: z.string().optional().nullable(),
  defaultCollectionSiteName: z.string().optional().nullable(),
  recyclingServiceFrequency: z.string().optional().nullable(),
  recyclingInternalNotes: z.string().optional().nullable(),
});

export const UpdateMyCompanyBody = CreateCompanyBody.partial();

export const UpdateProgressBody = z.object({
  lessonId: z.number(),
  completed: z.boolean().optional(),
  watchedSeconds: z.number().optional(),
  lastPositionSeconds: z.number().optional(),
});

export type CourseType = z.infer<typeof CourseSchema>;
export type UserType = z.infer<typeof UserSchema>;
