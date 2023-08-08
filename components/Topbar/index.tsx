import React from "react";
import Searchbar from "./Searchbar";
import DisplayOptions from "./DisplayOptions";
import FilterButton from "./FilterButton";
import { NFT, APIReturn } from "@/app/types";
import Image from "next/image";
import canverse from "../../public/images/canBlackText.png";
const Topbar = ({ initialData }: { initialData: APIReturn | null }) => {
  return (
    <div className="flex justify-between items-center gap-8 w-full h-[3rem] m-8 px-8  ">
      <Image width={150} height={125} src={canverse} alt="canverse logo" />
      <FilterButton />
      {/* <Searchbar /> */}
      <DisplayOptions />
    </div>
  );
};

export default Topbar;
