"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  guideId: string
}

export default function ReviewForm({ guideId }: Props) {
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
      const res = await fetch(`/api/guides/${guideId}/reviews`, {
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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-gray-900 text-sm">Leave a review</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-1">
            Your name
          </label>
          <input
            id="review-name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={80}
            placeholder="e.g. Jo from Mill Road"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="review-rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="review-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <label htmlFor="review-body" className="block text-sm font-medium text-gray-700 mb-1">
          Your review
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="What did you think?"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {done && !error && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Thanks for your review!
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {submitting ? "Submitting…" : "Submit review"}
      </button>
    </form>
  )
}
