import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GuideStatus } from "@/generated/prisma/client"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const guide = await db.guide.findUnique({
    where: { id },
    include: { author: true },
  })
  if (!guide) {
    return Response.json({ error: "Guide not found" }, { status: 404 })
  }

  const expert = await db.expert.findFirst({
    where: { userId: session.user.id },
  })
  if (!expert) {
    return Response.json({ error: "No expert profile found" }, { status: 403 })
  }

  const body = await request.json()
  const { status } = body

  const isAdmin = expert.role === "admin"
  const isAuthor = guide.authorId === expert.id

  // Authors may only submit their own draft guides
  if (!isAdmin) {
    if (!isAuthor) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }
    if (status !== "submitted") {
      return Response.json({ error: "Authors may only submit guides for review" }, { status: 400 })
    }
    if (guide.status !== GuideStatus.draft && guide.status !== GuideStatus.rejected) {
      return Response.json({ error: "Only draft or rejected guides can be submitted" }, { status: 400 })
    }

    const updated = await db.guide.update({
      where: { id },
      data: { status: GuideStatus.submitted },
    })
    console.log(`[guides] Guide submitted for review: "${updated.title}" (id=${updated.id}) by expert ${expert.name}`)
    return Response.json(updated)
  }

  // Admins may publish or reject submitted guides
  if (status === "published") {
    const updated = await db.guide.update({
      where: { id },
      data: { status: GuideStatus.published, publishedAt: new Date() },
    })
    console.log(`[guides] Guide published: "${updated.title}" (id=${updated.id}) by admin ${expert.name}`)
    return Response.json(updated)
  }

  if (status === "rejected") {
    const updated = await db.guide.update({
      where: { id },
      data: { status: GuideStatus.rejected, publishedAt: null },
    })
    console.log(`[guides] Guide rejected: "${updated.title}" (id=${updated.id}) by admin ${expert.name}`)
    return Response.json(updated)
  }

  return Response.json({ error: "Invalid status transition" }, { status: 400 })
}
