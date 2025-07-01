// src/config/vault-plans.ts
export interface VaultPlan {
    id: string
    name: string
    duration: string
    durationMonths: number
    apy: number
    minDeposit: number
    description: string
    features: string[]
    color: string
    badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline'
  }
  
  export const VAULT_PLANS: VaultPlan[] = [
    {
      id: 'flex',
      name: 'Flex Vault',
      duration: '1 Month',
      durationMonths: 1,
      apy: 2.0,
      minDeposit: 100,
      description: 'Short-term flexible vault with no lock-up period',
      features: [
        'No lock-up period',
        'Flexible withdrawals',
        'Lower yield',
        'Great for beginners'
      ],
      color: 'bg-blue-100 dark:bg-blue-900',
      badgeVariant: 'outline'
    },
    {
      id: 'growth',
      name: 'Growth Vault',
      duration: '2 Months',
      durationMonths: 2,
      apy: 3.0,
      minDeposit: 500,
      description: 'Medium-term growth vault with higher yields',
      features: [
        '2 month commitment',
        'Higher yield than Flex',
        'Early withdrawal penalty',
        'Auto-compounding'
      ],
      color: 'bg-green-100 dark:bg-green-900',
      badgeVariant: 'default'
    },
    {
      id: 'balanced',
      name: 'Balanced Vault',
      duration: '6 Months',
      durationMonths: 6,
      apy: 5.0,
      minDeposit: 1000,
      description: 'Medium-term balanced growth strategy',
      features: [
        '6 month commitment',
        'Competitive yields',
        'Stable returns',
        'Best for mid-term goals'
      ],
      color: 'bg-purple-100 dark:bg-purple-900',
      badgeVariant: 'secondary'
    },
    {
      id: 'legacy',
      name: 'Legacy Vault',
      duration: '1 Year',
      durationMonths: 12,
      apy: 7.0,
      minDeposit: 5000,
      description: 'Long-term wealth building vault',
      features: [
        '1 year commitment',
        'Premium yields',
        'Compounding growth',
        'Early withdrawal penalty'
      ],
      color: 'bg-amber-100 dark:bg-amber-900',
      badgeVariant: 'default'
    },
    {
      id: 'generational',
      name: 'Generational Vault',
      duration: '10 Years',
      durationMonths: 120,
      apy: 12.0,
      minDeposit: 10000,
      description: 'Ultra long-term wealth preservation',
      features: [
        '10 year commitment',
        'Highest yields',
        'Generational wealth building',
        'Early withdrawal not permitted'
      ],
      color: 'bg-red-100 dark:bg-red-900',
      badgeVariant: 'destructive'
    }
  ]
  
  // Helper function to get a plan by ID
  export function getVaultPlanById(id: string): VaultPlan | undefined {
    return VAULT_PLANS.find(plan => plan.id === id)
  }
  
  // Type guard for vault plan IDs
  export function isVaultPlanId(id: string): id is VaultPlan['id'] {
    return VAULT_PLANS.some(plan => plan.id === id)
  }