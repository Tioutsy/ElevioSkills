# Non-Destructive Catalogue Expansion Blueprint (ELH-35 through ELH-136)

## Overview
This blueprint establishes the safe, non-destructive process for authoring and importing courses ELH-35 through ELH-136 in subsequent sprints, ensuring zero disruption to active learner progress, existing database records, or platform stability.

---

## 1. Course ID & Code Allocation Matrix

| Batch | Course Code Range | Sector / Focus Area | Target Subscription Tier | Minimum Required Questions |
|---|---|---|---|---:|
| **Batch 1** | `ELH-35` – `ELH-50` | Tourism, Hospitality, & Food Services | PROFESSIONAL | 10 |
| **Batch 2** | `ELH-51` – `ELH-65` | Textiles, Apparel, & Light Manufacturing | PROFESSIONAL | 10 |
| **Batch 3** | `ELH-66` – `ELH-80` | Agriculture, Agro-Processing & Blue Economy | PROFESSIONAL | 10 |
| **Batch 4** | `ELH-81` – `ELH-95` | Financial Services, Banking, & Fintech | PROFESSIONAL | 10 |
| **Batch 5** | `ELH-96` – `ELH-110` | Real Estate, Construction, & Smart Cities | COMPLETE | 10 |
| **Batch 6** | `ELH-111` – `ELH-125` | Logistics, Shipping, Port & Freezone Operations | COMPLETE | 10 |
| **Batch 7** | `ELH-126` – `ELH-136` | Retail, FMCG, Energy Transition & Executive ESG | COMPLETE | 10 (15 Capstone) |

---

## 2. Collision-Free Ingestion Guidelines

1. **Idempotent Primary Keys**:
   - Course IDs must begin sequentially from `ID 35` up to `ID 136`.
   - Never overwrite or mutate existing IDs `1` through `34`.
2. **Slug Uniqueness**:
   - Slugs must follow standard kebab-case naming (e.g. `sustainable-hotel-operations-mauritius`) and be validated against existing rows before insert.
3. **Migration Ledger Versioning**:
   - Record each batch in `systemSeedsTable` using discrete version tags (e.g. `sector-courses-batch-1-v1`).
4. **Referential Integrity Constraints**:
   - Lessons must reference valid `courseId` foreign keys.
   - Quiz questions must provide full text, 4 choices, 1 correct index, and educational explanation.
   - Prerequisites must not create circular graph references.

---

## 3. Provenance & Hash Registry

All runtime seed files are catalogued in `artifacts/api-server/src/recovery/forensic_search_evidence.json` with SHA-256 cryptographic signatures.
