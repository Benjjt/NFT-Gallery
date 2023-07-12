"use client";
import React, { useEffect } from "react";
import { APIReturn, NFT } from "@/app/types";
import DefaultView from "./DefaultView";
import LargeView from "./LargeView";
import ListView from "./ListView";
import { useFilterButtonContext } from "@/app/Context/store";
import PageNavigation from "./PageNavigation";

const NFTRender = ({
  initialData,
  fetchedData,
  setRequestedPage,
  setSelectedNFT,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn;
  setRequestedPage: Function;
  setSelectedNFT: Function;
}) => {
  const { currentDisplay, setCurrentDisplay } = useFilterButtonContext();
  return (
    <div className="w-full h-full relative ">
      {currentDisplay === "default" && (
        <DefaultView
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
      <PageNavigation
        setRequestedPage={setRequestedPage}
        initialData={initialData}
        fetchedData={fetchedData}
      />
    </div>
  );
};

export default NFTRender;
