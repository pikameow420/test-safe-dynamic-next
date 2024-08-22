"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEstimateGas,
  useSendTransaction,
  useSimulateContract,
  useWriteContract,
} from "wagmi";

import { useAutoConnect } from "../useAutoConnect";
import { useWriteContracts } from "wagmi/experimental";
import { parseAbi, parseUnits } from "viem";
import { useSendUSDC } from "../useSendUSDC";
import { useState } from "react";

export function Connect() {
  useAutoConnect();


  const { connect, connectors, error } = useConnect();
  const { isConnecting, connector: activeConnector, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { sendUSDC, isPending, isError } = useSendUSDC()
  const [usdcAmount, setUsdcAmount] = useState('')


  const { data: txGasEstimate } = useEstimateGas({
    to: "0x000000000000000000000000000000000000beef",
    value: BigInt("0"),
  });

  const handleSendUSDC = async () => {
    try {
      await sendUSDC(usdcAmount)
      console.log('USDC sent successfully!')
      setUsdcAmount('')
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Transaction failed')
    }
  }

  const { sendTransactionAsync } = useSendTransaction();

  const abi = parseAbi([
    "function approve(address, uint256) returns (bool)",
    "function transfer(address, uint256) returns (bool)",
  ]);

  const { data } = useSimulateContract({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
      },
    ],
    functionName: "mint",
  });

  const { writeContract } = useWriteContract();



  return (
    <div>
      <div>
        {activeConnector && (
          <>
            <button
              className="bg-black border border-white text-white p-4 mx-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => disconnect()}
            >
              Disconnect from {activeConnector.name}
            </button>
            
            {/* Mint Transaction */}
            <button 
              className="bg-blue-500 text-white p-4 mx-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => writeContract(data!.request)}
            >
              Mint
            </button>
            
            {/* Test Send Transaction : (view in events in EtherScan) */}
            <button
              className="bg-cyan-500 text-white p-4 mx-2 rounded-md hover:bg-cyan-600 transition-colors"
              onClick={() =>
                sendTransactionAsync?.({
                  gas: txGasEstimate,
                  to: "0x000000000000000000000000000000000000beef",
                  value: BigInt("0"),
                })
              }
            >
              Test send transaction
            </button>

            {/* Batch transaction */}
            <div className="mt-4">
          <input
            type="text"
            value={usdcAmount}
            onChange={(e) => setUsdcAmount(e.target.value)}
            placeholder="USDC Amount"
            className="p-2 border rounded mr-2"
          />
          <button
            className="bg-red-400 text-white p-4 rounded-md hover:bg-red-500 transition-colors disabled:bg-gray-400"
            onClick={handleSendUSDC}
            disabled={isPending || !usdcAmount}
          >
            {isPending ? 'Sending...' : 'Send USDC'}
          </button>
        </div>
          </>
        )}

      </div>

      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </div>
  );
}
