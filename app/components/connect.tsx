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

export function Connect() {
  useAutoConnect();

  const { connect, connectors, error } = useConnect();
  const { isConnecting, connector: activeConnector, address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: txGasEstimate } = useEstimateGas({
    to: "0x000000000000000000000000000000000000beef",
    value: BigInt("0"),
  });

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
  const { writeContracts } = useWriteContracts();

  const SENDER_ADDRESS = address;
  const RECIPIENT_ADDRESS = "0xA8E6908f9866a4Ca44434EcC8cE3cd0A5F6Eb18b";

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
            <button
              className="bg-red-400 text-white p-4 mx-2 rounded-md hover:bg-red-500 transition-colors"
              onClick={() =>
                writeContracts({
                  contracts: [
                    {
                      address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                      abi,
                      functionName: "approve",
                      args: [SENDER_ADDRESS, parseUnits("1", 1)],
                    },
                    {
                      address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                      abi,
                      functionName: "transferFrom",
                      args: [RECIPIENT_ADDRESS, parseUnits("10", -6)],
                    },
                  ],
                })
              }
            >
              SEND USDC
            </button>
          </>
        )}

      </div>

      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </div>
  );
}
