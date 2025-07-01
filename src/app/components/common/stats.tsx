// src/components/common/stats.tsx
'use client'

import { motion } from 'framer-motion'
import { Counter } from '../animations/counter'

const stats = [
  { id: 1, name: 'Total Value Locked', value: 12.8, suffix: 'M+' },
  { id: 2, name: 'Average APY', value: 7.2, suffix: '%' },
  { id: 3, name: 'Active Vaults', value: 1245, suffix: '+' },
  { id: 4, name: 'Satisfied Users', value: 98, suffix: '%' },
]

export function StatsSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl font-bold md:text-5xl">
                {stat.suffix === '%' ? (
                  <>
                    <Counter from={0} to={stat.value} decimals={1} />
                    {stat.suffix}
                  </>
                ) : stat.value >= 1000 ? (
                  <>
                    <Counter from={0} to={stat.value / 1000} decimals={1} />
                    {stat.suffix}
                  </>
                ) : (
                  <Counter from={0} to={stat.value} />
                )}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                {stat.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}