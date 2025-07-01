import { VaultPlan } from '@/config/vault-plans'

export interface UserProfile {
  wallet_address: string
  email?: string
  username?: string
  created_at: string
  updated_at: string
}

export interface UserSettings {
  wallet_address: string
  email_notifications: boolean
  vault_alerts: boolean
  marketing_emails: boolean
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  vault_id: string
  tx_hash: string
  amount: number
  currency: string
  type: 'deposit' | 'withdrawal'
  status: 'pending' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export interface VaultWithDetails extends VaultPlan {
  id: string
  user_address: string
  deposit_amount: number
  deposit_currency: string
  start_date: string
  end_date: string
  status: 'active' | 'completed' | 'withdrawn'
  created_at: string
  updated_at: string
  current_value?: number
  progress?: number
  days_remaining?: number
}