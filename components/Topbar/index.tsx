import React from "react";
import Searchbar from "./Searchbar";
import DisplayOptions from "./DisplayOptions";
import FilterButton from "./FilterButton";
import { NFT, APIReturn } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import canverse from "../../public/images/canBlackText.png";
import medium from "../../public/images/medium.png";
const Topbar = ({ initialData }: { initialData: APIReturn | null }) => {
  return (
    <div className="flex p-2 justify-between items-center gap-8 w-full h-[80px]  px-[var(--desktop-padding)] ">
      <div className="flex gap-2 justify-start items-center  ">
        <Image src={medium} alt="canVERSE Logo" width={50} height={50} />
        <div className="w-36 hidden md:block">
          <Image src={canverse} alt="canVERSE Logo" width={144} height={21} />
        </div>
      </div>
      <FilterButton />
      <div className="hidden lg:flex justify-start items-center gap-8 mr-auto ">
        <Link
          className={`hover:text-accentTwo font-bold `}
          href={"https://canverse.io"}
        >
          HOME
        </Link>
        <Link
          className="hover:text-accentTwo font-bold"
          href={"https://canverse.io/account/details"}
        >
          ACCOUNT
        </Link>
        <Link
          className="hover:text-accentTwo font-bold"
          href={"https://gallery.canverse.io/"}
        >
          NFT GALLERY
        </Link>
      </div>
      <DisplayOptions />
    </div>
  );
};

export default Topbar;
