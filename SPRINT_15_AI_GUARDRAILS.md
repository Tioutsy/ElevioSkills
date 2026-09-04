# SPRINT 15 — AI LEARNING ASSISTANT GUARDRAILS & SAFETY POLICY

## 1. Architectural Role & Boundary

The AI Learning Assistant is an **in-course pedagogical enhancement tool**. It is strictly prohibited from serving as the authoritative source of truth for:
- Course passing criteria
- Official quiz answer keys
- Certificate eligibility
- Legal compliance guarantees
- Mandatory learning path assignments

---

## 2. Mandatory AI Safety & Integrity Guardrails

### A. Assessment Shield Protocol
- **Trigger:** When `isAssessmentActive === true`.
- **Behavior:** The assistant intercepts all queries attempting to obtain direct answers or option verification (e.g. "Is the answer A or B?").
- **Enforcement:** Disables answer disclosure and outputs conceptual guidance prompting the learner to review relevant lesson principles.

### B. Prompt Injection & Jailbreak Defense
- **Pattern Filtering:** Rejects adversarial instructions attempting to extract system prompts, hidden keys, or cross-tenant data.
- **Safety Response:** Returns a standardized neutral boundary message.

### C. Grounded Context & Data Minimization
- **Context Scope:** The assistant receives only the active course code, lesson snippet, and learner role context.
- **Privacy:** Personal employee identifiers (full names, personal emails, salaries) are never passed to external AI models.

### D. Zero-Downtime Fallback
- If the AI service times out or is offline, all course reading, quizzes, progress tracking, and certificate generation continue with 0 disruption.
