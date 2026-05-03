"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  guideId: string
  guideTitle: string
}

export default function AdminGuideActions({ guideId, guideTitle }: Props) {
  const router = useRouter()
  const [acting, setActing] = useState<"published" | "rejected" | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function act(status: "published" | "rejected") {
    setError(null)
    setActing(status)
    try {
      const res = await fetch(`/api/guides/${guideId}`, {
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
    <div className="flex items-center gap-2">
      {error && <span className="text-xs text-red-600">{error}</span>}
      <button
        onClick={() => act("rejected")}
        disabled={acting !== null}
        className="px-3 py-1 rounded-lg border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        title={`Reject "${guideTitle}"`}
      >
        {acting === "rejected" ? "Rejecting…" : "Reject"}
      </button>
      <button
        onClick={() => act("published")}
        disabled={acting !== null}
        className="px-3 py-1 rounded-lg bg-green-600 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
        title={`Publish "${guideTitle}"`}
      >
        {acting === "published" ? "Publishing…" : "Publish"}
      </button>
    </div>
  )
}
