export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  dashboard: "/dashboard",
  expert: (slug: string) => `/experts/${slug}`,
} as const
