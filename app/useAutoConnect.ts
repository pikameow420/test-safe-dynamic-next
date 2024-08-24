"use client";

import { useEffect, useCallback } from 'react'
import { useConnect } from 'wagmi'

const AUTOCONNECTED_CONNECTOR_IDS = ['safe']

function useAutoConnect() {
  const { connect, connectors } = useConnect()

  const autoConnect = useCallback(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const safeConnector = connectors.find((c) => c.id === connector)
      if (safeConnector) {
        connect({ connector: safeConnector })
      }
    })
  }, [connect, connectors])

  useEffect(() => {
    autoConnect()
  }, [autoConnect])

  return { autoConnect }
}

export { useAutoConnect }