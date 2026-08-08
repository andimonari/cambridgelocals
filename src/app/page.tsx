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
    <div className="min-h-screen bg-white text-foreground">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden min-h-[540px] sm:min-h-[640px] flex items-center justify-center px-6 text-center">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/hero-river-cam.jpg"
              alt="Punting on the River Cam in Cambridge"
              fill
              className="object-cover"
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase mb-5">
              Local knowledge, shared openly
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.05]">
              Cambridge, explained by the local family
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-xl mx-auto mb-10 leading-relaxed">
              Andy, Teresa, and their three boys share what they know about
              Cambridge, England — for families moving to the area, students
              arriving at university, and tourists wanting to go beyond the postcard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-full bg-white text-foreground font-medium px-7 py-3.5 text-sm hover:bg-white/90 transition-colors duration-200"
              >
                Explore guides
              </Link>
              <a
                href="#share"
                className="inline-flex items-center justify-center rounded-full border border-white/40 text-white font-medium px-7 py-3.5 text-sm hover:bg-white/10 transition-colors duration-200"
              >
                Share your knowledge
              </a>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-6 py-6 border-b border-line-soft">
          <div className="max-w-[1120px] mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2"><span className="text-accent">✓</span> New students &amp; graduates</span>
            <span className="flex items-center gap-2"><span className="text-accent">✓</span> Tourists &amp; visitors</span>
            <span className="flex items-center gap-2"><span className="text-accent">✓</span> Professionals relocating</span>
            <span className="flex items-center gap-2"><span className="text-accent">✓</span> Families moving to the area</span>
          </div>
        </section>

        {/* Cambridge photo strip */}
        <section className="px-6 py-20 sm:py-28">
          <div className="max-w-[1120px] mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-10 text-center">Discover Cambridge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <Image
                  src="/images/cambridge-cobblestone.jpg"
                  alt="Historic cobblestone alley in Cambridge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white text-sm font-medium">Historic Lanes</span>
              </div>
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <Image
                  src="/images/cambridge-architecture.jpg"
                  alt="Historic university architecture in Cambridge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white text-sm font-medium">University Colleges</span>
              </div>
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <Image
                  src="/images/cambridge-river-evening.jpg"
                  alt="River Cam on a peaceful summer evening"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white text-sm font-medium">River Cam</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value propositions */}
        <section id="guides" className="px-6 py-20 sm:py-28 bg-surface">
          <div className="max-w-[1120px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
                Everything you need to know about Cambridge
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Not generic travel advice — real knowledge from people who live and work here.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-full border border-line text-foreground font-medium px-6 py-3 text-sm hover:bg-white transition-colors duration-200"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </section>

        {/* Expert preview */}
        <section id="experts" className="px-6 py-20 sm:py-28">
          <div className="max-w-[1120px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
                Meet the family
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Andy, Teresa, and their boys Alex, Max, and Leo — long-term Cambridge
                residents sharing their favorite spots and practical advice.
              </p>
            </div>
            {experts.length === 0 ? (
              <p className="text-center text-subtle">No experts yet — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {experts.map((expert) => {
                  const displayName = formatDisplayName(expert.name)
                  const initials = expert.name.trim().split(/\s+/)[0]?.[0]?.toUpperCase() ?? ""

                  return (
                    <Link
                      key={expert.slug}
                      href={ROUTES.expert(expert.slug)}
                      className="bg-white rounded-2xl border border-line-soft p-7 flex flex-col gap-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center text-sm shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{displayName}</p>
                          <p className="text-xs text-muted">{expert.role}</p>
                        </div>
                      </div>
                      {expert.guides.length > 0 ? (
                        <ul className="space-y-1.5">
                          {expert.guides.map((guide) => (
                            <li key={guide.slug} className="flex items-start gap-2 text-sm text-foreground/80">
                              <span className="text-accent mt-0.5 shrink-0">→</span>
                              {guide.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-subtle italic">No published guides yet.</p>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Dual CTA */}
        <section id="share" className="px-6 py-20 sm:py-28 bg-surface">
          <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-foreground p-10 text-white">
              <h3 className="text-2xl font-semibold tracking-tight mb-3">Explore Cambridge</h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Browse hundreds of guides, tips, and insider recommendations from local experts.
              </p>
              <Link
                href={ROUTES.guides}
                className="inline-flex items-center justify-center rounded-full bg-white text-foreground font-medium px-6 py-3 text-sm hover:bg-white/90 transition-colors duration-200"
              >
                Browse guides
              </Link>
            </div>
            <div className="rounded-3xl bg-white border border-line-soft p-10">
              <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-3">Share your knowledge</h3>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Know Cambridge well? Help newcomers and visitors by contributing guides on
                topics you know.
              </p>
              <Link
                href={ROUTES.signIn}
                className="inline-flex items-center justify-center rounded-full bg-accent text-white font-medium px-6 py-3 text-sm hover:bg-accent-hover transition-colors duration-200"
              >
                Become an expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line-soft px-6 py-8">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <span className="font-medium text-foreground">Cambridge Locals</span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <Link href={ROUTES.guides} className="hover:text-foreground transition-colors">Guides</Link>
            <a href="#experts" className="hover:text-foreground transition-colors">Experts</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </nav>
          <span className="text-xs text-subtle">© 2026 Cambridge Locals</span>
        </div>
      </footer>
    </div>
  )
}
