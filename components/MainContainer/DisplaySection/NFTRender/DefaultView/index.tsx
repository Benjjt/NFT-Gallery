"use client";
import { NFT, APIReturn } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const DefaultView = ({
  initialData,
  fetchedData,
}: {
  initialData: APIReturn;
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

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <div className=" flex justify-start  items-center flex-wrap gap-4 p-4 w-fit  ">
      {NFTS?.map((item, index) => {
        return (
          <div
            className={`flex relative  justify-center items-center w-[8rem] h-[8rem]  text-light rounded-xl font-bold bg-dark/80 hover:cursor-pointer ${
              index === NFTS.length - 1 && ""
            }`}
            key={index}
          >
            {/* {item.pfp_file_name} */}
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
    </div>
  );
};

export default DefaultView;
