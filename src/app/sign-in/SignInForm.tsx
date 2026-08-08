"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth"
import { clientAuth } from "@/lib/firebase-client"

const EMAIL_STORAGE_KEY = "cambridgelocals:signInEmail"

type Props = {
  redirectTo: string
}

type Status = "idle" | "sending" | "sent" | "error"

export default function SignInForm({ redirectTo }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  // Derived at render time (not via setState-in-effect) — true only once
  // hydrated client-side on a URL that came from an emailed sign-in link.
  const isCompletingLink =
    typeof window !== "undefined" && isSignInWithEmailLink(clientAuth, window.location.href)

  // If we're on a sign-in-link callback URL, complete the sign-in.
  useEffect(() => {
    if (!isCompletingLink) return

    async function completeSignIn() {
      let storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY)
      if (!storedEmail) {
        storedEmail = window.prompt("Please confirm your email to finish signing in")
      }
      if (!storedEmail) {
        throw new Error("missing-email")
      }

      const credential = await signInWithEmailLink(clientAuth, storedEmail, window.location.href)
      window.localStorage.removeItem(EMAIL_STORAGE_KEY)
      const idToken = await credential.user.getIdToken()
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })
      if (!res.ok) throw new Error("session-failed")
    }

    completeSignIn()
      .then(() => {
        router.push(redirectTo)
        router.refresh()
      })
      .catch((err) => {
        setStatus("error")
        setError(
          err instanceof Error && err.message === "missing-email"
            ? "Email confirmation is required to finish signing in."
            : "This sign-in link is invalid or has expired. Please request a new one."
        )
      })
    // Only run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setStatus("sending")
    try {
      await sendSignInLinkToEmail(clientAuth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email)
      setStatus("sent")
    } catch {
      setStatus("error")
      setError("Could not send the sign-in link. Please try again.")
    }
  }

  if (isCompletingLink && status !== "error") {
    return <p className="text-sm text-gray-500 text-center">Signing you in…</p>
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        Check <strong>{email}</strong> for a sign-in link.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-indigo-600 text-white font-medium py-2.5 text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send sign-in link"}
      </button>
    </form>
  )
}
