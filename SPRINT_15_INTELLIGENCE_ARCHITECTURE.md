# SPRINT 15 — INTELLIGENCE LAYER ARCHITECTURE SPECIFICATION

## 1. Executive Summary

Sprint 15 introduces the **Sustainability Skills Intelligence Layer** to ELEVIO SKILLS. This architecture elevates the platform from *role-matched e-learning delivery* to *capability diagnostics, automated training needs analysis, and adaptive learning paths*.

---

## 2. Architectural Blueprint

```
+-------------------------------------------------------------------------+
|                  ELEVIO SKILLS INTELLIGENCE ARCHITECTURE                |
|                                                                         |
|  [ Learner Profile ] + [ Completed Courses ] + [ Assessment History ]  |
|                                  |                                      |
|                                  v                                      |
|            [ 1. Evidenced Competency Engine (0–4 Scale) ]               |
|                                  |                                      |
|        +-------------------------+-------------------------+            |
|        |                                                   |            |
|        v                                                   v            |
|  [ 2. Target Profile Engine ]                     [ 3. Competency Gap ] |
|  (Role + Dept + Seniority + Co Priority)           (Target - Evidenced) |
|        |                                                   |            |
|        +-------------------------+-------------------------+            |
|                                  |                                      |
|                                  v                                      |
|            [ 4. Adaptive Learning Paths & Next Best Course 2.0 ]         |
|                                  |                                      |
|       +--------------------------+--------------------------+           |
|       |                          |                          |           |
|       v                          v                          v           |
|  [ "My Skills" UX ]      [ Company Skills Map ]    [ Org Needs Analysis]|
|  (Learner Self-View)     (Department Health)       (Actionable TNA)     |
+-------------------------------------------------------------------------+
```

---

## 3. Core Engine Components

1. **Competency Evidence Engine (`calculateEvidencedProficiency`):** Derives verifiable capability levels ($0\text{--}4$) strictly from completed course archetypes, prerequisite achievements, and quiz scores ($\ge 80\%$). Engagement signals (points/streaks) are strictly excluded.
2. **Target Competency Engine (`calculateTargetProficiency`):** Formulates expected proficiency profiles based on organizational role, department, seniority tier, and client strategic priorities.
3. **Gap Prioritization Engine (`evaluateCompetencyGap`):** Computes capability deficits into 5 human-understandable states: `STRONG`, `ON_TRACK`, `DEVELOPING`, `PRIORITY_GAP`, `INSUFFICIENT_EVIDENCE`.
4. **Adaptive Next Best Course 2.0 (`getAdaptiveNextBestCourse`):** Deterministically guides learners to the highest-impact course to close priority gaps, while safeguarding mandatory compliance tracks.
5. **Organizational Training Needs Analysis (`generateCompanySkillsIntelligence`):** Aggregates team-level data to automatically surface top development areas, affected employee counts, and recommended course assignments.
