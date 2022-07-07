import React from "react";
import Layout from "../../components/Layout";
import ListingDetailCard from "../../components/ListingDetailCard";
import { IListing } from "../../models/Listing";
import { getListingById } from "../api/listings/[id]";

type Props = {
  listing: IListing;
};

const SingleListing: React.FC<Props> = ({ listing }) => {
  return (
    <Layout title={`${listing.company}: ${listing.title}`}>
      <div className="flex flex-col justify-center items-center min-h-screen py-8">
        <ListingDetailCard listing={listing} />
      </div>
    </Layout>
  );
};

export default SingleListing;

export async function getServerSideProps({ params }) {
  const listings = await getListingById(params.id);

  return {
    props: {
      listing: JSON.parse(JSON.stringify(listings)),
    },
  };
}
