# Sprint 10V — Company & Department ESG Workforce Intelligence Discovery

## Overview
This document outlines the existing data sources, reporting routes, and infrastructure available for aggregating company- and department-level ESG workforce intelligence in ELEVIO SKILLS (EcoLearn).

---

## 1. Existing Infrastructure & Data Sources

| Domain Entity | Storage Table / File | Fields Used for Workforce Intelligence |
|---|---|---|
| **Company Record** | `companiesTable` | `id`, `name`, `industry`, `trainingPriorities`, `subscriptionTier` |
| **Employee Roster** | `employeesTable` | `id`, `companyId`, `department`, `role`, `jobTitle`, `clerkUserId`, `email` |
| **Course Enrollments** | `enrollmentsTable` | `employeeId`, `courseId`, `status`, `progressPct`, `completedAt` |
| **Course Assignments** | `courseAssignmentsTable` | `employeeId`, `courseId`, `status`, `dueDate` |
| **Quiz Performance** | `quizAttemptsTable` | `userId`, `courseId`, `score`, `passed`, `incorrectQuestionIds` |
| **Skills Taxonomy** | `skillsTaxonomy.ts` | 14 controlled topics across `environmental`, `social`, `governance` domains |
| **Individual Skills Engine** | `aiSkillsGapService.ts` | `generateEmployeeSkillsProfile(employeeId, access)` |
| **Recommendation Engine** | `recommendationProviders.ts` | `FallbackRecommendationProvider`, `GeminiRecommendationProvider` |

---

## 2. API Routes & UI Components Inspected

- **Company Admin Base Route**: `artifacts/api-server/src/routes/companies.ts`
- **Dashboard API**: `artifacts/api-server/src/routes/dashboard.ts`
- **Company Admin Dashboard Page**: `artifacts/ecolearn/src/pages/company/index.tsx`
- **Employee Management Page**: `artifacts/ecolearn/src/pages/company/employees.tsx`

---

## 3. Privacy & Governance Guarantees
- Company workforce intelligence aggregates data across employees per company.
- Individual employee names are **never** included in company-wide AI summary prompts or reports.
- Server-authoritative `requireCompanyAdmin(req)` enforces strict cross-tenant isolation and role-based access control (RBAC).
