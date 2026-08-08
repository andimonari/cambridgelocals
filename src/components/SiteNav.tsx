import Image from "next/image"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { ROUTES } from "@/lib/routes"
import { SignOutButton } from "@/components/SignOutButton"

export async function SiteNav() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-10 bg-amber-50/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={ROUTES.home} className="flex items-center gap-3 tracking-tight">
          <Image src="/images/logo.png" alt="Cambridge Locals logo" width={56} height={56} className="rounded-lg" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-stone-900 leading-tight">Cambridge Locals</span>
            <span className="hidden sm:block text-xs text-stone-400 font-normal leading-tight">Your guide to Cambridge, England</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm text-stone-500">
            <Link href={ROUTES.guides} className="hover:text-stone-900 transition-colors">
              Guides
            </Link>
            <a href={`${ROUTES.home}#experts`} className="hover:text-stone-900 transition-colors">
              Experts
            </a>
          </nav>
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.dashboard}
                className="text-sm text-stone-700 hover:text-stone-900 transition-colors"
              >
                Dashboard
              </Link>
              <SignOutButton className="text-sm text-stone-500 hover:text-stone-900 transition-colors" />
            </div>
          ) : (
            <Link
              href={ROUTES.signIn}
              className="text-sm font-medium text-sky-700 hover:text-sky-800 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
