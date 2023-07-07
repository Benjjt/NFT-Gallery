import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="w-full h-full m-2 py-2 px-4 border rounded-lg hidden lg:flex justify-start items-center gap-4 max-w-[750px] font-bold">
      <FaSearch />
      LOCKED
    </div>
  );
};

export default Searchbar;
