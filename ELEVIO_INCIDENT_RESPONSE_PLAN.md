# ELEVIO SKILLS INCIDENT RESPONSE PLAN

## 1. Incident Lifecycle Overview

```
+-------------------------------------------------------------------------+
|                    ELEVIO INCIDENT RESPONSE PHASES                      |
|                                                                         |
|  [ 1. Detection ] ---> [ 2. Triage & Classify (SEV-1..4) ]              |
|                                  |                                      |
|                                  v                                      |
|  [ 4. Fix & Recovery ] <--- [ 3. Containment & Isolation ]              |
|         |                                                               |
|         v                                                               |
|  [ 5. Verification ] ---> [ 6. Communication ] ---> [ 7. Post-Mortem ]  |
+-------------------------------------------------------------------------+
```

---

## 2. Specific Security & Data Incident Procedures

### A. Suspected Cross-Tenant Data Exposure
1. **Immediate Containment:** Instantly isolate affected route/tenant session tokens.
2. **Audit Extraction:** Extract server access logs for the past 24 hours to determine exact scope of exposed records.
3. **Remediation & Patch:** Deploy hotfix with automated test preventing query regression.
4. **Mandatory Notification:** Notify impacted Company Admins within 72 hours in compliance with Mauritius DPA 2017.

### B. Corrupted Progress or Database Rollback
1. **Freeze Writes:** Temporarily place affected tenant in Read-Only maintenance mode.
2. **Point-In-Time Restore:** Restore database state to timestamp immediately preceding the corruption event.
3. **Verify Integrity:** Run automated validation suite (`npm test`) before restoring live traffic.

---

## 3. Reusable Incident Post-Mortem Template

```markdown
### ELEVIO Incident Report: [INC-YYYY-XXXX]
- **Date / Time:** YYYY-MM-DD HH:MM UTC
- **Severity:** [SEV-1 / SEV-2 / SEV-3]
- **Impacted Tenants:** [Tenant IDs or Global]
- **Duration:** XX Minutes
- **Executive Summary:** Brief explanation of the operational failure.
- **Root Cause Analysis (5 Whys):** Technical underlying defect.
- **Immediate Containment Action:** Steps taken to stop impact.
- **Permanent Remediation:** Architectural code fixes and new automated guardrail tests added.
```
