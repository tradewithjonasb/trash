'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ConnectWalletButton } from '../connect-wallet/connect-wallet-button'
import Lottie from 'lottie-react'
import animationData from '@/public/assets/animations/wealth-growth.json'

export function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Crypto Retirement Vaults
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Secure your financial future with crypto-based retirement vaults. Earn competitive yields
            while building long-term wealth.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <ConnectWalletButton />
            <Button variant="outline">Learn More</Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <Lottie
            animationData={animationData}
            className="max-w-md"
            loop={true}
          />
        </motion.div>
      </div>
    </section>
  )
}