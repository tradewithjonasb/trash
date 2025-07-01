import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { VAULT_WALLET_ADDRESS } from '@/config/contracts'
import { parseUnits } from 'viem'
import { useToast } from '@/components/ui/use-toast'

export function useVaultActions() {
  const { toast } = useToast()

  // Deposit action
  const { config: depositConfig } = usePrepareContractWrite({
    address: VAULT_WALLET_ADDRESS,
    abi: [
      {
        inputs: [
          { name: 'amount', type: 'uint256' },
          { name: 'planId', type: 'uint256' }
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ],
    functionName: 'deposit'
  })

  const { 
    write: deposit, 
    data: depositData,
    isLoading: isDepositing
  } = useContractWrite(depositConfig)

  const { isLoading: isWaitingForDeposit } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess: () => {
      toast({
        title: 'Deposit Successful',
        description: 'Your funds have been deposited into the vault'
      })
    },
    onError: (error) => {
      toast({
        title: 'Deposit Failed',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  // Withdraw action
  const { config: withdrawConfig } = usePrepareContractWrite({
    address: VAULT_WALLET_ADDRESS,
    abi: [
      {
        inputs: [{ name: 'vaultId', type: 'uint256' }],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    functionName: 'withdraw'
  })

  const { 
    write: withdraw, 
    data: withdrawData,
    isLoading: isWithdrawing
  } = useContractWrite(withdrawConfig)

  const { isLoading: isWaitingForWithdraw } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSuccess: () => {
      toast({
        title: 'Withdrawal Successful',
        description: 'Your funds have been withdrawn from the vault'
      })
    },
    onError: (error) => {
      toast({
        title: 'Withdrawal Failed',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  return {
    deposit: (amount: string, planId: number) => deposit?.({
      value: parseUnits(amount, 18) // Assuming ETH deposits
    }),
    withdraw: (vaultId: number) => withdraw?.({ args: [vaultId] }),
    isLoading: isDepositing || isWaitingForDeposit || isWithdrawing || isWaitingForWithdraw
  }
}