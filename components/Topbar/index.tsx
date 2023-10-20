import React from "react";
import Searchbar from "./Searchbar";
import DisplayOptions from "./DisplayOptions";
import FilterButton from "./FilterButton";
import { NFT, APIReturn } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import canverse from "../../public/images/small.png";
import medium from "../../public/images/small.svg";
const Topbar = ({ initialData }: { initialData: APIReturn | null }) => {
  return (
    <div className="flex py-6 justify-between items-center gap-8 w-full h-[80px]  px-[var(--desktop-padding)] text-white bg-black">
      <div className="flex gap-4 justify-start items-center  ">
        <Image src={medium} alt="canVERSE Logo" width={40} height={40} />
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
