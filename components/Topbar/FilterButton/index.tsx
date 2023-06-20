"use client";
import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { useFilterButtonContext } from "@/app/Context/store";
const FilterButton = () => {
  const { isFilterOpen, setIsFilterOpen } = useFilterButtonContext();

  useEffect(() => {
    console.log(isFilterOpen);
  }, [isFilterOpen]);

  return (
    <button
      onClick={() => {
        setIsFilterOpen(!isFilterOpen);
        console.log("button clicked");
      }}
      className=" h-full m-2 py-2 px-4 border rounded-lg flex justify-start items-center gap-2 max-w-[750px]  hover:cursor-pointer  hover:shadow-lg transition-all"
    >
      <FaFilter />
      Filter
    </button>
  );
};

export default FilterButton;
