// src/components/animations/counter.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { animate } from 'framer-motion'

interface CounterProps {
  from: number
  to: number
  duration?: number
  decimals?: number
  className?: string
}

export function Counter({ from, to, duration = 2, decimals = 0, className }: CounterProps) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setValue(parseFloat(value.toFixed(decimals)))
      },
    })

    return () => controls.stop()
  }, [from, to, duration, decimals])

  return (
    <motion.span className={className}>
      {value.toLocaleString()}
    </motion.span>
  )
}