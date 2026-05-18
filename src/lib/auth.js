import { auth, currentUser } from '@clerk/nextjs/server'

export async function getUserId() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return userId
}

export async function getUserProfile() {
  const user = await currentUser()

  if (!user?.id) {
    throw new Error('Unauthorized')
  }

  const rawRole = user.publicMetadata?.role || user.public_metadata?.role
  const role = typeof rawRole === 'string' ? rawRole.trim() : ''

  return {
    id: user.id,
    role: role || 'Member',
  }
}

export async function requireAdmin() {
  const profile = await getUserProfile()
  const normalizedRole = String(profile.role).trim().toLowerCase()

  if (normalizedRole !== 'admin') {
    throw new Error(`Admin role required. Current role: ${profile.role}`)
  }

  return profile
}
