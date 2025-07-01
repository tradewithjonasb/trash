'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { VaultPlanSelector } from '@/components/vault-selector'
import { DepositForm } from '@/components/deposit/deposit-form'
import { useVault } from '@/context/vault-context'

export function CreateVault({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { createVault } = useVault()

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleDeposit = async (amount: number, currency: string) => {
    if (!selectedPlan) return
    await createVault(selectedPlan, amount, currency)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Vault</DialogTitle>
        </DialogHeader>

        {!selectedPlan ? (
          <VaultPlanSelector onSelect={handlePlanSelect} />
        ) : (
          <DepositForm 
            planId={selectedPlan}
            onDeposit={handleDeposit}
            onBack={() => setSelectedPlan(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}