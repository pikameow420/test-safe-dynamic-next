"use client";

import { useEffect } from 'react'

import { useConnect } from 'wagmi'

const AUTOCONNECTED_CONNECTOR_IDS = ['safe','coinshift']

function useAutoConnect() {
  const { connect, connectors } = useConnect()

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