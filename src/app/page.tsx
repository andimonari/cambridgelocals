import Link from "next/link"
import { db } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"

const valueProps = [
  {
    title: "Neighbourhood Guides",
    description:
      "In-depth looks at every area of Cambridge — from the Backs to Romsey. Find out where to live, eat, and explore based on your needs.",
    icon: "🗺️",
  },
  {
    title: "Local Tips & Secrets",
    description:
      "Skip the tourist traps. Discover hidden gems, the best punting spots, quiet cafés, and shortcuts only locals know about.",
    icon: "💡",
  },
  {
    title: "Professional Advice",
    description:
      "Relocating for a job in the tech cluster or biotech corridor? Get insider knowledge on commutes, networking, and settling in fast.",
    icon: "💼",
  },
  {
    title: "Student Life Insights",
    description:
      "From Freshers' Week to Finals, Cambridge students share what they wish they'd known — accommodation, libraries, sports, and social life.",
    icon: "🎓",
  },
]

export default async function HomePage() {
  const experts = await db.expert.findMany({
    take: 3,
    orderBy: { createdAt: "asc" },
    include: {
      guides: {
        where: { publishedAt: { not: null } },
        orderBy: { publishedAt: "desc" },
        take: 3,
        include: { category: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-4">
              Local knowledge, shared openly
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Cambridge, explained by people who live here
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Local experts share what they know about Cambridge, England — for
              students arriving at university, tourists wanting to go beyond the
              postcard, and professionals relocating to the city.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium px-6 py-3 hover:bg-indigo-700 transition-colors"
              >
                Explore guides
              </Link>
              <a
                href="#share"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 font-medium px-6 py-3 hover:bg-gray-50 transition-colors"
              >
                Share your knowledge
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-2"><span className="text-indigo-500">✓</span> New students &amp; graduates</span>
            <span className="flex items-center gap-2"><span className="text-indigo-500">✓</span> Tourists &amp; visitors</span>
            <span className="flex items-center gap-2"><span className="text-indigo-500">✓</span> Professionals relocating</span>
            <span className="flex items-center gap-2"><span className="text-indigo-500">✓</span> Families moving to the area</span>
          </div>
        </section>

        {/* Value propositions */}
        <section id="guides" className="px-4 sm:px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Everything you need to know about Cambridge
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Not generic travel advice — real knowledge from people who live and work here.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg border border-indigo-200 text-indigo-600 font-medium px-5 py-2.5 text-sm hover:bg-indigo-50 transition-colors"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </section>

        {/* Expert preview */}
        <section id="experts" className="bg-slate-50 px-4 sm:px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Meet the experts
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Real Cambridge residents — academics, tech workers, and students — sharing
                what they know.
              </p>
            </div>
            {experts.length === 0 ? (
              <p className="text-center text-gray-400">No experts yet — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experts.map((expert) => {
                  const initials = expert.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)

                  return (
                    <Link
                      key={expert.id}
                      href={ROUTES.expert(expert.slug)}
                      className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 hover:border-indigo-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-sm shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{expert.name}</p>
                          <p className="text-xs text-gray-500">{expert.role}</p>
                        </div>
                      </div>
                      {expert.guides.length > 0 ? (
                        <ul className="space-y-1.5">
                          {expert.guides.map((guide) => (
                            <li key={guide.id} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                              {guide.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No published guides yet.</p>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Dual CTA */}
        <section id="share" className="px-4 sm:px-6 py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-indigo-600 p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Explore Cambridge</h3>
              <p className="text-indigo-100 text-sm mb-6">
                Browse hundreds of guides, tips, and insider recommendations from local experts.
              </p>
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg bg-white text-indigo-700 font-medium px-5 py-2.5 text-sm hover:bg-indigo-50 transition-colors"
              >
                Browse guides
              </Link>
            </div>
            <div className="rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Share your knowledge</h3>
              <p className="text-gray-500 text-sm mb-6">
                Know Cambridge well? Help newcomers and visitors by contributing guides on
                topics you know.
              </p>
              <Link
                href={ROUTES.signIn}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white font-medium px-5 py-2.5 text-sm hover:bg-gray-700 transition-colors"
              >
                Become an expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span className="font-medium text-gray-700">Cambridge Experts</span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <Link href={ROUTES.guides} className="hover:text-gray-900 transition-colors">Guides</Link>
            <a href="#experts" className="hover:text-gray-900 transition-colors">Experts</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          </nav>
          <span className="text-xs text-gray-400">© 2026 Cambridge Experts</span>
        </div>
      </footer>
    </div>
  )
}
