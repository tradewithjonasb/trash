'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Vault } from '@/context/vault-context'
import { VAULT_PLANS } from '@/config/vault-plans'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useVault } from '@/context/vault-context'

interface VaultDetailsProps {
  vault: Vault
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VaultDetails({ vault, open, onOpenChange }: VaultDetailsProps) {
  const { withdrawFromVault } = useVault()
  const plan = VAULT_PLANS.find(p => p.id === vault.planId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{plan?.name} Vault Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Initial Deposit</h4>
              <p className="text-lg font-semibold">{formatCurrency(vault.depositAmount)}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Current Value</h4>
              <p className="text-lg font-semibold">{formatCurrency(vault.currentValue || vault.depositAmount)}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">APY</h4>
              <p className="text-lg font-semibold">{plan?.apy}%</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
              <p className="text-lg font-semibold">{plan?.duration}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Start Date</span>
              <span>{formatDate(vault.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span>Maturity Date</span>
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

          {vault.isMature ? (
            <Button
              className="w-full"
              onClick={() => {
                withdrawFromVault(vault.id)
                onOpenChange(false)
              }}
            >
              Withdraw Funds
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              {Math.floor(vault.daysRemaining || 0)} Days Until Maturity
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}