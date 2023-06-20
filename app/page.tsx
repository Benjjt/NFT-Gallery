"use client";
import React, { useState, useEffect } from "react";
import Topbar from "@/components/Topbar";
import MainContainer from "@/components/MainContainer";

type DisplayType = {};

export default function Home() {
  const [displayType, setDisplayType] = useState<number>(1);
  return (
    <main className="flex h-screen  flex-col justify-start items-center m-8 gap-8  ">
      <Topbar />
      <MainContainer />
    </main>
  );
}
