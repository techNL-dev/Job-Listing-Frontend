import Link from "next/link";
import Layout from "../components/Layout";
import { client } from "@/utils/trpc";

type Props = {
  companies: string[];
};

const AboutPage: React.FC<Props> = ({ companies }) => (
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
      <div className="max-w-6xl p-5">
        <h1 className="text-6xl font-semibold py-4">About</h1>
        <p className="text-lg py-1">
          The techNL Job Scraping site is the most exhaustive job posting
          database for Newfoundland and Labrador’s technology sector. The
          Listings page updates every day, adding and removing all job postings
          listed and deleted by NL tech companies. Each posting includes
          critical job opportunity details including: job title, employer,
          description, location, and posting date.
        </p>
        <p className="text-lg py-1">The companies currently included are:</p>
        <ul className="text-lg py-2 px-2 grid md:grid-cols-2 lg:grid-cols-3">
          {companies?.map((item, index) => (
            <li key={index}>
              <Link href={`/listings/${item}`}>
                <a className="hover:underline">{item}</a>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-lg py-1">
          Currently, search options are available. Future functionality will
          include filtering, additional companies included, and further job
          details.
        </p>
        <p className="text-lg py-1">
          {"If you have any questions about the database, please email "}
          <a
            href="mailto:talent@technl.ca"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline-offset-2 underline"
          >
            talent@technl.ca
          </a>
          .
        </p>
      </div>
    </div>
  </Layout>
);

export default AboutPage;

export const getStaticProps = async () => {
  const companies = await client.query("get-all-companies");

  return {
    props: { companies }, // will be passed to the page component as props
    revalidate: 86400,
  };
};
