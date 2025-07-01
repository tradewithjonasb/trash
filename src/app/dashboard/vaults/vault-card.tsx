'use client'

import { Vault } from '@/context/vault-context'
import { VAULT_PLANS } from '@/config/vault-plans'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useVault } from '@/context/vault-context'

export function VaultCard({ vault }: { vault: Vault }) {
  const { withdrawFromVault } = useVault()
  const plan = VAULT_PLANS.find(p => p.id === vault.planId)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{plan?.name}</span>
          <Badge variant={plan?.badgeVariant}>
            {vault.isMature ? 'Mature' : 'Active'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {formatCurrency(vault.currentValue || vault.depositAmount)}
          </div>
          <div className="text-sm text-muted-foreground">
            Initial: {formatCurrency(vault.depositAmount)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Started</span>
            <span>{formatDate(vault.startDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Matures</span>
            <span>{formatDate(vault.endDate)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round((vault.progress || 0) * 100)}%</span>
          </div>
          <Progress value={(vault.progress || 0) * 100} />
        </div>
      </CardContent>
      <CardFooter>
        {vault.isMature ? (
          <Button
            className="w-full"
            onClick={() => withdrawFromVault(vault.id)}
          >
            Withdraw Funds
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            {Math.floor(vault.daysRemaining || 0)} Days Remaining
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}