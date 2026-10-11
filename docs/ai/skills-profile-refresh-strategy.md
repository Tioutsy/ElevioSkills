# Skills Profile Caching & Refresh Strategy

## Overview
To prevent expensive LLM/Gemini API calls on every page render, the AI Skills-Gap Engine employs an event-driven refresh strategy with in-memory caching.

## Trigger Events
The skills profile is re-computed only when:
1. A quiz attempt is submitted (`quiz_attempts` insert/update).
2. A course is marked completed (`enrollments` status change).
3. Employee role, department, or company priority is modified.
4. An explicit forced refresh is requested by an admin.

## Cache Expiry
- TTL: 15 minutes for cached employee profiles when no trigger events occur.
- Fast-path fallback evaluation (<10ms) when Gemini API is unconfigured or rate-limited.
