'use client';

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { anvil, baseSepolia, sepolia, arbitrumSepolia, optimismSepolia, polygonAmoy, opBNBTestnet, avalancheFuji, celoSepolia, flowTestnet, rootstockTestnet } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Ledger Vote",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [anvil, baseSepolia, sepolia, arbitrumSepolia, optimismSepolia, polygonAmoy, opBNBTestnet, avalancheFuji, celoSepolia, flowTestnet, rootstockTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
