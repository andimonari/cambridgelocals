export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  dashboard: "/dashboard",
  newGuide: "/dashboard/guides/new",
  expert: (slug: string) => `/experts/${slug}`,
  guide: (slug: string) => `/guides/${slug}`,
  guides: "/guides",
  adminGuides: "/admin/guides",
} as const
