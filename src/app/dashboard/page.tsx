import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"

export const metadata = {
  title: "Dashboard — Cambridge Experts",
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
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
            Cambridge Experts
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">{session.user.email}</p>
        </div>

        {expert && (
          <div className="mb-8 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{expert.name}</p>
              <p className="text-sm text-gray-500">{expert.role}</p>
            </div>
            <Link
              href={ROUTES.expert(expert.slug)}
              className="text-sm text-indigo-600 hover:underline"
            >
              View profile →
            </Link>
          </div>
        )}

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your guides</h2>
          {!expert || expert.guides.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center border border-dashed border-gray-200 rounded-lg">
              No guides yet. Guide submission coming soon.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {expert.guides.map((guide) => (
                <li key={guide.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{guide.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{guide.category.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${guide.publishedAt ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {guide.publishedAt ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
