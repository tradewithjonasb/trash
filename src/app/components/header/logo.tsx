import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <span className="text-primary">Crypto IRA</span>
      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
        Vault
      </span>
    </Link>
  )
}