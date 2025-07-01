import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { VaultCard } from './vault-card'
import { CreateVault } from './create-vault'
import { Button } from '@/components/ui/button'
import { useVault } from '@/context/vault-context'

export default function VaultsPage() {
  const { vaults, isLoading, selectPlan } = useVault()

  return (
    <div className="container py-8 space-y-8">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionHeading
          title="Your Vaults"
          description="Manage your crypto retirement vaults"
          action={
            <CreateVault>
              <Button>Create New Vault</Button>
            </CreateVault>
          }
        />
      </MotionDiv>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </MotionDiv>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaults.map((vault, index) => (
            <MotionDiv
              key={vault.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VaultCard vault={vault} />
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  )
}