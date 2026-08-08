import { notFound } from "next/navigation"
import Link from "next/link"
import { getExpertBySlug, getPublishedGuidesByAuthor, getReviewsForExpert } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import type { Metadata } from "next"
import { formatDisplayName } from "@/lib/display-name"
import { SiteNav } from "@/components/SiteNav"

interface Props {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const expert = await getExpertBySlug(slug)
  if (!expert) return {}
  const displayName = formatDisplayName(expert.name)
  const description = expert.bio ?? `${displayName} shares local Cambridge insights.`
  const canonicalUrl = `${baseUrl}/experts/${slug}`
  return {
    title: displayName,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "profile",
      title: displayName,
      description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title: displayName,
      description,
    },
  }
}

export default async function ExpertProfilePage({ params }: Props) {
  const { slug } = await params
  const expert = await getExpertBySlug(slug)
  if (!expert) notFound()

  const [guides, reviews] = await Promise.all([
    getPublishedGuidesByAuthor(expert.slug),
    getReviewsForExpert(expert.slug),
  ])

  const initials = expert.name.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""
  const displayName = formatDisplayName(expert.name)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    description: expert.bio ?? undefined,
    jobTitle: expert.role,
    url: `${baseUrl}/experts/${expert.slug}`,
    ...(expert.locationName ? { address: { "@type": "Place", name: `${expert.locationName}, Cambridge` } } : {}),
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="max-w-[720px] mx-auto px-6 py-12">
        {/* Profile header */}
        <div className="flex items-start gap-5 mb-7">
          <div className="w-16 h-16 rounded-full bg-accent/10 text-accent font-semibold text-xl flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">{displayName}</h1>
            <p className="text-muted mt-1">{expert.role}</p>
            {expert.locationName && (
              <p className="text-sm text-accent mt-1">{expert.locationName}, Cambridge</p>
            )}
          </div>
        </div>

        {expert.bio && (
          <p className="text-muted leading-relaxed mb-8 border-l-2 border-accent/25 pl-5">
            {expert.bio}
          </p>
        )}

        {/* Expert reviews */}
        {reviews.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground tracking-tight mb-5">
              Reviews
              <span className="ml-2 text-sm font-normal text-subtle">({reviews.length})</span>
            </h2>
            <ul className="space-y-3">
              {reviews.map((review) => (
                <li key={review.id} className="bg-surface rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-foreground text-sm">{review.authorName}</span>
                    <span className="text-amber-400 tracking-tight" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{review.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Guides */}
        <section>
          <h2 className="text-xl font-semibold text-foreground tracking-tight mb-5">Guides</h2>
          {guides.length === 0 ? (
            <p className="text-subtle text-sm py-10 text-center border border-dashed border-line rounded-2xl">
              No published guides yet — check back soon.
            </p>
          ) : (
            <ul className="divide-y divide-line-soft">
              {guides.map((guide) => (
                <li key={guide.slug} className="py-5">
                  <p className="text-xs text-accent font-medium mb-1">
                    {guide.categoryName}
                  </p>
                  <Link
                    href={ROUTES.guide(guide.slug)}
                    className="font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {guide.title}
                  </Link>
                  {guide.publishedAt && (
                    <p className="text-xs text-subtle mt-1">
                      {new Date(guide.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
