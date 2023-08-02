"use client";
import React, { useState, useEffect } from "react";
import { useFilterButtonContext } from "@/app/Context/store";
import { APIReturn, RemainingCounts, UserFilters } from "@/app/types";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import MobileFilters from "../FilterSection/MobileFilters";
import DesktopFilters from "../FilterSection/DesktopFilters";

const OrderedFilterSection = ({
  initialData,
  fetchedData,
  filterObj,
  setFilterObj,
  NFTsLoading,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn | null;
  filterObj: UserFilters | null;
  setFilterObj: Function;
  NFTsLoading: boolean;
}) => {
  const { isFilterOpen, setIsFilterOpen } = useFilterButtonContext();
  const [initialFilters, setInitialFilters] = useState<RemainingCounts>({});
  const [updatedFilters, setUpdatedFilters] = useState<RemainingCounts>({});
  const [IDOfOpen, setIDOfOpen] = useState<string[]>([]);

  //Set both state objects using same data on first load
  useEffect(() => {
    const firstCallFilters: RemainingCounts = initialData.remaining_counts;
    setInitialFilters(firstCallFilters);
    setUpdatedFilters(firstCallFilters);
  }, []);

  useEffect(() => {
    // Your subsequent API call to get the updated remaining counts.
    // Let's assume the response is stored in a variable called `updatedApiResponse`.
    if (fetchedData) {
      let newUpdatedFilters: RemainingCounts = { ...initialFilters };
      const APIFilterReturn: RemainingCounts = fetchedData.remaining_counts;
      for (const key in newUpdatedFilters) {
        if (key in APIFilterReturn) {
          // Update the value at index 1 of the number array with the value from APIFilterReturn
          for (const attribute in (newUpdatedFilters as any)[key]) {
            if (
              (APIFilterReturn as any)[key] &&
              (APIFilterReturn as any)[key][attribute]
            ) {
              (newUpdatedFilters as any)[key][attribute][1] = (
                APIFilterReturn as any
              )[key][attribute][1];
            } else {
              // Handle the case where the nested key or attribute doesn't exist in APIFilterReturn
              (newUpdatedFilters as any)[key][attribute][1] = 0;
            }
          }
        } else {
          // If the key is missing in APIFilterReturn, set the value at index 1 to 0
          for (const attribute in (newUpdatedFilters as any)[key]) {
            (newUpdatedFilters as any)[key][attribute][1] = 0;
          }
        }
      }

      setUpdatedFilters(newUpdatedFilters);
    }
  }, [fetchedData, initialFilters]);

  const toggleID = (clickedString: string) => {
    setIDOfOpen((prevIDs) => {
      const index = prevIDs.indexOf(clickedString);
      if (index !== -1) {
        // String is already in the array, so remove it
        return prevIDs.filter((id) => id !== clickedString);
      } else {
        // String is not in the array, so add it
        return [...prevIDs, clickedString];
      }
    });
  };

  const handleFilterAction = (
    selection: Record<string, number>,
    parentKey: string
  ) => {
    console.log(selection);
    if (filterObj) {
      setFilterObj({ ...filterObj, [parentKey]: selection });
    } else setFilterObj({ [parentKey]: selection });
  };

  return isMobile ? (
    <MobileFilters
      filterObj={filterObj}
      setFilterObj={setFilterObj}
      isFilterOpen={isFilterOpen}
      updatedFilters={updatedFilters}
      toggleID={toggleID}
      IDOfOpen={IDOfOpen}
      handleFilterAction={handleFilterAction}
      setIsFilterOpen={setIsFilterOpen}
      NFTsLoading={NFTsLoading}
    />
  ) : (
    <DesktopFilters
      filterObj={filterObj}
      isFilterOpen={isFilterOpen}
      updatedFilters={updatedFilters}
      toggleID={toggleID}
      IDOfOpen={IDOfOpen}
      handleFilterAction={handleFilterAction}
      NFTsLoading={NFTsLoading}
    />
  );
};

export default OrderedFilterSection;
