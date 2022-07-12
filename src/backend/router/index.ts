import {
  listingSearch,
  getListingById,
  getAllListings,
} from "@/utils/listings";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .mutation("listing-search", {
    input: z.object({
      term: z.string(),
    }),
    async resolve({ input }) {
      return await listingSearch(input?.term);
    },
  })
  .query("get-listing-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await getListingById(input?.id);
    },
  })
  .query("get-all-listings", {
    async resolve() {
      return await getAllListings();
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
