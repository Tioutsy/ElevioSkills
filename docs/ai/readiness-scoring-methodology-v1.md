# ESG Workforce Readiness Scoring Methodology v1

## Overview
The ESG Workforce Readiness score is calculated using a transparent, deterministic weighted model based on verified platform assessment records.

---

## 1. Weighted Scoring Model (v1)

The overall score $S \in [0, 100]$ is computed as follows:

$$S = \text{Clamp}_{0}^{100}\left( W_{\text{cov}} \cdot S_{\text{cov}} + W_{\text{know}} \cdot S_{\text{know}} + W_{\text{prio}} \cdot S_{\text{prio}} + W_{\text{dept}} \cdot S_{\text{dept}} - P_{\text{gap}} \right)$$

### Factor Weights

| Factor | Description | Weight ($W$) | Max Component Points |
|---|---|---|---|
| **Evidence Coverage ($S_{\text{cov}}$)** | Ratio of employees with evaluated assessment evidence to total headcount | **25%** | 25 pts |
| **Demonstrated Knowledge ($S_{\text{know}}$)** | Average quiz pass rate & strength ratio among evaluated learners | **30%** | 30 pts |
| **Priority Topic Coverage ($S_{\text{prio}}$)** | Percentage of company-declared ESG priorities with demonstrated strengths | **25%** | 25 pts |
| **Department Coverage ($S_{\text{dept}}$)** | Ratio of company departments meeting minimum evidence sample size | **20%** | 20 pts |
| **Knowledge Gap Penalty ($P_{\text{gap}}$)** | Subtraction for critical assessment gaps across workforce | **Deduction** | Up to -15 pts |

---

## 2. Evidence Confidence Classification

To prevent high readiness scores driven by small or unrepresentative samples, a distinct **Evidence Confidence** label is assigned:

| Confidence Level | Evaluation Criteria |
|---|---|
| **LOW** | Fewer than 3 evaluated learners OR $< 20\%$ company evidence coverage |
| **MODERATE** | $3 \le n < 10$ evaluated learners AND $20\% \le \text{Coverage} < 50\%$ |
| **STRONG** | $\ge 10$ evaluated learners AND $\ge 50\%$ company evidence coverage |

---

## 3. Readiness Bands (Whole Number Display)

All scores are rounded to whole numbers ($0 - 100$) and mapped to four non-certifying internal bands:

| Score Range | Readiness Band | Interpretation |
|---|---|---|
| **0 – 39** | **Early** | Initial learning engagement; assessment evidence is sparse or developing. |
| **40 – 59** | **Developing** | Core foundational topics covered; partial departmental participation. |
| **60 – 79** | **Established** | Consistent passing evidence across key domains and declared priorities. |
| **80 – 100** | **Strong** | High evidence coverage, multi-department mastery, and minimal critical gaps. |

---

## 4. E / S / G Subscores

Subscores for **Environmental**, **Social**, and **Governance** domains are computed using the ratio of demonstrated strengths to total evaluated topics in that specific taxonomy domain:

$$\text{Subscore}_{\text{domain}} = \text{Clamp}_{0}^{100}\left( \frac{\text{Strength Count}_{\text{domain}}}{\text{Total Evaluated Topics}_{\text{domain}}} \times 100 \right)$$

If a domain has fewer than 2 evaluated assessment records, its status returns `"insufficient_evidence"`.
