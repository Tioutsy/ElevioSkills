# Company Action Plan Privacy Safeguards & Zero-PII Policy

## Overview
The AI Company Action Plan Engine strictly enforces user privacy and data security. Company administrators receive group-level actionable intelligence without compromising individual employee privacy or sending personally identifiable information (PII) to external AI models.

---

## 1. Zero-PII Guarantee
- **No Individual Names or Emails Sent to Gemini**: Prompts sent to the Gemini API contain only aggregated department labels (e.g. `"Facilities"`, `"Operations"`) and group metrics.
- **Server-Side Learner Resolution**: If an approved action is assigned to learners, the individual user IDs and email addresses are resolved strictly on the secure backend server using `access.ts` RBAC rules. They are never exposed in AI prompts or LLM responses.

---

## 2. Department Sample Protection
- To prevent individual performance tracking, departments with fewer than 3 active employees or insufficient assessment records are masked under `sampleStatus: "insufficient_sample"`.
- Action recommendations for these departments focus exclusively on `increase_assessment_coverage` to build statistical confidence safely.
