"use client";


import { DynamicWidget } from "@/lib/dynamic";
import { BatchTransaction } from "./components";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function Main() {
  const { isConnected } = useAccount();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <Image src="/logo.svg" width={100} height={100} alt="logo"/>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Testing Safe with Dynamic - Added Shim Disconnect</h1>
        <DynamicWidget />
        {isConnected && <BatchTransaction />}
      </div>
    </div>
  );
}
