"use client";
import React, { useState, useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import Image from "next/image";

const LargeView = ({ initialData }: { initialData: APIReturn }) => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);

  useEffect(() => {
    setNFTS(initialData?.records);
  }, [initialData]);

  return (
    <div className=" flex justify-start items-center flex-wrap gap-4 p-4">
      {NFTS?.map((item, index) => {
        return (
          <div
            className="flex relative  justify-center items-center w-[16rem] h-[16rem]  text-light rounded-xl font-bold bg-dark/80 hover:cursor-pointer"
            key={index}
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
