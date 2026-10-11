# Sprint 10X — ESG Workforce Readiness Indicator v1 Discovery Document

## Overview
The ESG Workforce Readiness Indicator v1 provides company administrators (CEOs, HR Directors, ESG Officers) with an evidence-backed benchmark assessing workforce preparation across Environmental, Social, and Governance (ESG) learning domains.

The indicator directly reuses and synthesizes verified intelligence outputs from:
- **Sprint 10T**: Grounded course recommendation engine (`recommendationProvider.ts`)
- **Sprint 10U**: AI Skills-Gap Engine (`aiSkillsGapService.ts`)
- **Sprint 10V**: Company & Department ESG Workforce Intelligence (`companyWorkforceIntelligenceService.ts`)
- **Sprint 10W**: Monthly Management Brief Engine (`monthlyManagementBriefService.ts`)
- **Skills Taxonomy**: Mapped ESG knowledge domains and topics (`skillsTaxonomy.ts`)
- **RBAC & Tenant Isolation**: `requireCompanyAdmin(req)` middleware in `access.ts`

---

## Discovered Architecture & Integration Strategy

### 1. Zero Parallel Engine Mandate
The Readiness Indicator does **not** recalculate raw course logs or create a duplicate analytics layer. Instead, it consumes the aggregated, zero-PII outputs of `generateCompanyWorkforceIntelligence` and evaluates them using a deterministic, weighted scoring algorithm.

### 2. Explicit Non-Certification Boundary
The UI and data contract explicitly clarify that the Workforce Readiness Indicator measures **internal training exposure and assessment evidence only**. It is strictly NOT:
- An ESG rating or corporate sustainability index
- An ESG regulatory compliance metric or audit report
- Proof of physical emissions reduction or environmental performance
- Verified professional workplace competence

### 3. Separation of Score vs. Evidence Confidence
- **Readiness Score (0–100)**: Whole integer reflecting workforce demonstrated knowledge and topic coverage.
- **Evidence Confidence ("LOW" | "MODERATE" | "STRONG")**: Distinct classification indicating the volume and depth of evaluated assessment records backing the score.

### 4. Deterministic Core + Gemini Narrative Layer
- Numerical score, domain subscores (E, S, G), department scores, readiness bands, and trend direction are calculated **100% deterministically in TypeScript**.
- Gemini receives only pre-calculated scores to write executive narrative explanations.
- If Gemini fails or `GEMINI_API_KEY` is missing, the system defaults instantly to deterministic fallback narratives.

---

## Discovered File Pathways
- Database Schema: `/lib/db/src/index.ts`
- AI Services Directory: `/artifacts/api-server/src/lib/ai/`
- API Company Router: `/artifacts/api-server/src/routes/companies.ts`
- Company Dashboard Page: `/artifacts/ecolearn/src/pages/company/index.tsx`
