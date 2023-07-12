"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";
import { NFT, APIReturn, RemainingCounts } from "@/app/types";

const MainContainer = ({ initialData }: { initialData: APIReturn }) => {
  const [filterObj, setFilterObj] = useState<RemainingCounts>({});
  const [fetchedData, setFetchedData] = useState<APIReturn>();
  const [requestedPage, setRequestedPage] = useState<number>(1);
  const [previousRequest, setPreviousRequest] = useState<object>({});

  const keyInterpretations = {
    base_rarity: "bR",
    base_item: "bI",
    body_rarity: "boR",
    body_item: "boI",
    head_rarity: "hR",
    head_item: "hI",
    felt_rarity: "fR",
    felt_item: "fI",
    main_material_rarity: "mmR",
    main_material_item: "mmI",
    alt_material_on: "aMO",
    alt_material_rarity: "aMR",
    alt_material_item: "aMI",
    accent_material_on: "acMO",
    accent_material_rarity: "acMR",
    accent_material_item: "acMI",
    environment: "e",
    board: "b",
    piece_type: "pT",
    piece_color: "pC",
    rarity_score: "rS",
  };

  type KEYS = {
    base_rarity: string;
    base_item: string;
    body_rarity: string;
    body_item: string;
    head_rarity: string;
    head_item: string;
    felt_rarity: string;
    felt_item: string;
    main_material_rarity: string;
    main_material_item: string;
    alt_material_on: string;
    alt_material_rarity: string;
    alt_material_item: string;
    accent_material_on: string;
    accent_material_rarity: string;
    accent_material_item: string;
    environment: string;
    board: string;
    piece_type: string;
    piece_color: string;
    rarity_score: string;
  };

  function filterObjects(
    userFilters: RemainingCounts,
    interpretations: KEYS
  ): Record<string, number> {
    const newObj: Record<string, number> = {};
    for (const key in interpretations) {
      if (userFilters.hasOwnProperty(key)) {
        newObj[interpretations[key]] = Object.keys(
          initialData.remaining_counts[key]
        ).indexOf(userFilters[key]);
      }
    }
    return newObj;
  }

  const fetchWithFilters = async (url: string = "", page: number = 0) => {
    const res = await fetch(
      `https://devpawnhub.canversedebug.xyz/pieces?${url}&page=${page}`,
      {
        headers: {
          "x-api-key": "SX/R0nGDq7PsaIVJ4OHH95mmMi5Sjz/WpAYIg1il1tn8",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log(res);
      throw new Error("Failed to fetch data");
    }

    console.log(res);

    let data = await res.json();

    console.log(data);

    // console.log("HERES THE RESULT:", await res.json());
    setFetchedData(data);
  };

  useEffect(() => {
    console.log("API useeffect triggered");
    if (Object.keys(filterObj).length > 0) {
      console.log("No filters within filter object");
      let newObj = filterObjects(filterObj, keyInterpretations);
      let url = new URLSearchParams(newObj).toString();
      if (previousRequest != filterObj) {
        console.log("new request as object is now different");
        fetchWithFilters(url, 1);
      } else {
        console.log("Same attribute filters requested. Requesting new page!");
        fetchWithFilters(url, requestedPage);
      }
    }
    if (requestedPage > 0 && Object.keys(filterObj).length === 0) {
      console.log("New page requested for initial data.");
      fetchWithFilters("", requestedPage);
    }
    setPreviousRequest(filterObj);
  }, [filterObj, requestedPage]);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <FilterSection
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        initialData={initialData}
        fetchedData={fetchedData}
      />
      <DisplaySection
        setFilterObj={setFilterObj}
        filterObj={filterObj}
        initialData={initialData}
        fetchedData={fetchedData}
        setRequestedPage={setRequestedPage}
      />
    </div>
  );
};

export default MainContainer;
