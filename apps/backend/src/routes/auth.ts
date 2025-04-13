import { Hono } from "hono";
import { AuthController } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validation/auth.schema.js";

const authRoutes = new Hono();
const authController = new AuthController();

authRoutes.post("/register", validateRequest(registerSchema), (c) =>
  authController.register(c),
);
authRoutes.post("/login", validateRequest(loginSchema), (c) =>
  authController.login(c),
);
authRoutes.post(
  "/refresh-token",
  validateRequest(refreshTokenSchema),
  (c) => authController.refreshToken(c),
);

authRoutes.get("/me", authMiddleware, (c) => authController.me(c));

export default authRoutes;
