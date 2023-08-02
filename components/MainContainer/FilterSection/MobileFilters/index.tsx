"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition, update } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
import { NFT, APIReturn, RemainingCounts, UserFilters } from "@/app/types";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { AiFillLock, AiOutlineLoading3Quarters } from "react-icons/ai";

const MobileFilters = ({
  filterObj,
  setFilterObj,
  isFilterOpen,
  updatedFilters,
  toggleID,
  IDOfOpen,
  handleFilterAction,
  setIsFilterOpen,
  NFTsLoading,
}: {
  filterObj: UserFilters | null;
  setFilterObj: Function;
  isFilterOpen: boolean;
  updatedFilters: RemainingCounts;
  toggleID: Function;
  IDOfOpen: string[];
  handleFilterAction: Function;
  setIsFilterOpen: Function;
  NFTsLoading: boolean;
}) => {
  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, y: 500, zIndex: 90 },
    enter: { opacity: 1, y: 0, zIndex: 90 },
    leave: { opacity: 0, y: 500, zIndex: 90 },
    // delay: isFilterOpen ? 0 : 400,
  });

  return filtersAnimation(
    (style, item) =>
      item && (
        <animated.div
          className="absolute h-screen w-full overflow-scroll  p-4 bg-white"
          style={style}
        >
          <div className="flex z-10 flex-col justify-start items-start  gap-8">
            <h2 className="text-xl w-full bg-light font-bold pl-2">TRAITS</h2>

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
                                {NFTsLoading ? (
                                  <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin" />
                                ) : (updatedFilters as any)[parentKey][
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
                                    0
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
          <div
            style={{ zIndex: 100 }}
            className="fixed  bottom-0 left-0 flex gap-4 justify-evenly items-center bg-white w-full p-4 border-t"
          >
            <span
              onClick={() => {
                setFilterObj({});
                setIsFilterOpen(false);
              }}
              className="w-1/2 flex justify-center items-center border rounded-xl py-2 text-dark font-bold bg-dark/10"
            >
              Clear all
            </span>
            <span
              onClick={() => {
                setIsFilterOpen(false);
              }}
              className="w-1/2 flex justify-center items-center border rounded-xl py-2 bg-accentTwo text-white font-bold"
            >
              Done
            </span>
          </div>
        </animated.div>
      )
  );
};

export default MobileFilters;
