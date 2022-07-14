import { prisma } from "@/backend/utils/prisma";
import { Listing } from "@prisma/client";

export const listingSearch = async (query: string = "") => {
  if (!query) return [];
  const listings = await prisma.listing.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "ListingSearch",
          compound: {
            should: [
              {
                autocomplete: {
                  query: query,
                  path: "title",
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "description",
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "location",
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "company",
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 5,
      },
    ],
  });
  // This is gross and I hate it, but I have no clue how to make it work otherwise
  let typeMapper = listings as unknown as any[];
  typeMapper.forEach((listing) => {
    listing.id = listing._id["$oid"];
    listing.posting_date = listing.posting_date["$date"];
  });
  return typeMapper as unknown as Listing[];
};

export const getListingById = async (id: string) => {
  return await prisma.listing.findUnique({
    where: {
      id,
    },
  });
};

export const getAllListings = async () => {
  return await prisma.listing.findMany();
};

export const getListingsByCompany = async (company: string) => {
  return await prisma.listing.findMany({
    where: {
      company: {
        equals: company,
        mode: "insensitive",
      },
    },
  });
};
