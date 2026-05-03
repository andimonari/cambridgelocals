import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { ROUTES } from "@/lib/routes"

// Protected routes that require an authenticated session
const PROTECTED_PREFIXES = [ROUTES.dashboard]

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
  if (isProtected && !req.auth) {
    const signInUrl = new URL(ROUTES.signIn, req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)"],
}
