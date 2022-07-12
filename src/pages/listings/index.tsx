import Layout from "../../components/Layout";
import ListingCard from "../../components/ListingCard";
import { trpc } from "@/utils/trpc";

const IndexPage = () => {
  const getAllListings = trpc.useQuery(["get-all-listings"]);

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
        "
      >
        <h2 className="text-4xl font-semibold">Listings</h2>
        <div className="space-y-4 mt-4">
          {getAllListings.isLoading
            ? "Loading..."
            : getAllListings.data?.map((item, index) => (
                <ListingCard key={index} listing={item} />
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
