import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticPaths as getCompanyPaths } from "@/pages/listings/[company]/index";
import { getStaticPaths as getListingPaths } from "@/pages/listings/[company]/[id]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/listings");
    console.log("Revalidated listing path");
    const companyPaths = await getCompanyPaths();
    for await (const pathObj of companyPaths.paths) {
      await res.revalidate(`/listings/${pathObj.params.company}`);
    }
    console.log(`Revalidated ${companyPaths.paths.length} company paths`);
    const listingPaths = await getListingPaths();
    for await (const pathObj of listingPaths.paths) {
      await res.revalidate(`/listings/${pathObj.params.company}`);
    }
    console.log(`Revalidated ${listingPaths.paths.length} listing paths`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
