import { supabase } from '@/lib/providers/supabase'

/**
 * Get user settings by wallet address
 * @param walletAddress User's wallet address
 * @returns User settings data
 */
export async function getUserSettings(walletAddress: string) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single()

  if (error) {
    console.error('Error fetching user settings:', error)
    return null
  }

  return data
}

/**
 * Update user settings
 * @param walletAddress User's wallet address
 * @param settings New settings values
 * @returns Updated settings data
 */
export async function updateUserSettings(
  walletAddress: string,
  settings: Record<string, any>
) {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert(
      {
        wallet_address: walletAddress,
        ...settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'wallet_address' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error updating user settings:', error)
    throw error
  }

  return data
}