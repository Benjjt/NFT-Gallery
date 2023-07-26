"use client";
import React, { useState, useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import Image from "next/image";

const ListView = ({
  initialData,
  setSelectedNFT,
  fetchedData,
}: {
  initialData: APIReturn | null;
  setSelectedNFT: Function;
  fetchedData: APIReturn | null;
}) => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);

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
    <div className="flex flex-col w-full gap-2 p-4 pb-20">
      {NFTS?.map((item: NFT, index) => {
        return (
          <div
            className="flex justify-start gap-8 p-6  hover:border-accentTwo transition-all items-center w-full h-[4rem]  rounded-xl font-bold text-dark border hover:cursor-pointer"
            key={item.json_id}
            onClick={() => setSelectedNFT(item)}
          >
            <div className="h-[3rem] w-[3rem] relative">
              <Image
                fill={true}
                style={{ objectFit: "contain" }}
                className="rounded-md"
                alt="canVERSE NFT"
                // placeholder="blur"
                // blurDataURL=""
                src={`https://canversedebug.xyz/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/${item.pfp_file_name}/galleryThumb`}
              />
            </div>
            <span> {item.piece_name}</span>
            <span> {item.json_id}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
