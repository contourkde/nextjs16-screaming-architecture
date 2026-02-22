import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, mongoClient } from "@core/database/client";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
});
