import React from "react";
import Searchbar from "./Searchbar";
import DisplayOptions from "./DisplayOptions";
import FilterButton from "./FilterButton";
import ResultNumber from "./ResultNumber";
import { FaFilter } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center gap-8  w-full h-[3rem]  ">
      <FilterButton />
      <ResultNumber />
      <Searchbar />
      <DisplayOptions />
    </div>
  );
};

export default Topbar;
