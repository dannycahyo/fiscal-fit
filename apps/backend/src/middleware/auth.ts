import type { Context, Next } from "hono";
import { verifyToken } from "../config/jwt.js";
import {
  createErrorResponse,
  ErrorCode,
} from "../utils/api-response.js";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      createErrorResponse(
        ErrorCode.UNAUTHORIZED,
        "Authentication required. Please provide a valid token.",
      ),
      401,
    );
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return c.json(
      createErrorResponse(
        ErrorCode.UNAUTHORIZED,
        "Invalid or expired token. Please log in again.",
      ),
      401,
    );
  }

  // Add user info to the request context
  c.set("user", payload);

  await next();
};
