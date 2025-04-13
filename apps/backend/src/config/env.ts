import "dotenv/config";

export const envVars = {
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "fiscal-fit-jwt-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "fiscal-fit-refresh-secret",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};
