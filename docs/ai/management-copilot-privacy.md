# Ask Elevio AI — Management Copilot Privacy Architecture

**Version:** 1.0  
**Effective Date:** August 10, 2026  

---

## 1. Zero PII Payload Policy

The Ask Elevio AI Management Copilot is engineered with strict privacy boundaries:
- **No Employee Names or Emails**: Tool function calls (`getDepartmentIntelligence`, `getCompanyWorkforceIntelligence`, etc.) strip individual learner identifiers before data is provided to Gemini.
- **Aggregated Data Only**: Intelligence payload values consist solely of department totals, percentage evidence coverage, topic gap ratios, readiness scores, and course titles.

---

## 2. Tenant Isolation & Role-Based Access Control (RBAC)

- **Server-Side Identity Verification**: All copilot queries resolve the authenticated company administrator's identity server-side using Clerk JWT session tokens.
- **Client Identifier Rejection**: Any client-supplied `companyId` parameter in API request bodies or parameters is explicitly ignored.
- **Learner Access Denial**: Non-admin learners attempting to access `/api/companies/copilot` are rejected immediately with `403 Forbidden`.
- **Cross-Tenant Guardrail**: Database query builders enforce `WHERE company_id = access.companyId` on every internal tool execution.

---

## 3. Data Flow & Boundary Diagram

```
[ Company Admin ] ---> [ POST /api/companies/copilot ]
                                |
                   (Authenticate & Validate Admin)
                                |
             [ Server-Side Function Calling Engine ]
                                |
        +-----------------------+-----------------------+
        |                                               |
[ Exec Backend Tools ]                    [ Strip PII & Build Context ]
- getWorkforceIntelligence                              |
- getWorkforceReadiness                   [ Call Gemini API (gemini-3.6-flash) ]
- getManagementBrief                                    |
- getCompanyActionPlan                    [ Structured Grounded Response ]
        |                                               |
        +-----------------------+-----------------------+
                                |
                 [ Return Grounded Answer to Admin UI ]
```

---

## 4. Model Training Exclusion

Data sent to Google Gemini via the `@google/genai` SDK under Enterprise API terms is not used to train or refine public AI models.
