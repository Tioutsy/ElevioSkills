# Company & Department ESG Workforce Intelligence — Performance & Refresh Strategy

## Overview
The Company & Department ESG Workforce Intelligence AI Engine evaluates aggregated workforce learning data across an entire organization. Because generating multi-employee AI summaries and skills profile aggregations involves database queries and optional LLM calls (Gemini), a structured refresh and performance management strategy is established to guarantee sub-second dashboard rendering times and prevent unnecessary AI token overhead.

---

## 1. Aggregation & Computation Architecture

### Pre-Aggregated Skills Profiles
- Each employee's skills profile is evaluated independently by `generateEmployeeSkillsProfile(employeeId, access)`.
- Employee profiles leverage indexed database queries over `employee_course_progress` and `quiz_attempts`.
- Results are cached or resolved deterministically in memory before being combined at the company level.

### Fast Rule-Based Fallback Engine
- When `GEMINI_API_KEY` is absent, rate-limited, or times out (>12s), the system defaults instantly to `providerTag: "fallback"`.
- Computation time for full deterministic aggregation is **< 15 milliseconds** for up to 500 employees.

### Gemini AI Layer Optimization
- LLM prompt size is kept minimal by sending **anonymized, pre-aggregated top-5 topic counts and department metrics** rather than raw course logs or employee records.
- Response mime type is set to `application/json` with strict schema enforcing conciseness (max 2-3 sentences for executive summary).
- Strict 12-second abort controller timeout ensures dashboard rendering never hangs.

---

## 2. Invalidation & Trigger Events

Company Intelligence summaries are invalidated or recalculated upon key domain events:

| Event | Invalidation Trigger | Action Taken |
|---|---|---|
| **Course Completion** | Learner completes a course | invalidates React Query `["/api/company/workforce-intelligence"]` cache |
| **Quiz / Assessment Completion** | Quiz attempt submitted | Updates employee skill profile & invalidates workforce intelligence cache |
| **Employee Department Change** | Admin edits employee profile | Department summary weights updated on next request |
| **Skills Profile Generation** | Individual AI Skills profile updated | Refreshes employee's contribution to company strengths/gaps |
| **Company Training Priority Update** | Admin updates training priorities | Re-evaluates company priority coverage mapping |

---

## 3. Client-Side Caching (React Query)

- The frontend `CompanyWorkforceIntelligenceCard.tsx` consumes the API via TanStack `@tanstack/react-query`:
  ```typescript
  const { data: intelligence } = useQuery({
    queryKey: [queryUrl],
    queryFn: () => customFetch(queryUrl),
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
  });
  ```
- **Stale-While-Revalidate**: Renders instantly from local memory on repeat tab navigations within 5 minutes.
- **Department Filtering**: Switching department filters in the UI updates the query key (`/api/company/workforce-intelligence?department=Sales`), fetching or serving cached departmental slices without re-evaluating unrelated company data.

---

## 4. Privacy & Zero-PII Performance Guarantee

- **Zero-PII Processing**: Raw employee names, emails, and user IDs are scrubbed *before* metric aggregation and never sent to external LLM endpoints.
- **Payload Compression**: The API response payload is light (~3KB JSON), rendering instantly across web and mobile viewports.
