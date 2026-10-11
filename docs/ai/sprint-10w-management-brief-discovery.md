# Sprint 10W — AI Monthly Management Brief v1 Discovery Document

## Overview
The AI Monthly Management Brief v1 transforms existing ELEVIO SKILLS workforce intelligence into a structured, executive-ready monthly report for CEOs, HR managers, ESG officers, and Operations directors.

It directly reuses and synthesizes verified intelligence outputs from:
- **Sprint 10T**: 10T Recommendation Engine (`recommendationProvider.ts`, `recommendationProviders.ts`)
- **Sprint 10U**: AI Skills-Gap Engine (`skillsGapProvider.ts`, `aiSkillsGapService.ts`)
- **Sprint 10V**: Company & Department ESG Workforce Intelligence (`companyWorkforceIntelligenceService.ts`)
- **Skills Taxonomy**: `skillsTaxonomy.ts`
- **RBAC & Tenant Isolation**: `requireCompanyAdmin(req)` middleware in `access.ts`

---

## Architecture & Integration Strategy

### 1. Unified Intelligence Layer (No Parallel Engine)
Rather than creating a parallel analytics calculation, the Monthly Management Brief consumes the aggregated `CompanyWorkforceIntelligence` output produced by `companyWorkforceIntelligenceService.ts` and enriches it with:
- Month-over-month deterministic comparisons
- Emerging gap detection rules
- Grounded executive management summaries generated via Gemini (or rule-based fallback)
- Persistence in `managementBriefsTable` for historical retrieval and versioning

### 2. Reporting Period Management
- **Monthly Window**: Defaulting to the current or requested month (e.g., `2026-08`, `2026-07`).
- **Start/End Dates**: Expressed in standard ISO format (`2026-08-01` to `2026-08-31`).
- **Data Freshness**: Timestamped with `generatedAt` and `dataFreshnessTimestamp`.

### 3. Strict Deterministic Core + LLM Executive Layer
- All numbers (active learners, completion rates, evidence coverage, strength counts, gap severity counts, department breakdowns, MoM trend direction) are calculated **100% deterministically in TypeScript**.
- Gemini receives only anonymized, pre-calculated metric summaries to write concise management prose.
- Gemini is forbidden from inventing metrics, trends, departments, employee names, or claiming formal ESG regulatory compliance.

### 4. Storage & Historical Persistence
- Monthly briefs are stored in `managementBriefsTable` with versioning (`version: 1, 2...`).
- Historical months (`2026-07`, etc.) are immutable once archived, while the current month (`2026-08`) can be recalculated as new employee assessment data accumulates.

---

## Discovered Infrastructure & Components
- **API Router**: `/artifacts/api-server/src/routes/companies.ts` (Mounted at `/api/company`)
- **Company Access Middleware**: `requireCompanyAdmin(req)` in `/artifacts/api-server/src/lib/access.ts`
- **Company Page UI**: `/artifacts/ecolearn/src/pages/company/index.tsx`
- **UI Components**: `/artifacts/ecolearn/src/components/CompanyWorkforceIntelligenceCard.tsx`
