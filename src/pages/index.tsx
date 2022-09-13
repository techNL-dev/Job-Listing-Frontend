import Layout from "../components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  const BUTTON_CLASS = `
    text-3xl 
    bg-transparent 
    hover:bg-white 
    font-semibold 
    hover:text-gray-900 
    py-2 
    px-4 
    border-2 
    border-white 
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
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/TechNLLogoHorizontal.png"
            alt="TechNL"
            objectFit="contain"
            height="275"
            width="864"
          />
          <div className="text-7xl font-light -mt-20">
            <h1>Job Listings</h1>
          </div>
          <div className="mt-8 space-x-4 w-full flex flex-row">
            <button
              className={BUTTON_CLASS}
              onClick={() => router.push("/listings")}
            >
              Listings
            </button>
            <button
              className={BUTTON_CLASS}
              onClick={() => router.push("/search")}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
