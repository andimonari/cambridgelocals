import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getGuideBySlug, getReviewsForGuide } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"
import { renderMarkdown } from "@/lib/markdown"
import { formatDisplayName } from "@/lib/display-name"
import ReviewForm from "./ReviewForm"

interface Props {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug, { publishedOnly: true })
  if (!guide) return {}
  const description = guide.body.replace(/[#*>`_\-\[\]]/g, "").trim().slice(0, 160)
  const canonicalUrl = `${baseUrl}/guides/${slug}`
  return {
    title: guide.title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title: guide.title,
      description,
      url: canonicalUrl,
      authors: [formatDisplayName(guide.authorName)],
      publishedTime: guide.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description,
    },
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug, { publishedOnly: true })
  if (!guide) notFound()

  const reviews = await getReviewsForGuide(guide.slug)

  const initials = guide.authorName.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""

  const bodyHtml = renderMarkdown(guide.body)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.body.replace(/[#*>`_\-\[\]]/g, "").trim().slice(0, 160),
    author: {
      "@type": "Person",
      name: formatDisplayName(guide.authorName),
      url: `${baseUrl}/experts/${guide.authorSlug}`,
    },
    datePublished: guide.publishedAt?.toISOString(),
    url: `${baseUrl}/guides/${guide.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Cambridge Locals",
      url: baseUrl,
    },
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="max-w-[720px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-subtle mb-6 flex items-center gap-1 flex-wrap">
          <Link href={ROUTES.home} className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <Link href={ROUTES.guides} className="hover:text-foreground transition-colors">Guides</Link>
          <span aria-hidden>›</span>
          <span className="text-muted truncate max-w-xs">{guide.title}</span>
        </nav>

        {/* Feature image */}
        <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden mb-8">
          <Image
            src="/images/cambridge-architecture.jpg"
            alt="Historic Cambridge architecture"
            fill
            className="object-cover"
            sizes="(max-width: 720px) calc(100vw - 3rem), 720px"
          />
        </div>

        {/* Category + location tags */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Link
            href={`${ROUTES.guides}?category=${guide.categorySlug}`}
            className="text-xs font-semibold text-accent bg-accent/10 hover:bg-accent/15 px-3 py-1 rounded-full transition-colors"
          >
            {guide.categoryName}
          </Link>
          {guide.locationSlug && (
            <Link
              href={`${ROUTES.guides}?location=${guide.locationSlug}`}
              className="text-xs text-muted bg-surface hover:bg-line-soft px-3 py-1 rounded-full transition-colors"
            >
              {guide.locationName}
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight mb-6 leading-[1.1]">
          {guide.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-line-soft">
          <div
            aria-hidden
            className="w-11 h-11 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center shrink-0"
          >
            {initials}
          </div>
          <div>
            <Link
              href={ROUTES.expert(guide.authorSlug)}
              className="font-medium text-foreground hover:text-accent transition-colors text-sm"
            >
              {formatDisplayName(guide.authorName)}
            </Link>
            <p className="text-xs text-subtle mt-0.5">{guide.authorRole}</p>
          </div>
          {guide.publishedAt && (
            <time
              dateTime={guide.publishedAt.toISOString()}
              className="text-xs text-subtle ml-auto"
            >
              {guide.publishedAt.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}
        </div>

        {/* Body */}
        <article
          className="text-base"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Reviews */}
        <section className="mt-16 pt-10 border-t border-line-soft">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-7">
            Reader reviews
            {reviews.length > 0 && (
              <span className="ml-2 text-base font-normal text-subtle">({reviews.length})</span>
            )}
          </h2>

          {reviews.length > 0 && (
            <ul className="space-y-4 mb-7">
              {reviews.map((review) => (
                <li key={review.id} className="bg-surface rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{review.authorName}</span>
                    <span className="text-amber-400 tracking-tight" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{review.body}</p>
                </li>
              ))}
            </ul>
          )}

          <ReviewForm guideSlug={guide.slug} />
        </section>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-line-soft">
          <Link
            href={ROUTES.guides}
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            <span aria-hidden>←</span>
            Back to all guides
          </Link>
        </div>
      </main>
    </div>
  )
}
