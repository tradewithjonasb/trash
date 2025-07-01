import { useNetwork, useSwitchNetwork } from 'wagmi'
import { SUPPORTED_CHAINS } from '@/config/chains'

export function useChain() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const isSupportedChain = SUPPORTED_CHAINS.some(
    supportedChain => supportedChain.id === chain?.id
  )

  const switchToSupportedChain = async () => {
    if (SUPPORTED_CHAINS.length > 0 && switchNetwork) {
      await switchNetwork(SUPPORTED_CHAINS[0].id)
    }
  }

  return {
    currentChain: chain,
    isSupportedChain,
    switchToSupportedChain
  }
}