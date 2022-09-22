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
        <div>
          {listings?.length ? (
            <div className="gap-4 mt-4 grid grid-cols-2">
              {listings?.map((item, index) => (
                <ListingCard key={index} listing={item} />
              ))}
            </div>
          ) : (
            <h3 className="py-4">
              We don&apos;t have any listings for this particular company right
              now, check back later.
            </h3>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps(context: {
  query: { company: string };
}) {
  const company = context.query.company;
  console.log(company);

  const listings = await client.query("get-listings-by-company", { company });

  return {
    props: {
      company: company.toUpperCase(),
      listings,
    },
  };
}
