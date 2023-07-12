"use client";
import { NFT } from "@/app/types";
import React, { useState } from "react";
import { BsFillClipboardPlusFill } from "react-icons/bs";
import { AiFillCloseSquare, AiFillCheckCircle } from "react-icons/ai";

const NFTDetails = ({
  nft,
  setSelectedNFT,
}: {
  nft: NFT;
  setSelectedNFT: Function;
}) => {
  const [copyClicked, setCopyClicked] = useState<Boolean>(false);
  const [intCopied, setIntCopied] = useState<Boolean>(false);

  return (
    <div className="absolute right-0 border-l h-screen min-w-0 max-w-[400px] p-4 gap-4 w-full bg-white flex flex-col  justify-start items-start ">
      <AiFillCloseSquare
        onClick={() => {
          setSelectedNFT({});
        }}
        className="absolute right-4 w-8 h-8 hover:cursor-pointer hover:scale-105 transition-all hover:fill-accentTwo"
      />
      <div
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(nft));
          setCopyClicked(true);
        }}
        className="flex justify-center items-center gap-2 bg-black text-white p-2 hover:scale-105 transition-all rounded-lg group hover:cursor-pointer"
      >
        {copyClicked ? (
          <AiFillCheckCircle className="group-hover:fill-accentTwo" />
        ) : (
          <BsFillClipboardPlusFill className="group-hover:fill-accentTwo" />
        )}
        <span className="text-sm font-bold ">
          {copyClicked ? "COPIED" : "COPY TO CLIPBOARD"}
        </span>
      </div>
      <ul className="flex flex-col justify-start items-start gap-2">
        {Object.keys(nft).map((key, index) => {
          return (
            <li
              className="flex justify-start items-center gap-2 w-full h-full "
              key={nft.json_id}
            >
              <span className="font-bold">{key} :</span>
              <span> {nft[key as keyof typeof nft]}</span>
              {key === "int_list" && !intCopied && (
                <BsFillClipboardPlusFill
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(nft[key as keyof typeof nft]).substring(
                        1,
                        JSON.stringify(nft[key as keyof typeof nft]).length - 1
                      )
                    );
                    setIntCopied(true);
                  }}
                  className="hover:fill-accentTwo w-6 h-6 hover:cursor-pointer"
                />
              )}
              {intCopied && key === "int_list" && (
                <AiFillCheckCircle className="fill-accentTwo w-6 h-6" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NFTDetails;
