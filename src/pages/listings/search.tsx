import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import StyledInput from "../../components/StyledInput";
import { client } from "@/utils/trpc";
import { Listing } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();

  const searchTerm = useRef<string | undefined>(undefined);

  const [query, setQuery] = useState<string>("");
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    searchTerm.current = router.query.term?.toString();
    const term = searchTerm.current ? router.query.term?.toString() : "";
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
      <div
        className={`
          flex
          flex-col
          sm:${searchTerm.current ? "justify-start" : "justify-center"}
          justify-start
          items-center
          mt-4
        `}
      >
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
        <div className="space-y-4 my-4 px-2">
          {searchTerm.current &&
            (listings.length ? (
              listings.map((item, index) => (
                <ListingCard key={index} listing={item} />
              ))
            ) : (
              <p>
                &quot;{searchTerm.current}&quot; did not match any listings...
              </p>
            ))}
        </div>
      </div>
  );
};

export default Search;
