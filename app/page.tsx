"use client";

import {
  DynamicConnectButton,
  DynamicWidget,
  useDynamicContext,
} from "../lib/dynamic";
import { useAutoConnect } from "./useAutoConnect";

export default function Main() {
  useAutoConnect();
  
  const { user } = useDynamicContext();


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Onboard the world</h1>
        <p className="text-lg mb-16">
          Web3 login for <span className="text-blue-400">everyone</span>.
        </p>
        {user ? (
          <p className="text-lg mb-4">Connected: {user?.wallet}</p>

        ) : (
          <DynamicConnectButton
            children={
              <div className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-lg">
                Connect
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
