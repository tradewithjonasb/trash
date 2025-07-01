'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { VAULT_PLANS } from '@/config/vault-plans'
import { compoundInterest } from '@/lib/calculations/vault'
import { formatCurrency } from '@/lib/utils'

export function InterestCalculator() {
  const [amount, setAmount] = useState(1000)
  const [selectedPlan, setSelectedPlan] = useState(VAULT_PLANS[2]) // Default to Balanced Vault

  const futureValue = compoundInterest(
    amount,
    selectedPlan.apy,
    selectedPlan.durationMonths
  )

  const interestEarned = futureValue - amount

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interest Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Initial Deposit</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={selectedPlan.minDeposit}
          />
        </div>

        <div className="space-y-2">
          <Label>Vault Plan</Label>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {VAULT_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  plan.id === selectedPlan.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Duration: {selectedPlan.duration}</Label>
          <Slider
            value={[selectedPlan.durationMonths]}
            min={1}
            max={120}
            step={1}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label>Projected Growth</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Initial</div>
              <div className="font-bold">{formatCurrency(amount)}</div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Future Value</div>
              <div className="font-bold">{formatCurrency(futureValue)}</div>
            </div>
          </div>
          <div className="bg-primary/10 p-4 rounded-md">
            <div className="text-sm text-muted-foreground">Interest Earned</div>
            <div className="font-bold text-primary">
              {formatCurrency(interestEarned)} ({selectedPlan.apy}% APY)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}