import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../libs/dbConnect";
import Listing, { IListing } from "../../../../models/Listing";

export const getListingById = async (id: string): Promise<IListing> => {
  await dbConnect();
  return await Listing.findOne({ _id: id });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const listings: IListing = await getListingById(id.toString());
    res.status(200).json(listings);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
