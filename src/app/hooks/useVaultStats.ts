import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/database/supabase'

export function useVaultStats() {
  return useQuery({
    queryKey: ['vault-stats'],
    queryFn: async () => {
      const { data: vaultsData } = await supabase
        .from('vaults')
        .select('deposit_amount, apy, status')

      const { data: usersData } = await supabase
        .from('users')
        .select('wallet_address', { count: 'exact' })

      const totalValueLocked = vaultsData?.reduce(
        (sum, vault) => sum + vault.deposit_amount, 0
      ) || 0

      const averageApy = vaultsData?.reduce(
        (sum, vault) => sum + vault.apy, 0
      ) / (vaultsData?.length || 1) || 0

      return {
        totalValueLocked,
        averageApy,
        totalUsers: usersData?.length || 0,
        activeVaults: vaultsData?.filter(v => v.status === 'active').length || 0
      }
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}