# Monthly Management Brief Performance & Refresh Strategy

## Overview
To provide instant page load performance (< 100ms) for executive dashboards while avoiding unnecessary AI model execution costs, the Monthly Management Brief implements a tiered persistence and caching strategy.

---

## Performance & Caching Architecture

### 1. Persisted Historical Briefs
- Historical monthly briefs (e.g. closed previous months like `2026-07`) are generated once and persisted in `managementBriefsTable`.
- Requests for past months are served directly from the database without invoking Gemini or re-running skills-gap aggregations.

### 2. Current Month Live Preview & Stale-While-Revalidate Caching
- For the active current month (e.g. `2026-08`), the brief is computed dynamically and cached in memory / React Query for **15 minutes**.
- Subsequent dashboard visits within the cache window serve the rendered brief instantly.
- If new quiz completions or course assignments occur, cache invalidation tags ensure fresh data on next explicit refresh.

### 3. Automated End-of-Month Finalization
- At month-end (or upon first admin request in a new month), the previous month's final brief is automatically synthesized and saved as the immutable monthly record.
- No manual intervention by Elevio staff is required.

### 4. Fast Deterministic Fallback Engine
- If Gemini API is unconfigured, rate-limited, or exceeds the 12-second request timeout, the system immediately returns a structured brief utilizing deterministic rule-based templates (`providerTag: "fallback"`).
- Dashboard rendering is guaranteed never to hang or fail.
