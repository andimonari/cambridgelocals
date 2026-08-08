import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { getExpertByUserId, getGuidesByAuthor } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import type { GuideStatus } from "@/types/firestore"
import { formatDisplayName } from "@/lib/display-name"
import { SignOutButton } from "@/components/SignOutButton"

export const metadata = {
  title: "Dashboard — Cambridge Locals",
}

const statusConfig: Record<GuideStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-line-soft text-muted" },
  submitted: { label: "In review", className: "bg-amber-100 text-amber-700" },
  published: { label: "Published", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect(ROUTES.signIn)

  const expert = await getExpertByUserId(user.uid)
  const guides = expert ? await getGuidesByAuthor(expert.slug) : []

  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-line-soft">
        <div className="max-w-[880px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href={ROUTES.home} className="font-semibold text-foreground tracking-tight">
            Cambridge Locals
          </Link>
          <SignOutButton className="text-sm text-muted hover:text-foreground transition-colors" />
        </div>
      </header>

      <main className="max-w-[880px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Your dashboard</h1>
          <p className="text-muted mt-1.5 text-sm">{user.email}</p>
        </div>

        {expert && (
          <div className="mb-8 p-5 rounded-2xl border border-line-soft flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{formatDisplayName(expert.name)}</p>
              <p className="text-sm text-muted">{expert.role}</p>
            </div>
            <div className="flex items-center gap-4">
              {expert.role === "admin" && (
                <Link
                  href={ROUTES.adminGuides}
                  className="text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  Admin review →
                </Link>
              )}
              <Link
                href={ROUTES.expert(expert.slug)}
                className="text-sm text-accent hover:text-accent-hover transition-colors"
              >
                View profile →
              </Link>
            </div>
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">Your guides</h2>
            <Link
              href={ROUTES.newGuide}
              className="text-sm px-4 py-2 rounded-full bg-accent text-white hover:bg-accent-hover transition-colors duration-200 font-medium"
            >
              + New guide
            </Link>
          </div>

          {guides.length === 0 ? (
            <div className="py-14 text-center border border-dashed border-line rounded-2xl">
              <p className="text-subtle text-sm mb-3">No guides yet.</p>
              <Link
                href={ROUTES.newGuide}
                className="text-sm text-accent hover:underline"
              >
                Write your first guide →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line-soft">
              {guides.map((guide) => {
                const { label, className } = statusConfig[guide.status]
                return (
                  <li key={guide.slug} className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{guide.title}</p>
                      <p className="text-xs text-subtle mt-0.5">{guide.categoryName}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {guide.status === "published" && (
                        <Link
                          href={ROUTES.guide(guide.slug)}
                          className="text-xs text-accent hover:underline"
                        >
                          View
                        </Link>
                      )}
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${className}`}>
                        {label}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
