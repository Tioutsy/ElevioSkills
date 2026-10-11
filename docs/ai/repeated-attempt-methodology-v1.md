# Repeated Attempt Evaluation Methodology v1

## Objective
Distinguish nuances in learner progression beyond raw peak scores. Evaluating attempt trajectories prevents misclassifying temporary struggles as persistent failures, or temporary lucky passes as mastery.

## Categorization Logic

Given a chronologically ordered series of quiz attempt scores $S = [s_1, s_2, \dots, s_n]$ for a course/topic:

1. **Sustained Mastery**:
   - Condition: $s_1 \ge 80$ AND $s_n \ge 80$.
   - Interpretation: Immediate and persistent understanding. Classified as **Demonstrated Strength**.

2. **Improving Learner**:
   - Condition: Initial score $s_1 < 70$ AND latest score $s_n \ge 80$ AND $s_n > s_1$.
   - Interpretation: Learner actively closed knowledge gap through study. Classified as **Demonstrated Strength** (with growth trajectory note).

3. **Persistent Repeated Weakness**:
   - Condition: $n \ge 2$ AND latest score $s_n < 70$ AND max score $\max(S) < 70$.
   - Interpretation: Multiple failed attempts with no milestone pass. Classified as **Critical Knowledge Gap**.

4. **Inconsistent Performance**:
   - Condition: Best score $\ge 70$ but latest score $s_n < 70$.
   - Interpretation: Skill decay or unreinforced learning. Classified as **Moderate Knowledge Gap**.

5. **Single Initial Failure**:
   - Condition: $n = 1$ AND $s_1 < 70$.
   - Interpretation: Initial attempt failure requiring review. Classified as **Moderate Knowledge Gap**.

## Summary Table

| Score Sequence | First Attempt | Latest Attempt | Best Attempt | Classification |
|---|---|---|---|---|
| `[85, 85, 85]` | 85 | 85 | 85 | Sustained Mastery (Strength) |
| `[45, 55, 85]` | 45 | 85 | 85 | Improving Learner (Strength) |
| `[40, 45, 42]` | 40 | 42 | 45 | Persistent Repeated Weakness (Critical Gap) |
| `[75, 60]` | 75 | 60 | 75 | Inconsistent Performance (Moderate Gap) |
| `[50]` | 50 | 50 | 50 | Single Initial Failure (Moderate Gap) |
