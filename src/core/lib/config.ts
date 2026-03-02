import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z
    .string()
    .url({
      message:
        "MONGODB_URI must be a valid connection string (e.g., mongodb+srv://...)",
    }),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, {
      message: "BETTER_AUTH_SECRET must be at least 32 characters long",
    }),
  BETTER_AUTH_URL: z
    .string()
    .url({
      message:
        "BETTER_AUTH_URL must be a valid URL (e.g., http://localhost:3000)",
    }),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function validateConfig(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    result.error.issues.forEach((issue) => {
      console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
    });

    // In production, we want to fail fast if config is invalid
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }

  // If validation fails in dev, we return the data anyway but with defaults/warnings
  // to avoid blocking the build process if missing during build time
  return (
    result.data ||
    ({
      MONGODB_URI:
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/nextjs_foundation",
      BETTER_AUTH_SECRET:
        process.env.BETTER_AUTH_SECRET ||
        "default_local_secret_for_development_only",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      NODE_ENV: "development",
    } as Env)
  );
}

export const env = validateConfig();
