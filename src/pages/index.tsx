import Layout from "../components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  const BUTTON_CLASS = `
    text-3xl 
    bg-transparent 
    hover:techNLWhite 
    font-semibold 
    hover:techNLGray 
    py-2 
    px-4 
    border-2 
    border-techNLWhite 
    hover:border-transparent 
    rounded
    transition-all
    ease-linear
    duration-100
  `;

  return (
    <Layout title="Home" home>
      <div
        className="
          flex
          flex-col
          justify-center
          items-center
          flex-grow
        "
      >
        <div className="flex flex-col justify-center items-center p-4">
          <Image
            src="/TechNLLogoHorizontal.png"
            alt="TechNL"
            objectFit="contain"
            height="275"
            width="864"
          />
          <div className="mt-8 space-x-4 w-full flex flex-row sm:justify-start justify-center">
            <button
              className="indexPageButtons hover:bg-techNLBlue"
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
