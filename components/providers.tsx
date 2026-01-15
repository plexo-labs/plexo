"use client"

import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { injected, walletConnect } from "wagmi/connectors"
import { useState, type ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const [config] = useState(() =>
    createConfig({
      chains: [mainnet, polygon, optimism, arbitrum, base],
      connectors: [
        injected(),
        walletConnect({
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
        }),
      ],
      transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [base.id]: http(),
      },
      ssr: true,
    }),
  )

  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
