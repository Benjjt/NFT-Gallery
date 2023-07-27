"use client";
import React from "react";
import Topbar from "../Topbar";
import MainContainer from "../MainContainer";
import { APIReturn } from "@/app/types";
import { useState } from "react";
import { NFT } from "@/app/types";
import NFTDetails from "../MainContainer/DisplaySection/NFTRender/NFTDetails";

const Main = ({ initialData }: { initialData: APIReturn }) => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  return (
    <main
      className={`flex h-screen   flex-col justify-start items-center  gap-8 max-w-[2000px] relative ${
        selectedNFT && "overflow-hidden  overscroll-none"
      }  `}
    >
      {selectedNFT && (
        <NFTDetails selectedNFT={selectedNFT} setSelectedNFT={setSelectedNFT} />
      )}

      <Topbar initialData={initialData} />
      <MainContainer
        setSelectedNFT={setSelectedNFT}
        selectedNFT={selectedNFT}
        initialData={initialData}
      />
    </main>
  );
};

export default Main;
