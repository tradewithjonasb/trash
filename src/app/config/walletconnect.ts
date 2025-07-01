// src/app/config/walletconnect.ts
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { SUPPORTED_CHAINS } from './chains'
import type { Connector } from 'wagmi'

// 1. Get your WalletConnect Cloud Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

// 2. Define your dApp’s metadata
const metadata = {
  name: 'Crypto IRA Vault',
  description: 'Crypto retirement investment platform',
  url: 'https://crypto-ira-vault.vercel.app',
  icons: ['https://crypto-ira-vault.vercel.app/logo.png'],
}

// 3. Create the Wagmi config
export const wagmiConfig = defaultWagmiConfig({
  chains: SUPPORTED_CHAINS,
  projectId,
  metadata,
})

// 4. Instantiate the Web3Modal
export const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: SUPPORTED_CHAINS,
  themeVariables: {
    '--w3m-accent': '#6366f1',
    '--w3m-font-family': 'Inter, sans-serif',
    '--w3m-z-index': '1000',
  },
  featuredWalletIds: [
    // your preferred wallet IDs…
  ],
})

// 5. (Optional) Expose a WalletConnect connector for advanced usage
export const walletConnectConnector = {
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: 'https://walletconnect.com/walletconnect-logo.png',
  iconBackground: '#3b99fc',
  createConnector: () => {
    const connector = wagmiConfig.connectors!.find(
      (c) => c.id === 'walletConnect'
    ) as Connector

    if (!connector) {
      throw new Error('WalletConnect connector not found in wagmiConfig')
    }

    return { connector }
  },
}

// 6. A little helper to prettify addresses
export function formatWalletAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
