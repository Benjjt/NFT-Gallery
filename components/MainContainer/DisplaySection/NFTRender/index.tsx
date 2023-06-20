import React, { useEffect } from "react";
import NFTset1 from "../../../../files/NFTset1.json";

const NFTRender = () => {
  useEffect(() => {
    console.log("here's the JSON", NFTset1);
  }, [NFTset1]);

  return (
    <div className="m-4 flex justify-center  items-start overflow-hidden flex-wrap transition-all">
      {NFTset1.map((item, index) => {
        return (
          <div className="w-[8rem] h-[8rem] bg-dark/20 text-dark rounded-lg  m-2 overflow-hidden ">
            {JSON.stringify(item)}
          </div>
        );
      })}
    </div>
  );
};

export default NFTRender;
