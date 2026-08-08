import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { getExpertByUserId, getSubmittedGuides } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import AdminGuideActions from "./AdminGuideActions"
import { formatDisplayName } from "@/lib/display-name"

export const metadata = {
  title: "Admin — Guide Review — Cambridge Locals",
}

export default async function AdminGuidesPage() {
  const user = await getCurrentUser()
  if (!user) redirect(ROUTES.signIn)

  const expert = await getExpertByUserId(user.uid)
  if (!expert || expert.role !== "admin") {
    redirect(ROUTES.dashboard)
  }

  const submitted = await getSubmittedGuides()

  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-line-soft">
        <div className="max-w-[880px] mx-auto px-6 h-14 flex items-center gap-3">
          <Link href={ROUTES.dashboard} className="text-sm text-muted hover:text-foreground transition-colors">
            ← Dashboard
          </Link>
          <span className="text-line">/</span>
          <span className="text-sm font-medium text-foreground">Guide review</span>
        </div>
      </header>

      <main className="max-w-[880px] mx-auto px-6 py-12">
        <div className="mb-9">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">Guide review</h1>
          <p className="text-muted mt-1.5 text-sm">
            {submitted.length === 0
              ? "No guides awaiting review."
              : `${submitted.length} guide${submitted.length === 1 ? "" : "s"} awaiting review`}
          </p>
        </div>

        {submitted.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-line rounded-2xl">
            <p className="text-subtle text-sm">All caught up — no submitted guides.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {submitted.map((guide) => (
              <li key={guide.slug} className="border border-line-soft rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-foreground text-base truncate">{guide.title}</h2>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted">
                      <span>by {formatDisplayName(guide.authorName)}</span>
                      <span>·</span>
                      <span>{guide.categoryName}</span>
                      {guide.locationName && (
                        <>
                          <span>·</span>
                          <span>{guide.locationName}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>
                        {guide.createdAt.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <AdminGuideActions guideSlug={guide.slug} guideTitle={guide.title} />
                </div>

                <div className="mt-5 text-sm text-foreground/80 border-t border-line-soft pt-5 whitespace-pre-wrap line-clamp-6">
                  {guide.body}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
