# Ask Elevio AI — Copilot Data Retention Strategy

**Version:** 1.0  
**Effective Date:** August 10, 2026  

---

## Overview

The Ask Elevio AI Management Copilot provides real-time, grounded answers to company administrator queries based on live platform intelligence. To balance conversational context usability with strict data privacy and security, Elevio Skills enforces a minimal data retention strategy.

---

## Retention Policy

### 1. In-Session Conversational Context
- **Scope**: User queries and assistant responses during an active browser session.
- **Retention Period**: Transmit-only / Short-term session context (passed via client `history` payload up to 5 turns).
- **Purpose**: Enable follow-up queries (e.g., "Why is Procurement recommended ELH-03?").
- **Purge Schedule**: Cleared automatically upon closing the session or navigating away from the dashboard.

### 2. Zero PII Storage
- No personal identifiable information (PII) such as employee full names, email addresses, or phone numbers is stored in copilot interaction logs or sent to LLM providers.
- Conversations focus strictly on department-level aggregations, course codes, readiness scores, and company priorities.

### 3. Server-Side Audit Logs
- **Scope**: Minimal metadata logging for security and diagnostics (Timestamp, Company ID, User ID, Tool Executed, Execution Status, Response Token Count).
- **Retention Period**: 30 days rolling audit window.
- **Purge Schedule**: Automated retention job purges diagnostic logs after 30 days.

---

## Compliance & Deletion Requests

Company administrators may request manual purging of session history at any time using the "Clear Chat" control in the Ask Elevio AI interface.
