import { createReactQueryHooks, createTRPCClient } from "@trpc/react";
import type { AppRouter } from "@/backend/router";

export const trpc = createReactQueryHooks<AppRouter>();

export const client = createTRPCClient<AppRouter>({
  url: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
    : "http://localhost:3000/api/trpc",
});
