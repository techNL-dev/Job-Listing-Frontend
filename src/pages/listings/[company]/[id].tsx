import { client, trpc } from "@/utils/trpc";
import { Listing } from "@prisma/client";
import React from "react";
import Layout from "../../../components/Layout";
import ListingDetailCard from "../../../components/ListingDetailCard";
import { useRouter } from "next/router";
import { getListingById } from "@/utils/listings";

type Props = {
  listing: Listing;
};

const SingleListing: React.FC<Props> = ({ listing }) => {
  return (
    <Layout title={`${listing?.company}: ${listing?.title}`}>
      <div className="flex flex-col justify-center items-center min-h-screen my-4 px-2">
        {listing && <ListingDetailCard listing={listing} />}
      </div>
    </Layout>
  );
};

export default SingleListing;

export async function getServerSideProps(context: {
  query: { company: string; id: string };
}) {
  const { company, id } = context.query;

  const listing = await client.query("get-listing-by-id", { id });

  return {
    props: {
      company: company.toUpperCase(),
      listing,
    },
  };
}
