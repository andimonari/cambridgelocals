import { getCurrentUser } from "@/lib/session"
import { createGuide, getExpertByUserId } from "@/lib/db"
import type { GuideStatus } from "@/types/firestore"

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const expert = await getExpertByUserId(user.uid)
  if (!expert) {
    return Response.json({ error: "No expert profile found" }, { status: 403 })
  }

  const body = await request.json()
  const { title, categorySlug, locationSlug, body: guideBody, status } = body

  if (!title || !categorySlug || !guideBody) {
    return Response.json({ error: "title, categorySlug, and body are required" }, { status: 400 })
  }

  const requestedStatus: Extract<GuideStatus, "draft" | "submitted"> =
    status === "submitted" ? "submitted" : "draft"

  let guide
  try {
    guide = await createGuide({
      title,
      body: guideBody,
      categorySlug,
      locationSlug: locationSlug ?? null,
      status: requestedStatus,
      author: expert,
    })
  } catch {
    return Response.json({ error: "Unknown category or location" }, { status: 400 })
  }

  if (requestedStatus === "submitted") {
    console.log(`[guides] Guide submitted for review: "${guide.title}" (slug=${guide.slug}) by expert ${expert.name}`)
  }

  return Response.json(guide, { status: 201 })
}
