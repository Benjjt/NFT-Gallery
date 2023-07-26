"use client";
import React, { useState, useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import Image from "next/image";
import { useFilterButtonContext } from "@/app/Context/store";

const LargeGrid = ({
  initialData,
  setSelectedNFT,
  fetchedData,
}: {
  initialData: APIReturn | null;
  setSelectedNFT: Function;
  fetchedData: APIReturn | null;
}) => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);
  const { isFilterOpen } = useFilterButtonContext();

  useEffect(() => {
    if (fetchedData?.records) {
      console.log("setting state to NEW values");
      setNFTS(fetchedData.records);
    } else if (initialData?.records) {
      console.log("setting state to initial values");
      setNFTS(initialData.records);
    }
  }, [fetchedData]);

  return (
    <div
      className={` m-6    pb-[4rem] grid ${
        isFilterOpen ? "grid-cols-3" : "grid-cols-4 "
      }  gap-12`}
    >
      {NFTS?.map((item, index) => {
        return (
          <div
            className={`relative transition-all       text-light font-bold hover:scale-105  hover:cursor-pointer ${
              index === NFTS.length - 1 && ""
            }`}
            key={item.json_id}
            onClick={() => setSelectedNFT(item)}
          >
            <Image
              style={{ objectFit: "contain" }}
              width={500}
              height={500}
              className="rounded-xl"
              alt="canVERSE NFT"
              src={`https://canversedebug.xyz/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/${item.pfp_file_name}/pfphalf`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LargeGrid;
