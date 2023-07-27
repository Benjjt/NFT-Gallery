"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition, update } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
import {
  NFT,
  APIReturn,
  RemainingCounts,
  UserFilters,
  FilterKeyOrder,
} from "@/app/types";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

const OrderedFilterSection = ({
  initialData,
  fetchedData,
  filterObj,
  setFilterObj,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn | null;
  filterObj: UserFilters | null;
  setFilterObj: Function;
}) => {
  const { isFilterOpen } = useFilterButtonContext();
  const [initialFilters, setInitialFilters] = useState<RemainingCounts>({});
  const [updatedFilters, setUpdatedFilters] = useState<RemainingCounts>({});
  const [IDOfOpen, setIDOfOpen] = useState<string[]>([]);

  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, maxWidth: 0, zIndex: 90 },
    enter: { opacity: 1, maxWidth: 400, zIndex: 90 },
    leave: { opacity: 0, maxWidth: 0, zIndex: 90 },
    // delay: isFilterOpen ? 0 : 400,
  });

  //Set both state objects using same data on first load
  useEffect(() => {
    const firstCallFilters: RemainingCounts = initialData.remaining_counts;
    setInitialFilters(firstCallFilters);
    setUpdatedFilters(firstCallFilters);
  }, []);

  useEffect(() => {
    console.log(IDOfOpen);
  }, [IDOfOpen]);

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

  return filtersAnimation(
    (style, item) =>
      item && (
        <animated.div
          className="w-full h-full overflow-scroll relative p-2"
          style={style}
        >
          <div className="flex flex-col justify-start items-start  gap-8">
            <h2 className="text-xl w-full bg-light font-bold">TRAITS</h2>

            <ul className="flex flex-col justify-start items-start gap-2  w-full h-full ">
              {FilterKeyOrder.map((filterKey, index) => {
                const filterData = updatedFilters[filterKey];

                return (
                  <div
                    key={index}
                    className={`flex flex-col
                      hover:cursor-pointer hover:bg-dark/5
                      justify-between font-bold items-center w-full p-4  rounded-md`}
                  >
                    <div
                      onClick={() => {
                        toggleID(filterKey);
                      }}
                      className="flex justify-between items-center w-full"
                    >
                      <li>{filterKey.replaceAll("_", " ")}</li>
                      <div className="flex justify-center items-center gap-4 ">
                        <FiChevronDown
                          className={`w-6 h-6 transition-all ${
                            IDOfOpen.includes(filterKey) && "rotate-180"
                          } `}
                        />
                      </div>
                    </div>

                    {IDOfOpen.includes(filterKey) && (
                      <ul className="flex flex-col gap-4  justify-start items-start w-full mt-4 z-40  ">
                        {Object.keys((updatedFilters as any)[filterKey]).map(
                          (childKey: string, index) => {
                            return (
                              <li
                                key={childKey}
                                onClick={() => {
                                  //*ADD FILTER TYPE AND FILTER TO ARRAY OF FILTER PARAMS
                                  if (
                                    (updatedFilters as any)[filterKey][
                                      childKey
                                    ][1] !== 0
                                  ) {
                                    handleFilterAction(
                                      {
                                        [childKey]: (updatedFilters as any)[
                                          filterKey
                                        ][childKey][0],
                                      },
                                      filterKey
                                    );
                                  }
                                }}
                                className={`w-full py-2 px-4  font-[600] text-sm rounded-md  flex justify-between gap-4 items-center group `}
                              >
                                <span>{childKey.replaceAll("_", " ")}</span>

                                <span className="text-dark/80 ml-auto">
                                  {(updatedFilters as any)[filterKey][
                                    childKey
                                  ][1] != 0 &&
                                    (updatedFilters as any)[filterKey][
                                      childKey
                                    ][1]}
                                </span>
                                {(updatedFilters as any)[filterKey][
                                  childKey
                                ][1] != 0 ? (
                                  filterObj &&
                                  Object.keys(filterObj).includes(filterKey) &&
                                  Object.keys(
                                    (filterObj as any)[filterKey]
                                  ).includes(childKey) ? (
                                    <BsFillCheckSquareFill className="fill-accentTwo  w-6 h-6 rounded-lg" />
                                  ) : (
                                    <div
                                      className={`w-6 h-6  rounded-lg 
                                  flex justify-center items-center border
                                
                                `}
                                    >
                                      <BsFillCheckSquareFill className="group-hover:fill-accentTwo/50 hidden group-hover:flex w-6 h-6 rounded-lg" />
                                    </div>
                                  )
                                ) : filterObj &&
                                  Object.keys(filterObj).includes(filterKey) &&
                                  Object.keys(
                                    (filterObj as any)[filterKey]
                                  ).includes(childKey) ? (
                                  <BsFillCheckSquareFill className="fill-accentTwo  w-6 h-6 rounded-lg" />
                                ) : (
                                  <div
                                    className={`w-6 h-6   
                              flex justify-center items-center 
                            
                            `}
                                  >
                                    <AiFillLock className="fill-dark/80 w-8 h-8" />
                                  </div>
                                )}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </animated.div>
      )
  );
};

export default OrderedFilterSection;
