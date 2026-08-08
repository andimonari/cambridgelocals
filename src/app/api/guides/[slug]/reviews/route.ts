import { createReviewForGuide, getGuideBySlug } from "@/lib/db"

function isValidRating(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const guide = await getGuideBySlug(slug, { publishedOnly: true })
  if (!guide) {
    return Response.json({ error: "Guide not found" }, { status: 404 })
  }

  const body = await request.json()
  const authorName = typeof body.authorName === "string" ? body.authorName.trim() : ""
  const reviewBody = typeof body.body === "string" ? body.body.trim() : ""
  const rating = body.rating

  if (!authorName || authorName.length > 80) {
    return Response.json({ error: "Name is required (max 80 characters)." }, { status: 400 })
  }
  if (!reviewBody || reviewBody.length > 2000) {
    return Response.json({ error: "Review is required (max 2000 characters)." }, { status: 400 })
  }
  if (!isValidRating(rating)) {
    return Response.json({ error: "Rating must be a whole number from 1 to 5." }, { status: 400 })
  }

  const review = await createReviewForGuide(guide.slug, { authorName, rating, body: reviewBody })

  return Response.json(review, { status: 201 })
}
