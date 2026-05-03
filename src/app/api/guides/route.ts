import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GuideStatus } from "@/generated/prisma/client"

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const expert = await db.expert.findFirst({
    where: { userId: session.user.id },
  })
  if (!expert) {
    return Response.json({ error: "No expert profile found" }, { status: 403 })
  }

  const body = await request.json()
  const { title, categoryId, locationId, body: guideBody, status } = body

  if (!title || !categoryId || !guideBody) {
    return Response.json({ error: "title, categoryId, and body are required" }, { status: 400 })
  }

  const requestedStatus: GuideStatus =
    status === "submitted" ? GuideStatus.submitted : GuideStatus.draft

  const baseSlug = toSlug(title)
  let slug = baseSlug
  let suffix = 1
  while (await db.guide.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`
  }

  const guide = await db.guide.create({
    data: {
      title,
      slug,
      body: guideBody,
      status: requestedStatus,
      authorId: expert.id,
      categoryId,
      locationId: locationId ?? null,
    },
    include: { category: true, location: true },
  })

  if (requestedStatus === GuideStatus.submitted) {
    console.log(`[guides] Guide submitted for review: "${guide.title}" (id=${guide.id}) by expert ${expert.name}`)
  }

  return Response.json(guide, { status: 201 })
}
