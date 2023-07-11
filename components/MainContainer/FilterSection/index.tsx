"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
import { NFT, APIReturn } from "@/app/types";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";

const FilterSection = ({
  initialData,
  fetchedData,
  filterObj,
  setFilterObj,
}: {
  initialData: APIReturn;
  fetchedData: APIReturn | null;
  filterObj: object;
  setFilterObj: Function;
}) => {
  const { isFilterOpen, setIsFilterOpen, currentDisplay } =
    useFilterButtonContext();
  const [displayedFilters, setDisplayedFilters] = useState({});
  const [filtersRemaining, setFiltersRemaining] = useState<object>({});
  const [IDOfOpen, setIDOfOpen] = useState("");
  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    enter: { opacity: 1, maxWidth: 400, zIndex: 999999 },
    leave: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    // delay: isFilterOpen ? 0 : 400,
  });

  useEffect(() => {
    !fetchedData && setDisplayedFilters(initialData.remaining_counts);
  }, [initialData]);

  useEffect(() => {
    fetchedData && setFiltersRemaining(fetchedData.remaining_counts);
  }, [fetchedData]);

  const handleFilterAction = (selection: string) => {
    if (IDOfOpen in filterObj && filterObj[IDOfOpen] === selection) {
      let newObj = filterObj;
      delete newObj[IDOfOpen];
      setFilterObj(newObj);
    } else {
      setFilterObj({ ...filterObj, [IDOfOpen]: selection });
    }
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
              {Object.keys(displayedFilters).map((item, index) => {
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
                        {Object.keys(displayedFilters[item]).map(
                          (item, index) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  //*ADD FILTER TYPE AND FILTER TO ARRAY OF FILTER PARAMS
                                  handleFilterAction(item);
                                }}
                                className={`w-full py-2 px-4  font-[600] text-sm rounded-md  flex justify-between gap-4 items-center group`}
                              >
                                <span>{item.replaceAll("_", " ")}</span>
                                <span className="text-dark/80 ml-auto">
                                  {Object.keys(filtersRemaining).length > 0
                                    ? IDOfOpen in filtersRemaining
                                      ? filtersRemaining[IDOfOpen][item]
                                      : ""
                                    : displayedFilters[IDOfOpen][item]}
                                </span>

                                {filterObj && filterObj[IDOfOpen] === item ? (
                                  <BsFillCheckSquareFill className="fill-accentTwo  w-6 h-6 rounded-lg" />
                                ) : (
                                  <div
                                    className={`w-6 h-6  rounded-lg 
                                  flex justify-center items-center border
                                
                                `}
                                  >
                                    <BsFillCheckSquareFill className="group-hover:fill-accentTwo/50 hidden group-hover:flex w-6 h-6 rounded-lg" />
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
