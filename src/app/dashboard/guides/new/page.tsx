import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import NewGuideForm from "./NewGuideForm"

export const metadata = {
  title: "New Guide — Cambridge Experts",
}

export default async function NewGuidePage() {
  const session = await auth()
  if (!session?.user) redirect(ROUTES.signIn)

  const expert = await db.expert.findFirst({ where: { userId: session.user.id } })
  if (!expert) redirect(ROUTES.dashboard)

  const [categories, locations] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.location.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <a href={ROUTES.dashboard} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Dashboard
          </a>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">New guide</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Write a new guide</h1>
        <NewGuideForm categories={categories} locations={locations} />
      </main>
    </div>
  )
}
