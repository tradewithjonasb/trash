'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20
}: {
  children: ReactNode
  delay?: number
  duration?: number
  yOffset?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}