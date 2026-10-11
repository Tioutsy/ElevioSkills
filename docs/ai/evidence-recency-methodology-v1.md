# Evidence Recency & Decay Methodology v1

## Principle
Historical training and assessment records are retained for auditing and progress tracking. However, recent assessment data is given higher weighting in current knowledge gap detection and recommendation ranking.

## Recency Weighting & Timestamp Tracking
1. **Latest Assessment Timestamp**:
   - The profile exposes `latestAssessmentDate` (ISO 8601 string) reflecting the most recent quiz attempt or course completion timestamp.
2. **Recency Weighting**:
   - Evidence within 90 days: Full weight (1.0).
   - Evidence within 90–365 days: Moderate weight (0.8).
   - Evidence older than 365 days: Refresh recommended (0.5), triggers optional refresher recommendations.
3. **Overriding Prior Weakness**:
   - When a new assessment attempt ($t_{\text{latest}} > t_{\text{previous}}$) passes with $\ge 80\%$, it overrides prior historical failures, moving the topic from "Knowledge Gap" to "Demonstrated Strength".
