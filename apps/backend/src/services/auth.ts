import bcrypt from "bcryptjs";
import prisma from "../db/client.js";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import type { TokenPayload } from "../config/jwt.js";
import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
} from "../validation/auth.schema.js";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    fullName: string;
  };
  token: string;
  refreshToken: string;
}

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { email, username, password, fullName } = input;

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      throw new Error("Email already in use");
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      throw new Error("Username already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password_hash,
        full_name: fullName,
      },
    });

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
      },
      token,
      refreshToken,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { emailOrUsername, password } = input;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
      },
      token,
      refreshToken,
    };
  }

  async refreshToken(
    input: RefreshTokenInput,
  ): Promise<{ token: string }> {
    const { refreshToken } = input;

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new Error("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newTokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const newToken = generateToken(newTokenPayload);

    return { token: newToken };
  }

  async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        full_name: true,
        created_at: true,
        last_login: true,
        preferences: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.full_name,
      createdAt: user.created_at,
      lastLogin: user.last_login,
      preferences: user.preferences,
    };
  }
}
