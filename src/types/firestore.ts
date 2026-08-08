export type GuideStatus = "draft" | "submitted" | "published" | "rejected"

export interface CategorySummary {
  slug: string
  name: string
}

export interface LocationSummary {
  slug: string
  name: string
}

export interface Expert {
  slug: string
  name: string
  bio: string | null
  role: string
  avatar: string | null
  locationSlug: string | null
  locationName: string | null
  /** Firebase Auth uid, once this expert has signed in at least once. */
  userId: string | null
  createdAt: Date
}

/**
 * Guide documents denormalize author/category/location display fields at
 * write time (Firestore has no joins). There's no edit flow for guides
 * today, so these can't drift out of sync with the source records — if
 * that changes, renaming a category/location/expert will need to
 * back-fill affected guides.
 */
export interface Guide {
  slug: string
  title: string
  body: string
  status: GuideStatus
  authorSlug: string
  authorName: string
  authorRole: string
  categorySlug: string
  categoryName: string
  locationSlug: string | null
  locationName: string | null
  publishedAt: Date | null
  createdAt: Date
}

export interface Review {
  id: string
  rating: number
  body: string
  authorName: string
  guideSlug: string | null
  expertSlug: string | null
  createdAt: Date
}
