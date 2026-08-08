import Link from "next/link"
import Image from "next/image"
import { getFeaturedExperts, getPublishedGuidesByAuthor } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { SiteNav } from "@/components/SiteNav"
import { formatDisplayName } from "@/lib/display-name"

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
  const featuredExperts = await getFeaturedExperts(3)
  const experts = await Promise.all(
    featuredExperts.map(async (expert) => ({
      ...expert,
      guides: await getPublishedGuidesByAuthor(expert.slug, 3),
    }))
  )

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-900">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-800 px-4 sm:px-6 pt-10 pb-12 text-center h-[320px] flex items-center">
          <Image
            src="/images/hero-river-cam.jpg"
            alt="Punting on the River Cam in Cambridge"
            fill
            className="object-cover"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-slate-800/40" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl mx-auto w-full">
            <p className="text-sm font-semibold tracking-widest text-sky-300 uppercase mb-3">
              Local knowledge, shared openly
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Cambridge, explained by the local family
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-5">
              Andy, Teresa, and their three boys share what they know about
              Cambridge, England — for families moving to the area, students
              arriving at university, and tourists wanting to go beyond the postcard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg bg-sky-700 text-white font-medium px-6 py-3 hover:bg-sky-800 transition-colors"
              >
                Explore guides
              </Link>
              <a
                href="#share"
                className="inline-flex items-center justify-center rounded-lg border border-white/40 text-white font-medium px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Share your knowledge
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-4 sm:px-6 py-4 border-b border-stone-200">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-stone-500">
            <span className="flex items-center gap-2"><span className="text-sky-600">✓</span> New students &amp; graduates</span>
            <span className="flex items-center gap-2"><span className="text-sky-600">✓</span> Tourists &amp; visitors</span>
            <span className="flex items-center gap-2"><span className="text-sky-600">✓</span> Professionals relocating</span>
            <span className="flex items-center gap-2"><span className="text-sky-600">✓</span> Families moving to the area</span>
          </div>
        </section>

        {/* Cambridge photo strip */}
        <section className="px-4 sm:px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4 text-center">Discover Cambridge</h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/cambridge-cobblestone.jpg"
                  alt="Historic cobblestone alley in Cambridge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-xs font-medium">Historic Lanes</span>
              </div>
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/cambridge-architecture.jpg"
                  alt="Historic university architecture in Cambridge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-xs font-medium">University Colleges</span>
              </div>
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/cambridge-river-evening.jpg"
                  alt="River Cam on a peaceful summer evening"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-white text-xs font-medium">River Cam</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value propositions */}
        <section id="guides" className="px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                Everything you need to know about Cambridge
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto">
                Not generic travel advice — real knowledge from people who live and work here.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-stone-200 p-6 hover:border-sky-200 hover:shadow-sm transition-all"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg border border-sky-200 text-sky-700 font-medium px-5 py-2.5 text-sm hover:bg-sky-50 transition-colors"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </section>

        {/* Expert preview */}
        <section id="experts" className="bg-amber-50/50 px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                Meet the family
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto">
                Andy, Teresa, and their boys Alex, Max, and Leo — long-term Cambridge
                residents sharing their favorite spots and practical advice.
              </p>
            </div>
            {experts.length === 0 ? (
              <p className="text-center text-stone-400">No experts yet — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experts.map((expert) => {
                  const displayName = formatDisplayName(expert.name)
                  const initials = expert.name.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""

                  return (
                    <Link
                      key={expert.slug}
                      href={ROUTES.expert(expert.slug)}
                      className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col gap-4 hover:border-sky-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-semibold flex items-center justify-center text-sm shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900 text-sm">{displayName}</p>
                          <p className="text-xs text-stone-500">{expert.role}</p>
                        </div>
                      </div>
                      {expert.guides.length > 0 ? (
                        <ul className="space-y-1.5">
                          {expert.guides.map((guide) => (
                            <li key={guide.slug} className="flex items-start gap-2 text-sm text-stone-600">
                              <span className="text-sky-500 mt-0.5 shrink-0">→</span>
                              {guide.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-400 italic">No published guides yet.</p>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Dual CTA */}
        <section id="share" className="px-4 sm:px-6 py-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-sky-700 p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Explore Cambridge</h3>
              <p className="text-sky-100 text-sm mb-6">
                Browse hundreds of guides, tips, and insider recommendations from local experts.
              </p>
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-lg bg-white text-sky-800 font-medium px-5 py-2.5 text-sm hover:bg-sky-50 transition-colors"
              >
                Browse guides
              </Link>
            </div>
            <div className="rounded-xl border border-stone-200 p-8">
              <h3 className="text-xl font-bold text-stone-900 mb-2">Share your knowledge</h3>
              <p className="text-stone-500 text-sm mb-6">
                Know Cambridge well? Help newcomers and visitors by contributing guides on
                topics you know.
              </p>
              <Link
                href={ROUTES.signIn}
                className="inline-flex items-center justify-center rounded-lg bg-stone-900 text-white font-medium px-5 py-2.5 text-sm hover:bg-stone-700 transition-colors"
              >
                Become an expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-4 sm:px-6 py-6 bg-amber-50/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <span className="font-medium text-stone-700">Cambridge Locals</span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-stone-900 transition-colors">About</a>
            <Link href={ROUTES.guides} className="hover:text-stone-900 transition-colors">Guides</Link>
            <a href="#experts" className="hover:text-stone-900 transition-colors">Experts</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
          </nav>
          <span className="text-xs text-stone-400">© 2026 Cambridge Locals</span>
        </div>
      </footer>
    </div>
  )
}
