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
        bg-gray-800
        p-4
        rounded-md
        shadow-md
        max-w-2xl
      "
    >
      <h2 className="text-2xl font-medium">{listing.title}</h2>
      <p>{listing.company}</p>
      <p>{listing.location}</p>
      <div
        className="
          overflow-hidden
          mt-1
        "
        dangerouslySetInnerHTML={{ __html: listing.description.join("\n") }}
      ></div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-gray-500">
          Posted: {new Date(listing.posting_date).toLocaleDateString("en-US")}
        </div>
        <Link href={listing.apply_link}>
          <a target="_blank" className="hover:underline">
            Apply Now
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ListingDetailCard;
