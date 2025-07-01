// General app constants
export const APP_NAME = "Crypto IRA Vault";
export const APP_DESCRIPTION = "Secure retirement investing with cryptocurrency";
export const COMPANY_NAME = "Digital Wealth LLC";
export const SUPPORT_EMAIL = "support@cryptoiravault.com";

// Social links
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/cryptoiravault",
  discord: "https://discord.gg/cryptoiravault",
  telegram: "https://t.me/cryptoiravault",
  github: "https://github.com/cryptoiravault",
};

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  TERMS_AGREEMENT: "crypto-ira-terms-agreement",
  LAST_CONNECTED_WALLET: "last-connected-wallet",
  DASHBOARD_VIEW: "dashboard-view-preference",
};

// Regex patterns
export const REGEX_PATTERNS = {
  ETH_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  TX_HASH: /^0x([A-Fa-f0-9]{64})$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Error messages
export const ERROR_MESSAGES = {
  DEFAULT: "An unexpected error occurred",
  WALLET_NOT_CONNECTED: "Please connect your wallet",
  WRONG_NETWORK: "Please switch to a supported network",
  INSUFFICIENT_BALANCE: "Insufficient balance",
  VAULT_CREATION_FAILED: "Failed to create vault",
  WITHDRAWAL_FAILED: "Failed to withdraw from vault",
};

// Success messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: "Wallet connected successfully",
  VAULT_CREATED: "Vault created successfully",
  WITHDRAWAL_COMPLETE: "Withdrawal completed successfully",
  TRANSACTION_COMPLETE: "Transaction completed successfully",
};

// Default values
export const DEFAULTS = {
  GAS_LIMIT: 3000000, // Default gas limit for transactions
  GAS_PRICE: 50, // Default gas price in gwei
  SLIPPAGE: 0.5, // Default slippage tolerance (0.5%)
};

// API endpoints
export const API_ENDPOINTS = {
  PRICE_FEED: "/api/price",
  TRANSACTION_HISTORY: "/api/transactions",
  USER_DETAILS: "/api/user",
};

// Time constants
export const TIME = {
  ONE_MINUTE_MS: 60 * 1000,
  ONE_HOUR_MS: 60 * 60 * 1000,
  ONE_DAY_MS: 24 * 60 * 60 * 1000,
  ONE_YEAR_MS: 365 * 24 * 60 * 60 * 1000,
};