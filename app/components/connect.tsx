"use client";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEstimateGas,
    useSendTransaction,
    useSimulateContract,
    useWriteContract,
  } from 'wagmi';
  
  import { useAutoConnect } from '../useAutoConnect';
  
  export function Connect() {
    const { connect, connectors, error } = useConnect();
    const { isConnecting, connector: activeConnector } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: txGasEstimate } = useEstimateGas({
      to: '0x000000000000000000000000000000000000beef',
      value: BigInt('0'),
    });
  
    const { sendTransactionAsync } = useSendTransaction();
  
    const { data } = useSimulateContract({
      // wagmi mint example contract
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [],
          outputs: [],
        },
      ],
      functionName: 'mint',
    });
  
    const { writeContract } = useWriteContract();
  
    useAutoConnect();
  
    return (
      <div>
        <div>
          {activeConnector && (
            <>
              <p>Connected to {activeConnector.name}</p>
              <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => disconnect()}>Disconnect from {activeConnector.name}</button>
              <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => writeContract(data!.request)}>
                Test Wagmi Mint Example write contract transaction
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-md" 
                onClick={() =>
                  sendTransactionAsync?.({
                    gas: txGasEstimate,
                    to: '0x000000000000000000000000000000000000beef',
                    value: BigInt('0'),
                  })
                }
              >
                Test send transaction
              </button>
            </>
          )}
  
          {connectors
            .filter((x) => x.id !== activeConnector?.id)
            .map((x) => (
              <button key={x.id} onClick={() => connect({ connector: x })}>
                {x.name}
                {isConnecting && ' (connecting)'}
              </button>
            ))}
        </div>
  
        {error && <div>{error.message}</div>}
      </div>
    );
  }