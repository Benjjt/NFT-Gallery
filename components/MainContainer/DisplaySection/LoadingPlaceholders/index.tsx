import React, { useEffect } from "react";

type DisplayProps = {
  number: number;
};

const LoadingPlaceholders: React.FunctionComponent<DisplayProps> = ({
  number,
}) => {
  return (
    <div className="m-4 flex justify-center  items-start flex-wrap transition-all">
      {Array(number).fill(
        <div className="w-[8rem] h-[8rem] bg-dark/20 rounded-lg animate-pulse m-2 " />
      )}
    </div>
  );
};

export default LoadingPlaceholders;
