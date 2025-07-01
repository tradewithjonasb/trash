'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { VAULT_PLANS } from '@/config/vault-plans'

const data = VAULT_PLANS.map(plan => ({
  name: plan.name,
  apy: plan.apy,
  duration: plan.duration
}))

export function ApyChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip 
            formatter={(value) => [`${value}% APY`, 'Annual Percentage Yield']}
            labelFormatter={(label) => `${label} Vault`}
          />
          <Line
            type="monotone"
            dataKey="apy"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}