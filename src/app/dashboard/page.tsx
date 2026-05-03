import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { GuideStatus } from "@/generated/prisma/client"
import { formatDisplayName } from "@/lib/display-name"

export const metadata = {
  title: "Dashboard — Cambridge Locals",
}

const statusConfig: Record<GuideStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-500" },
  submitted: { label: "In review", className: "bg-yellow-100 text-yellow-700" },
  published: { label: "Published", className: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect(ROUTES.signIn)

  const expert = await db.expert.findFirst({
    where: { userId: session.user.id },
    include: {
      guides: {
        orderBy: { createdAt: "desc" },
        include: { category: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
            Cambridge Locals
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
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">{session.user.email}</p>
        </div>

        {expert && (
          <div className="mb-6 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{formatDisplayName(expert.name)}</p>
              <p className="text-sm text-gray-500">{expert.role}</p>
            </div>
            <div className="flex items-center gap-3">
              {expert.role === "admin" && (
                <Link
                  href={ROUTES.adminGuides}
                  className="text-sm text-orange-600 hover:underline"
                >
                  Admin review →
                </Link>
              )}
              <Link
                href={ROUTES.expert(expert.slug)}
                className="text-sm text-indigo-600 hover:underline"
              >
                View profile →
              </Link>
            </div>
          </div>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your guides</h2>
            <Link
              href={ROUTES.newGuide}
              className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
            >
              + New guide
            </Link>
          </div>

          {!expert || expert.guides.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 text-sm mb-3">No guides yet.</p>
              <Link
                href={ROUTES.newGuide}
                className="text-sm text-indigo-600 hover:underline"
              >
                Write your first guide →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {expert.guides.map((guide) => {
                const { label, className } = statusConfig[guide.status]
                return (
                  <li key={guide.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{guide.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{guide.category.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {guide.status === "published" && (
                        <Link
                          href={ROUTES.guide(guide.slug)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          View
                        </Link>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>
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
