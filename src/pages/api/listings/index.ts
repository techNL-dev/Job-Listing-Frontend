import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect";
import Listing, { IListing } from "../../../../models/Listing";

export const getAllListings = async (): Promise<IListing[]> => {
  await dbConnect();
  return await Listing.find({});
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const listings: IListing[] = await getAllListings();
    res.status(200).json(listings);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
