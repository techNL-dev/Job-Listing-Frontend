import Layout from "../components/Layout";

const IndexPage = () => {
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
          <h1>NL</h1>
          <h1>Job</h1>
          <h1>Listings</h1>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
