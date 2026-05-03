import Link from "next/link"
import type { Metadata } from "next"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"

export const metadata: Metadata = {
  title: "Guides — Cambridge Experts",
  description: "Browse guides about Cambridge from local experts.",
}

interface Props {
  searchParams: Promise<{ category?: string; location?: string }>
}

function buildFilterUrl(base: string, category?: string, location?: string): string {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (location) params.set("location", location)
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}

function excerpt(body: string): string {
  const plain = body.replace(/#{1,6} |[*_`>~\-\[\]]/g, "").trim()
  return plain.length > 150 ? plain.slice(0, 150) + "…" : plain
}

export default async function GuidesPage({ searchParams }: Props) {
  const { category, location } = await searchParams

  const [guides, categories, locations] = await Promise.all([
    db.guide.findMany({
      where: {
        publishedAt: { not: null },
        ...(category ? { category: { slug: category } } : {}),
        ...(location ? { location: { slug: location } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true, location: true },
    }),
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.location.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8 flex items-center gap-1">
          <Link href={ROUTES.home} className="hover:text-gray-600 transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <span className="text-gray-600">Guides</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Guides</h1>
        <p className="text-gray-500 mb-8">Local knowledge from Cambridge experts.</p>

        {/* Category filter */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildFilterUrl(ROUTES.guides, undefined, location)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                !category
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildFilterUrl(ROUTES.guides, cat.slug, location)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  category === cat.slug
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Location filter */}
        {locations.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Area</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildFilterUrl(ROUTES.guides, category, undefined)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  !location
                    ? "bg-slate-700 text-white border-slate-700"
                    : "border-gray-200 text-gray-600 hover:border-slate-400 hover:text-slate-700"
                }`}
              >
                All areas
              </Link>
              {locations.map((loc) => (
                <Link
                  key={loc.id}
                  href={buildFilterUrl(ROUTES.guides, category, loc.slug)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    location === loc.slug
                      ? "bg-slate-700 text-white border-slate-700"
                      : "border-gray-200 text-gray-600 hover:border-slate-400 hover:text-slate-700"
                  }`}
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Guide list */}
        {guides.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-400 mb-2">No guides found.</p>
            {(category || location) && (
              <Link href={ROUTES.guides} className="text-sm text-indigo-600 hover:underline">
                Clear filters
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {guides.map((guide) => {
              const initials = guide.author.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)

              return (
                <li key={guide.id} className="py-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-indigo-600">{guide.category.name}</span>
                    {guide.location && (
                      <>
                        <span className="text-gray-300" aria-hidden>·</span>
                        <span className="text-xs text-gray-400">{guide.location.name}</span>
                      </>
                    )}
                  </div>

                  <Link href={ROUTES.guide(guide.slug)} className="block group mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {guide.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {excerpt(guide.body)}
                  </p>

                  <div className="flex items-center gap-2">
                    <div
                      aria-hidden
                      className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center shrink-0"
                    >
                      {initials}
                    </div>
                    <Link
                      href={ROUTES.expert(guide.author.slug)}
                      className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {guide.author.name}
                    </Link>
                    {guide.publishedAt && (
                      <>
                        <span className="text-gray-300" aria-hidden>·</span>
                        <time
                          dateTime={guide.publishedAt.toISOString()}
                          className="text-xs text-gray-400"
                        >
                          {guide.publishedAt.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
