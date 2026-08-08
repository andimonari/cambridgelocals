import { db } from "@/lib/db"
import { GuideStatus } from "@/generated/prisma/client"

function isValidRating(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const guide = await db.guide.findUnique({ where: { id } })
  if (!guide || guide.status !== GuideStatus.published) {
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

  const review = await db.review.create({
    data: { authorName, body: reviewBody, rating, guideId: guide.id },
  })

  return Response.json(review, { status: 201 })
}
