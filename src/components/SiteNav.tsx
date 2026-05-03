import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

export async function SiteNav() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
          Cambridge Experts
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm text-gray-500">
            <a href={`${ROUTES.home}#guides`} className="hover:text-gray-900 transition-colors">
              Guides
            </a>
            <a href={`${ROUTES.home}#experts`} className="hover:text-gray-900 transition-colors">
              Experts
            </a>
          </nav>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.dashboard}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: ROUTES.home })
                }}
              >
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href={ROUTES.signIn}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
