"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { APIReturn, UserFilters } from "@/app/types";
const PageNavigation = ({
  initialData,
  fetchedData,
  setFilterObj,
  filterObj,
  setRequestedPage,
}: {
  initialData: APIReturn | null;
  fetchedData: APIReturn | null;
  setFilterObj: Function;
  filterObj: UserFilters | null;
  setRequestedPage: Function;
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (!fetchedData && initialData) {
      setTotalPages(initialData.total_pages);
      setCurrentPage(initialData.page);
    } else if (fetchedData) {
      setTotalPages(fetchedData.total_pages);
      setCurrentPage(fetchedData.page);
    }
  }, [initialData, fetchedData]);

  const addPageRequestToFilters = (pageNo: number) => {
    const oldFilters = filterObj;
    const newFiltersPlusPage = { ...oldFilters, page: pageNo };
    setFilterObj(newFiltersPlusPage);
  };

  return (
    <div className="w-full rounded-t-lg h-[4rem] bg-white border fixed bottom-0 p-4 ">
      <div className="flex justify-start items-center gap-4 w-full h-full">
        <span className="font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
        {totalPages > 0 && currentPage < totalPages && currentPage !== 1 && (
          <BsFillArrowLeftSquareFill
            onClick={() => {
              if (currentPage - 1 >= 1) console.log("calling previous page");
              addPageRequestToFilters(currentPage - 1);
            }}
            className="w-6 h-6 hover:fill-accentTwo hover:cursor-pointer"
          />
        )}
        {totalPages > currentPage && (
          <BsFillArrowRightSquareFill
            onClick={() => {
              if (currentPage + 1 <= totalPages)
                console.log("calling next page");
              addPageRequestToFilters(currentPage + 1);
            }}
            className="w-6 h-6 hover:fill-accentTwo hover:cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PageNavigation;
