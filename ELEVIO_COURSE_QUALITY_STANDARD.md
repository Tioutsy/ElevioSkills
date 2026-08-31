# ELEVIO SKILLS Permanent Instructional Design & Quality Standard

## 1. Vision & Educational Philosophy

ELEVIO SKILLS delivers high-impact, professional workplace sustainability training designed for commercial, hospitality, logistics, and enterprise organisations in Mauritius and across the region. 

ELEVIO SKILLS is committed to **genuine educational depth**. Our courses must never devolve into superficial awareness modules, generic compliance checklists, or empty promotional summaries. Every course must empower a learner to:
1. **Understand the subject** in accessible, plain workplace language.
2. **Understand why it matters** to business resilience, risk reduction, and environmental stewardship.
3. **Recognise the issue** in real operational environments (plant rooms, kitchens, offices, procurement tenders).
4. **Know what action to take** within their sphere of authority and know when to escalate safely.
5. **Demonstrate competence** through rigorous, scenario-based assessment.

---

## 2. Quality Tier Architecture & Production Gates

Every course in the ELEVIO SKILLS production catalogue is scored against the **10-Dimension Quality Audit Rubric** (maximum score: 100 points).

### Production Scoring Gates

| Score Range | Quality Classification | Production Status | Action Required |
| :--- | :--- | :--- | :--- |
| **$\ge 90$** | **Benchmark Standard** | Production Certified | Canonical reference for future course authoring. |
| **$80\text{--}89$** | **Strong Professional Course** | Production Certified | Standard target for all ELEVIO SKILLS courses. |
| **$70\text{--}79$** | **Acceptable Working Course** | Conditional Production | Minimum allowable threshold for deployment. |
| **$< 70$** | **Sub-Standard / Too Light** | **PROHIBITED FROM PRODUCTION** | Mandatory remediation before release. |

**Catalogue Standard Target:** The overall average score across the 34-course production catalogue must remain $\ge 80.0 / 100.0$, with **0 courses below 70.0**.

---

## 3. The 10-Dimension Pedagogical Rubric

Each course is evaluated out of 10 points per dimension:

1. **Practical Workplace Grounding (10 pts):**
   - Must open with a realistic commercial operational scenario (e.g. leaking valves, HVAC setpoints, tender claims).
   - Must avoid purely academic theory or high-level global abstractions without workplace context.

2. **Learning Objectives Precision (10 pts):**
   - Must define $5\text{--}8$ concrete, observable, Bloom's Taxonomy-aligned learning objectives.
   - Objectives must specify what the learner can *do* upon completion.

3. **Core Instructional Depth & Structural Flow (10 pts):**
   - Standard courses must deliver $5\text{--}6$ well-structured lessons ($20\text{--}30$ estimated minutes).
   - Lessons must progress logically: Hook &rarr; Core Mechanics &rarr; Operational Pathways &rarr; Action Boundaries &rarr; Commitment.

4. **Action Boundaries & Escalation Safety (10 pts):**
   - Must clearly define what an employee can do directly vs. what requires licensed specialists (electricians, certified engineers, legal counsel).
   - Must reinforce "Pause–Protect–Report–Record" or "STOP–CHECK–CONTROL–RECORD–ESCALATE".

5. **Interactivity & Scenario-Based Reflection (10 pts):**
   - Must embed $\ge 2$ (target 3) interactive `decision_scenario` blocks inside lesson bodies.
   - Scenarios must feature defensible professional dilemmas with constructive feedback on both correct and incorrect choices.

6. **Assessment Rigor & Item Diversity (10 pts):**
   - Standard courses must feature $\ge 8\text{--}10$ scenario-based quiz questions.
   - Questions must test practical decision-making rather than trivial true/false recall.

7. **Explanatory Feedback Quality (10 pts):**
   - Every question must provide explicit, educational `correctExplanation` and `incorrectExplanation`.
   - Feedback must explain *why* the choice is correct or risky.

8. **Differentiation & Anti-Duplication (10 pts):**
   - Paired courses (e.g. ELH-05 Non-Specialist Purchasing vs. ELH-26 Specialist Procurement; ELH-18 Internal Data vs. ELH-33 External Disclosures) must maintain distinct scopes, vocabularies, and target audiences.

9. **Tone, Language & Tone Consistency (10 pts):**
   - Clear, professional English accessible to diverse workforce tiers in Mauritius.
   - Grounded in local commercial realities (CEB, CWA, tropical humidity, island lagoon vulnerability).

10. **Data Integrity & Traceability (10 pts):**
    - Seeders must be fully idempotent, versioned in `systemSeedsTable`, and preserve learner progress, certificates, and badges.

---

## 4. Course Structure Guidelines

### Standard Lesson Sequence Template
```
Lesson 0: Opening Workplace Hook & Operational Challenge (with Decision Scenario)
Lesson 1: Core Mechanics & Conceptual Foundations
Lesson 2: Operational Impact Pathways & Workplace Realities (with Decision Scenario)
Lesson 3: Sourced Standards, Protocols & Compliance Safeguards
Lesson 4: Action Boundaries, Cross-Departmental Roles & Escalation
Lesson 5: Personal Workplace Action Commitment & Implementation Checklist
```

### Assessment Guidelines
- **Passing Threshold:** $80\%$ standard pass mark across all courses.
- **Question Stems:** Must present realistic operational scenarios (e.g. "A contractor asks...", "During a Monday morning inspection...", "A supervisor suggests...").
- **Distractors:** Plausible operational errors or common shortcuts, not absurd or humorous filler.

---

## 5. Ongoing Quality Control & Automated Guardrails

All future course additions and modifications must pass the automated test suite in `courseQualityGuardrails.test.ts`:
- Automated linting for lesson block structure and content density.
- Verification of quiz question count ($\ge 8\text{--}10$).
- Verification of embedded `decision_scenario` blocks ($\ge 2$).
- Verification of explanatory feedback on every question.
