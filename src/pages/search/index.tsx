import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import StyledInput from "../../components/StyledInput";
import { client } from "@/utils/trpc";
import { Listing } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();

  const searchTermExists = useRef(router.query.term === undefined);

  const [query, setQuery] = useState<string>("");
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    searchTermExists.current = router.query.term !== undefined;
    const term = searchTermExists.current ? router.query.term.toString() : "";
    setQuery(term);
    search(term);
  }, [router.query.term]);

  const search = async (searchTerm: string) => {
    if (!searchTerm) {
      setListings([]);
      router.push("", undefined, { shallow: true });
      return;
    }
    const searchResults = await client.query("listing-search", {
      term: searchTerm,
    });
    setListings(searchResults);
    router.push(`?term=${searchTerm}`, undefined, { shallow: true });
  };

  return (
    <Layout title="Search">
      <div
        className={`
          flex
          flex-col
          justify-${searchTermExists.current ? "start" : "center"}
          items-center
          flex-grow
          mt-4
        `}
      >
        <h1
          className={`
            sm:text-${searchTermExists.current ? 5 : 7}xl
            text-${searchTermExists.current ? 3 : 5}xl
            font-semibold
            mb-2
          `}
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
        <div className="space-y-4 mt-4">
          {listings.map((item, index) => (
            <ListingCard key={index} listing={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
