# PRODUCTION MONITORING & INCIDENT ALERT RUNBOOK

## 1. Executive Summary

This runbook defines production monitoring thresholds, error visibility mechanisms, and operational alert escalation workflows for ELEVIO SKILLS.

---

## 2. Monitored Systems & Endpoints

| System / Component | Monitoring Mechanism | Health Metric / Endpoint | Alert Trigger Threshold |
| :--- | :--- | :--- | :--- |
| **API Availability** | Uptime Robot / Sentry | `GET /api/health` | 2 consecutive non-200 responses |
| **Database Pool** | Drizzle / PG Pool Stats | Active connection count & query duration | Query latency $> 1000\text{ ms}$ or pool exhaustion |
| **Auth & Sessions** | Security Logger | Failed login rate per IP | $> 10$ failed attempts in 5 minutes (Brute Force) |
| **Course Player** | Sentry Client Error Stream | Lesson render & video asset 404s | $> 5$ playback failures in 10 minutes |
| **Assessment Engine** | Application Logger | Quiz submission transaction errors | Any 500 error on assessment submission |
| **Certificate Engine** | Application Logger | PDF/credential generation failures | Any certificate generation failure |
| **Invitation Dispatch** | Transactional Mail Log | Email gateway bounce / drop rate | Delivery failure rate $> 5\%$ |

---

## 3. Critical Alert Classification & Response Matrix

- **SEV-1 (CRITICAL — 15m Response):** Platform unavailable, database connection dropped, or cross-tenant data leakage detected.
- **SEV-2 (HIGH — 1h Response):** Course player failing broadly, assessment submission errors, or invitation dispatch broken.
- **SEV-3 (NORMAL — 4h Response):** Individual learner login or progress sync issue on specific browser.
- **SEV-4 (LOW — Next Sprint):** Minor cosmetic text defect or non-critical styling anomaly.
