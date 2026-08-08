import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { getCategories, getExpertByUserId, getLocations } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import NewGuideForm from "./NewGuideForm"

export const metadata = {
  title: "New Guide — Cambridge Locals",
}

export default async function NewGuidePage() {
  const user = await getCurrentUser()
  if (!user) redirect(ROUTES.signIn)

  const expert = await getExpertByUserId(user.uid)
  if (!expert) redirect(ROUTES.dashboard)

  const [categories, locations] = await Promise.all([getCategories(), getLocations()])

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
