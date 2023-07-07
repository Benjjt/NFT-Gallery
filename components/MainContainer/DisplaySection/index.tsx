"use client";
import React, { useEffect } from "react";
import LoadingPlaceholders from "./LoadingPlaceholders";
import NFTRender from "./NFTRender";
import { APIReturn, NFT } from "@/app/types";
import { IoIosCloseCircle } from "react-icons/io";

const DisplaySection = ({
  initialData,
  fetchedData,
  filterObj,
  setFilterObj,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn;
  filterObj: object;
  setFilterObj: Function;
}) => {
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
                  {filterObj[key].replaceAll("_", " ")}
                </span>
              </span>
              <IoIosCloseCircle
                onClick={() => {}}
                className="w-6 h-6 hover:cursor-pointer hover:fill-accentTwo transition-all"
              />
            </div>
          );
        })}
      </div>
      <NFTRender initialData={initialData} fetchedData={fetchedData} />
    </div>
  );
};

export default DisplaySection;
