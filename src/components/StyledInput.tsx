import React from "react";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const StyledInput: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <div>
      <input
        className="
          sm:w-96
          w-full
          px-2
          py-1
          text-xl
          rounded-md
          shadow-md
          bg-techNLLightGray
          dark:bg-techNLGray
          border-techNLDarkBlue
          dark:border-techNLBlue
          border-2
          "
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default StyledInput;
