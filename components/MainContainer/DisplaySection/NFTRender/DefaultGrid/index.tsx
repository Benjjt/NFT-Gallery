"use client";
import { NFT, APIReturn } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFilterButtonContext } from "@/app/Context/store";

const DefaultGrid = ({
  initialData,
  fetchedData,
  setSelectedNFT,
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  setSelectedNFT: Function;
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
      className={` relative m-4 md:m-6    pb-[4rem] grid ${
        isFilterOpen
          ? "grid-cols-2 md:grid-cols-6"
          : "grid-cols-2 md:grid-cols-8 "
      }  gap-8`}
    >
      {NFTS?.map((item: NFT, index) => {
        return (
          <div
            className={` transition-all   rounded-xl  text-light font-bold hover:scale-105  hover:cursor-pointer ${
              index === NFTS.length - 1 && ""
            }`}
            key={item.json_id}
            onClick={() => {
              setSelectedNFT({ ...item });
            }}
          >
            <Image
              style={{ objectFit: "contain" }}
              width={200}
              height={200}
              placeholder="blur"
              className="rounded-xl"
              alt={item.piece_name ? item.piece_name : "canVERSE NFT"}
              src={`https://canversedebug.xyz/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/${item.pfp_file_name}/galleryThumb`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DefaultGrid;
