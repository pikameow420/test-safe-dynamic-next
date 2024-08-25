"use client";

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useEffect } from 'react'

import { useConnect } from 'wagmi'

const AUTOCONNECTED_CONNECTOR_IDS = ['safe']

function useAutoConnect() {
  const { connect, connectors } = useConnect()
  const {accountSwitchState, walletConnector, setPrimaryWallet} = useDynamicContext()

  useEffect(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const safeConnector = connectors.find((c) => c.id === connector)

      if (safeConnector) {
        connect({ connector: safeConnector })
      }
    })
  }, [connect, connectors])
}

export { useAutoConnect }