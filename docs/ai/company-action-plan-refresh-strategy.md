# Company Action Plan Refresh & Caching Strategy

## Overview
To optimize performance and avoid unnecessary Gemini API calls on every page render, Company Action Plans are persisted and cached according to a structured lifecycle.

---

## 1. Persisted Caching
- Generated action plans are persisted in `companyActionPlansTable` and `companyActionPlanItemsTable` by `reportingPeriod` (e.g. `"2026-08"`).
- In-memory caching layers store active plans for immediate UI rendering ($< 5\text{ms}$ response time).

---

## 2. Refresh Triggers
An Action Plan is recomputed or refreshed only when:
1. An admin clicks the explicit **Refresh Plan** control in the dashboard UI.
2. A new Monthly Management Brief is generated for a new reporting period.
3. An administrator accepts, completes, or dismisses an action item (mutates item status without requiring full AI re-generation).
4. Major company ESG priorities are updated in company settings.
