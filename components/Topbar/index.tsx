import React from "react";
import Searchbar from "./Searchbar";
import DisplayOptions from "./DisplayOptions";
import FilterButton from "./FilterButton";
import { NFT, APIReturn } from "@/app/types";
import Image from "next/image";
import canverse from "../../public/images/canBlackText.png";
const Topbar = ({ initialData }: { initialData: APIReturn | null }) => {
  return (
    <div className="flex justify-between items-center gap-8  w-full h-[3rem]  ">
      <Image width={150} height={125} src={canverse} alt="canverse logo" />
      <span className="bg-black text-white font-bold group text-xs p-2 rounded-lg animate-pulse flex justify-center items-center">
        <span className="hidden group-hover:flex">THIS</span>
        <span className="">BETA</span>
        <span className="hidden group-hover:flex">WORK</span>
      </span>
      <FilterButton />
      <Searchbar />
      <DisplayOptions />
    </div>
  );
};

export default Topbar;
