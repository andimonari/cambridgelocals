"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  guideSlug: string
}

export default function ReviewForm({ guideSlug }: Props) {
  const router = useRouter()
  const [authorName, setAuthorName] = useState("")
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setDone(false)
    if (!authorName.trim()) { setError("Please enter your name."); return }
    if (!body.trim()) { setError("Please write a review."); return }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/guides/${guideSlug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName: authorName.trim(), rating, body: body.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Something went wrong.")
        return
      }
      setAuthorName("")
      setBody("")
      setRating(5)
      setDone(true)
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-foreground text-sm">Leave a review</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-foreground mb-1.5">
            Your name
          </label>
          <input
            id="review-name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={80}
            placeholder="e.g. Jo from Mill Road"
            className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-rating" className="block text-sm font-medium text-foreground mb-1.5">
            Rating
          </label>
          <select
            id="review-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)}
                {"☆".repeat(5 - n)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="review-body" className="block text-sm font-medium text-foreground mb-1.5">
          Your review
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="What did you think?"
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-y"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
          {error}
        </p>
      )}
      {done && !error && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
          Thanks for your review!
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 rounded-full bg-accent text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200"
      >
        {submitting ? "Submitting…" : "Submit review"}
      </button>
    </form>
  )
}
