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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 h-16 flex items-center">
        <Link href={ROUTES.home} className="font-semibold text-foreground tracking-tight">
          Cambridge Locals
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-3">Welcome back</h1>
            <p className="text-muted text-sm leading-relaxed">
              Sign in to share your knowledge about Cambridge.
            </p>
          </div>

          <SignInForm redirectTo={redirectTo} />
        </div>
      </main>
    </div>
  )
}
