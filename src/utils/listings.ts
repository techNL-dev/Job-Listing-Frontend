import { prisma } from "@/backend/utils/prisma";

export const listingSearch = async (query: string = "") => {
  if (!query) return [];
  const listings = await prisma.listing.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "Listing Search",
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
            ],
          },
        },
      },
      {
        $limit: 5,
      },
    ],
  });
  return listings;
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
