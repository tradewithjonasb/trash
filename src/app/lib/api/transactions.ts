import { supabase } from '@/lib/providers/supabase'

/**
 * Get transactions for a specific vault
 * @param vaultId Vault ID
 * @returns Array of transactions
 */
export async function getVaultTransactions(vaultId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('vault_id', vaultId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching transactions:', error)
    return []
  }

  return data
}

/**
 * Record a new transaction
 * @param transaction Transaction data
 * @returns Created transaction record
 */
export async function createTransaction(transaction: {
  vault_id: string
  tx_hash: string
  amount: number
  currency: string
  type: 'deposit' | 'withdrawal'
}) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        ...transaction,
        status: 'completed',
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating transaction:', error)
    throw error
  }

  return data
}