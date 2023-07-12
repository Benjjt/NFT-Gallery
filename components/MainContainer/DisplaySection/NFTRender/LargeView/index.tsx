"use client";
import React, { useState, useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import Image from "next/image";

const LargeView = ({
  initialData,
  setSelectedNFT,
  fetchedData,
}: {
  initialData: APIReturn;
  setSelectedNFT: Function;
  fetchedData: APIReturn;
}) => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);

  useEffect(() => {
    if (fetchedData?.records) {
      console.log("setting state to NEW values");
      setNFTS(fetchedData.records);
    } else {
      console.log("setting state to initial values");
      setNFTS(initialData?.records);
    }
  }, [fetchedData]);

  return (
    <div className=" flex justify-start items-center flex-wrap gap-4 p-4">
      {NFTS?.map((item, index) => {
        return (
          <div
            className="flex relative hover:scale-105 transition-all  justify-center items-center w-[16rem] h-[16rem]  text-light rounded-xl font-bold bg-dark/80 hover:cursor-pointer"
            key={item.json_id}
            onClick={() => setSelectedNFT(item)}
          >
            <Image
              fill={true}
              style={{ objectFit: "contain" }}
              className="rounded-xl"
              alt={item.piece_name}
              // placeholder="blur"
              // blurDataURL=""
              src={`https://canverse-io.imgix.net/pawnhub/pfprenders_jpg/${item.pfp_file_name}`}
            />
          </div>
        );
      })}
      {/* <div className="flex-1  ml-4 " /> */}
    </div>
  );
};

export default LargeView;
