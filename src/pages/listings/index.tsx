import Layout from "../../components/Layout";
import ListingCard from "../../components/ListingCard";
import { Listing } from "@prisma/client";
import { client } from "@/utils/trpc";

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
        <h2 className="sm:text-5xl text-3xl font-semibold sm:p-2">Listings</h2>
        <div className="gap-4 my-4 grid md:grid-cols-2 px-2">
          {listings?.reverse().map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

// Switch the comments if you need it to update more often

// export async function getStaticProps() {
//   const listings = await client.query("get-all-listings");

//   return {
//     props: {
//       listings,
//     },
//     revalidate: 86400,
//   };
// }

export async function getServerSideProps() {
  const listings = await client.query("get-all-listings");

  return {
    props: {
      listings,
    },
  };
}
