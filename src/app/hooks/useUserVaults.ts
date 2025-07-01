import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/database/supabase'
import { calculateVaultValue } from '@/lib/calculations/vault'

export function useUserVaults() {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['vaults', address],
    queryFn: async () => {
      if (!address) return []
      
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_address', address)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(vault => ({
        ...vault,
        currentValue: calculateVaultValue(vault),
        progress: calculateVaultProgress(
          new Date(vault.start_date),
          new Date(vault.end_date)
        )
      }))
    },
    enabled: !!address,
    staleTime: 60 * 1000 // 1 minute
  })
}