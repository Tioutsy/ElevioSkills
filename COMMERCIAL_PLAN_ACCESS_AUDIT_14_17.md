# COMMERCIAL PLAN & ACCESS CONTROL AUDIT (Sprint 14.17)

## 1. Executive Summary

This audit reviews commercial plan entitlements, access control gating, and pilot pass trial lifecycles to ensure reliable monetization and seamless upgrade pathways.

---

## 2. Commercial Tier Entitlement Matrix

| Feature / Capability | Pilot / Trial Pass | Standard Enterprise | Professional Enterprise | Custom Multi-Entity |
| :--- | :---: | :---: | :---: | :---: |
| **Learner Capacity** | Up to 25 Learners | Up to 100 Learners | Up to 500 Learners | Unlimited |
| **Catalogue Access** | Full 136 Courses | Full 136 Courses | Full 136 Courses | Full 136 Courses |
| **Intelligent Learning Paths**| Active | Active | Active | Active |
| **Strategic Company Priorities**| 2 Priorities | 4 Priorities | All Priorities | All Priorities |
| **Mandatory Overrides** | 1 Course | 3 Courses | Unlimited | Unlimited |
| **Certificates & Badges** | Active | Active | Active | Active |
| **Advanced CSV & ESG Audit Export**| Standard | Standard | Advanced ISAE 3000 | Multi-Tenant API |

---

## 3. Graceful Gating & Trial Expiration

1. **No Client-Hostile 403 Errors:** If a user attempts to access an unentitled feature (e.g. adding a 5th priority on a Standard plan), a clean modal explains the plan limit with an upgrade request button.
2. **Non-Destructive Trial Expiry:** When a 14-day or 30-day pilot pass expires:
   - Learner progress, completed courses, earned badges, and issued certificates remain **100% preserved**.
   - Admin access switches to Read-Only mode with a prominent renewal banner.
   - Zero learner data is purged.
