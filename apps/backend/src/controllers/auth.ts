import type { Context } from "hono";
import { AuthService } from "../services/auth.js";
import { getValidatedBody } from "../middleware/validation.js";
import {
  createSuccessResponse,
  createErrorResponse,
  ErrorCode,
} from "../utils/api-response.js";
import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
} from "../validation/auth.schema.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(c: Context) {
    try {
      const input = getValidatedBody<RegisterInput>(c);

      const result = await this.authService.register(input);

      return c.json(
        createSuccessResponse(result, "User registered successfully"),
        201,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Email already in use") {
          return c.json(
            createErrorResponse(ErrorCode.CONFLICT, error.message),
            409,
          );
        }

        if (error.message === "Username already taken") {
          return c.json(
            createErrorResponse(ErrorCode.CONFLICT, error.message),
            409,
          );
        }

        return c.json(
          createErrorResponse(ErrorCode.BAD_REQUEST, error.message),
          400,
        );
      }

      return c.json(
        createErrorResponse(
          ErrorCode.INTERNAL_ERROR,
          "An unexpected error occurred",
        ),
        500,
      );
    }
  }

  async login(c: Context) {
    try {
      const input = getValidatedBody<LoginInput>(c);

      const result = await this.authService.login(input);

      return c.json(
        createSuccessResponse(result, "Login successful"),
        200,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid credentials") {
          return c.json(
            createErrorResponse(
              ErrorCode.UNAUTHORIZED,
              "Invalid email/username or password",
            ),
            401,
          );
        }

        return c.json(
          createErrorResponse(ErrorCode.BAD_REQUEST, error.message),
          400,
        );
      }

      return c.json(
        createErrorResponse(
          ErrorCode.INTERNAL_ERROR,
          "An unexpected error occurred",
        ),
        500,
      );
    }
  }

  async refreshToken(c: Context) {
    try {
      const input = getValidatedBody<RefreshTokenInput>(c);

      const result = await this.authService.refreshToken(input);

      return c.json(
        createSuccessResponse(result, "Token refreshed successfully"),
        200,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid refresh token") {
          return c.json(
            createErrorResponse(
              ErrorCode.UNAUTHORIZED,
              error.message,
            ),
            401,
          );
        }

        if (error.message === "User not found") {
          return c.json(
            createErrorResponse(ErrorCode.NOT_FOUND, error.message),
            404,
          );
        }

        return c.json(
          createErrorResponse(ErrorCode.BAD_REQUEST, error.message),
          400,
        );
      }

      return c.json(
        createErrorResponse(
          ErrorCode.INTERNAL_ERROR,
          "An unexpected error occurred",
        ),
        500,
      );
    }
  }

  async me(c: Context) {
    try {
      const user = c.get("user");

      if (!user) {
        return c.json(
          createErrorResponse(
            ErrorCode.UNAUTHORIZED,
            "Authentication required",
          ),
          401,
        );
      }

      const userProfile = await this.authService.getUserProfile(
        user.userId,
      );

      return c.json(createSuccessResponse(userProfile), 200);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
          return c.json(
            createErrorResponse(ErrorCode.NOT_FOUND, error.message),
            404,
          );
        }

        return c.json(
          createErrorResponse(ErrorCode.BAD_REQUEST, error.message),
          400,
        );
      }

      return c.json(
        createErrorResponse(
          ErrorCode.INTERNAL_ERROR,
          "An unexpected error occurred",
        ),
        500,
      );
    }
  }
}
