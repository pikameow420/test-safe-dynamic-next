"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import {  WagmiProvider } from "wagmi";
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
        initialAuthenticationMode: "connect-and-sign",
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
      }}
    >
      <WagmiProvider config={config} >
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
          <SafeProvider>
            {props.children}
            </SafeProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>

  );
}
