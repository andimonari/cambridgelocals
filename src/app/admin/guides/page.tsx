import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import AdminGuideActions from "./AdminGuideActions"

export const metadata = {
  title: "Admin — Guide Review — Cambridge Locals",
}

export default async function AdminGuidesPage() {
  const session = await auth()
  if (!session?.user) redirect(ROUTES.signIn)

  const expert = await db.expert.findFirst({ where: { userId: session.user.id } })
  if (!expert || expert.role !== "admin") {
    redirect(ROUTES.dashboard)
  }

  const submitted = await db.guide.findMany({
    where: { status: "submitted" },
    orderBy: { createdAt: "asc" },
    include: {
      author: true,
      category: true,
      location: true,
    },
  })

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href={ROUTES.dashboard} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">Guide review</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Guide review</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {submitted.length === 0
              ? "No guides awaiting review."
              : `${submitted.length} guide${submitted.length === 1 ? "" : "s"} awaiting review`}
          </p>
        </div>

        {submitted.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400 text-sm">All caught up — no submitted guides.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {submitted.map((guide) => (
              <li key={guide.id} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900 text-base truncate">{guide.title}</h2>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>by {guide.author.name}</span>
                      <span>·</span>
                      <span>{guide.category.name}</span>
                      {guide.location && (
                        <>
                          <span>·</span>
                          <span>{guide.location.name}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>
                        {new Date(guide.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <AdminGuideActions guideId={guide.id} guideTitle={guide.title} />
                </div>

                <div className="mt-4 text-sm text-gray-700 border-t border-gray-100 pt-4 whitespace-pre-wrap line-clamp-6">
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
