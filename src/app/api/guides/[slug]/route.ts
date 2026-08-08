import { getCurrentUser } from "@/lib/session"
import { getExpertByUserId, getExpertEmail, getGuideBySlug, updateGuideStatus } from "@/lib/db"
import { ROUTES } from "@/lib/routes"
import { sendGuideStatusEmail } from "@/lib/mailer"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await params

  const guide = await getGuideBySlug(slug)
  if (!guide) {
    return Response.json({ error: "Guide not found" }, { status: 404 })
  }

  const expert = await getExpertByUserId(user.uid)
  if (!expert) {
    return Response.json({ error: "No expert profile found" }, { status: 403 })
  }

  const body = await request.json()
  const { status } = body

  const isAdmin = expert.role === "admin"
  const isAuthor = guide.authorSlug === expert.slug

  // Authors may only submit their own draft guides
  if (!isAdmin) {
    if (!isAuthor) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }
    if (status !== "submitted") {
      return Response.json({ error: "Authors may only submit guides for review" }, { status: 400 })
    }
    if (guide.status !== "draft" && guide.status !== "rejected") {
      return Response.json({ error: "Only draft or rejected guides can be submitted" }, { status: 400 })
    }

    const updated = await updateGuideStatus(slug, "submitted")
    console.log(`[guides] Guide submitted for review: "${updated.title}" (slug=${updated.slug}) by expert ${expert.name}`)
    return Response.json(updated)
  }

  // Admins may publish or reject submitted guides
  if (status === "published" || status === "rejected") {
    const updated = await updateGuideStatus(slug, status)
    console.log(`[guides] Guide ${status}: "${updated.title}" (slug=${updated.slug}) by admin ${expert.name}`)

    const authorEmail = await getExpertEmail(updated.authorSlug)
    if (authorEmail) {
      await sendGuideStatusEmail({
        to: authorEmail,
        guideTitle: updated.title,
        guideUrl: `${baseUrl}${ROUTES.guide(updated.slug)}`,
        status,
      })
    }
    return Response.json(updated)
  }

  return Response.json({ error: "Invalid status transition" }, { status: 400 })
}
