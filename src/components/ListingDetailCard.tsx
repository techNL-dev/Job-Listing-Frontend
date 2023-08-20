import { Listing } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  listing: Listing;
};

const ListingDetailCard: React.FC<Props> = ({ listing }) => {
  return (
    <div
      className="
        bg-techNLWhite
        dark:bg-techNLGray
        p-4
        rounded-md
        shadow-md
        max-w-2xl
        flex
        flex-col
        justify-between
      "
    >
      <div>
        <h2 className="text-2xl font-medium text-techNLBlue">{listing.title}</h2>
        <Link href={`/listings/${listing.company.toLowerCase()}`}>
          <a className="hover:underline">{listing.company}</a>
        </Link>
        <p>{listing.location}</p>
        <div
          className="
          overflow-hidden
          mt-1
        "
          dangerouslySetInnerHTML={{ __html: listing.description || "" }}
        ></div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-techNLBlack">
          Posted: {new Date(listing.posting_date).toLocaleDateString("en-US")}
        </div>
        {listing.apply_link && (
          <Link href={listing.apply_link}>
            <a target="_blank" className="text-techNLPinkPurple bg-techNLWhite dark:bg-techNLBlack px-2 py-1 rounded hover:bg-techNLPinkPurple hover:text-techNLBlack">
              Apply Now
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListingDetailCard;
