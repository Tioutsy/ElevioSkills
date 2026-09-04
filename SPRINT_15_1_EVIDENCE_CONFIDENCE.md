# SPRINT 15.1 — EVIDENCE CONFIDENCE ARCHITECTURE

## 1. Executive Summary

ELEVIO SKILLS separates **Evidenced Proficiency** (what the learner demonstrated) from **Evidence Confidence** (how much supporting data exists).

---

## 2. Confidence State Definitions

| Confidence Level | Operational Definition | Concrete Trigger Conditions | UI Presentation |
| :---: | :--- | :--- | :--- |
| **NONE** | No evidence recorded. | Zero completed courses in this competency domain. | "Not Yet Evidenced" |
| **LOW** | Preliminary / limited evidence. | 1 completed course, or historical completion lacking telemetry. | "Working Knowledge (More evidence needed)" |
| **MODERATE** | Solid single-source evidence. | 1 comprehensive specialist/strategic course with $\ge 85\%$ quiz score. | "Applied (Moderate confidence)" |
| **HIGH** | Robust multi-source verification. | 2+ independent completed courses & passed assessments in this domain. | "Applied (High confidence)" |

---

## 3. UI Guidelines & Developmental Tone

- **Low Confidence $\ne$ Low Competence:** Low confidence simply means the platform has limited data. The interface displays "More learning evidence needed" rather than flagging the learner as deficient.
- **Historical Evidence Preservation:** Pre-Sprint 15 course completions are retained at full completion credit with `LOW` confidence until additional granular assessments are completed.
