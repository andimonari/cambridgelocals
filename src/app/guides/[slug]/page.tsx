import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"
import { renderMarkdown } from "@/lib/markdown"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await db.guide.findUnique({
    where: { slug },
    include: { author: true },
  })
  if (!guide) return {}
  return {
    title: `${guide.title} — Cambridge Experts`,
    description: guide.body.replace(/[#*>`_\-\[\]]/g, "").trim().slice(0, 160),
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = await db.guide.findUnique({
    where: { slug, publishedAt: { not: null } },
    include: { author: { include: { location: true } }, category: true, location: true },
  })

  if (!guide) notFound()

  const initials = guide.author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const bodyHtml = renderMarkdown(guide.body)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8 flex items-center gap-1 flex-wrap">
          <Link href={ROUTES.home} className="hover:text-gray-600 transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <Link href={ROUTES.guides} className="hover:text-gray-600 transition-colors">Guides</Link>
          <span aria-hidden>›</span>
          <span className="text-gray-600 truncate max-w-xs">{guide.title}</span>
        </nav>

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {guide.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
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
              {guide.author.name}
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
