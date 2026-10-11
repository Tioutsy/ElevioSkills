import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  auth?: {
    userId?: string | null;
    sessionClaims?: Record<string, unknown>;
  };
}

export function authBypassMiddleware(req: Request, res: Response, next: NextFunction) {
  const isProdOrStaging = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";
  const enabled = process.env.ENABLE_TEST_AUTH_BYPASS === "true";
  
  if (!isProdOrStaging && enabled && req.headers["x-test-user-id"] && !(req as AuthRequest).auth?.userId) {
    const testId = req.headers["x-test-user-id"] as string;
    const testEmail = req.headers["x-test-user-email"] as string || null;
    const testRole = req.headers["x-test-user-role"] as string || null;
    
    (req as AuthRequest).auth = {
      userId: testId,
      sessionClaims: {
        email: testEmail,
        email_address: testEmail,
        publicMetadata: {
          role: testRole
        }
      }
    };
  }
  next();
}
