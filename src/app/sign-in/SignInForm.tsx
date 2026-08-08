"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  fetchSignInMethodsForEmail,
  getRedirectResult,
  isSignInWithEmailLink,
  linkWithCredential,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signInWithRedirect,
  type User,
} from "firebase/auth"
import { clientAuth, googleProvider } from "@/lib/firebase-client"
import { GoogleIcon } from "./GoogleIcon"

const EMAIL_STORAGE_KEY = "cambridgelocals:signInEmail"
// Set only when a Google sign-in collides with an existing email-link
// account (auth/account-exists-with-different-credential) — carries the
// pending Google credential across the redirect-to-inbox-and-back trip so
// it can be linked once the user completes the email-link sign-in.
const PENDING_GOOGLE_CRED_KEY = "cambridgelocals:pendingGoogleCredential"

type Props = {
  redirectTo: string
}

type Status = "idle" | "sending" | "sent" | "google" | "error"

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

async function exchangeForSession(user: User): Promise<void> {
  const idToken = await user.getIdToken()
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  })
  if (!res.ok) throw new Error("session-failed")
}

export default function SignInForm({ redirectTo }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

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

      // If this email-link sign-in was triggered to resolve a Google
      // account conflict, link the pending Google credential now.
      const pendingGoogleCredJson = window.localStorage.getItem(PENDING_GOOGLE_CRED_KEY)
      if (pendingGoogleCredJson) {
        window.localStorage.removeItem(PENDING_GOOGLE_CRED_KEY)
        try {
          const googleCredential = OAuthCredential.fromJSON(pendingGoogleCredJson)
          if (googleCredential) {
            await linkWithCredential(credential.user, googleCredential)
          }
        } catch {
          // Best-effort — the user is still signed in via email link even if
          // linking failed (e.g. the credential expired in the meantime).
        }
      }

      await exchangeForSession(credential.user)
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

  // Picks up the result of signInWithRedirect (mobile Google sign-in) when
  // the browser navigates back to this page. A no-op on any other load.
  useEffect(() => {
    getRedirectResult(clientAuth)
      .then(async (result) => {
        if (!result) return
        await exchangeForSession(result.user)
        router.push(redirectTo)
        router.refresh()
      })
      .catch((err) => {
        handleGoogleError(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGoogleError(err: unknown) {
    const code = (err as { code?: string } | null)?.code

    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      setStatus("idle")
      return
    }

    if (code === "auth/popup-blocked") {
      try {
        await signInWithRedirect(clientAuth, googleProvider)
      } catch {
        setStatus("error")
        setError("Your browser blocked the Google sign-in popup. Please allow popups and try again.")
      }
      return
    }

    if (code === "auth/account-exists-with-different-credential") {
      await handleAccountExists(err)
      return
    }

    setStatus("error")
    setError("Could not sign in with Google. Please try again.")
  }

  async function handleAccountExists(err: unknown) {
    const pendingCredential = GoogleAuthProvider.credentialFromError(
      err as Parameters<typeof GoogleAuthProvider.credentialFromError>[0]
    )
    const existingEmail = (err as { customData?: { email?: string } } | null)?.customData?.email

    if (!pendingCredential || !existingEmail) {
      setStatus("error")
      setError("An account already exists with this email using a different sign-in method.")
      return
    }

    const methods = await fetchSignInMethodsForEmail(clientAuth, existingEmail)
    if (!methods.includes(EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD)) {
      setStatus("error")
      setError("An account already exists with this email using a different sign-in method.")
      return
    }

    window.localStorage.setItem(EMAIL_STORAGE_KEY, existingEmail)
    window.localStorage.setItem(PENDING_GOOGLE_CRED_KEY, JSON.stringify(pendingCredential.toJSON()))
    await sendSignInLinkToEmail(clientAuth, existingEmail, {
      url: window.location.href,
      handleCodeInApp: true,
    })
    setEmail(existingEmail)
    setNotice(
      `You already have an account with ${existingEmail} via email sign-in. We've sent a fresh sign-in link — click it to finish linking your Google account.`
    )
    setStatus("sent")
  }

  async function handleGoogleSignIn() {
    setError(null)
    setNotice(null)
    setStatus("google")
    try {
      if (isMobileDevice()) {
        await signInWithRedirect(clientAuth, googleProvider)
        return
      }
      const result = await signInWithPopup(clientAuth, googleProvider)
      await exchangeForSession(result.user)
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      await handleGoogleError(err)
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
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
    return <p className="text-sm text-muted text-center">Signing you in…</p>
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-foreground/80 bg-surface border border-line-soft rounded-2xl px-4 py-3.5 leading-relaxed">
        {notice ?? (
          <>
            Check <strong>{email}</strong> for a sign-in link.
          </>
        )}
      </p>
    )
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={status === "google"}
        className="w-full flex items-center justify-center gap-3 rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-[#3c4043] shadow-sm transition-all duration-200 hover:shadow-md hover:bg-black/[0.02] disabled:opacity-50"
      >
        <GoogleIcon className="w-[18px] h-[18px] shrink-0" />
        {status === "google" ? "Connecting…" : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-line-soft" aria-hidden="true" />
        <span className="text-xs uppercase tracking-wider text-subtle">or</span>
        <div className="h-px flex-1 bg-line-soft" aria-hidden="true" />
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-3">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-line px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={status === "sending" || status === "google"}
          className="w-full rounded-full bg-accent text-white font-medium py-3 text-sm transition-colors duration-200 hover:bg-accent-hover disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send sign-in link"}
        </button>
      </form>
    </div>
  )
}
