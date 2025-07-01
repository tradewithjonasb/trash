'use client'

import { useState } from 'react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useToast } from '../ui/use-toast'
import { createVault } from '../lib/'
import { VAULT_PLANS } from '@/config/vault-plans'

export function DepositForm() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USDC')
  const [planId, setPlanId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const { toast } = useToast()
  const { sendTransactionAsync } = useSendTransaction()

  const selectedPlan = VAULT_PLANS.find(plan => plan.id === planId)

  const handleDeposit = async () => {
    if (!address || !amount || !planId || !selectedPlan) return

    setIsLoading(true)

    try {
      // 1. Send transaction to your wallet
      const tx = await sendTransactionAsync({
        to: process.env.NEXT_PUBLIC_VAULT_WALLET_ADDRESS as `0x${string}`,
        value: parseEther(amount),
      })

      // 2. Create vault record in database
      const vault = await createVault({
        walletAddress: address,
        planId,
        depositAmount: parseFloat(amount),
        depositCurrency: currency,
        apy: selectedPlan.apy,
        durationMonths: selectedPlan.durationMonths,
        txHash: tx.hash,
      })

      toast({
        title: 'Deposit Successful',
        description: `Your ${selectedPlan.name} vault has been created!`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'There was an error processing your deposit',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="plan">Vault Plan</Label>
        <Select value={planId} onValueChange={setPlanId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a vault plan" />
          </SelectTrigger>
          <SelectContent>
            {VAULT_PLANS.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>
                {plan.name} ({plan.apy}% APY) - {plan.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="flex gap-2">
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={selectedPlan?.minDeposit || 0}
          />
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedPlan && (
          <p className="text-sm text-muted-foreground">
            Minimum deposit: {selectedPlan.minDeposit} {currency}
          </p>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleDeposit}
        disabled={!amount || !planId || isLoading}
        isLoading={isLoading}
      >
        Deposit & Create Vault
      </Button>
    </div>
  )
}