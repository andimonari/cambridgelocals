import type { MetadataRoute } from "next"
import { getAllExpertSlugsForSitemap, getAllGuideSlugsForSitemap } from "@/lib/db"

export const dynamic = "force-dynamic"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, expertSlugs] = await Promise.all([
    getAllGuideSlugsForSitemap(),
    getAllExpertSlugsForSitemap(),
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
    ...expertSlugs.map((slug) => ({
      url: `${baseUrl}/experts/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}
