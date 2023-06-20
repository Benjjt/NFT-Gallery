import React from "react";
import { FaListUl } from "react-icons/fa";
import { MdOutlineGridView, MdOutlineGridOn } from "react-icons/md";

const DisplayOptions = () => {
  return (
    <div className="w-full h-full m-2   border rounded-lg flex justify-start items-center max-w-[200px]">
      <div className="h-full w-1/3 flex justify-center items-center border-r hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all">
        <FaListUl className="h-4 w-4" />
      </div>
      <div className="h-full w-1/3 flex justify-center items-center border-r hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all">
        <MdOutlineGridView className="h-6 w-6" />
      </div>
      <div className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all">
        <MdOutlineGridOn className="h-6 w-6" />
      </div>
    </div>
  );
};

export default DisplayOptions;
