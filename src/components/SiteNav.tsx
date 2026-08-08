import Image from "next/image"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { ROUTES } from "@/lib/routes"
import { SignOutButton } from "@/components/SignOutButton"

export async function SiteNav() {
  const user = await getCurrentUser()
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? user?.email?.split("@")[0] ?? null
  const initial = firstName?.[0]?.toUpperCase() ?? "?"

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 border-b border-line-soft">
      <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href={ROUTES.home} className="flex items-center gap-2.5 tracking-tight shrink-0">
          <Image src="/images/logo.png" alt="Cambridge Locals logo" width={30} height={30} className="rounded-lg" />
          <span className="text-[15px] font-semibold text-foreground leading-tight">Cambridge Locals</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-7 text-sm text-muted">
            <Link href={ROUTES.guides} className="hover:text-foreground transition-colors">
              Guides
            </Link>
            <a href={`${ROUTES.home}#experts`} className="hover:text-foreground transition-colors">
              Experts
            </a>
          </nav>

          {user ? (
            <div className="flex items-center gap-3.5">
              <Link href={ROUTES.dashboard} className="flex items-center gap-2 group">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt=""
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                ) : (
                  <span className="w-[26px] h-[26px] rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center shrink-0">
                    {initial}
                  </span>
                )}
                <span className="hidden sm:inline text-sm text-foreground group-hover:text-accent transition-colors">
                  {firstName ?? "Dashboard"}
                </span>
              </Link>
              <SignOutButton className="text-sm text-muted hover:text-foreground transition-colors" />
            </div>
          ) : (
            <Link
              href={ROUTES.signIn}
              className="rounded-full bg-foreground text-white text-sm font-medium px-5 py-2 hover:bg-black transition-colors duration-200"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
