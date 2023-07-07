"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";
import { NFT, APIReturn } from "@/app/types";

const MainContainer = ({ initialData }: { initialData: APIReturn }) => {
  const [filterObj, setFilterObj] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<APIReturn | null>(null);

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

  function filterObjects(
    obj1: Record<string, any>,
    obj2: Record<string, any>
  ): Record<string, any> {
    const newObj: Record<string, any> = {};

    for (const key in obj2) {
      if (obj1.hasOwnProperty(key)) {
        //CHANGE VALUE ACCESS WHEN GETTING API RETURN
        newObj[obj2[key]] = Object.keys(
          initialData.remaining_counts[key]
        ).indexOf(obj1[key]);
      }
    }

    return newObj;
  }

  const fetchWithFilters = async (url: string) => {
    const res = await fetch(
      `https://devpawnhub.canversedebug.xyz/pieces?${url}`,
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
    if (Object.keys(filterObj).length > 0) {
      console.log(filterObj);

      let newObj = filterObjects(filterObj, keyInterpretations);

      let url = new URLSearchParams(newObj).toString();

      fetchWithFilters(url);
    }
  }, [filterObj]);

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
      />
    </div>
  );
};

export default MainContainer;
