import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Task Manager',
  description: 'Task management app',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}