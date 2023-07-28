"use client";
import React, { useEffect, useState } from "react";
import OrderedFilterSection from "./OrderedFilterSection";
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

const MainContainer = ({
  initialData,
  setSelectedNFT,
  selectedNFT,
}: {
  initialData: APIReturn;
  setSelectedNFT: Function;
  selectedNFT: NFT | null;
}) => {
  const [filterObj, setFilterObj] = useState<UserFilters | null>(null);
  const [previousFilters, setPreviousFilters] = useState<UserFilters | null>(
    null
  );
  const [fetchedData, setFetchedData] = useState<APIReturn | null>(null);
  const [requestedPage, setRequestedPage] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  //*Check is made to see if filterObject has changed
  useEffect(() => {
    if (filterObj) {
      if (Object.keys(filterObj).length > 0) {
        if ("page" in filterObj && previousFilters) {
          const { page: prevPage, ...newFilters } = filterObj;
          const { page: nextPage, ...prevFilters } = previousFilters;

          if (JSON.stringify(newFilters) !== JSON.stringify(prevFilters)) {
            // Filters (except the page) have changed, remove the page key from the filter object
            setFilterObj({ ...newFilters, page: 1 });
          }
        }

        let newInterpretedObj = mergeObjects(filterObj, keyInterpretations);
        //checks to see if user has supplied a page filter
        if (filterObj.hasOwnProperty("page") && filterObj.page) {
          let pageNumber: number = filterObj.page;
          newInterpretedObj = { ...newInterpretedObj, page: [pageNumber] };
        }
        const queryString = new URLSearchParams(
          newInterpretedObj as any
        ).toString();
        //save filter object to state
        setPreviousFilters(filterObj);
        router.push(`/?${queryString}`);
      } else router.push(`/`);
    }
  }, [filterObj]);

  //*Type check URL parameters to make sure they are valid requests
  useEffect(() => {
    const filtersFromURL: NumericObject = urlParamsToObject(
      searchParams?.toString()
    );

    if (isValidNumericObject(filtersFromURL)) {
      const queryString = new URLSearchParams(filtersFromURL as any).toString();
      //swaps key interpretations back for full strings
      const newFilterObject = createNewObjectWithMatches(
        filtersFromURL,
        keyInterpretations
      );

      //swaps integers for coresponding attribute names
      const newFiltersFromURL = findAndAddAttributes(newFilterObject);

      setFilterObj(newFiltersFromURL);
      //call API with original query URL
      getFilteredNFTs(queryString);
    } else {
      //!SHOW INVALID URL ERROR.
    }
  }, [searchParams]);

  // Function to map keys from the second object to the first object's values
  type AbbreviatedObj = { [key: string]: number };

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

  function findAndAddAttributes(
    orginalObj: Record<string, number>
  ): Record<string, any> {
    let newObj: Record<string, any> = {};
    let fullFilterList: RemainingCounts = initialData.remaining_counts;
    for (const key1 in orginalObj) {
      if (key1 === "page") {
        newObj = { ...newObj, page: orginalObj[key1] };
      } else
        for (const key2 in fullFilterList) {
          if (key1 == key2) {
            for (const key3 in (fullFilterList as any)[key2]) {
              if (orginalObj[key1] == (fullFilterList as any)[key2][key3][0]) {
                newObj = {
                  ...newObj,
                  [key1]: { [key3]: (fullFilterList as any)[key2][key3][0] },
                };
              }
            }
          }
        }
    }

    return newObj;
  }

  return (
    <div className="w-full h-full flex justify-center items-center px-8 ">
      <OrderedFilterSection
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        initialData={initialData}
        fetchedData={fetchedData}
      />
      <DisplaySection
        setFilterObj={setFilterObj}
        setSelectedNFT={setSelectedNFT}
        selectedNFT={selectedNFT}
        filterObj={filterObj}
        initialData={initialData}
        fetchedData={fetchedData}
        setRequestedPage={setRequestedPage}
      />
    </div>
  );
};

export default MainContainer;
