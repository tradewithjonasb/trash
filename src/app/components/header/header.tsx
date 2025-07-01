'use client'

import Link from 'next/link'
import { MAIN_NAV } from '@/app/constants/navigation'
import { Logo } from './logo'
import { ConnectWalletButton } from '../connect-wallet/connect-wallet-button'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils/index'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <ConnectWalletButton />
      </div>
    </header>
  )
}