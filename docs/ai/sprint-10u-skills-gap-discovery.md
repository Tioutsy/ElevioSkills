# Sprint 10U — Skills-Gap Engine Evidence Discovery

## Executive Overview
This document records the discovery of available learning evidence and knowledge assessment data in **ELEVIO SKILLS** (EcoLearn) for **Sprint 10U — AI Skills-Gap Engine v1**.

---

## 1. Available Evidence Sources

| Data Source | Database Table / Entity | Attributes Available | Usage in Skills-Gap Analysis |
|---|---|---|---|
| **Course Completion** | `enrollmentsTable` | `userId`, `employeeId`, `courseId`, `status`, `progressPct`, `completedAt` | Tracks completed training modules. Indicates exposed knowledge topics. |
| **Course Assignments** | `courseAssignmentsTable` | `employeeId`, `courseId`, `status`, `dueDate` | Tracks mandatory/recommended learning targets assigned by management. |
| **Quiz Attempts** | `quizAttemptsTable` | `userId`, `courseId`, `score`, `passed`, `incorrectQuestionIds` | Direct evidence of demonstrated knowledge vs assessment weaknesses. |
| **Course Metadata & Taxonomy** | `coursesTable` | `id`, `courseCode`, `title`, `category`, `level`, `durationMinutes` | Maps courses to ESG knowledge domains (`environmental`, `social`, `governance`). |
| **Course Prerequisites** | `coursePrerequisitesTable` | `courseId`, `prerequisiteCourseId` | Establishes foundational dependencies between skill topics. |
| **Employee Organizational Context** | `employeesTable` | `id`, `companyId`, `department`, `jobTitle`, `role` | Contextualizes required knowledge based on job role and seniority. |
| **Company ESG Priorities** | `companiesTable` | `industry`, `trainingPriorities` | Contextualizes organisational focus areas (e.g., `waste_management`, `energy_efficiency`). |

---

## 2. Unavailable / Out-of-Scope Data

The following data types are **not** present in the database or system and are explicitly non-inferred:
- **Workplace Performance Metrics**: Actual on-the-job ESG audit performance is not tracked; course completions do NOT equal workplace competency.
- **Granular Question-Level Skill Mapping**: Quiz questions are tied to course IDs, not sub-item micro-skills.
- **External Certification Data**: Third-party credentials outside EcoLearn are not integrated.

---

## 3. Evidence Grounding & Principles

1. **Completion vs Competence**: Completing a course proves exposure to training, not absolute professional competence.
2. **Demonstrated Knowledge**: Higher quiz scores (≥80%) evidence demonstrated knowledge strengths. Low scores (<70%) or failed attempts evidence demonstrated weaknesses.
3. **Inferred Gaps**: Assigned/uncompleted courses or company priorities matching job roles with no completion evidence represent inferred knowledge gaps.
4. **Actionable Interventions**: Recommendations generated directly link back to catalog courses to bridge identified gaps.
