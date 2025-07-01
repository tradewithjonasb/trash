'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useVault } from '@/context/vault-context'
import { formatCurrency } from '@/lib/utils'

export function ValueGrowthChart() {
  const { vaults } = useVault()
  
  const data = vaults.map(vault => ({
    name: vault.planId,
    value: vault.currentValue || vault.depositAmount,
    date: new Date(vault.startDate).toLocaleDateString()
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [formatCurrency(Number(value)), 'Current Value']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}