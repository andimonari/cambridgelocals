import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import SignInForm from "./SignInForm"

export const metadata = {
  title: "Sign in — Cambridge Locals",
}

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams
  const redirectTo = callbackUrl ?? ROUTES.dashboard

  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col">
      <header className="border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center">
        <Link href={ROUTES.home} className="font-semibold text-gray-900 tracking-tight">
          Cambridge Locals
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to share your knowledge about Cambridge. We&apos;ll email you a sign-in link — no password needed.
            </p>
          </div>

          <SignInForm redirectTo={redirectTo} />
        </div>
      </main>
    </div>
  )
}
