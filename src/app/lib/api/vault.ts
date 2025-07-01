import { supabase } from '../database/supabase'

export async function createVault({
  walletAddress,
  planId,
  depositAmount,
  depositCurrency,
  apy,
  durationMonths,
  txHash,
}: {
  walletAddress: string
  planId: string
  depositAmount: number
  depositCurrency: string
  apy: number
  durationMonths: number
  txHash?: string
}) {
  // First get or create user
  const { data: userData, error: userError } = await supabase
    .from('users')
    .upsert(
      { wallet_address: walletAddress },
      { onConflict: 'wallet_address' }
    )
    .select()
    .single()

  if (userError) throw userError

  // Calculate dates
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + durationMonths)

  // Create vault
  const { data: vaultData, error: vaultError } = await supabase
    .from('vaults')
    .insert([
      {
        user_id: userData.id,
        plan_id: planId,
        deposit_amount: depositAmount,
        deposit_currency: depositCurrency,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        apy: apy,
        status: 'active',
        tx_hash: txHash,
      },
    ])
    .select()
    .single()

  if (vaultError) throw vaultError

  // Create transaction record if txHash provided
  if (txHash) {
    await supabase.from('transactions').insert([
      {
        vault_id: vaultData.id,
        tx_hash: txHash,
        amount: depositAmount,
        currency: depositCurrency,
        type: 'deposit',
        status: 'completed',
      },
    ])
  }

  return vaultData
}