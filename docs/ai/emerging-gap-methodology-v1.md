# Emerging Knowledge Gap Methodology v1

## Overview
The Emerging Gap Detection module identifies newly forming workforce knowledge weaknesses across company departments before they escalate into widespread operational or ESG compliance risks.

---

## Detection Rules & Criteria

A knowledge topic is flagged as an **"Emerging Gap"** when it satisfies at least one of the following grounded deterministic conditions:

1. **Active Deterioration in Recent Assessments**:
   - The topic had a low gap frequency in the prior period (<15% of evidence learners), but recent quiz attempts in the current month show a failure rate >35%.
   - Isolates recent downward trends from historical performance.

2. **Repeated Weakness Escalation**:
   - Multiple employees in the same department score below passing threshold (<60%) on the same knowledge topic across 2 or more quiz attempts.
   - Prevents overreacting to a single isolated failed question or one-off quiz attempt.

3. **Domain Expansion Risk**:
   - A gap flagged in one department (e.g., Facilities) begins appearing in a second related department (e.g., Operations) during the current reporting month.

---

## Signal Filtering & Safety Safeguards

To maintain executive signal quality and avoid alert fatigue:
- **Minimum Sample Barrier**: A topic must have at least 2 distinct assessment records in the current month before being evaluated for emerging gap status.
- **Single-Question Exclusion**: Single incorrect answers on non-core quiz questions are ignored.
- **Clear Actionability**: Every flagged emerging gap must map directly to an actionable catalog course in the ELEVIO SKILLS library.
