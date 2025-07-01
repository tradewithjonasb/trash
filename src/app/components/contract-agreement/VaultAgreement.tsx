// VaultAgreement.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignMessage } from 'wagmi'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'

interface Plan {
  name: string
  duration: string
  apy: number
  depositAmount: number | string
}

interface VaultAgreementProps {
  plan: Plan
  onAgree: () => void
}

export function VaultAgreement({ plan, onAgree }: VaultAgreementProps) {
  const [agreed, setAgreed] = useState(false)
  const router = useRouter()

  const {
    signMessage,           // function to trigger signing
    isIdle,                // true before any call
    isPending,             // true while message is being signed
    isError,               // true if last attempt errored
    error,                 // SignMessageErrorType | null
  } = useSignMessage({
    // Place all callbacks inside `mutation` per Wagmi’s API :contentReference[oaicite:2]{index=2}
    mutation: {
      onSuccess(signature, variables, context) {
        toast.success('Agreement Signed', {
          description: 'Your vault has been created successfully!',
        })
        onAgree()
        router.push('/dashboard')
      },
      onError(err, variables, context) {
        toast.error('Error signing agreement', {
          description: err?.message ?? 'An unknown error occurred.',
        })
      },
    },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vault Agreement</h2>

      <ScrollArea className="h-96 rounded-md border p-4">
        {/* Terms copy omitted for brevity */}
      </ScrollArea>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={() => setAgreed(!agreed)}
        />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>

      <Button
        className="w-full"
        disabled={!agreed || isPending}     // use `isPending` for loading state :contentReference[oaicite:3]{index=3}
        onClick={() =>
          signMessage({
            message: `I agree to the terms of the ${plan.name} Vault. Deposit: ${plan.depositAmount} USDC.`
          })                            // call signature with your message :contentReference[oaicite:4]{index=4}
        }
      >
        {isPending ? 'Signing...' : 'Sign Agreement & Create Vault'}
      </Button>

      {isError && (                // display any sign error
        <p className="mt-2 text-sm text-red-600">
          {error?.message ?? 'Failed to sign agreement.'}
        </p>
      )}
    </div>
  )
}
