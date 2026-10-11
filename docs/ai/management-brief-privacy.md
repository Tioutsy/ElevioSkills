# Monthly Management Brief Privacy & Anonymization Architecture

## Overview
The Monthly Management Brief is designed for executive presentation (CEOs, Board Members, Department Heads). To safeguard individual employee privacy and comply with enterprise data protection standards, strict zero-PII aggregation protocols are enforced across all brief generation steps.

---

## Privacy Safeguards & Anonymization Rules

1. **Zero-PII Prompt Construction**:
   - Individual employee names, email addresses, phone numbers, and external user IDs (`clerkUserId`, `id`) are **100% stripped** prior to metric aggregation.
   - LLM prompts sent to the Gemini API contain only anonymized, high-level counts and topic statistics (e.g., *"12 learners in Facilities demonstrated strength in Energy Efficiency"*).

2. **Aggregated Group-Level Reporting**:
   - Management briefs report on department-level and company-wide metrics.
   - Individual quiz answers, specific question failures, or named employee performance profiles are never exposed in executive management briefs.

3. **Small Sample Protection (k-Anonymity)**:
   - Departments with fewer than 2 evaluated learners are marked with `sampleStatus: "insufficient_sample"` to prevent single-person performance reverse-engineering.

4. **Role-Based Access Control (RBAC)**:
   - Management briefs are accessible exclusively to verified Company Administrators (`requireCompanyAdmin(req)`).
   - Learners cannot access management briefs (`HTTP 403`).
   - Cross-tenant access is strictly blocked through server-resolved session validation (`access.companyId`).
