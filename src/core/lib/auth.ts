import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb, getMongoClient } from "@core/database/client";
import { env } from "@core/lib/config";

// Lazy-initialized auth instance to prevent build-time crashes
let _auth: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
  if (!_auth) {
    _auth = betterAuth({
      database: mongodbAdapter(getDb(), {
        client: getMongoClient(),
      }),
      secret: env.BETTER_AUTH_SECRET,
      baseURL: env.BETTER_AUTH_URL,
    });
  }
  return _auth;
};
