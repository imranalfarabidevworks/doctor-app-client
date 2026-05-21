import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://doctor-app-client-opal.vercel.app",
});