# ELEVIO SKILLS Intelligent Learning Path Engine Technical Specification

## 1. Executive Summary & Purpose

The **ELEVIO Intelligent Learning Path Engine (ILPE)** is a deterministic, rule-based algorithmic scoring system designed to generate personalized, bounded learning journeys for corporate employees across Mauritius and regional commercial markets.

---

## 2. Mathematical Scoring Model

For any active course $c \in \mathcal{C}$ and learner $L = (\text{Sector}, \text{Dept}, \text{JobFamily}, \text{Seniority})$ with company context $\mathcal{K}$, the relevance score $R(c, L, \mathcal{K})$ is computed as follows:

$$R(c, L, \mathcal{K}) = S_{\text{mand}}(c, \mathcal{K}) + S_{\text{univ}}(c) + S_{\text{role}}(c, L) + S_{\text{dept}}(c, L) + S_{\text{sec}}(c, L) + S_{\text{sen}}(c, L) + S_{\text{prio}}(c, \mathcal{K}) - P_{\text{conflict}}(c, L)$$

### Scoring Factors & Weights

| Factor | Criterion | Value | Rationale |
| :--- | :--- | :---: | :--- |
| **$S_{\text{mand}}$** | `c.courseCode` $\in \mathcal{K}.\text{mandatoryCourseCodes}$ | **$+200$ pts** | Overrides all filters; mandates tenant-specific compliance. |
| **$S_{\text{univ}}$** | `c.isEssentialUniversal = true` | **$+100$ pts** | Guarantees essential baseline on onboarding. |
| **$S_{\text{role}}$** | $L.\text{jobFamily} \in c.\text{applicableJobFamilies}$ | **$+40$ pts** | Direct role-specific standard operating procedures. |
| **$S_{\text{dept}}$** | $L.\text{department} \in c.\text{applicableDepartments}$ | **$+30$ pts** | Functional department workflows (HR, Finance, FM). |
| **$S_{\text{sec}}$** | $L.\text{sector} \in c.\text{applicableSectors}$ | **$+25$ pts** | Industry-specific environmental context. |
| **$S_{\text{sen}}$** | $L.\text{seniority} \in c.\text{applicableSeniorityTiers}$ | **$+20$ pts** | Managerial KPI oversight and strategic governance. |
| **$S_{\text{prio}}$** | $c.\text{primaryCompetency} \in \mathcal{K}.\text{strategicPriorities}$ | **$+20$ pts** | Company strategic focus area booster. |
| **$P_{\text{conflict}}$** | Role/Seniority/Sector Mismatch | **$-35\text{ to }-60$ pts**| Protects frontline learners from executive governance & prevents cross-sector noise. |

---

## 3. Assignment Tiers & Thresholds

```
┌─────────────────────────────────────────────────────────────┐
│ REQUIRED TIER (Active Mandatory Onboarding & Role Courses)  │
│ Condition: IsMandatory OR IsEssentialUniversal OR R ≥ 115    │
│ Path Length Cap: 6 (Frontline) / 9 (Supervisors) / 11 (Mgr) │
├─────────────────────────────────────────────────────────────┤
│ RECOMMENDED TIER (High-Value Sector & Department Skills)   │
│ Condition: 80 ≤ R < 115                                     │
│ Path Length Cap: Up to 8 courses                            │
├─────────────────────────────────────────────────────────────┤
│ OPTIONAL TIER (Self-Paced Cross-Functional Electives)       │
│ Condition: R < 80                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Tenant Isolation & Safety Controls

1. **Company Priority Isolation:** Strategic priority boosts and mandatory course locks are strictly scoped to the learner's `companyId`.
2. **Deterministic Output:** Zero external generative AI dependency. All assignments are reproducible, auditable, and testable in unit test suites.
3. **Historical Progress Preservation:** Completed course records permanently satisfy prerequisites and are automatically filtered out from active learning roadmaps.
