import Link from 'next/link'
import { FOOTER_LINKS } from '@/app/constants/navigation'
import { SOCIAL_LINKS } from '@/app/constants'
import { Logo } from '../header/logo'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              Secure your financial future with crypto-based retirement vaults.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.slice(3).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">{platform}</span>
                  {/* Replace with actual icons */}
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
          © {new Date().getFullYear()} Crypto IRA Vault. All rights reserved.
        </div>
      </div>
    </footer>
  )
}