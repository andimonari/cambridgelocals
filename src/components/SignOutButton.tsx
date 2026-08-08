"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { clientAuth } from "@/lib/firebase-client"
import { ROUTES } from "@/lib/routes"

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await signOut(clientAuth)
    } catch {
      // Fall through — clearing the server session cookie still logs the user out.
    }
    await fetch("/api/auth/session", { method: "DELETE" })
    router.push(ROUTES.home)
    router.refresh()
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={signingOut} className={className}>
      {signingOut ? "Signing out…" : "Sign out"}
    </button>
  )
}
