"use client";
import React, { useEffect, useState } from "react";
import LoadingPlaceholders from "./LoadingPlaceholders";
import NFTRender from "./NFTRender";
import { APIReturn, NFT, RemainingCounts } from "@/app/types";
import { IoIosCloseCircle } from "react-icons/io";
import NFTDetails from "./NFTRender/NFTDetails";

const DisplaySection = ({
  initialData,
  fetchedData,
  filterObj,
  setFilterObj,
  setRequestedPage,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn;
  filterObj: object;
  setFilterObj: Function;
  setRequestedPage: Function;
}) => {
  const [selectedNFT, setSelectedNFT] = useState<NFT>({});

  const deleteSelection = (key: string) => {
    const newObj = { ...filterObj };
    delete newObj[key as keyof typeof filterObj];
    setFilterObj(newObj);
  };

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col justify-start items-start   ">
      <div className="flex justify-start items-center gap-2 flex-wrap p-4 ">
        {Object.keys(filterObj).map((key, index) => {
          return (
            <div
              key={index}
              className="p-2 gap-2 border rounded-lg flex justify-start items-center"
            >
              <span>
                {key.replaceAll("_", " ")}:{" "}
                <span className="text-sm font-[700]">
                  {filterObj[key as keyof typeof filterObj].replaceAll(
                    "_",
                    " "
                  )}
                </span>
              </span>
              <IoIosCloseCircle
                onClick={() => {
                  deleteSelection(key);
                }}
                className="w-6 h-6 hover:cursor-pointer hover:fill-accentTwo transition-all"
              />
            </div>
          );
        })}
      </div>
      <NFTRender
        setRequestedPage={setRequestedPage}
        initialData={initialData}
        fetchedData={fetchedData}
        setSelectedNFT={setSelectedNFT}
      />
      {Object.keys(selectedNFT).length > 0 && (
        <NFTDetails nft={selectedNFT} setSelectedNFT={setSelectedNFT} />
      )}
    </div>
  );
};

export default DisplaySection;
