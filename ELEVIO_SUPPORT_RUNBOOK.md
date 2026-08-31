# ELEVIO SKILLS CUSTOMER SUPPORT RUNBOOK

## 1. Support Tier & Severity Matrix

| Severity Level | Definition & Criteria | Target Response | Target Resolution | Escalation Contact |
| :--- | :--- | :---: | :---: | :--- |
| **SEV-1 (CRITICAL)** | Entire platform down, cross-tenant data leak, or severe authentication failure. | **$< 15\text{ mins}$** | **$< 2\text{ hours}$** | Lead Engineer & CTO |
| **SEV-2 (HIGH)** | Core course playback broken, company onboarding blocked, or mass quiz failure. | **$< 1\text{ hour}$** | **$< 6\text{ hours}$** | Senior Product Engineer |
| **SEV-3 (NORMAL)** | Individual learner invitation bounce, progress sync error, or certificate rendering issue. | **$< 4\text{ hours}$** | **$< 24\text{ hours}$** | Support Tier 2 |
| **SEV-4 (LOW)** | Minor typo, general inquiry, or feature request. | **$< 24\text{ hours}$** | Next Release Cycle | Product Manager |

---

## 2. Standard Troubleshooting Procedures by Category

### A. Login & Invitation Issues
1. **Verify Invitation State:** Check if the invite token has expired ($>7$ days). If expired, click **Resend Invitation** in Company Admin.
2. **Safe Information Policy:** **NEVER** ask users for their passwords or auth tokens. Ask only for their registered work email address and browser version.

### B. Course Progress & Assessment Retries
1. **Inspect Lesson Completion:** If a lesson fails to mark complete, ensure the learner has scrolled through the full content.
2. **Resetting Assessment:** Quizzes permit unlimited retries; if a submission freezes due to network loss, guide the user to refresh the browser.

### C. Certificate & Badge Verification
1. **Verify Certificate Record:** Check that the learner scored $\ge 80\%$ and completed all prerequisite lessons in the database.
2. **Re-issuance:** If a PDF download stalls, trigger a certificate regeneration via the Admin verification modal.
