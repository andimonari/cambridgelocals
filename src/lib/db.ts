import { Timestamp, type DocumentSnapshot } from "firebase-admin/firestore"
import { adminAuth, adminDb } from "@/lib/firebase-admin"
import { toSlug } from "@/lib/slug"
import type { CategorySummary, Expert, Guide, GuideStatus, LocationSummary, Review } from "@/types/firestore"

const expertsCol = () => adminDb.collection("experts")
const guidesCol = () => adminDb.collection("guides")
const categoriesCol = () => adminDb.collection("categories")
const locationsCol = () => adminDb.collection("locations")
const reviewsCol = () => adminDb.collection("reviews")

function toDate(value: unknown): Date | null {
  if (!value) return null
  if (value instanceof Timestamp) return value.toDate()
  if (value instanceof Date) return value
  return null
}

function mapExpert(doc: DocumentSnapshot): Expert {
  const data = doc.data()!
  return {
    slug: doc.id,
    name: data.name,
    bio: data.bio ?? null,
    role: data.role,
    avatar: data.avatar ?? null,
    locationSlug: data.locationSlug ?? null,
    locationName: data.locationName ?? null,
    userId: data.userId ?? null,
    createdAt: toDate(data.createdAt) ?? new Date(),
  }
}

function mapGuide(doc: DocumentSnapshot): Guide {
  const data = doc.data()!
  return {
    slug: doc.id,
    title: data.title,
    body: data.body,
    status: data.status,
    authorSlug: data.authorSlug,
    authorName: data.authorName,
    authorRole: data.authorRole,
    categorySlug: data.categorySlug,
    categoryName: data.categoryName,
    locationSlug: data.locationSlug ?? null,
    locationName: data.locationName ?? null,
    publishedAt: toDate(data.publishedAt),
    createdAt: toDate(data.createdAt) ?? new Date(),
  }
}

function mapReview(doc: DocumentSnapshot): Review {
  const data = doc.data()!
  return {
    id: doc.id,
    rating: data.rating,
    body: data.body,
    authorName: data.authorName,
    guideSlug: data.guideSlug ?? null,
    expertSlug: data.expertSlug ?? null,
    createdAt: toDate(data.createdAt) ?? new Date(),
  }
}

// ── Categories & locations ────────────────────────────────────────────────

export async function getCategories(): Promise<CategorySummary[]> {
  const snap = await categoriesCol().orderBy("name", "asc").get()
  return snap.docs.map((d) => ({ slug: d.id, name: d.data().name }))
}

export async function getLocations(): Promise<LocationSummary[]> {
  const snap = await locationsCol().orderBy("name", "asc").get()
  return snap.docs.map((d) => ({ slug: d.id, name: d.data().name }))
}

// ── Experts ──────────────────────────────────────────────────────────────

export async function getExpertBySlug(slug: string): Promise<Expert | null> {
  const doc = await expertsCol().doc(slug).get()
  return doc.exists ? mapExpert(doc) : null
}

export async function getExpertByUserId(userId: string): Promise<Expert | null> {
  const snap = await expertsCol().where("userId", "==", userId).limit(1).get()
  return snap.empty ? null : mapExpert(snap.docs[0])
}

export async function getFeaturedExperts(limit: number): Promise<Expert[]> {
  const snap = await expertsCol().orderBy("createdAt", "asc").limit(limit).get()
  return snap.docs.map(mapExpert)
}

/** The signed-in expert's email, looked up via Firebase Auth (Firestore doesn't store it). */
export async function getExpertEmail(expertSlug: string): Promise<string | null> {
  const expert = await getExpertBySlug(expertSlug)
  if (!expert?.userId) return null
  try {
    const user = await adminAuth.getUser(expert.userId)
    return user.email ?? null
  } catch {
    return null
  }
}

/**
 * Ensures a signed-in Firebase user has an Expert profile, creating one on
 * first sign-in. Mirrors the old NextAuth `createUser` event.
 */
export async function ensureExpertForUser(userId: string, displayName: string | null, email: string | null): Promise<Expert> {
  const existing = await getExpertByUserId(userId)
  if (existing) return existing

  const name = displayName ?? email?.split("@")[0] ?? "New Expert"
  const baseSlug = toSlug(name)
  let slug = baseSlug
  let suffix = 1
  while ((await expertsCol().doc(slug).get()).exists) {
    slug = `${baseSlug}-${suffix++}`
  }

  const createdAt = new Date()
  await expertsCol().doc(slug).set({
    name,
    role: "Local Expert",
    userId,
    createdAt,
  })

  return {
    slug,
    name,
    bio: null,
    role: "Local Expert",
    avatar: null,
    locationSlug: null,
    locationName: null,
    userId,
    createdAt,
  }
}

