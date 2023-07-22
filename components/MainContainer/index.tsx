"use client";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";
import {
  NFT,
  APIReturn,
  RemainingCounts,
  KEYS,
  NumericObject,
  UserFilters,
  ValidKeys,
} from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { isValidNumericObject } from "../../utils/typeChecker";
import { keyInterpretations } from "./DisplaySection/interpretations";

const MainContainer = ({ initialData }: { initialData: APIReturn | null }) => {
  const [filterObj, setFilterObj] = useState<UserFilters | null>(null);
  const [fetchedData, setFetchedData] = useState<APIReturn | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  //*Check is made to see if filterObject has changed
  useEffect(() => {
    console.log("FILTER OBJECT", filterObj);
    if (filterObj) {
      if (Object.keys(filterObj).length > 0) {
        const newInterpretedObj = mergeObjects(filterObj, keyInterpretations);
        const queryString = new URLSearchParams(
          newInterpretedObj as any
        ).toString();
        router.push(`?${queryString}`);
      } else router.push(`/`);
    }
  }, [filterObj]);

  //*Type check URL parameters to make sure they are valid requests
  useEffect(() => {
    const filtersFromURL: NumericObject = urlParamsToObject(
      searchParams?.toString()
    );
    console.log("filtersFromURL: ", filtersFromURL);

    if (isValidNumericObject(filtersFromURL)) {
      console.log("URL PASSED TYPE CHECKING");
      const queryString = new URLSearchParams(filtersFromURL as any).toString();
      const newFilterObject = createNewObjectWithMatches(
        filtersFromURL,
        keyInterpretations
      );
      console.log("NEW FILTER OBJECT", newFilterObject);
      getFilteredNFTs(queryString);
    }
  }, [searchParams]);

  // Function to map keys from the second object to the first object's values
  type AbbreviatedObj = { [key: string]: number };
  type FullKeysObj = { [key: string]: string };

  function createNewObjectWithMatches(
    AbbreviatedObj: AbbreviatedObj,
    FullKeysObj: ValidKeys
  ) {
    let newObject = {};

    for (let key1 in AbbreviatedObj) {
      for (let key2 in FullKeysObj) {
        if (key1 === (FullKeysObj as any)[key2]) {
          newObject = { ...newObject, [key2]: AbbreviatedObj[key1] };
        }
      }
    }

    return newObject;
  }

  function urlParamsToObject(urlParams: string) {
    if (urlParams.startsWith("?")) {
      urlParams = urlParams.substring(1);
    }
    const paramPairs: string[] = urlParams.split("&");
    const paramsObject: Record<string, number> = {};
    for (let i = 0; i < paramPairs.length; i++) {
      const param: string[] = paramPairs[i].split("=");
      const key: string = decodeURIComponent(param[0]);
      const value: string = decodeURIComponent(param[1]).replaceAll("+", " ");
      const numericValue: number = parseFloat(value); // Parse the value to a number

      if (!isNaN(numericValue)) {
        paramsObject[key] = numericValue;
      } else {
        //if NaN ignore key value pair.
        //!If there are attributes that don't accept integers as thier reference, exceptions can be made here
        continue;
      }
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

  function mergeObjects(
    userFilters: UserFilters,
    keyInterpretations: ValidKeys
  ): Record<string, number[]> {
    const output: Record<string, number[]> = {};

    for (const filterKey in userFilters) {
      if (filterKey in keyInterpretations) {
        const interpretationKey = (keyInterpretations as any)[filterKey];
        const subKeys = (userFilters as any)[filterKey];

        for (const subKey in subKeys) {
          const value = subKeys[subKey];

          if (!output[interpretationKey]) {
            output[interpretationKey] = [];
          }

          output[interpretationKey].push(value);
        }
      }
    }

    return output;
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
