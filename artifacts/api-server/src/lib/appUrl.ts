/**
 * Resolves the canonical public frontend application base URL.
 * Automatically sanitizes ephemeral preview URLs (such as Vercel preview branch deployments
 * *-recyclean1.vercel.app or *-git-*.vercel.app) to the permanent production domain https://www.ecolearnhub.com,
 * preventing email recipients from encountering HTTP 410 GONE errors on expired preview links.
 */
export function getCanonicalAppUrl(originCandidate?: string | null): string {
  // 1. Explicit env var override (if set and not localhost)
  const envUrl = process.env.PUBLIC_APP_URL || process.env.APP_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/$/, "");
  }

  // 2. Normalize origin candidate if provided
  if (originCandidate) {
    const trimmed = originCandidate.trim().replace(/\/$/, "");

    // Allow localhost/127.0.0.1 exclusively during local development
    if (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) {
      return trimmed;
    }

    // Canonical custom production domain
    if (trimmed.includes("ecolearnhub.com")) {
      return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    }

    // Ephemeral Vercel preview deployments (e.g. *-recyclean1.vercel.app, *-git-*.vercel.app)
    // or standard Vercel app domains -> always route to production domain
    if (trimmed.includes("vercel.app")) {
      return "https://www.ecolearnhub.com";
    }
  }

  // 3. Canonical default production URL
  return "https://www.ecolearnhub.com";
}
