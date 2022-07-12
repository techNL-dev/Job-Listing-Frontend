import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../libs/dbConnect";
import Listing, { IListing } from "../../../models/Listing";

export const listingSearch = async (query: string): Promise<IListing[]> => {
  await dbConnect();
  const listings: IListing[] = await Listing.aggregate([
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
  ]);
  return listings;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { term } = req.query;
    const listings: IListing[] = await listingSearch(term.toString());
    res.status(200).json(listings);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
