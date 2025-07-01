import { SUPPORTED_CHAINS } from './chains'

// Replace with your actual contract addresses
export const CONTRACT_ADDRESSES = {
  vaultFactory: {
    [SUPPORTED_CHAINS[0].id]: '0x1234...', // Ethereum mainnet
    [SUPPORTED_CHAINS[1].id]: '0x5678...', // Goerli
    [SUPPORTED_CHAINS[2].id]: '0x9abc...', // Polygon
    [SUPPORTED_CHAINS[3].id]: '0xdef0...', // Mumbai
  },
  usdc: {
    [SUPPORTED_CHAINS[0].id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [SUPPORTED_CHAINS[1].id]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    [SUPPORTED_CHAINS[2].id]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    [SUPPORTED_CHAINS[3].id]: '0xe6b8a5CF854791412c1f6EFC7CAf872f6CF83D1A',
  },
}

export const CONTRACT_ABIS = {
  vaultFactory: [
    {
      inputs: [
        { internalType: 'address', name: '_token', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
        { internalType: 'uint256', name: '_duration', type: 'uint256' },
        { internalType: 'uint256', name: '_apy', type: 'uint256' },
      ],
      name: 'createVault',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'vaultId', type: 'uint256' }],
      name: 'withdrawFromVault',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  erc20: [
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

export const VAULT_WALLET_ADDRESS = '0xYourVaultWalletAddress' // Replace 