import { http, createConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { injected, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, arbitrum],
  multiInjectedProviderDiscovery: true,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },

  // Add the coinshift domain to the list of allowed domains

  connectors: [
    safe({
      allowedDomains: [/app\.safe\.global$/, /coinshift\.global$/],
    }),
    injected(),
  ],
});
