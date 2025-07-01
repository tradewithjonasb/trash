// src/app/config/chains.ts
import type { Chain } from 'viem'   // 👈 pull Chain from Viem, not Wagmi :contentReference[oaicite:0]{index=0}

/**
 * Ethereum Mainnet
 */
export const ethereumChain = {
  id: 1,
  name: 'Ethereum',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://cloudflare-eth.com'] },
    public:  { http: ['https://cloudflare-eth.com'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
} as const satisfies Chain   // 👈 satisfy the Chain interface :contentReference[oaicite:1]{index=1}

/**
 * Goerli Testnet
 */
export const goerliChain = {
  id: 5,
  name: 'Goerli',
  nativeCurrency: {
    name: 'Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://goerli.infura.io/v3/YOUR_INFURA_KEY'] },
    public:  { http: ['https://goerli.infura.io/v3/YOUR_INFURA_KEY'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
  },
  testnet: true,
} as const satisfies Chain

/**
 * Polygon Mainnet
 */
export const polygonChain = {
  id: 137,
  name: 'Polygon',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://polygon-rpc.com'] },
    public:  { http: ['https://polygon-rpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
  },
} as const satisfies Chain

/**
 * Mumbai Testnet
 */
export const mumbaiChain = {
  id: 80001,
  name: 'Mumbai',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://matic-mumbai.chainstacklabs.com'] },
    public:  { http: ['https://matic-mumbai.chainstacklabs.com'] },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://mumbai.polygonscan.com' },
  },
  testnet: true,
} as const satisfies Chain

/**
 * Aggregate and export
 */
export const SUPPORTED_CHAINS = [
  ethereumChain,
  goerliChain,
  polygonChain,
  mumbaiChain,
] as const

export type SupportedChain = typeof SUPPORTED_CHAINS[number]

export const DEFAULT_CHAIN: SupportedChain = ethereumChain

export function getChainById(chainId: number): SupportedChain | undefined {
  return SUPPORTED_CHAINS.find((chain) => chain.id === chainId)
}
