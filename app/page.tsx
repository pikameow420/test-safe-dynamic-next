"use client";


import { BatchTransaction } from "./components";
import Image from "next/image";

export default function Main() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <Image src="/logo.svg" className="shadow-inner h-24 w-24" alt="logo"/>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Testing Safe with Dynamic</h1>
        <BatchTransaction />
      </div>
    </div>
  );
}
