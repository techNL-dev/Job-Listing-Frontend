import Link from "next/link";
import Layout from "../../components/Layout";
import ListingCard from "../../components/ListingCard";
import { Listing } from "@prisma/client";
import { client } from "@/utils/trpc";
import Search from "./search";

type Props = {
  listings: Listing[];
};

const IndexPage: React.FC<Props> = ({ listings }) => {
  return (
    <Layout title="Listings">
      <div
        className="
          flex
          flex-col
          justify-start
          items-center
          flex-grow
          mt-4
          mb-4
        "
      >
        <div className="flex justify-between w-5/6 flex-col md:flex-row">
        <h2 className="sm:text-5xl text-3xl font-semibold sm:p-2">Listings</h2>
        <Search/>
        </div>
        <div className="gap-4 my-4 grid md:grid-cols-2 px-2">
          {listings?.map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const listings = await client.query("get-all-listings");

  return {
    props: {
      listings,
    },
  };
}
