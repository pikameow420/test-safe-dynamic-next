"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useConnect, WagmiProvider } from "wagmi";
import SafeProvider from '@safe-global/safe-apps-react-sdk'
import { config } from "@/lib/wagmi";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "@/lib/dynamic";

const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        walletConnectors: [EthereumWalletConnectors],
        initialAuthenticationMode: "connect-only",
        enableConnectOnlyFallback: true,
        appLogoUrl : '/logo.svg',
        appName : "Safe with Dynamic",
        recommendedWallets : [
          {walletKey : 'safe', label : 'Safe'},
          {walletKey : 'coinbase', label : 'Coinbase'},
          {walletKey : 'metamask', label : 'MetaMask'},
          {walletKey : 'walletConnect', label : 'WalletConnect'},
          {walletKey : 'rainbow', label : 'Rainbow'},
          {walletKey : 'coinbase', label : 'Coinbase'},
        ],
        toolkitEnabled: true,
        handlers: {

          handleConnectedWallet: async (wallet) => { 
            console.log("handleConnectedWallet was called", wallet);
            // Check if the connected wallet is Safe
            if (wallet.connector?.key === 'safe') {
                // Automatically connect using the Safe connector
                console.log("Safe connector found");
            }
            
            return true; 
          },
        }
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector suppressChainMismatchError>
          <SafeProvider>
            {props.children}
            </SafeProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>

  );
}
