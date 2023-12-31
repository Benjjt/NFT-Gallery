import Topbar from "@/components/Topbar";
import MainContainer from "@/components/MainContainer";
import { NFT, APIReturn } from "./types";
import { NextFetchEvent } from "next/server";
import { init } from "next/dist/compiled/@vercel/og/satori";
import { useRouter } from "next/navigation";
import Main from "@/components/Main";

//SERVER SIDE COMPONENT THAT GET'S ALL NFT's FOR FIRST LOAD

async function getNFTs() {
  const res = await fetch("https://devpawnhub.canversedebug.xyz/pieces", {
    headers: {
      "x-api-key": "SX/R0nGDq7PsaIVJ4OHH95mmMi5Sjz/WpAYIg1il1tn8",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  let data = await res.json();

  return data;
}

export default async function Home() {
  //CALL API HERE
  const initialData: APIReturn = await getNFTs();

  return (
    <div className=" flex-col justify-start items-center w-screen h-screen">
      <Main initialData={initialData} />
    </div>
  );
}
