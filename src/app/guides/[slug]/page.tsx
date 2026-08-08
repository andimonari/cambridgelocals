import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { db } from "@/lib/db"
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
  const guide = await db.guide.findUnique({
    where: { slug },
    include: { author: true },
  })
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
      authors: [formatDisplayName(guide.author.name)],
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
  const guide = await db.guide.findUnique({
    where: { slug, publishedAt: { not: null } },
    include: {
      author: { include: { location: true } },
      category: true,
      location: true,
      reviews: { orderBy: { createdAt: "desc" } },
    },
  })

  if (!guide) notFound()

  const initials = guide.author.name.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""

  const bodyHtml = renderMarkdown(guide.body)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.body.replace(/[#*>`_\-\[\]]/g, "").trim().slice(0, 160),
    author: {
      "@type": "Person",
      name: formatDisplayName(guide.author.name),
      url: `${baseUrl}/experts/${guide.author.slug}`,
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
    <div className="min-h-screen bg-amber-50/30 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-4 flex items-center gap-1 flex-wrap">
          <Link href={ROUTES.home} className="hover:text-gray-600 transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <Link href={ROUTES.guides} className="hover:text-gray-600 transition-colors">Guides</Link>
          <span aria-hidden>›</span>
          <span className="text-gray-600 truncate max-w-xs">{guide.title}</span>
        </nav>

        {/* Feature image */}
        <div className="relative w-full h-40 sm:h-52 rounded-xl overflow-hidden mb-6">
          <Image
            src="/images/cambridge-architecture.jpg"
            alt="Historic Cambridge architecture"
            fill
            className="object-cover"
            sizes="(max-width: 768px) calc(100vw - 2rem), 768px"
          />
        </div>

        {/* Category + location tags */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Link
            href={`${ROUTES.guides}?category=${guide.category.slug}`}
            className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
          >
            {guide.category.name}
          </Link>
          {guide.location && (
            <Link
              href={`${ROUTES.guides}?location=${guide.location.slug}`}
              className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded transition-colors"
            >
              {guide.location.name}
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {guide.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div
            aria-hidden
            className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center shrink-0"
          >
            {initials}
          </div>
          <div>
            <Link
              href={ROUTES.expert(guide.author.slug)}
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors text-sm"
            >
              {formatDisplayName(guide.author.name)}
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">{guide.author.role}</p>
          </div>
          {guide.publishedAt && (
            <time
              dateTime={guide.publishedAt.toISOString()}
              className="text-xs text-gray-400 ml-auto"
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
        <section className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Reader reviews
            {guide.reviews.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">({guide.reviews.length})</span>
            )}
          </h2>

          {guide.reviews.length > 0 && (
            <ul className="space-y-6 mb-6">
              {guide.reviews.map((review) => (
                <li key={review.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800 text-sm">{review.authorName}</span>
                    <span className="text-amber-400 tracking-tight" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
                </li>
              ))}
            </ul>
          )}

          <ReviewForm guideId={guide.id} />
        </section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href={ROUTES.guides}
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span aria-hidden>←</span>
            Back to all guides
          </Link>
        </div>
      </main>
    </div>
  )
}
