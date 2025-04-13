import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address format" }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(50, {
      message: "Username cannot be longer than 50 characters",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(100, {
      message: "Password cannot be longer than 100 characters",
    }),
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters long",
    })
    .max(100, {
      message: "Full name cannot be longer than 100 characters",
    }),
});

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Email or username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, { message: "Refresh token is required" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
