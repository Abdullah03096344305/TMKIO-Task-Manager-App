'use client'

import Link from 'next/link'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  const { user, isSignedIn } = useUser()

  console.log("SIGNED IN:", isSignedIn)
  console.log("USER ID:", user?.id)

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/">Home</Link>

      <Link href="/tasks">Tasks</Link>

      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      )}
    </nav>
  )
}