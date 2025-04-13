import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { describeRoute } from "hono-openapi";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { openAPISpecs } from "hono-openapi";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validation/auth.schema.js";

const docsRoutes = new Hono();

const authRoutes = new Hono();

authRoutes.post(
  "/auth/register",
  describeRoute({
    summary: "Register a new user",
    description:
      "Create a new user account and return authentication tokens",
    tags: ["Authentication"],
    requestBody: {
      content: {
        "application/json": {
          schema: registerSchema,
          example: {
            email: "user@example.com",
            username: "username123",
            password: "password123",
            fullName: "John Doe",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User registered successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(true),
              data: z.object({
                user: z.object({
                  id: z.string().uuid(),
                  email: z.string().email(),
                  username: z.string(),
                  fullName: z.string(),
                }),
                token: z.string(),
                refreshToken: z.string(),
              }),
              message: z.string().optional(),
            }),
            example: {
              success: true,
              data: {
                user: {
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  email: "user@example.com",
                  username: "username123",
                  fullName: "John Doe",
                },
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              message: "User registered successfully",
            },
          },
        },
      },
      400: {
        description: "Invalid input data",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(false),
              error: z.object({
                code: z.string(),
                message: z.string(),
                details: z.any().optional(),
              }),
            }),
            example: {
              success: false,
              error: {
                code: "VALIDATION_ERROR",
                message: "Validation failed",
                details: [
                  {
                    path: "email",
                    message: "Invalid email address format",
                  },
                ],
              },
            },
          },
        },
      },
      409: {
        description: "Email or username already exists",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(false),
              error: z.object({
                code: z.string(),
                message: z.string(),
              }),
            }),
            example: {
              success: false,
              error: {
                code: "CONFLICT",
                message: "Username already taken",
              },
            },
          },
        },
      },
    },
  }),
  zValidator("json", registerSchema),
);

authRoutes.post(
  "/auth/login",
  describeRoute({
    summary: "Login to account",
    description:
      "Authenticate with email/username and password to get tokens",
    tags: ["Authentication"],
    requestBody: {
      content: {
        "application/json": {
          schema: loginSchema,
          example: {
            emailOrUsername: "user@example.com",
            password: "password123",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(true),
              data: z.object({
                user: z.object({
                  id: z.string().uuid(),
                  email: z.string().email(),
                  username: z.string(),
                  fullName: z.string(),
                }),
                token: z.string(),
                refreshToken: z.string(),
              }),
              message: z.string().optional(),
            }),
            example: {
              success: true,
              data: {
                user: {
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  email: "user@example.com",
                  username: "username123",
                  fullName: "John Doe",
                },
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refreshToken:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              message: "Login successful",
            },
          },
        },
      },
      401: {
        description: "Invalid credentials",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(false),
              error: z.object({
                code: z.string(),
                message: z.string(),
              }),
            }),
            example: {
              success: false,
              error: {
                code: "UNAUTHORIZED",
                message: "Invalid email/username or password",
              },
            },
          },
        },
      },
    },
  }),
  zValidator("json", loginSchema),
  (c) => {
    // This is just a mock implementation for documentation purposes
    return c.json({
      success: true,
      data: {
        user: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          email: "user@example.com",
          username: "username",
          fullName: "User Name",
        },
        token: "jwt-token-example",
        refreshToken: "refresh-token-example",
      },
      message: "Login successful",
    });
  },
);

authRoutes.post(
  "/auth/refresh-token",
  describeRoute({
    summary: "Refresh auth token",
    description: "Get a new auth token using a refresh token",
    tags: ["Authentication"],
    requestBody: {
      content: {
        "application/json": {
          schema: refreshTokenSchema,
          example: {
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Token refreshed successfully",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(true),
              data: z.object({
                token: z.string(),
              }),
              message: z.string().optional(),
            }),
            example: {
              success: true,
              data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              message: "Token refreshed successfully",
            },
          },
        },
      },
      401: {
        description: "Invalid refresh token",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(false),
              error: z.object({
                code: z.string(),
                message: z.string(),
              }),
            }),
            example: {
              success: false,
              error: {
                code: "UNAUTHORIZED",
                message: "Invalid refresh token",
              },
            },
          },
        },
      },
    },
  }),
  zValidator("json", refreshTokenSchema),
);

authRoutes.get(
  "/auth/me",
  describeRoute({
    summary: "Get current user",
    description: "Retrieve the current user profile data",
    tags: ["Authentication"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "User profile data",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(true),
              data: z.object({
                id: z.string().uuid(),
                email: z.string().email(),
                username: z.string(),
                fullName: z.string(),
                createdAt: z.string().datetime(),
                lastLogin: z.string().datetime().nullable(),
                preferences: z.any().nullable(),
              }),
            }),
            example: {
              success: true,
              data: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                email: "user@example.com",
                username: "username123",
                fullName: "John Doe",
                createdAt: "2023-04-13T10:30:00.000Z",
                lastLogin: "2023-04-13T15:45:00.000Z",
                preferences: null,
              },
            },
          },
        },
      },
      401: {
        description: "Not authenticated",
        content: {
          "application/json": {
            schema: z.object({
              success: z.literal(false),
              error: z.object({
                code: z.string(),
                message: z.string(),
              }),
            }),
            example: {
              success: false,
              error: {
                code: "UNAUTHORIZED",
                message:
                  "Authentication required. Please provide a valid token.",
              },
            },
          },
        },
      },
    },
  }),
);

docsRoutes.get(
  "/openapi.json",
  openAPISpecs(authRoutes, {
    documentation: {
      info: {
        title: "Fiscal Fit API",
        version: "1.0.0",
        description: "API documentation for Fiscal Fit application",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
          description: "Development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  }),
);

docsRoutes.get(
  "/",
  swaggerUI({
    url: "/api/docs/openapi.json",
  }),
);

export default docsRoutes;
