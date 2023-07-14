import React from "react";

const ResultNumber = ({ number }: { number: number | null }) => {
  return <div className="hidden lg:flex">{number && number}</div>;
};

export default ResultNumber;
