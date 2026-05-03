import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgeexperts.com"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const expert = await db.expert.findUnique({ where: { slug } })
  if (!expert) return {}
  const description = expert.bio ?? `${expert.name} shares local Cambridge insights.`
  const canonicalUrl = `${baseUrl}/experts/${slug}`
  return {
    title: expert.name,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "profile",
      title: expert.name,
      description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title: expert.name,
      description,
    },
  }
}

export default async function ExpertProfilePage({ params }: Props) {
  const { slug } = await params
  const expert = await db.expert.findUnique({
    where: { slug },
    include: {
      location: true,
      guides: {
        where: { publishedAt: { not: null } },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      },
    },
  })

  if (!expert) notFound()

  const initials = expert.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: expert.name,
    description: expert.bio ?? undefined,
    jobTitle: expert.role,
    url: `${baseUrl}/experts/${expert.slug}`,
    ...(expert.location ? { address: { "@type": "Place", name: `${expert.location.name}, Cambridge` } } : {}),
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
            Cambridge Experts
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm text-gray-500">
            <a href={`${ROUTES.home}#guides`} className="hover:text-gray-900 transition-colors">Guides</a>
            <a href={`${ROUTES.home}#experts`} className="hover:text-gray-900 transition-colors">Experts</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Profile header */}
        <div className="flex items-start gap-5 mb-10">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xl flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
            <p className="text-gray-500 mt-1">{expert.role}</p>
            {expert.location && (
              <p className="text-sm text-indigo-600 mt-1">{expert.location.name}, Cambridge</p>
            )}
          </div>
        </div>

        {expert.bio && (
          <p className="text-gray-600 leading-relaxed mb-10 border-l-2 border-indigo-100 pl-4">
            {expert.bio}
          </p>
        )}

        {/* Guides */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Guides</h2>
          {expert.guides.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center border border-dashed border-gray-200 rounded-lg">
              No published guides yet — check back soon.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {expert.guides.map((guide) => (
                <li key={guide.id} className="py-4">
                  <p className="text-xs text-indigo-600 font-medium mb-1">
                    {guide.category.name}
                  </p>
                  <Link
                    href={ROUTES.guide(guide.slug)}
                    className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {guide.title}
                  </Link>
                  {guide.publishedAt && (
                    <p className="text-xs text-gray-400 mt-1">
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
