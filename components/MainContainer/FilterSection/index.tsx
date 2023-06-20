"use client";
import React from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useFilterButtonContext } from "@/app/Context/store";
const FilterSection = () => {
  const { isFilterOpen, setIsFilterOpen } = useFilterButtonContext();

  const filtersAnimation = useTransition(isFilterOpen, {
    from: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    enter: { opacity: 1, maxWidth: 400, zIndex: 999999 },
    leave: { opacity: 0, maxWidth: 0, zIndex: 999999 },
    // delay: isFilterOpen ? 0 : 400,
  });

  return filtersAnimation(
    (style, item) =>
      item && (
        <animated.div className="w-full h-full" style={style}>
          <div className="flex flex-col justify-start items-start p-4">
            <h2 className="text-xl">Traits</h2>
          </div>
        </animated.div>
      )
  );
};

export default FilterSection;
