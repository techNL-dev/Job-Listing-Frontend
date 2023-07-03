import { Listing } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  listing: Listing;
};

const ListingCard: React.FC<Props> = ({ listing }) => {
  return (
    <div
      className="
        bg-techNLGray
        p-4
        rounded-md
        shadow-md
        max-w-xl
        flex
        flex-col
        justify-between
        border-2
        border-techNLPinkPurple
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
            max-h-24
            overflow-hidden
            mt-1
            ellipsis
        "
          dangerouslySetInnerHTML={{ __html: listing.description || "" }}
        ></div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-techNLBlack">
          Posted: {new Date(listing.posting_date).toLocaleDateString("en-US")}
        </div>
        <div className="flex flex-row justify-end items-center space-x-4">
          <Link
            href={`/listings/${listing.company.toLowerCase()}/${listing.id}`}
          >
            <a className="text-techNLBlue bg-techNLBlack px-2 py-1 rounded hover:bg-techNLBlue hover:text-techNLBlack">Read More</a>
          </Link>
          {listing.apply_link && (
            <Link href={listing.apply_link}>
              <a target="_blank" className="text-techNLPinkPurple bg-techNLBlack px-2 py-1 rounded hover:bg-techNLPinkPurple hover:text-techNLBlack">
                Apply Now
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
