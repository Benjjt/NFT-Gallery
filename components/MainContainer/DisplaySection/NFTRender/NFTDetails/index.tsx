"use client";
import { NFT } from "@/app/types";
import React, { useState } from "react";
import { BsFillClipboardPlusFill } from "react-icons/bs";
import { AiFillCloseSquare, AiFillCheckCircle } from "react-icons/ai";

const NFTDetails = ({
  selectedNFT,
  setSelectedNFT,
  copyClicked,
  setCopyClicked,
  intCopied,
  setIntCopied,
}: {
  selectedNFT: NFT;
  setSelectedNFT: Function;
  copyClicked: boolean;
  setCopyClicked: Function;
  intCopied: boolean;
  setIntCopied: Function;
}) => {
  return (
    <div className="absolute right-0 border-l h-screen min-w-0 max-w-[400px] p-4 gap-4 w-full bg-white flex flex-col  justify-start items-start ">
      <AiFillCloseSquare
        onClick={() => {
          setSelectedNFT(null);
        }}
        className="absolute right-4 w-8 h-8 hover:cursor-pointer hover:scale-105 transition-all hover:fill-accentTwo"
      />
      <div
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(selectedNFT));
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
        {Object.keys(selectedNFT).map((key, index) => {
          return (
            <li
              className="flex justify-start items-center gap-2 w-full h-full "
              key={(selectedNFT as any)[key].json_id}
            >
              <span className="font-bold">{key} :</span>
              <span> {selectedNFT[key as keyof typeof selectedNFT]}</span>
              {key === "int_list" && !intCopied && (
                <BsFillClipboardPlusFill
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(
                        selectedNFT[key as keyof typeof selectedNFT]
                      ).substring(
                        1,
                        JSON.stringify(
                          selectedNFT[key as keyof typeof selectedNFT]
                        ).length - 1
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
