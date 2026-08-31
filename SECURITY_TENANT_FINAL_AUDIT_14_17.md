# SECURITY & TENANT ISOLATION FINAL AUDIT (Sprint 14.17)

## 1. Executive Summary

This audit assesses the platform's multi-tenant isolation, role-based access control (RBAC) authorization matrix, and indirect object reference (IDOR) protections across all endpoints.

---

## 2. Full Authorization Matrix (5 User Roles)

| Resource / Endpoint | Unauthenticated | Learner | Manager | Company Admin | Platform Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Public Catalogue View** | Read-Only | Read-Only | Read-Only | Read-Only | Full Access |
| **Personal Learning Path** | Denied (401) | Own Path | Own Path | Own Path | Any Tenant (Audit) |
| **Course Player & Quiz** | Denied (401) | Allowed | Allowed | Allowed | Allowed |
| **Company Admin Dashboard** | Denied (401) | Denied (403) | Denied (403) | Own Tenant Only| All Tenants |
| **Invite Employee / CSV** | Denied (401) | Denied (403) | Denied (403) | Own Tenant Only| All Tenants |
| **Company Priorities / Mandates**| Denied (401) | Denied (403) | Denied (403) | Own Tenant Only| All Tenants |
| **Tenant Export & Compliance**| Denied (401) | Denied (403) | Denied (403) | Own Tenant Only| All Tenants |
| **Platform Tenant Config** | Denied (401) | Denied (403) | Denied (403) | Denied (403) | Full Access |

---

## 3. Multi-Tenant Isolation & IDOR Verification

- **Learner Enrolment Isolation:** Querying `/api/learners/:id` enforces `WHERE id = :id AND company_id = :session_company_id`. Attempts to access learners in another tenant return `404 Not Found`.
- **Certificate Verification:** Public certificate verification verifies signature against the issuing tenant ID without exposing other learner metadata.
- **Priority & Mandatory Collision Isolation:** Company learning configuration is strictly keyed by `companyId`. Zero leakage of priority competencies across distinct tenant accounts.
- **IDOR Audit Finding:** **0 Vulnerabilities Detected**.
