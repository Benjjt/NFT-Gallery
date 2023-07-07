"use client";
import React from "react";
import { FaListUl } from "react-icons/fa";
import { MdOutlineGridView, MdOutlineGridOn } from "react-icons/md";
import { useFilterButtonContext } from "@/app/Context/store";

const DisplayOptions = () => {
  const { currentDisplay, setCurrentDisplay } = useFilterButtonContext();
  return (
    <div className="w-full h-full m-2   border rounded-lg flex justify-start items-center max-w-[200px]">
      <div
        onClick={() => {
          setCurrentDisplay("list");
        }}
        className={`h-full w-1/3 flex justify-center border-r rounded-l-lg items-center  transition-all ${
          currentDisplay === "list"
            ? "bg-dark/5"
            : "hover:cursor-pointer hover:scale-105 hover:shadow-lg"
        }`}
      >
        <FaListUl className="h-4 w-4" />
      </div>
      <div
        onClick={() => {
          setCurrentDisplay("large");
        }}
        className={`h-full w-1/3 flex justify-center items-center  transition-all ${
          currentDisplay === "large"
            ? "bg-dark/5"
            : "hover:cursor-pointer hover:scale-105 hover:shadow-lg"
        }`}
      >
        <MdOutlineGridView className="h-6 w-6" />
      </div>
      <div
        onClick={() => {
          setCurrentDisplay("default");
        }}
        className={`h-full w-1/3 flex justify-center items-center border-l rounded-r-lg  transition-all ${
          currentDisplay === "default"
            ? "bg-dark/5"
            : "hover:cursor-pointer hover:scale-105 hover:shadow-lg"
        }`}
      >
     
        <MdOutlineGridOn className="h-6 w-6" />
      </div>
    </div>
  );
};

export default DisplayOptions;
