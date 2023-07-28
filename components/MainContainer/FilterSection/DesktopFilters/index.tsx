"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition, update } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
import { NFT, APIReturn, RemainingCounts, UserFilters } from "@/app/types";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

const DesktopFilters = ({
  filterObj,
  isFilterOpen,
  updatedFilters,
  toggleID,
  IDOfOpen,
  handleFilterAction,
}: {
  filterObj: UserFilters | null;
  isFilterOpen: boolean;
  updatedFilters: RemainingCounts;
  toggleID: Function;
  IDOfOpen: string[];
  handleFilterAction: Function;
}) => {
  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, maxWidth: 0, zIndex: 90 },
    enter: { opacity: 1, maxWidth: 400, zIndex: 90 },
    leave: { opacity: 0, maxWidth: 0, zIndex: 90 },
    // delay: isFilterOpen ? 0 : 400,
  });

  return filtersAnimation(
    (style, item) =>
      item && (
        <animated.div
          className="  w-full h-full overflow-scroll relative p-2"
          style={style}
        >
          <div className="flex flex-col justify-start items-start  gap-8">
            <h2 className="text-xl w-full bg-light font-bold">TRAITS</h2>

            <ul className="flex flex-col justify-start items-start gap-2  w-full h-full ">
              {Object.keys(updatedFilters).map((parentKey, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col
                      hover:cursor-pointer hover:bg-dark/5
                      justify-between font-bold items-center w-full p-4  rounded-md`}
                  >
                    <div
                      onClick={() => {
                        toggleID(parentKey);
                      }}
                      className="flex justify-between items-center w-full"
                    >
                      <li>{parentKey.replaceAll("_", " ")}</li>
                      <div className="flex justify-center items-center gap-4 ">
                        <FiChevronDown
                          className={`w-6 h-6 transition-all ${
                            IDOfOpen.includes(parentKey) && "rotate-180"
                          } `}
                        />
                      </div>
                    </div>

                    {IDOfOpen.includes(parentKey) && (
                      <ul className="flex flex-col gap-4  justify-start items-start w-full mt-4 z-40  ">
                        {Object.keys((updatedFilters as any)[parentKey]).map(
                          (childKey: string, index) => {
                            return (
                              <li
                                key={childKey}
                                onClick={() => {
                                  //*ADD FILTER TYPE AND FILTER TO ARRAY OF FILTER PARAMS
                                  if (
                                    (updatedFilters as any)[parentKey][
                                      childKey
                                    ][1] !== 0
                                  ) {
                                    handleFilterAction(
                                      {
                                        [childKey]: (updatedFilters as any)[
                                          parentKey
                                        ][childKey][0],
                                      },
                                      parentKey
                                    );
                                  }
                                }}
                                className={`w-full py-2 px-4  font-[600] text-sm rounded-md  flex justify-between gap-4 items-center group `}
                              >
                                <span>{childKey.replaceAll("_", " ")}</span>

                                <span className="text-dark/80 ml-auto">
                                  {(updatedFilters as any)[parentKey][
                                    childKey
                                  ][1] != 0 &&
                                    (updatedFilters as any)[parentKey][
                                      childKey
                                    ][1]}
                                </span>
                                {(updatedFilters as any)[parentKey][
                                  childKey
                                ][1] != 0 ? (
                                  filterObj &&
                                  Object.keys(filterObj).includes(parentKey) &&
                                  Object.keys(
                                    (filterObj as any)[parentKey]
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
                                  Object.keys(filterObj).includes(parentKey) &&
                                  Object.keys(
                                    (filterObj as any)[parentKey]
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

export default DesktopFilters;
