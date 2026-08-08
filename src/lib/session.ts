import { cookies } from "next/headers"
import { adminAuth } from "@/lib/firebase-admin"
import { SESSION_COOKIE } from "@/lib/session-constants"

export { SESSION_COOKIE, SESSION_MAX_AGE_MS } from "@/lib/session-constants"

export type CurrentUser = {
  uid: string
  email: string | null
}

/**
 * Verifies the session cookie server-side via the Admin SDK. This is the
 * authoritative check — src/proxy.ts only checks whether the cookie is
 * *present* (cheap, edge-safe) as a fast redirect for unauthenticated
 * visitors; every protected page/route must still call this to confirm the
 * cookie is actually valid before trusting it.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionCookie) return null

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
    return { uid: decoded.uid, email: decoded.email ?? null }
  } catch {
    return null
  }
}
