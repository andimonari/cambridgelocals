// Kept dependency-free (no firebase-admin import) so src/proxy.ts — which
// runs on the Edge runtime — can use SESSION_COOKIE without pulling in the
// Node-only Admin SDK.
export const SESSION_COOKIE = "session"
export const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000 // 14 days
