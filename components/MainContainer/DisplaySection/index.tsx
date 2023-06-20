import React from "react";
import LoadingPlaceholders from "./LoadingPlaceholders";
import NFTRender from "./NFTRender";

const DisplaySection = () => {
  return (
    <div className="w-full h-full overflow-scroll  ">
      {/* <LoadingPlaceholders number={100} /> */}
      <NFTRender />
    </div>
  );
};

export default DisplaySection;
