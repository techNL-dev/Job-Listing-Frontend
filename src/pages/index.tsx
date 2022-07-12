import Layout from "../components/Layout";
import { trpc } from "@/utils/trpc";

const IndexPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "testing" }]);
  return (
    <Layout title="Home">
      <div
        className="
          flex
          flex-col
          justify-center
          items-center
          flex-grow
          mt-4
        "
      >
        <div className="text-8xl font-semibold">
          <h1>Job</h1>
          <h1>Listings</h1>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
