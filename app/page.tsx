import Topbar from "@/components/Topbar";
import MainContainer from "@/components/MainContainer";
import { NFT, APIReturn } from "./types";
import { NextFetchEvent } from "next/server";

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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  console.log(res);

  let data = await res.json();

  // console.log("HERES THE RESULT:", await res.json());
  return data;
}

export default async function Home() {
  //CALL API HERE
  const initialData: APIReturn = await getNFTs();
  console.log(initialData.remaining_counts);

  return (
    <main className="flex h-screen  flex-col justify-start items-center m-8 gap-8 max-w-[2000px]  ">
      <Topbar initialData={initialData} />
      <MainContainer initialData={initialData} />
    </main>
  );
}
