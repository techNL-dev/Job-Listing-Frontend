import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StyledInput from "../../components/StyledInput";
import { trpc } from "@/utils/trpc";
import { Listing } from "@prisma/client";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [listings, setListings] = useState<Listing[]>([]);

  //const listingSearch = trpc.useMutation(["listing-search"]);

  useEffect(() => {
    const term = router.query.term ? router.query.term.toString() : "";
    setQuery(term);
    search(term);
  }, [router.query.term]);

  const search = async (searchTerm: string) => {
    if (!searchTerm) {
      setListings([]);
      router.push("", undefined, { shallow: true });
      return;
    }
    /*await listingSearch.mutateAsync({ term: searchTerm });
    console.log(listingSearch);*/
    setListings([]);
    router.push(`?term=${searchTerm}`, undefined, { shallow: true });
  };

  return (
    <Layout title="Search">
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
        <h1
          className="
            sm:text-5xl
            text-3xl
            font-semibold
            mb-2
          "
        >
          Search
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className="
            flex
            flex-row
            space-x-2
            items-end
          "
          >
            <StyledInput query={query} setQuery={setQuery} />
            <button
              className="
                bg-blue-500
                rounded-md
                shadow-md
                px-2
                py-1
                text-white
                font-semibold
                text-lg
              "
              onClick={() =>
                router.push(`?term=${query}`, undefined, { shallow: true })
              }
            >
              Search
            </button>
          </div>
        </form>
        <div>
          {listings.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
