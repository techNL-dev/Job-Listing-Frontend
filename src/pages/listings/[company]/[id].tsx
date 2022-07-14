import { client, trpc } from "@/utils/trpc";
import { Listing } from "@prisma/client";
import React from "react";
import Layout from "../../../components/Layout";
import ListingDetailCard from "../../../components/ListingDetailCard";
import { useRouter } from "next/router";
import { COMPANY_NAMES } from "@/utils/companies";

type Props = {
  listing: Listing;
};

const SingleListing: React.FC<Props> = ({ listing }) => {
  return (
    <Layout title={`${listing?.company}: ${listing?.title}`}>
      <div className="flex flex-col justify-center items-center min-h-screen py-8">
        {listing && <ListingDetailCard listing={listing} />}
      </div>
    </Layout>
  );
};

export default SingleListing;

export async function getStaticPaths() {
  const allListings = await client.query("get-all-listings");
  return {
    paths: allListings.map((listing) => ({
      params: {
        company: listing.company.toLowerCase(),
        id: listing.id,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { company: string; id: string };
}) {
  const { company, id } = params;
  const listing = await client.query("get-listing-by-id", { id });

  return {
    props: {
      company: COMPANY_NAMES.get(company),
      listing,
    },
  };
}
