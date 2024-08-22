"use client";

import { useAccount, useConnect, useDisconnect, useEstimateGas } from "wagmi";
import {
  DynamicConnectButton,
  DynamicWidget,
  useDynamicContext,
} from "../lib/dynamic";
import { useAutoConnect } from "./useAutoConnect";
import { Account, Connect, NetworkSwitcher } from "./components";

export default function Main() {

  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Testing Safe Connectors</h1>
        <Connect/>
        {address && (
        <>
          <Account />
          </>
        )}
      </div>
    </div>
  );
}
