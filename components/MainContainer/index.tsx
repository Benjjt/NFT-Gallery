"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";
import { NFT, APIReturn, RemainingCounts, KEYS } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

const MainContainer = ({ initialData }: { initialData: APIReturn | null }) => {
  const [filterObj, setFilterObj] = useState<RemainingCounts | null>(null);
  const [fetchedData, setFetchedData] = useState<APIReturn | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  //*Check is made to see if filterObject has changed
  useEffect(() => {
    if (filterObj) {
      //*If filer object is not null the filters become query param string which is pushed to router
      const queryString = new URLSearchParams(filterObj).toString();
      const fullUrl = `?${queryString}`;
      router.push(fullUrl);
    }
  }, [filterObj]);

  //*URL parameters turned back into object and compared against current UI filters
  useEffect(() => {
    if (searchParams && filterObj) {
      console.log("Both filter object and URL filters present");
      const filtersFromURL = urlParamsToObject(searchParams?.toString());
      console.log("URL FILTERS: ", filtersFromURL);
      console.log("CURRENT FILTER OBJECT: ", filterObj);
      console.log(compareURlToFilterObj(filterObj, filtersFromURL));
    } else if (searchParams && !filterObj) {
      const filtersFromURL = urlParamsToObject(searchParams?.toString());
      setFilterObj(filtersFromURL);
      const url = filterObjects(filtersFromURL, keyInterpretations);
      const queryString = new URLSearchParams(url).toString();
      getFilteredNFTs(queryString);
    }
  }, [searchParams]);

  function compareURlToFilterObj(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  function urlParamsToObject(urlParams: string) {
    if (urlParams.startsWith("?")) {
      urlParams = urlParams.substring(1);
    }
    const paramPairs: string[] = urlParams.split("&");
    const paramsObject: Record<string, string> = {};
    for (let i = 0; i < paramPairs.length; i++) {
      const param: string[] = paramPairs[i].split("=");
      const key: string = decodeURIComponent(param[0]);
      const value: string = decodeURIComponent(param[1]).replaceAll("+", " ");
      paramsObject[key] = value;
    }

    return paramsObject;
  }

  async function getFilteredNFTs(filters: string) {
    const res = await fetch(
      `https://devpawnhub.canversedebug.xyz/pieces?${filters}`,
      {
        headers: {
          "x-api-key": "SX/R0nGDq7PsaIVJ4OHH95mmMi5Sjz/WpAYIg1il1tn8",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log(res);
      throw new Error("Failed to fetch data");
    } else {
      let data = await res.json();
      setFetchedData(data);
    }
  }

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
    page: "page",
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
