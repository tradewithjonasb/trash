import { AuthProvider } from './app/auth/login/auth-provider'
import { Web3Provider } from '@/context/web3-provider'
import { VaultProvider } from '@/context/vault-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Web3Provider>
            <VaultProvider>
              {children}
            </VaultProvider>
          </Web3Provider>
        </AuthProvider>
      </body>
    </html>
  )
}