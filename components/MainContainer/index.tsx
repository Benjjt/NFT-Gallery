"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";
import { NFT, APIReturn, RemainingCounts, KEYS } from "@/app/types";
import { useSearchParams, useRouter } from "next/navigation";

const MainContainer = ({ initialData }: { initialData: APIReturn | null }) => {
  const [filterObj, setFilterObj] = useState<RemainingCounts | null>(null);
  const [fetchedData, setFetchedData] = useState<APIReturn | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

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

  useEffect(() => {
    if (filterObj) {
      const newObj = filterObjects(filterObj, keyInterpretations);
      const queryParams = new URLSearchParams(newObj);
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
