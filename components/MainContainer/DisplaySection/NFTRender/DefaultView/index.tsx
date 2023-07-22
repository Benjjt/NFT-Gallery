"use client";
import { NFT, APIReturn } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const DefaultView = ({
  initialData,
  fetchedData,
  setSelectedNFT,
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  setSelectedNFT: Function;
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
    <div className=" flex justify-start relative  items-center flex-wrap  p-4  pb-[4rem]  ">
      {NFTS?.map((item: NFT, index) => {
        return (
          <div
            className={`flex relative transition-all flex-initial   justify-center items-center  m-[1%] w-[8rem] h-[8rem]  text-light rounded-xl font-bold hover:scale-105 bg-dark/80 hover:cursor-pointer ${
              index === NFTS.length - 1 && ""
            }`}
            key={item.json_id}
            onClick={() => {
              setSelectedNFT({ ...item });
            }}
          >
            <Image
              fill={true}
              style={{ objectFit: "contain" }}
              className="rounded-xl"
              alt={item.piece_name ? item.piece_name : "canVERSE NFT"}
              src={`https://static.canverse.io/pwntemp/pawnhub/pfprenders_jpg/${item.pfp_file_name}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DefaultView;
