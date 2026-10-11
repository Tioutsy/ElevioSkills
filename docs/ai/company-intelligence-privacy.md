# Company Workforce Intelligence Privacy & Governance Safeguards v1

## Objective
Ensure company-wide management reporting respects individual employee privacy and maintains strict tenant isolation without leaking identifiable personal assessment data.

---

## 1. Privacy Principles

1. **Aggregation Over Individual Profiling**:
   Company-level workforce intelligence synthesizes aggregated metrics (percentage coverage, strength counts, gap counts) across teams.

2. **No PII in LLM / Gemini Prompts**:
   When transmitting company or department metrics to Gemini for management interpretation, individual employee names, email addresses, and specific employee IDs are **completely stripped**. Only aggregated department totals and topic counts are provided.

3. **Minimum Sample Protection**:
   Department claims require at least 2 active learners with evidence to prevent single-person re-identification.

4. **Tenant Isolation**:
   `CompanyAccess` context strictly scopes all queries to the requesting company administrator's `companyId`. Cross-tenant queries are blocked at the database and middleware layers.

5. **Role-Based Access Control (RBAC)**:
   The `GET /api/companies/workforce-intelligence` endpoint is restricted to authenticated company administrators (`isCompanyAdmin: true`). Standard learners receive HTTP 403 Forbidden.
