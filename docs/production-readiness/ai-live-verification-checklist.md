# AI Live Verification Checklist (Post-Deployment)

**Version:** 1.0  
**Effective Date:** August 10, 2026  

---

## Live Post-Deployment Manual Verification Protocol

Perform these manual verification steps in the live environment following Render/GitHub deployment.

---

## 1. Authentication & Role-Based Access Control (RBAC)

- [ ] **Learner Login**: Sign in as a standard learner. Verify access to Learner Dashboard and Course Catalog.
- [ ] **Learner Copilot Block**: Attempt to navigate or call `/api/companies/copilot`. Confirm access is rejected with `403 Forbidden`.
- [ ] **Company Admin Login**: Sign in as a Company Administrator. Verify access to `/company` admin dashboard.

---

## 2. Sprint 10T–10Z AI Features Verification

- [ ] **Your Learning Profile (Sprint 10U)**:
  - Navigate to Learner Profile or Course Recommendations.
  - Verify skill strength radar, verified evidence badges, and top skill gap highlights.
- [ ] **Smart Recommendations Engine (Sprint 10T)**:
  - Verify recommended courses display explicit rationale ("Recommended because of Procurement gap in Ethics").
- [ ] **ESG Workforce Intelligence (Sprint 10V)**:
  - Open Company Admin Dashboard (`/company`).
  - Verify overall company coverage percentage, top company strengths, top company gaps, and department breakdown table.
- [ ] **Monthly Management Brief (Sprint 10W)**:
  - Verify executive brief headline, key achievements, areas needing attention, and strategic horizon recommendations.
- [ ] **ESG Workforce Readiness Indicator (Sprint 10X)**:
  - Verify overall readiness score (0–100), band badge (e.g. Developing / Advanced), and Environmental/Social/Governance subscores.
- [ ] **Company Action Plan (Sprint 10Y)**:
  - Verify prioritized actions grouped by target role (Company Admins, Department Managers, Individual Learners) with priority tags.
- [ ] **Ask Elevio AI / Management Copilot v1 (Sprint 10Z)**:
  - Open Ask Elevio AI chat card on company dashboard.
  - Test starter question: "What should I prioritise this month?".
  - Verify response contains grounded answer, source badges (`workforce_intelligence`, `action_plan`), period indicator, and actionable CTA button.
  - Test follow-up query: "Why?". Verify context is retained cleanly.

---

## 3. Fallback & Resiliency Verification

- [ ] **Gemini Failure / Unconfigured Fallback**:
  - Temporarily unset `GEMINI_API_KEY` in staging/dev.
  - Ask a question in Ask Elevio AI. Confirm system returns a graceful fallback message ("AI interpretation is temporarily unavailable...") alongside live deterministic data.
  - Confirm core LMS, course learning, quizzes, and certificates remain 100% operational.
