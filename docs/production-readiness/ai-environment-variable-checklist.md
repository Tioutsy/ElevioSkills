# AI Environment Variable Checklist

**Version:** 1.0  
**Effective Date:** August 10, 2026  

---

## Required Environment Variables

| Variable Name | Required By | Description | Location / Exposure | Security Note |
|---------------|-------------|-------------|---------------------|---------------|
| `GEMINI_API_KEY` | Google Gemini API Client (`@google/genai`) | API key for server-side Gemini AI model calls (recommendations, copilot, action plan reasoning) | Backend Server Only (`artifacts/api-server`) | **NEVER** expose to browser/client bundle. |
| `DATABASE_URL` | PostgreSQL / Drizzle ORM | Database connection string for storing and retrieving learner history, readiness snapshots, and action plans | Backend Server Only | Secrets must be managed via Cloud/Render environment settings. |
| `CLERK_SECRET_KEY` | Clerk Auth Middleware | Server-side authentication and session token verification for tenant access | Backend Server Only | Used to resolve `userId` and `companyId` server-side. |
| `CLERK_PUBLISHABLE_KEY` | Frontend App (`@clerk/clerk-react`) | Client-side publishable key for user sign-in and authentication state | Frontend Web App | Safe for public inclusion in web bundle. |
| `VITE_API_PROXY_TARGET` | Frontend Vite Dev/Prod Server | Proxy endpoint for API route resolution | Frontend Build Config | Non-sensitive routing configuration. |

---

## Verification
- [x] All server-side Gemini API calls access `process.env.GEMINI_API_KEY` lazily on the server.
- [x] No `GEMINI_API_KEY` or `CLERK_SECRET_KEY` is referenced in client bundle files (`artifacts/ecolearn/src`).
- [x] All `.env` local files are included in `.gitignore`.
