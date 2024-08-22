import { useWriteContracts } from "wagmi/experimental";
import { parseUnits, parseAbi } from 'viem'
import { useAccount } from 'wagmi'

export const useSendUSDC = () => {
  const { writeContracts, writeContractsAsync, isPending, isError, error } = useWriteContracts()
  const { address } = useAccount()

  const sendUSDC = async (amount: string) => {
    if (!address) throw new Error('Wallet not connected')
    if (isNaN(Number(amount)) || Number(amount) <= 0) throw new Error('Invalid amount')

    const USDC_CONTRACT = '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
    const RECIPIENT_ADDRESS = '0xA8E6908f9866a4Ca44434EcC8cE3cd0A5F6Eb18b'

    if (!USDC_CONTRACT || !RECIPIENT_ADDRESS) {
      throw new Error('Missing environment variables')
    }

    const abi = parseAbi([
      "function approve(address, uint256) returns (bool)",
      "function transfer(address, uint256) returns (bool)",
    ])

    const contracts = [
      {
        address: USDC_CONTRACT,
        abi,
        functionName: 'approve',
        args: [address, parseUnits(amount, 6)],
      },
      {
        address: USDC_CONTRACT,
        abi,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS, parseUnits(amount, 6)],
      },
    ] as const

    try {
      const result = await writeContractsAsync({ contracts })
      return result
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }

  return { sendUSDC, isPending, isError, error }
}