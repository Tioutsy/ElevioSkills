import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
import router from "./routes";
import { logger } from "./lib/logger";
import { authBypassMiddleware } from "./middlewares/authBypass";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const app: Express = express();

// Trust reverse proxy for hosting platforms (e.g. Render / Cloudflare)
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);


// Lightweight unauthenticated health checks for Render and external monitors
app.get(["/healthz", "/api/healthz", "/health", "/api/health"], (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get(["/ready", "/api/ready"], async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).json({ status: "ready", database: "connected", timestamp: new Date().toISOString() });
  } catch (err: any) {
    res.status(503).json({ status: "not_ready", database: "disconnected", error: err.message });
  }
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "Elevio API", timestamp: new Date().toISOString() });
});

app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authBypassMiddleware);

const isProdOrStaging = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";
const hasClerkKeys = Boolean(process.env.CLERK_SECRET_KEY && process.env.CLERK_PUBLISHABLE_KEY);

if (hasClerkKeys) {
  app.use(
    clerkMiddleware((req) => ({
      publishableKey: publishableKeyFromHost(
        getClerkProxyHost(req) ?? "",
        process.env.CLERK_PUBLISHABLE_KEY,
      ),
    })),
  );
} else if (isProdOrStaging) {
  // In production and staging, missing Clerk configuration MUST fail securely and never fall back
  throw new Error("FATAL: Clerk authentication keys (CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY) are required in production and staging environments.");
} else if (process.env.ALLOW_UNAUTHENTICATED_DEV_FALLBACK === "true") {
  // Local development / test fallback ONLY when explicitly enabled by ALLOW_UNAUTHENTICATED_DEV_FALLBACK=true
  // Never manufactures administrative privileges: defaults strictly to guest (userId: null)
  app.use((req, res, next) => {
    (req as any).auth = (req as any).auth || { userId: null, sessionClaims: {} };
    next();
  });
}

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Elevio API", timestamp: new Date().toISOString() });
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error({ err, url: req.url }, "Unhandled server error");
  res.status(500).json({
    error: err?.message || "Internal server error",
    stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  });
});

export default app;
