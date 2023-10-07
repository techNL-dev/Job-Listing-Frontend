import Layout from "../components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  return (
    <Layout title="Home" home>
      <div
        className="
          flex
          flex-col
          justify-center
          items-center
          flex-grow
          bg-techNLLightGray
          dark:bg-techNLGray
        "
      >
        <div className="flex flex-col justify-center items-center p-4">
          <div className="hidden dark:block">
          <Image
            src="/TechNLLogoHorizontal.png"
            alt="TechNL"
            className="hidden"
            objectFit="contain"
            height="275"
            width="864"
          />
          </div>
          <div className="dark:hidden">
          <Image
            src="/TechNLLogoBlackHorizontal.png"
            alt="TechNL"
            objectFit="contain"
            height="275"
            width="864"
          />
          </div>
          <div className="mt-8 space-x-4 w-full flex flex-row sm:justify-start justify-center">
            <button
              className="indexPageButtons hover:bg-techNLDarkBlue dark:hover:bg-techNLBlue"
              onClick={() => router.push("/listings")}
            >
              Listings
            </button>
            <button
              className="indexPageButtons hover:bg-techNLPinkPurple"
              onClick={() => router.push("/about")}
            >
              About
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
