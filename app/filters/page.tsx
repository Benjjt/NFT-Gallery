"use client";
import Topbar from "@/components/Topbar";
import React, { useEffect } from "react";
import MainContainer from "@/components/MainContainer";
import { NFT, APIReturn } from "../types";
import { NextFetchEvent } from "next/server";
import { init } from "next/dist/compiled/@vercel/og/satori";
import { useRouter, useSearchParams } from "next/navigation";

export default async function Home() {
  //CALL API HERE
  const initialData = null;

  return (
    <main className="flex h-screen  flex-col justify-start items-center m-8 gap-8 max-w-[2000px]  ">
      <Topbar initialData={initialData} />
      <MainContainer {...{ initialData } as any} />
    </main>
  );
}
