import type { MetadataRoute } from "next"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, experts] = await Promise.all([
    db.guide.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, publishedAt: true },
    }),
    db.expert.findMany({
      select: { slug: true },
    }),
  ])

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: guide.publishedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...experts.map((expert) => ({
      url: `${baseUrl}/experts/${expert.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}
