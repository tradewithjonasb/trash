import { Vault } from '@/context/vault-context'

/**
 * Format currency with proper symbols and decimals
 * @param amount Amount to format
 * @param currency Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date in readable format
 * @param date Date object or string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format APY percentage
 * @param apy APY value
 * @returns Formatted percentage string
 */
export function formatAPY(apy: number): string {
  return `${apy.toFixed(2)}%`
}

/**
 * Shorten wallet address for display
 * @param address Full wallet address
 * @param chars Number of characters to show at each end
 * @returns Shortened address
 */
export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`
}

/**
 * Calculate days remaining until vault maturity
 * @param vault Vault object
 * @returns Number of days remaining
 */
export function daysRemaining(vault: Vault): number {
  const endDate = new Date(vault.endDate)
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Sleep for a given number of milliseconds
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}