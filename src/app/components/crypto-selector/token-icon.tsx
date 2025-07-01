'use client'

import Image from 'next/image'

const TOKEN_ICONS: Record<string, string> = {
  USDC: '/assets/tokens/usdc.png',
  ETH: '/assets/tokens/eth.png',
  BTC: '/assets/tokens/btc.png',
  DAI: '/assets/tokens/dai.png'
}

export function TokenIcon({ symbol, size = 24 }: { symbol: string; size?: number }) {
  const iconSrc = TOKEN_ICONS[symbol] || '/assets/tokens/default.png'

  return (
    <Image
      src={iconSrc}
      alt={`${symbol} icon`}
      width={size}
      height={size}
      className="rounded-full"
    />
  )
}