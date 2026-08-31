# ELEVIO SKILLS DATABASE BACKUP & RECOVERY PLAN

## 1. Backup Strategy & Automation

- **Automated Snapshots:** Continuous Write-Ahead Logging (WAL) with daily full PostgreSQL database snapshots at 02:00 UTC.
- **Snapshot Retention:** 30 days of rolling daily snapshots; point-in-time recovery (PITR) available down to the minute within the last 7 days.
- **Offsite Storage:** Encrypted backups stored in geo-redundant object storage with immutable write-once protection.

---

## 2. Recovery Objectives (Internal Operational Targets)

| Operational Metric | Internal Operational Target | Context & Scope |
| :--- | :---: | :--- |
| **Recovery Point Objective (RPO)** | **$< 15\text{ Minutes}$** | Maximum acceptable data loss window in extreme catastrophic loss. |
| **Recovery Time Objective (RTO)** | **$< 60\text{ Minutes}$** | Maximum operational time to provision a standby instance and restore data. |

> *Note: These are internal engineering SLAs and do not represent contractual customer guarantees.*

---

## 3. Step-by-Step Restoration Runbook

1. **Catastrophic Failure Detection:** On-call engineer identifies data corruption or database hardware loss.
2. **Isolate Standby Instance:** Provision a new clean PostgreSQL instance in the designated recovery cluster.
3. **Download Snapshot:** Pull latest verified snapshot corresponding to the target PITR timestamp.
4. **Restore Command:**
   ```bash
   pg_restore --clean --if-exists -d elevio_prod_recovery snapshot_YYYYMMDD.dump
   ```
5. **Verify Restored Integrity:**
   - Execute test query: `SELECT count(*) FROM courses WHERE status = 'published';` (Must return exactly 136).
   - Verify sample tenant: Ensure completed progress, certificates, and learner records are intact.
6. **DNS / Connection Switch:** Re-point `DATABASE_URL` to the restored instance and restart API server services.
7. **Post-Restore Smoke Test:** Execute `/api/health` and verify zero tenant data corruption.
