# ELEVIO SKILLS Path Assignment Explainability Specification

## 1. Executive Purpose & Product Requirement

To build trust and transparency with corporate learners and Company Administrators, every course assigned or recommended by the ELEVIO Intelligent Learning Path Engine includes a deterministic **"Why this course?"** explanation.

The explanation must reflect the exact algorithmic match factors that triggered the assignment.

---

## 2. Deterministic Explanation Rules & Templates

| Trigger Factor | Match Condition | User-Facing Explanation String |
| :--- | :--- | :--- |
| **Mandatory Override** | Company Admin designated mandatory | *"Designated as Mandatory Company Training by your organization."* |
| **Essential Universal** | `isEssentialUniversal = true` | *"Essential core sustainability training for all employees."* |
| **Job Family Match** | Exact job family match | *"Tailored for your job family ({JobFamilyName})."* |
| **Department Match** | Department code match | *"Specific to your department ({DepartmentName})."* |
| **Sector Match** | Industry sector match | *"Designed for the {SectorName} sector."* |
| **Supervisor Match** | `SEN_SUPERVISOR` match | *"Includes supervisory & shift leadership skills."* |
| **Manager Match** | `SEN_MANAGER` match | *"Includes departmental management & KPI oversight."* |
| **Executive Match** | `SEN_EXECUTIVE` match | *"Covers strategic governance & executive leadership."* |
| **Company Priority** | Matches company strategic priority | *"Supports company strategic priority ({PriorityCompetencyName})."* |
| **Promotion Event** | Transition to supervisor/manager | *"Added to your path following your promotion to {NewRole}."* |

---

## 3. Combined Multi-Factor Examples

1. **Hotel Housekeeper (`ELH-35: Sustainable Housekeeping Operations`):**
   > *"Tailored for your job family (FRONTLINE); Specific to your department (HOUSEKEEPING); Designed for the HOSPITALITY sector."*

2. **Facilities Manager (`ELH-27: Sustainability for Facilities Teams`):**
   > *"Tailored for your job family (MANAGER); Specific to your department (FACILITIES); Includes departmental management & KPI oversight."*

3. **Commercial Credit Analyst (`ELH-75: Sustainable Lending & Green Credit Underwriting`):**
   > *"Tailored for your job family (PROFESSIONAL); Specific to your department (FINANCE); Designed for the FINANCE sector."*

4. **Company-Mandated Ethics Course (`ELH-32: Ethics, Governance & Responsible Business`):**
   > *"Designated as Mandatory Company Training by your organization."*
