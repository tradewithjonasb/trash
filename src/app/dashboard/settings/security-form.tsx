'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'

export function SecurityForm() {
  const { address } = useAccount()
  const { toast } = useToast()
  const { open } = useWeb3Modal()

  const handleDisconnect = async () => {
    try {
      await open()
      toast({
        title: 'Wallet disconnected',
        description: 'You have successfully disconnected your wallet',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to disconnect wallet',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Connected Wallet</h3>
        <p className="text-sm text-muted-foreground">
          {address ? (
            <span className="font-mono">{address}</span>
          ) : (
            'No wallet connected'
          )}
        </p>
      </div>

      <Button variant="destructive" onClick={handleDisconnect}>
        Disconnect Wallet
      </Button>
    </div>
  )
}