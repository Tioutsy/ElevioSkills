# Action Priority Methodology v1

## Overview
The AI Company Action Plan prioritises recommended workforce learning actions deterministically before passing candidates to the Gemini narrative layer. This prevents subjective or hallucinated prioritization and guarantees that critical organizational risks are addressed first.

---

## 1. Deterministic Priority Scoring Factors

Each candidate action is assigned a priority score $P \in [0, 100]$ computed as:

$$P = \text{Clamp}_{0}^{100}\left( S_{\text{gap}} + S_{\text{prio}} + S_{\text{reach}} + S_{\text{readiness}} - S_{\text{mitigation}} \right)$$

### Factor Weights

| Factor | Description | Points Impact |
|---|---|---|
| **Gap Severity ($S_{\text{gap}}$)** | **Critical Gaps** = +40 pts; **Moderate Gaps** = +25 pts; **Low Gaps** = +10 pts | **Up to +40 pts** |
| **Company ESG Priority ($S_{\text{prio}}$)** | Action directly targets a declared company ESG training priority | **+25 pts** |
| **Learner Group Reach ($S_{\text{reach}}$)** | Company-wide = +20 pts; Multi-department = +15 pts; Single department = +10 pts | **Up to +20 pts** |
| **Readiness Domain Weakness ($S_{\text{readiness}}$)** | Target domain subscore (E, S, or G) is $< 60 / 100$ | **+15 pts** |
| **Insufficient Sample Risk** | Department evidence coverage $< 20\%$ (`insufficient_sample`) | **+20 pts** |

---

## 2. Priority Band Mapping

Calculated scores map directly to controlled priority tiers:

| Priority Score Range | Action Priority Level | SLA / Recommended Action Timeline |
|---|---|---|
| **$\ge 70$ Points** | **`high`** | Urgent action recommended within current reporting period (30 days). |
| **$40 – 69$ Points** | **`medium`** | Action recommended within next 60 days. |
| **$< 40$ Points** | **`low`** | Maintain strength or low-priority optional enrichment. |

---

## 3. Gemini Guardrails
- Gemini may rank candidate actions within their deterministic priority band or refine narrative explanations.
- Gemini is **strictly forbidden** from overriding a `high` priority gap to `low` or promoting a low-evidence suggestion above critical compliance risks.
