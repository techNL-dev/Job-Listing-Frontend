import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { client, trpc } from "@/utils/trpc";
import ListingCard from "@/components/ListingCard";
import { COMPANY_NAMES } from "@/utils/companies";
import { Listing } from "@prisma/client";

type Props = {
  company: string;
  listings: Listing[];
};

const Index: React.FC<Props> = ({ company, listings }) => {
  return (
    <Layout title={company}>
      <div
        className="flex
          flex-col
          justify-start
          items-center
          flex-grow
          mt-4
        "
      >
        <h1 className="text-4xl font-semibold">{company}</h1>
        <div className="space-y-4 mt-4">
          {listings?.map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticPaths() {
  return {
    paths: Array.from(COMPANY_NAMES.keys()).map((item) => ({
      params: {
        company: item,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { company: string };
}) {
  const { company } = params;
  const listings = await client.query("get-listings-by-company", { company });

  return {
    props: {
      company: COMPANY_NAMES.get(company),
      listings,
    },
  };
}
