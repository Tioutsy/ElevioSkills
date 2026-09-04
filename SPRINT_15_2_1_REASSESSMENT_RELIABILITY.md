# SPRINT 15.2.1 — REASSESSMENT RELIABILITY SPECIFICATION

## 1. Executive Summary

This specification guarantees that post-learning reassessments measure genuine capability growth rather than memory of previously seen questions.

---

## 2. Equivalent Item Group Mechanics

1. **Paired Diagnostic Equivalents:** Each competency features paired items within dedicated groups (e.g. `DIAG-ENG-02A` in Hospitality vs `DIAG-ENG-02B` in Manufacturing within `GRP_ENG_D2_HVAC`).
2. **Reassessment Selection Algorithm:** When a learner triggers a post-learning reassessment:
   - The engine queries the learner's historical question exposure table.
   - It filters candidate items to strictly select **unseen equivalent items** from the same group.
3. **Anti-Memorization Assurance:** A learner who memorized the exact answer to `DIAG-WAT-01A` will face `DIAG-WAT-01B` during reassessment, testing the underlying conceptual understanding rather than pattern recall.
