"use client";
import React, { useState, useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import Image from "next/image";

const ListView = ({ initialData }: { initialData: APIReturn }) => {
  const [NFTS, setNFTS] = useState<NFT[]>([]);

  useEffect(() => {
    setNFTS(initialData?.records);
  }, [initialData]);

  return (
    <div className="flex flex-col w-full gap-2 p-4">
      {NFTS?.map((item, index) => {
        return (
          <div
            className="flex justify-start gap-4 p-6   items-center w-full h-[4rem]  rounded-xl font-bold text-dark border hover:cursor-pointer"
            key={index}
          >
            <div className="h-[3rem] w-[3rem] relative">
              <Image
                fill={true}
                style={{ objectFit: "contain" }}
                className="rounded-md"
                alt={item.piece_name}
                // placeholder="blur"
                // blurDataURL=""
                src={`https://canverse-io.imgix.net/pawnhub/pfprenders_jpg/${item.pfp_file_name}`}
              />
            </div>
            {item.piece_name}
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
