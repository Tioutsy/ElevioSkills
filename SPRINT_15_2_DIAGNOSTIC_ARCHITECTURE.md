# SPRINT 15.2 — DIAGNOSTIC ASSESSMENT ARCHITECTURE

## 1. Executive Summary

This architecture introduces pre-learning diagnostic capability to ELEVIO SKILLS. Diagnostics allow experienced learners to establish baseline evidence, preventing redundant introductory training while measuring empirical capability growth.

---

## 2. Diagnostic Architecture Flow

```
+-------------------------------------------------------------------------+
|                 ELEVIO PRE-LEARNING DIAGNOSTIC PIPELINE                 |
|                                                                         |
|  [ Learner Profile ] ---> [ 1. Blueprint Generator ]                    |
|                                     |                                   |
|                                     v                                   |
|                       [ 2. Adaptive Question Engine ]                   |
|                       (Branches by Difficulty 1–3)                      |
|                                     |                                   |
|                                     v                                   |
|                       [ 3. Immutable Baseline Snapshot ]                |
|                                     |                                   |
|        +----------------------------+----------------------------+      |
|        |                                                         |      |
|        v                                                         v      |
|  [ 4. Path Adaptation ]                                  [ 5. Impact Model ]|
|  (Deprioritizes Basic Electives;                         (Before vs After   |
|   Mandatory Tracks 100% Preserved)                        Learning Delta)   |
+-------------------------------------------------------------------------+
```

---

## 3. Core Engine Components

1. **Diagnostic Blueprint Generator (`generateDiagnosticBlueprint`):** Analyzes employee role, seniority, and missing evidence to build a tailored 3–9 question scope.
2. **Adaptive Branching (`getNextAdaptiveQuestion`):** Selects questions based on real-time correctness, stepping up to harder application scenarios or down to establish the baseline.
3. **Immutable Baseline Snapshot (`scoreDiagnosticSession`):** Stores pre-learning evidence separately from live progress, ensuring an unalterable audit trail.
4. **Measured Learning Impact (`calculateLearningImpact`):** Quantifies capability progress (`PROFICIENCY_INCREASED`, `EVIDENCE_STRENGTHENED`, `GAP_CLOSED`) without making unverified business claims.
