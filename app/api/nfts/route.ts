import { NextResponse } from "next/server";
import completedNFT from "../../../files/completedNFTs.json";

export async function GET(req: Request) {
  return NextResponse.json(completedNFT);
}
