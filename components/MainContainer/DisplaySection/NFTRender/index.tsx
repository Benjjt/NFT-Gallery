"use client";
import React, { useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import DefaultView from "./DefaultView";
import LargeView from "./LargeView";
import ListView from "./ListView";
import { useFilterButtonContext } from "@/app/Context/store";

const NFTRender = ({
  initialData,
  fetchedData,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn;
}) => {
  const { currentDisplay, setCurrentDisplay } = useFilterButtonContext();
  return (
    <div className="w-full h-full ">
      {currentDisplay === "default" && (
        <DefaultView initialData={initialData} fetchedData={fetchedData} />
      )}
      {currentDisplay === "large" && <LargeView initialData={initialData} />}
      {currentDisplay === "list" && <ListView initialData={initialData} />}
    </div>
  );
};

export default NFTRender;
