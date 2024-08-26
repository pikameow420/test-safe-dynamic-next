// "use client";

// import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
// import { useEffect } from 'react'

// import { useConnect } from 'wagmi'

// const AUTOCONNECTED_CONNECTOR_IDS = ['safe']

// function useAutoConnect() {
//   const { connect, connectors } = useConnect()
//   const {sendWagmiSettings} = useDynamicContext()
//   const {walletConnector} = useDynamicContext()

//   console.log('Connectors',connectors)

//   console.table('Send Wagmi Settings', sendWagmiSettings)

//   console.log('WalletConnector', walletConnector)
//   console.log('WalletConnector Connect', walletConnector?.connect(connectors[0]))



//   useEffect(() => {
//     AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
//       const safeConnector = connectors.find((c) => c.id === connector)
      
//       if (safeConnector) {
//         connect({ connector: safeConnector })
//       }
//     })
//   }, [connect, connectors, walletConnector])
// }

// export { useAutoConnect }