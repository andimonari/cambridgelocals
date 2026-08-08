import { NextResponse, type NextRequest } from "next/server"
import { ROUTES } from "@/lib/routes"
import { SESSION_COOKIE } from "@/lib/session-constants"

// Protected routes that require an authenticated session
const PROTECTED_PREFIXES = [ROUTES.dashboard]

// Middleware/proxy runs on the Edge runtime, where the Admin SDK (Node-only)
// isn't available — so this only checks whether the session cookie is
// *present*, as a cheap redirect for the common case. It is not proof the
// cookie is valid. Every protected Server Component/route still calls
// getCurrentUser() (src/lib/session.ts), which verifies it via the Admin SDK
// and is the actual authorization boundary.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
  const hasSessionCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value)

  if (isProtected && !hasSessionCookie) {
    const signInUrl = new URL(ROUTES.signIn, req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)"],
}
