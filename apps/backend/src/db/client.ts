import { PrismaClient } from "@prisma/client";
import { envVars } from "../config/env.js";

type LogLevel = "info" | "query" | "warn" | "error";

interface DatabaseConfig {
  logQueries: boolean;
  logLevels: LogLevel[];
  maxConnections?: number;
  connectionTimeout?: number;
}

const defaultConfig: DatabaseConfig = {
  logQueries: envVars.NODE_ENV === "development",
  logLevels: ["warn", "error"],
  maxConnections: 10,
  connectionTimeout: 30000, // 30 seconds
};

/**
 * Create and configure a Prisma client instance
 */
function createPrismaClient(
  config: DatabaseConfig = defaultConfig,
): PrismaClient {
  const prismaOptions: any = {
    log: config.logLevels.map((level) => ({ level, emit: "stdout" })),
  };

  if (config.maxConnections || config.connectionTimeout) {
    prismaOptions.datasources = {
      db: {
        url: envVars.DATABASE_URL,
      },
    };
  }

  const prisma = new PrismaClient(prismaOptions);

  if (config.logQueries) {
    prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      const duration = after - before;

      console.log(
        `Query: ${params.model}.${params.action} took ${duration}ms`,
      );

      return result;
    });
  }

  prisma.$use(async (params, next) => {
    try {
      return await next(params);
    } catch (error) {
      console.error(
        `Database error in ${params.model}.${params.action}:`,
        error,
      );
      throw error; // Re-throw to be handled by service layer
    }
  });

  return prisma;
}

const prisma = createPrismaClient();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Database connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("Database connection closed");
  process.exit(0);
});

export default prisma;
