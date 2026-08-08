"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"

type Category = { slug: string; name: string }
type Location = { slug: string; name: string }

type Props = {
  categories: Category[]
  locations: Location[]
}

export default function NewGuideForm({ categories, locations }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "")
  const [locationSlug, setLocationSlug] = useState("")
  const [body, setBody] = useState("")
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<"draft" | "submitted" | null>(null)

  async function handleSubmit(status: "draft" | "submitted") {
    setError(null)
    if (!title.trim()) { setError("Title is required."); return }
    if (!categorySlug) { setError("Please select a category."); return }
    if (!body.trim()) { setError("Guide body is required."); return }

    setSubmitting(status)
    try {
      const res = await fetch("/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          categorySlug,
          locationSlug: locationSlug || undefined,
          body: body.trim(),
          status,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Something went wrong.")
        return
      }
      router.push(ROUTES.dashboard)
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <div className="space-y-7">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. The Best Coffee Shops in Cambridge"
          className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1.5">
            Category
          </label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          >
            {categories.length === 0 && <option value="">No categories available</option>}
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1.5">
            Location <span className="text-subtle font-normal">(optional)</span>
          </label>
          <select
            id="location"
            value={locationSlug}
            onChange={(e) => setLocationSlug(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          >
            <option value="">Any / Cambridge-wide</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="body" className="block text-sm font-medium text-foreground">
            Content <span className="text-subtle font-normal">(Markdown)</span>
          </label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-xs text-accent hover:underline"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>

        {preview ? (
          <div className="min-h-48 w-full rounded-xl border border-line px-4 py-3 text-sm text-foreground/80 prose prose-sm max-w-none whitespace-pre-wrap">
            {body || <span className="text-subtle italic">Nothing to preview yet.</span>}
          </div>
        ) : (
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={16}
            placeholder="Write your guide in Markdown…"
            className="w-full rounded-xl border border-line px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-y"
          />
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => handleSubmit("draft")}
          disabled={submitting !== null}
          className="px-5 py-2.5 rounded-full border border-line text-sm font-medium text-foreground hover:bg-surface disabled:opacity-50 transition-colors duration-200"
        >
          {submitting === "draft" ? "Saving…" : "Save as draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit("submitted")}
          disabled={submitting !== null}
          className="px-5 py-2.5 rounded-full bg-accent text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200"
        >
          {submitting === "submitted" ? "Submitting…" : "Submit for review"}
        </button>
      </div>
    </div>
  )
}
