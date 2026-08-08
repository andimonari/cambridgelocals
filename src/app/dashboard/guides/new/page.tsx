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
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-line-soft">
        <div className="max-w-[880px] mx-auto px-6 h-14 flex items-center gap-3">
          <a href={ROUTES.dashboard} className="text-sm text-muted hover:text-foreground transition-colors">
            ← Dashboard
          </a>
          <span className="text-line">/</span>
          <span className="text-sm font-medium text-foreground">New guide</span>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-9">Write a new guide</h1>
        <NewGuideForm categories={categories} locations={locations} />
      </main>
    </div>
  )
}
