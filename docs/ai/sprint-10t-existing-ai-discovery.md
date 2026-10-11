# Sprint 10T — Existing AI & Recommendation System Discovery

## Executive Overview
This document records the repository discovery for **Sprint 10T — Production AI Recommendation Engine v1**. It details the existing architecture, database tables, Gemini API integration points, fallback mechanisms, API endpoints, and frontend recommendation UI components within **ELEVIO SKILLS** (EcoLearn).

---

## 1. Existing AI & Recommendation Architecture

### Core Files
- **`artifacts/api-server/src/lib/ai/recommendationProvider.ts`**:
  - Defines `LearningRecommendationProvider` interface.
  - Defines `RecommendationInput`, `RecommendationResult`, and `CourseCatalogItem` contracts.
- **`artifacts/api-server/src/lib/ai/recommendationProviders.ts`**:
  - Implements `FallbackRecommendationProvider`: Rule-based matching based on learner department, job title, company sector, and company training priorities.
  - Implements `GeminiRecommendationProvider`: Uses `gemini-3.6-flash` via REST call to Google Generative Language API (`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=...`). Fallback triggers if `GEMINI_API_KEY` is absent, API request fails, times out (>15s), or returns invalid JSON.
- **`artifacts/api-server/src/lib/ai/aiLearningPathService.ts`**:
  - Orchestrates employee data loading (`employeesTable`, `companiesTable`, `enrollmentsTable`, `courseAssignmentsTable`, `coursesTable`, `coursePrerequisitesTable`).
  - Calls `GeminiRecommendationProvider`.
  - Performs **Strict Grounding & Validation**: Filters hallucinated courses (rejects nonexistent IDs/codes), excludes already completed or assigned courses, validates prerequisites, and formats structured response.
- **`artifacts/api-server/src/routes/companies.ts`**:
  - Route: `POST /api/company/employees/:id/recommendations` (protected by `requireCompanyAdmin`).

---

## 2. Environment Variables
- **`GEMINI_API_KEY`**: Primary API key for Google Gemini model API calls. When missing or invalid, the platform gracefully switches to `FallbackRecommendationProvider` with `providerTag: "fallback"` and `isFallback: true` without crashing or returning errors to end users.

---

## 3. Database Schema Mapping

| Entity | Table (`lib/db/src/schema.ts`) | Relevant Fields |
|---|---|---|
| **Company** | `companiesTable` | `id`, `name`, `industry` (sector), `trainingPriorities` (`text[]`), `employeeCount`, `maxEmployees` |
| **Employee** | `employeesTable` | `id`, `companyId`, `clerkUserId`, `email`, `name`, `department`, `jobTitle`, `role` (`admin`/`manager`/`employee`) |
| **Course** | `coursesTable` | `id`, `courseCode` (e.g. `ELH-01`), `title`, `description`, `level`, `durationMinutes`, `isPublished`, `thumbnailUrl` |
| **Prerequisite** | `coursePrerequisitesTable` | `courseId`, `prerequisiteCourseId` |
| **Enrollment** | `enrollmentsTable` | `id`, `userId`, `employeeId`, `courseId`, `status` (`not_started`/`in_progress`/`completed`), `progressPct` |
| **Assignment** | `courseAssignmentsTable` | `id`, `employeeId`, `courseId`, `assignedBy`, `dueDate`, `status` |
| **Quiz Attempts** | `quizAttemptsTable` | `id`, `userId`, `courseId`, `score`, `passed`, `incorrectQuestionIds` |

---

## 4. Frontend Recommendation UI
- **`artifacts/ecolearn/src/components/SmartRecommendationDialog.tsx`**:
  - Component opened from Company Admin workspace (`/company/employees`).
  - Calls `POST /api/company/employees/:id/recommendations`.
  - Displays structured recommendations: Priority badge (`high`, `medium`, `optional`), Course Title & Code, Estimated Duration, Explanation Reason, Prerequisite status warning (if unmet prerequisites exist), and batch assignment capability via `POST /api/company/assignments`.

---

## 5. Security & Tenant Isolation
- Access to `POST /api/company/employees/:id/recommendations` is protected by `requireCompanyAdmin`.
- Cross-tenant validation checks that `employee.companyId === admin.companyId`.
- Grounding checks guarantee no hallucinated, draft, or out-of-scope courses are returned or assigned.
