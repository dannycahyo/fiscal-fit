import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { compress } from "hono/compress";
import { timing } from "hono/timing";
import authRoutes from "./routes/auth.js";
import docsRoutes from "./routes/docs.js";
import { envVars } from "./config/env.js";
import { errorHandler } from "./middleware/error.js";
import { createSuccessResponse } from "./utils/api-response.js";

const app = new Hono();

app.use("*", logger());
app.use("*", timing());
app.use("*", errorHandler);
app.use(
  "*",
  prettyJSON({
    space: 2,
  }),
);
app.use("*", compress());
app.use(
  "*",
  cors({
    origin:
      envVars.NODE_ENV === "development"
        ? "*"
        : ["https://fiscal-fit.com"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 86400,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json(
    createSuccessResponse({
      name: "Fiscal Fit API",
      version: "1.0.0",
      status: "healthy",
      environment: envVars.NODE_ENV,
    }),
  );
});

app.route("/api/auth", authRoutes);

app.route("/api/docs", docsRoutes);

app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "The requested resource was not found",
      },
    },
    404,
  );
});

const port = Number(envVars.PORT);
serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(
      `✅ Server is running on http://localhost:${info.port}`,
    );
    console.log(`🔧 Environment: ${envVars.NODE_ENV}`);
    console.log(
      `📚 API Documentation: http://localhost:${info.port}/api/docs`,
    );
  },
);
