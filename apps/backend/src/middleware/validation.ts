import type { Context, MiddlewareHandler, Next } from "hono";
import { z } from "zod";
import {
  createErrorResponse,
  ErrorCode,
} from "../utils/api-response.js";

/**
 * Creates a middleware that validates request body against a Zod schema
 * @param schema Zod schema to validate against
 * @returns Middleware function
 */
export function validateRequest<T>(
  schema: z.ZodType<T>,
): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const validatedData = schema.parse(body);

      // Add validated data to context for handlers to use
      c.set("validatedBody", validatedData);

      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod validation errors
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        return c.json(
          createErrorResponse(
            ErrorCode.VALIDATION_ERROR,
            "Validation failed",
            formattedErrors,
          ),
          400,
        );
      }

      // Handle other errors
      return c.json(
        createErrorResponse(
          ErrorCode.BAD_REQUEST,
          "Invalid request body",
        ),
        400,
      );
    }
  };
}

/**
 * Type helper to extract validated body from context
 */
export function getValidatedBody<T>(c: Context): T {
  return c.get("validatedBody") as T;
}
