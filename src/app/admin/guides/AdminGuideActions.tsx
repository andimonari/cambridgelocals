"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  guideSlug: string
  guideTitle: string
}

export default function AdminGuideActions({ guideSlug, guideTitle }: Props) {
  const router = useRouter()
  const [acting, setActing] = useState<"published" | "rejected" | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function act(status: "published" | "rejected") {
    setError(null)
    setActing(status)
    try {
      const res = await fetch(`/api/guides/${guideSlug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Something went wrong.")
        return
      }
      router.refresh()
    } catch {
      setError("Network error.")
    } finally {
      setActing(null)
    }
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      {error && <span className="text-xs text-red-600">{error}</span>}
      <button
        onClick={() => act("rejected")}
        disabled={acting !== null}
        className="px-4 py-1.5 rounded-full border border-line text-xs font-medium text-muted hover:bg-surface disabled:opacity-50 transition-colors duration-200"
        title={`Reject "${guideTitle}"`}
      >
        {acting === "rejected" ? "Rejecting…" : "Reject"}
      </button>
      <button
        onClick={() => act("published")}
        disabled={acting !== null}
        className="px-4 py-1.5 rounded-full bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200"
        title={`Publish "${guideTitle}"`}
      >
        {acting === "published" ? "Publishing…" : "Publish"}
      </button>
    </div>
  )
}
