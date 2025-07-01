'use client'

import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { web3Modal } from '@/config/walletconnect'
import { SUPPORTED_CHAINS } from '@/config/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'

// Initialize Web3Modal if not already initialized
if (!web3Modal) {
  createWeb3Modal({
    wagmiConfig: wagmiConfig,
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: SUPPORTED_CHAINS,
  })
}

export function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}