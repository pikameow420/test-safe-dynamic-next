"use client";

import { useDynamicContext } from '@/lib/dynamic';
import { useEffect } from 'react'

import { useConnect } from 'wagmi'

const AUTOCONNECTED_CONNECTOR_IDS = ['safe']

function useAutoConnect() {
  const { connect, connectors } = useConnect()
  const { primaryWallet, walletConnector, setPrimaryWallet } = useDynamicContext()
  console.log('Initial primaryWallet', primaryWallet)
  console.log('Initial walletConnector', walletConnector)
  useEffect(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const safeConnector = connectors.find((c) => c.id === connector)
      if (safeConnector) {
        console.log('safeConnector', safeConnector)
        setPrimaryWallet(safeConnector.id)
        connect({ connector: safeConnector })
        console.log('Primary wallet set to', primaryWallet)
      }
      else {
        console.log('No safe connector found')
      }
    })
  }, [connect, connectors, setPrimaryWallet, primaryWallet])
}

export { useAutoConnect }