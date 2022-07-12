import Layout from "../../components/Layout";
import ListingCard from "../../components/ListingCard";
import { IListing } from "../../../models/Listing";
import { getAllListings } from "../api/listings";

const IndexPage = ({ listings }) => {
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
          {listings.map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const listings: IListing[] = JSON.parse(
    JSON.stringify(await getAllListings())
  );

  return {
    props: {
      listings: listings,
    },
  };
}
