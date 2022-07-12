import { trpc } from "@/utils/trpc";
import { Listing } from "@prisma/client";
import React from "react";
import Layout from "../../components/Layout";
import ListingDetailCard from "../../components/ListingDetailCard";
import { useRouter } from "next/router";

const SingleListing = () => {
  const router = useRouter();
  const { id } = router.query;

  const getListingById = trpc.useQuery([
    "get-listing-by-id",
    {
      id: id.toString(),
    },
  ]);

  return (
    <Layout
      title={`${getListingById.data?.company}: ${getListingById.data?.title}`}
    >
      <div className="flex flex-col justify-center items-center min-h-screen py-8">
        {getListingById.isLoading || !getListingById.data ? (
          "Loading..."
        ) : (
          <ListingDetailCard listing={getListingById.data} />
        )}
      </div>
    </Layout>
  );
};

export default SingleListing;
