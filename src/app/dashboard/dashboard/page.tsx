'use client'

import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { VaultCard } from '@/components/vault-card'
import { Progress } from '@/app/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getVaults } from '@/lib/api/vault'
import { Skeleton } from '@/app/components/ui/skeleton'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    redirect('/')
  }

  const { data: vaults, isLoading } = useQuery({
    queryKey: ['vaults', address],
    queryFn: () => getVaults(address!),
    enabled: !!address,
  })

  const totalValue = vaults?.reduce((acc, vault) => acc + vault.currentValue, 0) || 0

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Retirement Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-4xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Vault Value</div>
              <Progress value={60} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Deposited: ${(totalValue * 0.6).toFixed(2)}</span>
                <span>Growth: ${(totalValue * 0.4).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold">Your Vaults</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaults?.map((vault, index) => (
              <VaultCard
                key={vault.id}
                vault={vault}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}