"use client";
import React, { useEffect } from "react";
import { APIReturn, NFT, UserFilters } from "@/app/types";
import ListView from "./ListView";
import { useFilterButtonContext } from "@/app/Context/store";
import PageNavigation from "./PageNavigation";
import DefaultGrid from "./DefaultGrid";
import LargeGrid from "./LargeGrid";

const NFTRender = ({
  initialData,
  fetchedData,
  setSelectedNFT,
  setFilterObj,
  filterObj,
  setRequestedPage,
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  setSelectedNFT: Function;
  setFilterObj: Function;
  filterObj: UserFilters | null;
  setRequestedPage: Function;
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
        <LargeGrid
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
        initialData={initialData}
        fetchedData={fetchedData}
        setFilterObj={setFilterObj}
        filterObj={filterObj}
        setRequestedPage={setRequestedPage}
      />
    </div>
  );
};

export default NFTRender;
