"use client";
import { NFT } from "@/app/types";
import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  AiFillCloseCircle,
  AiOutlineCopy,
  AiFillCheckCircle,
} from "react-icons/ai";
import { isMobile } from "react-device-detect";
import Image from "next/image";

const NFTDetails = ({
  selectedNFT,
  setSelectedNFT,
}: {
  selectedNFT: NFT;
  setSelectedNFT: Function;
}) => {
  const [attributesOpen, setAttributesOpen] = useState<boolean>(false);
  const [JSONIdCopied, setJSONIdCopied] = useState<boolean>(false);
  const [fullJSONCopied, setFullJSONCopied] = useState<boolean>(false);

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`absolute w-screen h-screen bg-dark/50 backdrop-blur-md flex justify-center items-center`}
    >
      {!isMobile ? (
        <div className="rounded-xl max-w-[1000px] h-full md:h-[600px] p-8 gap-4 w-full bg-white flex md:flex-row  justify-center items-center  ">
          <div className="w-1/2 relative h-full">
            <Image
              fill={true}
              style={{ objectFit: "contain" }}
              className="rounded-xl"
              alt="canVERSE NFT"
              src={`https://canversedebug.xyz/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/${selectedNFT.pfp_file_name}/pfphalf`}
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-4 w-1/2 h-full ">
            <div className="flex justify-between items-center w-full">
              <h2 className="font-bold text-2xl">{selectedNFT.piece_name}</h2>
              <AiFillCloseCircle
                onClick={() => setSelectedNFT(false)}
                className="w-8 h-8 hover:cursor-pointer hover:fill-accentTwo "
              />
            </div>

            <div className="w-full relative px-4 py-2 border  rounded-lg shadow-md flex-col justify-start items-start bg-white max-h-full overflow-y-scroll ">
              <div
                onClick={() => {
                  setAttributesOpen(!attributesOpen);
                }}
                className="flex justify-between items-center hover:cursor-pointer w-full"
              >
                <span className="font-bold">ATTRIBUTES</span>
                <FiChevronDown
                  className={`w-8 h-8 transition-all ${
                    attributesOpen && "rotate-180"
                  }`}
                />
              </div>
              {attributesOpen && (
                <div className="flex flex-col justify-start items-start w-full gap-2 mt-4">
                  <div
                    onClick={() => {
                      {
                        navigator.clipboard.writeText(
                          JSON.stringify(selectedNFT)
                        );
                        setFullJSONCopied(true);
                      }
                    }}
                    className="bg-dark text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-105 transition-all"
                  >
                    {fullJSONCopied ? "COPIED" : "COPY JSON"}
                  </div>

                  {Object.keys(selectedNFT).map((attribute) => {
                    return (
                      <div
                        key={selectedNFT.json_id}
                        className="flex justify-between items-start w-full"
                      >
                        <span className="font-bold">
                          {`${attribute.replaceAll("_", " ")} : `}
                        </span>
                        <span className="flex justify-center items-center gap-2">
                          {attribute == "json_id" ? (
                            !JSONIdCopied ? (
                              <AiOutlineCopy
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    selectedNFT[attribute].toString()
                                  );
                                  setJSONIdCopied(true);
                                }}
                                className="hover:cursor-pointer hover:scale-105 transition-all"
                              />
                            ) : (
                              <AiFillCheckCircle />
                            )
                          ) : (
                            ""
                          )}
                          <span>{selectedNFT[attribute]}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-white flex flex-col justify-start items-center gap-8 p-8">
          <AiFillCloseCircle
            onClick={() => setSelectedNFT(false)}
            className="w-8 h-8  hover:cursor-pointer hover:fill-accentTwo self-end"
          />
          <span className="font-bold text-xl mr-auto">
            {selectedNFT.piece_name}
          </span>
          <Image
            width={325}
            height={325}
            style={{ objectFit: "contain" }}
            className="rounded-xl"
            alt="canVERSE NFT"
            src={`https://canversedebug.xyz/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/${selectedNFT.pfp_file_name}/pfphalf`}
          />
          <div className="h-1/2 flex flex-col gap-2 overflow-scroll border p-2 rounded-xl">
            {Object.keys(selectedNFT).map((attribute) => {
              return (
                <div
                  key={selectedNFT.json_id}
                  className="flex justify-between items-start w-full"
                >
                  <span className="font-bold">
                    {`${attribute.replaceAll("_", " ")} : `}
                  </span>
                  <span className="flex justify-center items-center gap-2">
                    {attribute == "json_id" ? (
                      !JSONIdCopied ? (
                        <AiOutlineCopy
                          onClick={() => {
                            navigator.clipboard.writeText(
                              selectedNFT[attribute].toString()
                            );
                            setJSONIdCopied(true);
                          }}
                          className="hover:cursor-pointer hover:scale-105 transition-all"
                        />
                      ) : (
                        <AiFillCheckCircle />
                      )
                    ) : (
                      ""
                    )}
                    <span>{selectedNFT[attribute]}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDetails;
