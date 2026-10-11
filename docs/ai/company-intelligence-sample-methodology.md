# Company & Department ESG Workforce Intelligence Sample Methodology v1

## Objective
To prevent misleading management insights derived from small or unrepresentative data samples, minimum sample protection rules are applied before generating department- or company-level claims.

---

## 1. Threshold Definitions

| Scope | Metric | Minimum Threshold | Action if Below Threshold |
|---|---|---|---|
| **Department Level** | Total Department Employees | 1 Employee | Evaluated |
| **Department Level** | Employees with Quiz / Learning Evidence | **2 Employees** | Mark department status as `insufficient_sample`. Suppress strong department comparisons. |
| **Company Level** | Total Company Employees | 1 Employee | Evaluated |
| **Company Level** | Employees with Quiz / Learning Evidence | **3 Employees** | Mark company profile as `hasSufficientEvidence: false`. Display standard insufficient evidence state. |

---

## 2. Rationale
- **Single-Learner Anomaly**: A single employee scoring 100% or 0% in a 10-person department does not reflect overall department competence.
- **Statistical Privacy**: Suppressing granular department claims when evidence count is < 2 prevents managers from inferring an individual employee's specific test results.
- **Data-Driven Guidance**: When samples are insufficient, the UI displays clear messaging instructing admins to assign courses or wait for assessment completions.
