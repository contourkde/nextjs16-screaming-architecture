import { getAuth } from "@core/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// We wrap the handlers in a function to ensure betterAuth initializes only when a request is made,
// preventing build-time configuration errors when environment variables might be missing.
export const GET = async (req: Request) => {
  const auth = getAuth();
  return toNextJsHandler(auth).GET(req);
};

export const POST = async (req: Request) => {
  const auth = getAuth();
  return toNextJsHandler(auth).POST(req);
};
