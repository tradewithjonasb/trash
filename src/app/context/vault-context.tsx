'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { VAULT_PLANS } from '@/config/vault-plans'
import { getContractAddress } from '@/config/contracts'
import { erc20ABI, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseUnits } from 'viem'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/database/supabase'

interface Vault {
  id: string
  planId: string
  walletAddress: string
  depositAmount: number
  depositCurrency: string
  startDate: Date
  endDate: Date
  apy: number
  status: 'active' | 'completed' | 'withdrawn'
  txHash?: string
  currentValue?: number
  progress?: number
  daysRemaining?: number
  isMature?: boolean
}

interface VaultContextType {
  vaults: Vault[]
  selectedVault: Vault | null
  selectedPlan: typeof VAULT_PLANS[0] | null
  isLoading: boolean
  error: string | null
  createVault: (planId: string, amount: number, currency: string) => Promise<void>
  withdrawFromVault: (vaultId: string) => Promise<void>
  selectVault: (vault: Vault) => void
  selectPlan: (plan: typeof VAULT_PLANS[0]) => void
  fetchVaults: () => Promise<void>
}

const VaultContext = createContext<VaultContextType | undefined>(undefined)

export function VaultProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount()
  const { toast } = useToast()
  const [vaults, setVaults] = useState<Vault[]>([])
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<typeof VAULT_PLANS[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's vaults
  const fetchVaults = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_address', address)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Calculate current values and progress
      const processedVaults = data.map((vault) => {
        const startDate = new Date(vault.start_date)
        const endDate = new Date(vault.end_date)
        const now = new Date()
        
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        const progress = Math.min(elapsedDays / totalDays, 1)
        
        const interest = vault.deposit_amount * (vault.apy / 100) * progress
        const currentValue = vault.deposit_amount + interest
        
        return {
          ...vault,
          startDate,
          endDate,
          currentValue,
          progress,
          isMature: now >= endDate,
          daysRemaining: Math.max(0, (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        }
      })

      setVaults(processedVaults)
    } catch (err) {
      console.error('Error fetching vaults:', err)
      setError('Failed to load vaults')
    } finally {
      setIsLoading(false)
    }
  }

  // Prepare token approval
  const { config: approveConfig } = usePrepareContractWrite({
    address: getContractAddress('usdc', 1), // Default to Ethereum mainnet USDC
    abi: erc20ABI,
    functionName: 'approve',
    args: [
      getContractAddress('vaultFactory', 1), // Default to Ethereum mainnet
      parseUnits('1000000', 6) // Approve 1M USDC (6 decimals)
    ],
  })

  const { write: approve, data: approveData } = useContractWrite(approveConfig)

  // Wait for approval transaction
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess: () => {
      toast({
        title: 'Approval Successful',
        description: 'Your tokens have been approved for deposit',
      })
    },
    onError: (err) => {
      toast({
        title: 'Approval Failed',
        description: err.message,
        variant: 'destructive',
      })
    },
  })

  // Create a new vault
  const createVault = async (planId: string, amount: number, currency: string) => {
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      })
      return
    }

    const plan = VAULT_PLANS.find(p => p.id === planId)
    if (!plan) {
      toast({
        title: 'Error',
        description: 'Invalid vault plan selected',
        variant: 'destructive',
      })
      return
    }

    if (amount < plan.minDeposit) {
      toast({
        title: 'Error',
        description: `Minimum deposit for this plan is ${plan.minDeposit} ${currency}`,
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      // 1. First approve token spending if needed
      if (currency !== 'ETH') {
        await approve?.()
      }

      // 2. Create vault record in database
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + plan.durationMonths)

      const { data, error } = await supabase
        .from('vaults')
        .insert([
          {
            user_address: address,
            plan_id: planId,
            deposit_amount: amount,
            deposit_currency: currency,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            apy: plan.apy,
            status: 'active',
          },
        ])
        .select()
        .single()

      if (error) throw error

      // 3. Update local state
      setVaults(prev => [
        {
          ...data,
          startDate,
          endDate,
          currentValue: amount,
          progress: 0,
          isMature: false,
          daysRemaining: plan.durationMonths * 30,
        },
        ...prev,
      ])

      toast({
        title: 'Vault Created',
        description: `Your ${plan.name} vault has been successfully created!`,
      })
    } catch (err) {
      console.error('Error creating vault:', err)
      toast({
        title: 'Error',
        description: 'Failed to create vault',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Withdraw from a vault
  const withdrawFromVault = async (vaultId: string) => {
    setIsLoading(true)

    try {
      // 1. Update vault status in database
      const { error } = await supabase
        .from('vaults')
        .update({ status: 'withdrawn' })
        .eq('id', vaultId)

      if (error) throw error

      // 2. Update local state
      setVaults(prev =>
        prev.map(vault =>
          vault.id === vaultId ? { ...vault, status: 'withdrawn' } : vault
        )
      )

      toast({
        title: 'Withdrawal Successful',
        description: 'Funds have been withdrawn from your vault',
      })
    } catch (err) {
      console.error('Error withdrawing from vault:', err)
      toast({
        title: 'Error',
        description: 'Failed to withdraw from vault',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch vaults when wallet address changes
  useEffect(() => {
    fetchVaults()
  }, [address])

  return (
    <VaultContext.Provider
      value={{
        vaults,
        selectedVault,
        selectedPlan,
        isLoading: isLoading || isApproving,
        error,
        createVault,
        withdrawFromVault,
        selectVault: setSelectedVault,
        selectPlan: setSelectedPlan,
        fetchVaults,
      }}
    >
      {children}
    </VaultContext.Provider>
  )
}

export function useVault() {
  const context = useContext(VaultContext)
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider')
  }
  return context
}