"use client";


import { DynamicWidget, useDynamicContext, WalletList } from "@/lib/dynamic";
import { BatchTransaction } from "./components";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function Main() {
  const { isConnected, connector: activeConnector } = useAccount();
  const { walletConnector, setPrimaryWallet} = useDynamicContext()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <Image src="/logo.svg" width={100} height={100} alt="logo"/>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Testing Safe with Dynamic - Added Shim </h1>
         <DynamicWidget />
         {isConnected && <BatchTransaction />}

         
         <p>isConnected: {isConnected.toString()}</p>
         <p>activeConnector: {activeConnector?.id}</p>

      {activeConnector?.id === "safe" && <button onClick={() => walletConnector?.connect({activeConnector})}>Set Primary Wallet to Safe</button>}
      </div>
    </div>
  );
}
