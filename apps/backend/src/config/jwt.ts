import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { envVars } from "./env.js";

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
}

type Unit =
  | "Years"
  | "Year"
  | "Yrs"
  | "Yr"
  | "Y"
  | "Weeks"
  | "Week"
  | "W"
  | "Days"
  | "Day"
  | "D"
  | "Hours"
  | "Hour"
  | "Hrs"
  | "Hr"
  | "H"
  | "Minutes"
  | "Minute"
  | "Mins"
  | "Min"
  | "M"
  | "Seconds"
  | "Second"
  | "Secs"
  | "Sec"
  | "s"
  | "Milliseconds"
  | "Millisecond"
  | "Msecs"
  | "Msec"
  | "Ms";

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export const generateToken = (payload: TokenPayload): string => {
  const secret = envVars.JWT_SECRET;
  const options: SignOptions = {
    expiresIn: envVars.JWT_EXPIRY as StringValue,
  };

  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (
  payload: TokenPayload,
): string => {
  const secret = envVars.REFRESH_TOKEN_SECRET;
  const options: SignOptions = {
    expiresIn: envVars.REFRESH_TOKEN_EXPIRY as StringValue,
  };

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const secret = envVars.JWT_SECRET;
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (
  token: string,
): TokenPayload | null => {
  try {
    const secret = envVars.REFRESH_TOKEN_SECRET;
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
