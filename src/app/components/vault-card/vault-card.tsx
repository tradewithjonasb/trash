'use client'

import { Vault } from '@/context/vault-context'
import { VAULT_PLANS } from '@/config/vault-plans'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useVault } from '@/context/vault-context'
import { VaultDetails } from '../vaults/vault-details'
import { useState } from 'react'

export function VaultCard({ vault }: { vault: Vault }) {
  const { withdrawFromVault } = useVault()
  const [showDetails, setShowDetails] = useState(false)
  const plan = VAULT_PLANS.find(p => p.id === vault.planId)

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{plan?.name}</span>
            <Badge variant={vault.isMature ? 'default' : 'secondary'}>
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
            <div className="text-sm">
              <span className="text-muted-foreground">APY: </span>
              {plan?.apy}%
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Matures: </span>
              {formatDate(vault.endDate)}
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
        <CardFooter className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowDetails(true)}
          >
            Details
          </Button>
          {vault.isMature ? (
            <Button
              className="flex-1"
              onClick={() => withdrawFromVault(vault.id)}
            >
              Withdraw
            </Button>
          ) : (
            <Button variant="secondary" className="flex-1" disabled>
              {Math.floor(vault.daysRemaining || 0)} days
            </Button>
          )}
        </CardFooter>
      </Card>

      <VaultDetails
        vault={vault}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  )
}