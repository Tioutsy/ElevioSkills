# SPRINT 15.2.1 — QUESTION EXPOSURE & RETAKE GOVERNANCE

## 1. Executive Summary

This policy establishes governance over diagnostic session limits, question exposure histories, and anti-gaming rules.

---

## 2. Exposure & Retake Rules

1. **Session Quotas:** A diagnostic session is capped at a maximum of 3 questions per competency (and 9 questions total per session) to prevent fatigue.
2. **Exposure Tracking:** Every presented question ID is logged with `learnerId`, `companyId`, `sessionId`, and `timestamp`.
3. **Retake Throttling:**
   - **Voluntary Retakes:** Allowed after a minimum 48-hour cooling period to avoid rapid brute-force enumeration.
   - **Reassessment After Course Completion:** Automatically unlocks upon achieving $\ge 80\%$ on relevant course assessments.
4. **Anti-Scraping Defenses:** Diagnostic APIs require active session tokens and return only the single active question payload; bulk question extraction via API pagination is completely blocked.
