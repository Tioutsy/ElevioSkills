# ESG Workforce Readiness Methodology Versioning & Persistence Strategy

## Overview
As ELEVIO SKILLS evolves, scoring weights and algorithms may be updated. To ensure historical integrity and prevent silent retro-active modifications to past executive reports, all generated readiness scores are persisted with explicit methodology version tags.

---

## 1. Snapshot Persistence Schema

Readiness snapshots are stored in `workforceReadinessSnapshotsTable`:

```typescript
export const workforceReadinessSnapshotsTable = pgTable("workforce_readiness_snapshots", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  reportingPeriod: text("reporting_period").notNull(), // "YYYY-MM"
  overallScore: integer("overall_score").notNull(),
  readinessBand: text("readiness_band").notNull(),
  evidenceConfidence: text("evidence_confidence").notNull(),
  environmentalScore: integer("environmental_score"),
  socialScore: integer("social_score"),
  governanceScore: integer("governance_score"),
  methodologyVersion: text("methodology_version").notNull().default("v1"),
  snapshotData: jsonb("snapshot_data"),
  generatedAt: text("generated_at"),
});
```

---

## 2. Version Rules

- **Current Active Version**: `"v1"`
- **Historical Immutability**: Historical snapshots (e.g. `reportingPeriod: "2026-07"`, `methodologyVersion: "v1"`) are immutable and will always return the exact score computed at that point in time.
- **Future Re-Weighting**: Any future updates to weights or penalty functions will increment `methodologyVersion` (e.g. `"v2"`). Historical snapshots will continue to display their original `"v1"` scores alongside their stored methodology version.
