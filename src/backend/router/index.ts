import { getAllCompanies } from "@/utils/companies";
import {
  listingSearch,
  getListingById,
  getAllListings,
  getListingsByCompany,
} from "@/utils/listings";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("listing-search", {
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
  })
  .query("get-listings-by-company", {
    input: z.object({
      company: z.string(),
    }),
    async resolve({ input }) {
      return await getListingsByCompany(input?.company);
    },
  })
  .query("get-all-companies", {
    async resolve() {
      return await getAllCompanies();
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
