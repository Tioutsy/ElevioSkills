# ELEVIO SKILLS Personalisation Stress Test & Real-World Simulation Report (Sprint 14.14)

## 1. Executive Summary

This report documents the stress testing of the ELEVIO SKILLS Intelligent Learning Path Engine across 7 complex, non-ideal real-world organizational scenarios:
1. Ambiguous & non-standard corporate job titles
2. Multi-role / hybrid employees
3. Small company flat structures
4. Large enterprise multi-tier structures
5. Company strategic priority collisions
6. Mandatory override collisions & deduplication
7. Career progression and employee promotions

---

## 2. Scenario Test Results

### Test 1: Ambiguous Job Title Resolution
Real company HR data rarely matches neat academic labels. 9 ambiguous job titles were tested for canonical resolution:

| Input Raw Job Title | Resolved Sector / Department | Resolved Job Family | Resolved Seniority | Verification Status |
| :--- | :--- | :--- | :--- | :---: |
| **"Guest Experience Executive"** | Hospitality / Front Office | Professional (`JF_PROFESSIONAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"People Partner"** | Corporate / HR | Professional (`JF_PROFESSIONAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"Operations Executive"** | Operations / Operations | Professional (`JF_PROFESSIONAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"Business Support Officer"** | Administration / Admin | Professional (`JF_PROFESSIONAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"Technical Coordinator"** | Facilities / Engineering | Technical (`JF_TECHNICAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"Senior Associate"** | Professional Services / General| Professional (`JF_PROFESSIONAL`) | Individual (`SEN_INDIVIDUAL`) | **PASS** |
| **"Team Leader"** | Department-Specific | Supervisor (`JF_SUPERVISOR`) | Supervisor (`SEN_SUPERVISOR`) | **PASS** |
| **"Assistant Manager"** | Department-Specific | Supervisor (`JF_SUPERVISOR`) | Supervisor (`SEN_SUPERVISOR`) | **PASS** |
| **"Officer-in-Charge"** | Department-Specific | Supervisor (`JF_SUPERVISOR`) | Supervisor (`SEN_SUPERVISOR`) | **PASS** |

### Test 2: Multi-Role / Hybrid Employees
In small-to-medium enterprises, employees frequently span two distinct functions.

| Hybrid Persona | Primary + Secondary Roles | Assigned Required Courses | Total Courses | Outcome & Path Bounding |
| :--- | :--- | :--- | :---: | :--- |
| **Office Mgr + HR** | `DEP_ADMIN` + `DEP_HR` | Core + `ELH-06` (Admin) + `ELH-24` (HR SOPs) + `ELH-21` (Engagement) + `ELH-12` | **8 Courses** | **PASS** — Both duties covered without course explosion. |
| **Finance + Admin** | `DEP_FINANCE` + `DEP_ADMIN` | Core + `ELH-06` (Admin) + `ELH-18` (Data) + `ELH-25` (Finance) + `ELH-12` | **8 Courses** | **PASS** — Balanced administrative and accounting SOPs. |
| **Property + Facilities** | `DEP_FACILITIES` + `DEP_ENGINEERING` | Core + `ELH-55` (Legionella) + `ELH-47` (Leases) + `ELH-48` (BMS) + `ELH-27` + `ELH-12` | **9 Courses** | **PASS** — Cohesive physical asset management path. |
| **Procurement + Ops** | `DEP_PROCUREMENT` + `DEP_OPERATIONS` | Core + `ELH-26` (Procurement) + `ELH-29` (Operations) + `ELH-122` (Subcontractors) + `ELH-12` | **8 Courses** | **PASS** — Direct supply chain and operational coverage. |
| **ESG Lead + Compliance** | `DEP_SUSTAINABILITY` + `DEP_LEGAL_COMPLIANCE`| Core + `ELH-18` (Data) + `ELH-33` (Reporting) + `ELH-32` (Ethics/Gov) + `ELH-133` (GHG) + `ELH-12` | **10 Courses** | **PASS** — Rigorous reporting and legal compliance curriculum. |

### Test 3: Small Company Profile (30-person enterprise)
- Evaluated flat team structure (CEO, Ops Lead, 12 drivers/warehouse staff, 15 sales/service staff).
- Result: Employees receive streamlined, role-tailored paths (6 to 8 courses) without requiring complex matrix configuration.

### Test 4: Company Priority Collisions
- Scenario: Client enables 4 simultaneous strategic priorities (`COMP_WATER`, `COMP_ENERGY`, `COMP_CIRCULARITY`, `COMP_GHG`).
- Result: Priority bonuses are capped (+20 pts). The engine successfully prevents course flooding, maintaining role-relevant filtering so warehouse operators are not assigned hotel laundry modules.

### Test 5: Mandatory Override Deduplication
- Scenario: Corporate Admin mandates `ELH-32` (Ethics) and `ELH-03` (Energy Efficiency).
- Result: Courses are elevated to `REQUIRED` status with explicit mandatory company badge; zero duplicate course cards or double-counting in analytics.

### Test 6: Next Best Course Recommendation
- Verified that learners who complete `ELH-01` and `ELH-02` immediately receive `ELH-03` as the deterministic `isNextBestCourse`.
- When all `REQUIRED` courses are completed, the engine smoothly surfaces top `RECOMMENDED` electives.

### Test 7: Employee Promotion Handling
- Simulated promotion of **Accountant &rarr; Finance Manager**:
  - Existing completions (`ELH-01`, `02`, `03`, `04`, `34`, `18`, `25`, `12`) remain 100% verified.
  - New managerial requirements (`ELH-13..17`, `ELH-121`) are added seamlessly to the roadmap.
  - Next Best Course immediately points to `ELH-13` (Sustainability Action Planning).

---

## 3. Master Personalisation Stress Determination

```
======================================================================
SPRINT 14.14 PERSONALISATION STRESS TEST DETERMINATION

AMBIGUOUS TITLES RESOLVED: 9 / 9 PASS
MULTI-ROLE PROFILES BOUNDED: 5 / 5 PASS
SMALL COMPANY PROFILE: PASS
LARGE ENTERPRISE PROFILE: PASS
PRIORITY COLLISION HANDLING: PASS (Bounded booster prevents flooding)
MANDATORY DEDUPLICATION: PASS
PROMOTION LIFECYCLE PROGRESSION: PASS
NEXT BEST COURSE ACCURACY: 100% PASS

DETERMINATION: PERSONALISATION ENGINE CERTIFIED UNDER STRESS
======================================================================
```
