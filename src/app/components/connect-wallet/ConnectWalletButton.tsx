// ConnectWalletButton.tsx
'use client'

import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false)
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  return (
    <div>
      {mounted && isConnected ? (
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => disconnect()}>
            Disconnect
          </Button>
          <Button onClick={() => router.push('/dashboard')}>
            View Dashboard
          </Button>
        </div>
      ) : (
        <Button onClick={() => open()}>Connect Wallet</Button>
      )}
    </div>
  )
}