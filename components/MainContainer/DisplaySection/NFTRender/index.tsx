"use client";
import React, { useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import DefaultView from "./DefaultView";
import LargeView from "./LargeView";
import ListView from "./ListView";
import { useFilterButtonContext } from "@/app/Context/store";
import PageNavigation from "./PageNavigation";
import DefaultGrid from "./DefaultGrid";

const NFTRender = ({
  initialData,
  fetchedData,
  setSelectedNFT,
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  setSelectedNFT: Function;
}) => {
  const { currentDisplay, setCurrentDisplay } = useFilterButtonContext();
  return (
    <div className="w-full h-full relative ">
      {currentDisplay === "default" && (
        <DefaultGrid
          setSelectedNFT={setSelectedNFT}
          initialData={initialData}
          fetchedData={fetchedData}
        />
      )}
      {currentDisplay === "large" && (
        <LargeView
          setSelectedNFT={setSelectedNFT}
          initialData={initialData}
          fetchedData={fetchedData}
        />
      )}
      {currentDisplay === "list" && (
        <ListView
          setSelectedNFT={setSelectedNFT}
          initialData={initialData}
          fetchedData={fetchedData}
        />
      )}
      <PageNavigation initialData={initialData} fetchedData={fetchedData} />
    </div>
  );
};

export default NFTRender;
