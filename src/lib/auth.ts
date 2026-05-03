import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import Credentials from "next-auth/providers/credentials"
import { db } from "./db"
import { ROUTES } from "./routes"

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db as any),
  session: { strategy: "jwt" },
  pages: {
    signIn: ROUTES.signIn,
  },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM ?? "Cambridge Experts <noreply@cambridgeexperts.com>",
    }),
    // Credentials provider for local development — no email sending required
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null
        return db.user.findUnique({
          where: { email: credentials.email as string },
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) return
      const name = user.name ?? user.email.split("@")[0]
      const baseSlug = toSlug(name)
      // Ensure slug uniqueness with a numeric suffix if needed
      let slug = baseSlug
      let suffix = 1
      while (await db.expert.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${suffix++}`
      }
      await db.expert.create({
        data: { name, slug, role: "Local Expert", userId: user.id },
      })
    },
  },
})
