import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Provider } from '@/app/context/web3-provider'
import { Toaster } from '@/app/components/ui/sonner'
import { SiteHeader } from '@/app/components/header/header'
import { SiteFooter } from '@/app/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto IRA Vaults - Secure Retirement Investing',
  description: 'Build your crypto retirement portfolio with secure, high-yield vaults',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Web3Provider>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  )
}