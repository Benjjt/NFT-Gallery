"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition, update } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
import { NFT, APIReturn, RemainingCounts, UserFilters } from "@/app/types";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";

const FilterSection = ({
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
  const [IDOfOpen, setIDOfOpen] = useState<string>("");
  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    enter: { opacity: 1, maxWidth: 400, zIndex: 999999 },
    leave: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    // delay: isFilterOpen ? 0 : 400,
  });

  //Set both state objects using same data on first load
  useEffect(() => {
    const firstCallFilters: RemainingCounts = initialData.remaining_counts;
    setInitialFilters(firstCallFilters);
    setUpdatedFilters(firstCallFilters);
  }, []);

  useEffect(() => {
    console.log("FILTERS BEING DISPLAYED", updatedFilters);
  }, [updatedFilters]);

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

  const handleFilterAction = (selection: Record<string, number>) => {
    console.log(selection);
    if (filterObj) {
      setFilterObj({ ...filterObj, [IDOfOpen]: selection });
    } else setFilterObj({ [IDOfOpen]: selection });

    // if (
    //   filterObj &&
    //   IDOfOpen in filterObj &&
    //   (filterObj as any)[IDOfOpen] === selection
    // ) {
    //   console.log("item to be deleted");
    //   let newObj = { ...filterObj };
    //   delete newObj[IDOfOpen as keyof typeof filterObj];
    //   console.log("Updating state with deletion");
    //   setFilterObj(newObj);
    // } else {
    // }
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
              {Object.keys(updatedFilters).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col
                      hover:cursor-pointer hover:bg-dark/5
                      justify-between font-bold items-center w-full p-4  rounded-md`}
                  >
                    <div
                      onClick={() => {
                        if (IDOfOpen === item) {
                          setIDOfOpen("");
                        } else setIDOfOpen(item);
                      }}
                      className="flex justify-between items-center w-full"
                    >
                      <li>{item.replaceAll("_", " ")}</li>
                      <div className="flex justify-center items-center gap-4 ">
                        <FiChevronDown
                          className={`w-6 h-6 transition-all ${
                            IDOfOpen === item && "rotate-180"
                          } `}
                        />
                      </div>
                    </div>

                    {IDOfOpen === item && (
                      <ul className="flex flex-col gap-4  justify-start items-start w-full mt-4 z-40  ">
                        {Object.keys((updatedFilters as any)[item]).map(
                          (item: string, index) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  //*ADD FILTER TYPE AND FILTER TO ARRAY OF FILTER PARAMS
                                  if (
                                    (updatedFilters as any)[IDOfOpen][
                                      item
                                    ][1] !== 0
                                  ) {
                                    handleFilterAction({
                                      [item]: (updatedFilters as any)[IDOfOpen][
                                        item
                                      ][0],
                                    });
                                  }
                                }}
                                className={`w-full py-2 px-4  font-[600] text-sm rounded-md  flex justify-between gap-4 items-center group `}
                              >
                                <span>{item.replaceAll("_", " ")}</span>

                                <span className="text-dark/80 ml-auto">
                                  {(updatedFilters as any)[IDOfOpen][item][1] !=
                                    0 &&
                                    (updatedFilters as any)[IDOfOpen][item][1]}
                                </span>
                                {(updatedFilters as any)[IDOfOpen][item][1] !=
                                0 ? (
                                  filterObj &&
                                  Object.keys(filterObj).includes(IDOfOpen) &&
                                  Object.keys(
                                    (filterObj as any)[IDOfOpen]
                                  ).includes(item) ? (
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
                                  Object.keys(filterObj).includes(IDOfOpen) &&
                                  Object.keys(
                                    (filterObj as any)[IDOfOpen]
                                  ).includes(item) ? (
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

export default FilterSection;
