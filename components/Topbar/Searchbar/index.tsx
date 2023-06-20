import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="w-full h-full m-2 py-2 px-4 border rounded-lg flex justify-start items-center gap-4 max-w-[750px]">
      <FaSearch />
      Search by name or trait
    </div>
  );
};

export default Searchbar;
