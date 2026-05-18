import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Task Manager',
  description: 'Task management app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#121420]">
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}