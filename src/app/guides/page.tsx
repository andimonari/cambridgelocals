import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getCategories, getLocations, getPublishedGuides } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"
import { formatDisplayName } from "@/lib/display-name"

export const metadata: Metadata = {
  title: "Guides — Cambridge Locals",
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
    getPublishedGuides({ categorySlug: category, locationSlug: location }),
    getCategories(),
    getLocations(),
  ])

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteNav />

      <main className="max-w-[1120px] mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-subtle mb-6 flex items-center gap-1">
          <Link href={ROUTES.home} className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <span className="text-muted">Guides</span>
        </nav>

        {/* Page header with Cambridge image */}
        <div className="relative rounded-3xl overflow-hidden h-40 sm:h-52 mb-10">
          <Image
            src="/images/cambridge-river-evening.jpg"
            alt="Peaceful summer evening by the River Cam in Cambridge"
            fill
            className="object-cover"
            sizes="(max-width: 1120px) calc(100vw - 3rem), 1120px"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-7 sm:p-9">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-1">Guides</h1>
            <p className="text-white/80 text-sm">Local knowledge from Cambridge experts.</p>
          </div>
        </div>

        <div className="max-w-[820px] mx-auto">
          {/* Category filter */}
          <div className="mb-5">
            <p className="text-xs font-medium text-subtle uppercase tracking-wider mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildFilterUrl(ROUTES.guides, undefined, location)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                  !category
                    ? "bg-foreground text-white border-foreground"
                    : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={buildFilterUrl(ROUTES.guides, cat.slug, location)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                    category === cat.slug
                      ? "bg-foreground text-white border-foreground"
                      : "border-line text-muted hover:border-foreground/30 hover:text-foreground"
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
              <p className="text-xs font-medium text-subtle uppercase tracking-wider mb-3">Area</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={buildFilterUrl(ROUTES.guides, category, undefined)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                    !location
                      ? "bg-accent text-white border-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  All areas
                </Link>
                {locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={buildFilterUrl(ROUTES.guides, category, loc.slug)}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                      location === loc.slug
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:border-accent/40 hover:text-accent"
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
            <div className="text-center py-20 border border-dashed border-line rounded-3xl">
              <p className="text-subtle mb-2">No guides found.</p>
              {(category || location) && (
                <Link href={ROUTES.guides} className="text-sm text-accent hover:underline">
                  Clear filters
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-line-soft">
              {guides.map((guide) => {
                const initials = guide.authorName.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""

                return (
                  <li key={guide.slug} className="py-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-accent">{guide.categoryName}</span>
                      {guide.locationName && (
                        <>
                          <span className="text-line" aria-hidden>·</span>
                          <span className="text-xs text-subtle">{guide.locationName}</span>
                        </>
                      )}
                    </div>

                    <Link href={ROUTES.guide(guide.slug)} className="block group mb-2">
                      <h2 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                        {guide.title}
                      </h2>
                    </Link>

                    <p className="text-[15px] text-muted leading-relaxed mb-4">
                      {excerpt(guide.body)}
                    </p>

                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden
                        className="w-6 h-6 rounded-full bg-accent/10 text-accent font-semibold text-xs flex items-center justify-center shrink-0"
                      >
                        {initials}
                      </div>
                      <Link
                        href={ROUTES.expert(guide.authorSlug)}
                        className="text-xs text-muted hover:text-foreground transition-colors"
                      >
                        {formatDisplayName(guide.authorName)}
                      </Link>
                      {guide.publishedAt && (
                        <>
                          <span className="text-line" aria-hidden>·</span>
                          <time
                            dateTime={guide.publishedAt.toISOString()}
                            className="text-xs text-subtle"
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
        </div>
      </main>
    </div>
  )
}