// ── Guides ───────────────────────────────────────────────────────────────

export async function getPublishedGuides(filter: { categorySlug?: string; locationSlug?: string } = {}): Promise<Guide[]> {
  const snap = await guidesCol().where("status", "==", "published").get()
  let list = snap.docs.map(mapGuide)
  if (filter.categorySlug) list = list.filter((g) => g.categorySlug === filter.categorySlug)
  if (filter.locationSlug) list = list.filter((g) => g.locationSlug === filter.locationSlug)
  return list.sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
}

export async function getGuideBySlug(slug: string, opts: { publishedOnly?: boolean } = {}): Promise<Guide | null> {
  const doc = await guidesCol().doc(slug).get()
  if (!doc.exists) return null
  const guide = mapGuide(doc)
  if (opts.publishedOnly && guide.status !== "published") return null
  return guide
}

export async function getGuidesByAuthor(authorSlug: string): Promise<Guide[]> {
  const snap = await guidesCol().where("authorSlug", "==", authorSlug).get()
  return snap.docs.map(mapGuide).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getPublishedGuidesByAuthor(authorSlug: string, limit?: number): Promise<Guide[]> {
  const snap = await guidesCol().where("authorSlug", "==", authorSlug).where("status", "==", "published").get()
  const list = snap.docs.map(mapGuide).sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
  return typeof limit === "number" ? list.slice(0, limit) : list
}

export async function getSubmittedGuides(): Promise<Guide[]> {
  const snap = await guidesCol().where("status", "==", "submitted").get()
  return snap.docs.map(mapGuide).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export async function getAllGuideSlugsForSitemap(): Promise<{ slug: string; publishedAt: Date | null }[]> {
  const snap = await guidesCol().where("status", "==", "published").get()
  return snap.docs.map((d) => ({ slug: d.id, publishedAt: toDate(d.data().publishedAt) }))
}

export async function getAllExpertSlugsForSitemap(): Promise<string[]> {
  const snap = await expertsCol().get()
  return snap.docs.map((d) => d.id)
}

type CreateGuideInput = {
  title: string
  body: string
  categorySlug: string
  locationSlug?: string | null
  status: Extract<GuideStatus, "draft" | "submitted">
  author: Expert
}

export async function createGuide(input: CreateGuideInput): Promise<Guide> {
  const categoryDoc = await categoriesCol().doc(input.categorySlug).get()
  if (!categoryDoc.exists) throw new Error("Unknown category")

  const locationDoc = input.locationSlug ? await locationsCol().doc(input.locationSlug).get() : null

  const baseSlug = toSlug(input.title)
  let slug = baseSlug
  let suffix = 1
  while ((await guidesCol().doc(slug).get()).exists) {
    slug = `${baseSlug}-${suffix++}`
  }

  const createdAt = new Date()
  const data = {
    title: input.title,
    body: input.body,
    status: input.status,
    authorSlug: input.author.slug,
    authorName: input.author.name,
    authorRole: input.author.role,
    categorySlug: input.categorySlug,
    categoryName: categoryDoc.data()!.name,
    locationSlug: input.locationSlug ?? null,
    locationName: locationDoc?.exists ? locationDoc.data()!.name : null,
    publishedAt: null,
    createdAt,
  }
  await guidesCol().doc(slug).set(data)
  return { ...data, slug, publishedAt: null }
}

export async function updateGuideStatus(
  slug: string,
  status: Extract<GuideStatus, "submitted" | "published" | "rejected">
): Promise<Guide> {
  const updates: Record<string, unknown> = { status }
  if (status === "published") updates.publishedAt = new Date()
  if (status === "rejected") updates.publishedAt = null

  await guidesCol().doc(slug).update(updates)
  const updated = await getGuideBySlug(slug)
  if (!updated) throw new Error("Guide not found after update")
  return updated
}

// ── Reviews ──────────────────────────────────────────────────────────────

export async function getReviewsForGuide(guideSlug: string): Promise<Review[]> {
  const snap = await reviewsCol().where("guideSlug", "==", guideSlug).get()
  return snap.docs.map(mapReview).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getReviewsForExpert(expertSlug: string): Promise<Review[]> {
  const snap = await reviewsCol().where("expertSlug", "==", expertSlug).get()
  return snap.docs.map(mapReview).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function createReviewForGuide(
  guideSlug: string,
  input: { authorName: string; rating: number; body: string }
): Promise<Review> {
  const createdAt = new Date()
  const ref = await reviewsCol().add({
    ...input,
    guideSlug,
    expertSlug: null,
    createdAt,
  })
  return { id: ref.id, ...input, guideSlug, expertSlug: null, createdAt }
}
