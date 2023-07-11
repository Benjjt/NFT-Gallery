"use client";
import React from "react";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const CustomImgLoader = () => {
  return (
    <Image loader={imageLoader} src="me.png" alt="canVERSE NFTs" fill={true} />
  );
};

export default CustomImgLoader;
