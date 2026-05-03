import { signIn } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"
import Link from "next/link"

export const metadata = {
  title: "Sign in — Cambridge Experts",
}

interface Props {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}

export default async function SignInPage({ searchParams }: Props) {
  const { callbackUrl, error } = await searchParams
  const redirectTo = callbackUrl ?? ROUTES.dashboard

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "No account found with that email.",
    EmailSignin: "Could not send the sign-in email. Try again.",
    Default: "Sign-in failed. Please try again.",
  }
  const errorMessage = error ? (errorMessages[error] ?? errorMessages.Default) : null

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center">
        <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
          Cambridge Experts
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to share your knowledge about Cambridge.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Magic link (Resend) */}
          <form
            action={async (formData: FormData) => {
              "use server"
              await signIn("resend", {
                email: formData.get("email-magic"),
                redirectTo,
              })
            }}
            className="space-y-3 mb-4"
          >
            <label htmlFor="email-magic" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email-magic"
              name="email-magic"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 text-white font-medium py-2.5 text-sm hover:bg-indigo-700 transition-colors"
            >
              Send magic link
            </button>
          </form>

          {/* Credentials (local dev only) */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                Local dev sign-in
              </summary>
              <form
                action={async (formData: FormData) => {
                  "use server"
                  await signIn("credentials", {
                    email: formData.get("email-creds"),
                    redirectTo,
                  })
                }}
                className="mt-3 space-y-3"
              >
                <input
                  name="email-creds"
                  type="email"
                  required
                  placeholder="Existing user email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg border border-gray-300 text-gray-700 font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  Sign in (dev)
                </button>
              </form>
            </details>
          )}
        </div>
      </main>
    </div>
  )
}
