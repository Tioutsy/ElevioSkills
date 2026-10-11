# Sprint 10Y — AI Company Action Plan v1 Discovery Document

## Overview
The AI Company Action Plan v1 synthesizes outputs from all previous Elevio Skills AI engines into a unified, actionable operational roadmap for company administrators. It answers the fundamental executive questions: **What should this company do next, who should do it, why, and what is the expected learning outcome?**

It directly builds on and reuses:
- **Sprint 10T**: Grounded Recommendation Engine (`recommendationProvider.ts`, `recommendationProviders.ts`)
- **Sprint 10U**: AI Skills-Gap Engine (`aiSkillsGapService.ts`)
- **Sprint 10V**: Company & Department ESG Workforce Intelligence (`companyWorkforceIntelligenceService.ts`)
- **Sprint 10W**: Monthly Management Brief Engine (`monthlyManagementBriefService.ts`)
- **Sprint 10X**: ESG Workforce Readiness Indicator (`workforceReadinessService.ts`)
- **Skills Taxonomy & Course Catalog**: `skillsTaxonomy.ts` and published courses library
- **RBAC & Tenant Isolation**: `requireCompanyAdmin(req)` in `access.ts`

---

## Discovered Architecture & Grounding Rules

### 1. Deterministic Action Candidate Generation
Rather than permitting the LLM to invent arbitrary, non-existent training courses or unrealistic actions, `companyActionPlanService.ts` generates valid action candidate objects **100% deterministically**:
- **Departmental Course Assignments**: Recommends published courses for specific departments facing critical gaps.
- **Assessment Evidence Expansion**: Recommends participation drives for departments with `insufficient_sample`.
- **Company Priority Targeting**: Maps declared ESG training priorities (e.g. Waste Management) to eligible courses where workforce evidence is weak.
- **Governance / Leadership Drives**: Directs governance courses (`ELH-04`) to management or operations teams when governance readiness is low.

### 2. Gemini Candidate Ranking & Executive Framing Layer
- Gemini receives only the list of deterministically candidate actions and verified company metrics.
- Gemini ranks candidates by urgency and crafts executive justification prose.
- If Gemini fails or `GEMINI_API_KEY` is unavailable, the deterministic candidate order and template rationale are preserved (`providerTag: "fallback"`).

### 3. Action Contract Structure
Each generated action strictly adheres to:
```json
{
  "id": "action-dept-facilities-elh-02",
  "who": { "type": "department", "label": "Facilities" },
  "what": { "type": "assign_course", "courseId": 2, "courseCode": "ELH-02", "courseTitle": "Waste Sorting & Circular Economy" },
  "why": "Facilities demonstrated 2 critical assessment gaps in waste sorting.",
  "priority": "high",
  "expectedLearningOutcome": "Eliminate operational waste management compliance risks.",
  "evidence": ["2 critical quiz failures in Facilities department"],
  "status": "proposed"
}
```

---

## Key File Locations
- Action Plan Service: `/artifacts/api-server/src/lib/ai/companyActionPlanService.ts`
- Action Plan Tests: `/artifacts/api-server/src/lib/ai/companyActionPlan.test.ts`
- API Route: `GET /api/company/action-plan` in `/artifacts/api-server/src/routes/companies.ts`
- UI Component: `<CompanyActionPlanCard />` in `/artifacts/ecolearn/src/components/CompanyActionPlanCard.tsx`
