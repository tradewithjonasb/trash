import { VAULT_PLANS } from "@/config/vault-plans";

// Vault statuses
export const VAULT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  WITHDRAWN: "withdrawn",
  LIQUIDATED: "liquidated",
} as const;

// Vault withdrawal penalties (percentage)
export const WITHDRAWAL_PENALTIES = {
  FLEX: 0, // No penalty for Flex Vault
  GROWTH: 5, // 5% penalty for Growth Vault
  BALANCED: 10, // 10% penalty for Balanced Vault
  LEGACY: 25, // 25% penalty for Legacy Vault
  GENERATIONAL: 50, // 50% penalty for Generational Vault
};

// Vault maturity options
export const MATURITY_OPTIONS = [
  { label: "Reinvest automatically", value: "reinvest" },
  { label: "Withdraw to wallet", value: "withdraw" },
  { label: "Create new vault", value: "new" },
];

// Vault performance tiers
export const PERFORMANCE_TIERS = [
  { threshold: 0, label: "Starter", color: "gray" },
  { threshold: 5000, label: "Bronze", color: "orange" },
  { threshold: 25000, label: "Silver", color: "gray" },
  { threshold: 100000, label: "Gold", color: "yellow" },
  { threshold: 500000, label: "Platinum", color: "blue" },
];

// Get penalty for a vault plan
export function getWithdrawalPenalty(planId: string): number {
  const plan = VAULT_PLANS.find((p) => p.id === planId);
  if (!plan) return 0;

  switch (plan.id) {
    case "flex":
      return WITHDRAWAL_PENALTIES.FLEX;
    case "growth":
      return WITHDRAWAL_PENALTIES.GROWTH;
    case "balanced":
      return WITHDRAWAL_PENALTIES.BALANCED;
    case "legacy":
      return WITHDRAWAL_PENALTIES.LEGACY;
    case "generational":
      return WITHDRAWAL_PENALTIES.GENERATIONAL;
    default:
      return 0;
  }
}