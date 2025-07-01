import { VAULT_PLANS } from '@/config/vault-plans'
import type { Vault } from '@/context/vault-context'

/**
 * Calculate the current value of a vault with compound interest
 * @param vault The vault to calculate value for
 * @param currentDate Optional date to calculate value at (defaults to now)
 * @returns Current value of the vault
 */
export function calculateVaultValue(vault: Vault, currentDate: Date = new Date()): number {
  const plan = VAULT_PLANS.find(p => p.id === vault.planId)
  if (!plan) return vault.depositAmount

  const startDate = new Date(vault.startDate)
  const endDate = new Date(vault.endDate)
  
  // If vault hasn't started yet
  if (currentDate < startDate) return vault.depositAmount
  
  // If vault is mature
  if (currentDate >= endDate) {
    const fullTermValue = compoundInterest(
      vault.depositAmount,
      plan.apy,
      plan.durationMonths
    )
    return fullTermValue
  }

  // Calculate partial term value
  const elapsedMonths = monthDiff(startDate, currentDate)
  const partialValue = compoundInterest(
    vault.depositAmount,
    plan.apy,
    elapsedMonths
  )
  
  return partialValue
}

/**
 * Calculate compound interest
 * @param principal Initial amount
 * @param annualRate APY as percentage (e.g., 5 for 5%)
 * @param months Number of months
 * @returns Future value
 */
export function compoundInterest(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12
  const periods = months
  return principal * Math.pow(1 + monthlyRate, periods)
}

/**
 * Calculate the difference in months between two dates
 * @param date1 Earlier date
 * @param date2 Later date
 * @returns Number of months between dates
 */
export function monthDiff(date1: Date, date2: Date): number {
  let months = (date2.getFullYear() - date1.getFullYear()) * 12
  months -= date1.getMonth()
  months += date2.getMonth()
  return months <= 0 ? 0 : months
}

/**
 * Calculate progress percentage of vault term
 * @param startDate Vault start date
 * @param endDate Vault end date
 * @param currentDate Optional date to calculate at (defaults to now)
 * @returns Progress percentage (0-100)
 */
export function calculateVaultProgress(
  startDate: Date,
  endDate: Date,
  currentDate: Date = new Date()
): number {
  const start = startDate.getTime()
  const end = endDate.getTime()
  const now = currentDate.getTime()

  if (now >= end) return 100
  if (now <= start) return 0

  const total = end - start
  const elapsed = now - start
  return (elapsed / total) * 100
}