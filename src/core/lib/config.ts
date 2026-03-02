import { z } from "zod";

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\/.+$/, {
    message: "MONGODB_URI must be a valid MongoDB connection string",
  }),
  BETTER_AUTH_SECRET: z.string().min(32, {
    message: "BETTER_AUTH_SECRET must be at least 32 characters long",
  }),
  BETTER_AUTH_URL: z
    .string()
    .url({ message: "BETTER_AUTH_URL must be a valid URL" }),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SKIP_ENV_VALIDATION: z.string().optional(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_BETTER_AUTH_URL must be a valid URL" }),
});

export type Env = z.infer<typeof serverEnvSchema> &
  z.infer<typeof clientEnvSchema>;

function validateConfig(): Env {
  const isBuildPhase = process.env.SKIP_ENV_VALIDATION === "true";

  const serverParsed = serverEnvSchema.safeParse(process.env);
  const clientParsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_BETTER_AUTH_URL:
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL,
  });

  const hasErrors = !serverParsed.success || !clientParsed.success;

  if (hasErrors) {
    if (isBuildPhase) {
      console.warn(
        "⚠️  Skipping strict environment validation during build phase.",
      );
      if (!serverParsed.success) {
        serverParsed.error.issues.forEach((issue) => {
          console.warn(
            `   - [Build Warning] ${issue.path.join(".")}: ${issue.message}`,
          );
        });
      }
      if (!clientParsed.success) {
        clientParsed.error.issues.forEach((issue) => {
          console.warn(
            `   - [Build Warning] ${issue.path.join(".")}: ${issue.message}`,
          );
        });
      }

      // Return a Proxy during build to prevent undefined crashes in libraries
      // but without hardcoding "dummy" data.
      return new Proxy(process.env, {
        get(target, prop: string) {
          if (typeof prop !== "string") return undefined;
          return target[prop] ?? "";
        },
      }) as unknown as Env;
    }

    console.error("❌ Invalid environment variables:");
    if (!serverParsed.success) {
      serverParsed.error.issues.forEach((issue) => {
        console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
      });
    }
    if (!clientParsed.success) {
      clientParsed.error.issues.forEach((issue) => {
        console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
      });
    }

    // In production runtime, we MUST crash if critical variables like MONGODB_URI are missing
    if (process.env.NODE_ENV === "production") {
      console.error(
        "🚨 Critical configuration error in production. Application exiting.",
      );
      process.exit(1);
    }
  }

  return {
    ...serverParsed.data,
    ...clientParsed.data,
  } as Env;
}

export const env = validateConfig();
