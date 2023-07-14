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
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  filterObj: RemainingCounts | null;
  setFilterObj: Function;
}) => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [intCopied, setIntCopied] = useState<boolean>(false);

  const deleteSelection = (key: string) => {
    const newObj = { ...filterObj };
    delete newObj[key as keyof typeof filterObj];
    setFilterObj(newObj);
  };

  useEffect(() => {
    setCopyClicked(false);
    setIntCopied(false);
  }, [selectedNFT]);

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col justify-start items-start   ">
      <div className="flex justify-start items-center gap-2 flex-wrap p-4 ">
        {filterObj &&
          Object.keys(filterObj).map((key, index) => {
            return (
              <div
                key={index}
                className="p-2 gap-2 border rounded-lg flex justify-start items-center"
              >
                <span>
                  {key.replaceAll("_", " ")}:{" "}
                  <span className="text-sm font-[700]">
                    {(filterObj as any)[key].replaceAll("_", " ")}
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
        initialData={initialData}
        fetchedData={fetchedData}
        setSelectedNFT={setSelectedNFT}
      />
      {selectedNFT && (
        <NFTDetails
          copyClicked={copyClicked}
          setCopyClicked={setCopyClicked}
          selectedNFT={selectedNFT}
          setSelectedNFT={setSelectedNFT}
          intCopied={intCopied}
          setIntCopied={setIntCopied}
        />
      )}
    </div>
  );
};

export default DisplaySection;
