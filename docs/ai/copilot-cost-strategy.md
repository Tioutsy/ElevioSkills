# Ask Elevio AI — Copilot Cost & Performance Optimization Strategy

**Version:** 1.0  
**Effective Date:** August 10, 2026  

---

## Performance & Cost Architecture

To deliver sub-second responses while maintaining strict cost bounds, Ask Elevio AI implements selective tool calling, smart model selection, and caching layer optimizations.

---

## Key Optimization Strategies

### 1. Model Selection (`gemini-3.6-flash`)
- **Primary Model**: `gemini-3.6-flash` is selected as the default model for all copilot natural language reasoning and tool calling.
- **Benefits**: Optimized for fast tool calling function execution, high accuracy, and low latency at significantly lower cost per 1M tokens compared to pro models.

### 2. Selective Tool Calling
- Instead of dumping all company data into the prompt context on every request, Gemini selectively invokes only the specific tools required to answer the query (e.g., invoking only `getDepartmentIntelligence("Procurement")` when asked specifically about Procurement).
- Reduces input token volume by 70–85% per query.

### 3. In-Memory Data Caching
- Underlying intelligence calculations (`getWorkforceReadiness`, `getManagementBrief`, `getCompanyActionPlan`) leverage in-memory snapshot caches keyed by `(companyId, reportingPeriod)`.
- Prevents redundant, heavy database recalculations during interactive multi-turn conversations.

### 4. Context Window Truncation
- Conversational history passed from the client is capped at 5 turns (`maxHistoryLength = 5`).
- Keeps prompt overhead consistently lean regardless of session length.

---

## Latency & Cost Metrics Target

- **Average Response Latency**: < 1.2s
- **Average Tokens per Query**: < 1,500 input tokens / < 300 output tokens
- **Fallback Recovery Latency**: < 100ms
