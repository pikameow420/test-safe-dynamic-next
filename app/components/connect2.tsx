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
import { parseAbi, parseUnits } from "viem";
import {writeContracts} from "@wagmi/core/experimental"
import { config } from "@/lib/wagmi";

export function Connect() {
  const { connect, connectors, error } = useConnect();
  const { isConnecting, connector: activeConnector, chain, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: txGasEstimate } = useEstimateGas({
    to: "0x000000000000000000000000000000000000beef",
    value: BigInt("0"),
  });

  const SENDER_ADDRESS = address || "0x000000000000000000000000000000000000000";



  useAutoConnect();

  const RECIPIENT_ADDRESS = "0xA8E6908f9866a4Ca44434EcC8cE3cd0A5F6Eb18b";

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        {activeConnector && (
          <>
                  <p>Connected to {activeConnector.name}</p>
                <div>
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => disconnect()}>
              Disconnect from {activeConnector.name}
            </button>
            <button
              className="bg-cyan-500 text-white p-2 rounded-md"
              onClick={() => {
                console.log("Sending USDC");
                try {
                  const abi = parseAbi([
                    'function approve(address, uint256) returns (bool)',
                    'function transferFrom(address, address, uint256) returns (bool)',
                  ])
                  
                   writeContracts(config,{
                    contracts: [
                      {
                      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
                      abi: abi,
                      functionName: 'approve',
                      args: [
                        SENDER_ADDRESS,
                        parseUnits('1',1)
                      ]
                    },
                    {
                      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
                      abi: abi,
                      functionName: 'transferFrom',
                      args: [
                         SENDER_ADDRESS,
                         RECIPIENT_ADDRESS,
                         parseUnits('10', (-6))      
                      ]
                    }
                    ]
                  });
                  console.log('Transaction hash:', result);
                } catch (error) {
                  console.error('Error sending USDC:', error);
                }
              }}
            >
              Send USDC
            </button>
            <p>Chain: {chain?.name}</p>
          </div>
          </>
        )}

      </div>
      {connectors
            .filter((x) => x.id !== activeConnector?.id)
            .map((x) => (
              <button key={x.id} onClick={() => connect({ connector: x })}>
                {x.name}
                {isConnecting && ' (connecting)'}
              </button>
            ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}

