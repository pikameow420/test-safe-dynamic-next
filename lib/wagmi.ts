import { http, createConfig } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { injected, safe} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, arbitrum],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    safe({
      allowedDomains: [/app.safe.global$/],
      debug: false,
    }),
  ],
});

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
