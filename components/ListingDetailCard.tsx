import Link from "next/link";
import React from "react";
import { IListing } from "../models/Listing";

type Props = {
  listing: IListing;
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
      <div className="flex flex-row justify-end items-center space-x-4 mt-2">
        <Link href={listing["apply link"]}>
          <a target="_blank" className="hover:underline">
            Apply Now
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ListingDetailCard;
