import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About">
    <div
      className="
        flex
        flex-col
        justify-center
        items-center
        flex-grow
      "
    >
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="text-lg">The about page will go here</p>
    </div>
  </Layout>
);

export default AboutPage;
