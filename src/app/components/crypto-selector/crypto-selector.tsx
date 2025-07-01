'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TokenIcon } from './token-icon'

const CRYPTO_OPTIONS = [
  { symbol: 'USDC', name: 'USD Coin', decimals: 6 },
  { symbol: 'ETH', name: 'Ethereum', decimals: 18 },
  { symbol: 'BTC', name: 'Bitcoin', decimals: 8 },
  { symbol: 'DAI', name: 'Dai Stablecoin', decimals: 18 }
]

export function CryptoSelector({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        {CRYPTO_OPTIONS.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            <div className="flex items-center gap-2">
              <TokenIcon symbol={token.symbol} />
              <span>{token.symbol}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}