import type { MiddlewareHandler } from "hono";
import {
  createErrorResponse,
  ErrorCode,
} from "../utils/api-response.js";

/**
 * A middleware that provides global error handling for the API
 */
export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Unhandled error:", error);

    // Default to a 500 internal server error if the error is not handled elsewhere
    const status = 500;

    return c.json(
      createErrorResponse(
        ErrorCode.INTERNAL_ERROR,
        "An unexpected error occurred. Please try again later.",
      ),
      status,
    );
  }
};
