import { NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { ensureExpertForUser } from "@/lib/db"
import { SESSION_COOKIE, SESSION_MAX_AGE_MS } from "@/lib/session-constants"

/**
 * Exchanges a client-obtained Firebase ID token (from email-link sign-in)
 * for an httpOnly session cookie, and makes sure an Expert profile exists
 * for the signed-in user (mirrors the old NextAuth createUser event).
 */
export async function POST(request: Request) {
  const { idToken } = await request.json()
  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 })
  }

  let decoded
  try {
    decoded = await adminAuth.verifyIdToken(idToken)
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  await ensureExpertForUser(decoded.uid, decoded.name ?? null, decoded.email ?? null)

  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS })

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, sessionCookie, {
    maxAge: SESSION_MAX_AGE_MS / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(SESSION_COOKIE)
  return response
}
