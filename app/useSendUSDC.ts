import { useState } from 'react';
import { useAccount } from "wagmi";
import { parseUnits, encodeFunctionData } from 'viem'
import { BaseTransaction } from '@safe-global/safe-apps-sdk'

const USDC_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
] as const;

export const useSendUSDC = () => {
  const { address } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendUSDC = async (amount: string): Promise<BaseTransaction[]> => {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      if (!address) throw new Error("Wallet not connected");
      if (isNaN(Number(amount)) || Number(amount) <= 0)
        throw new Error("Invalid amount");

      const USDC_CONTRACT = "0xaf88d065e77c8cc2239327c5edb3a432268e5831";
      const RECIPIENT_ADDRESS = "0xA8E6908f9866a4Ca44434EcC8cE3cd0A5F6Eb18b";

      if (!USDC_CONTRACT || !RECIPIENT_ADDRESS) {
        throw new Error("Missing variables");
      }

      const parsedAmount = parseUnits(amount, -6); //Converting to micro USDC, the lowest fraction

      const transactions: BaseTransaction[] = [
        {
          to: USDC_CONTRACT,
          value: '0',
          data: encodeFunctionData({
            abi: USDC_ABI,
            functionName: 'approve',
            args: [RECIPIENT_ADDRESS, parsedAmount],
          }),
        },
        {
          to: USDC_CONTRACT,
          value: '0',
          data: encodeFunctionData({
            abi: USDC_ABI,
            functionName: 'transfer',
            args: [RECIPIENT_ADDRESS, parsedAmount],
          }),
        },
      ];

      return transactions;
    } catch (err) {
      console.error("Transaction preparation failed:", err);
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return { sendUSDC, isPending, isError, error };
};