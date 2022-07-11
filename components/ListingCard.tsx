import Link from "next/link";
import React from "react";
import { IListing } from "../models/Listing";

type Props = {
  listing: IListing;
};

const ListingCard: React.FC<Props> = ({ listing }) => {
  return (
    <div
      className="
        bg-gray-800
        p-4
        rounded-md
        shadow-md
        max-w-xl
    "
    >
      <h2 className="text-2xl font-medium">{listing.title}</h2>
      <p>{listing.company}</p>
      <p>{listing.location}</p>
      <div
        className="
            max-h-24
            overflow-hidden
            mt-1
            ellipsis
        "
        dangerouslySetInnerHTML={{ __html: listing.description.join("\n") }}
      ></div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-gray-500">
          Posted:{" "}
          {new Date(listing["posting date"]).toLocaleDateString("en-US")}
        </div>
        <div className="flex flex-row justify-end items-center space-x-4">
          <Link href={`/listings/${listing._id}`}>
            <a className="hover:underline">Read More</a>
          </Link>
          <Link href={listing["apply link"]}>
            <a target="_blank" className="hover:underline">
              Apply Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
