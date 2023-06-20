import React from "react";
import FilterSection from "./FilterSection";
import DisplaySection from "./DisplaySection";

const MainContainer = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <FilterSection />
      <DisplaySection />
    </div>
  );
};

export default MainContainer;
