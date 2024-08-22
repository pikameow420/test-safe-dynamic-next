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
    "function transferFrom(address, address, uint256) returns (bool)",
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
            <button className="bg-white p-4 mx-2" onClick={() => disconnect()}>
              Disconnect from {activeConnector.name}
            </button>
            <button onClick={() => writeContract(data!.request)}>Mint</button>
            <button
              className="bg-cyan-500 mx-5"
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
            <button
              className="bg-cyan-400 p-4"
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
                      args: [
                        SENDER_ADDRESS,
                        RECIPIENT_ADDRESS,
                        parseUnits("10", -6),
                      ],
                    },
                  ],
                })
              }
            >
              SEND USDC
            </button>
          </>
        )}

        {connectors
          .filter((x) => x.id !== activeConnector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isConnecting && " (connecting)"}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
