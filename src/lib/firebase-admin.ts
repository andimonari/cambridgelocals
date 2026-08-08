import { cert, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

function createAdminApp(): App {
  if (getApps().length) return getApps()[0]

  // Local dev outside the emulator: a service account key lets the Admin SDK
  // authenticate. In Firebase App Hosting (and other Google Cloud runtimes),
  // Application Default Credentials are available automatically and this can
  // be left unset. When FIRESTORE_EMULATOR_HOST / FIREBASE_AUTH_EMULATOR_HOST
  // are set (via `firebase emulators:start`), the Admin SDK talks to the
  // emulators regardless of credentials.
  //
  // Expected as base64 (not raw JSON): the key's PEM private_key field
  // contains \n sequences that some .env loaders (including Next's) mangle
  // when they appear inside a quoted value — base64 has no such characters,
  // so it survives any .env parser untouched. Raw JSON is still accepted as
  // a fallback for environments that set the var directly (e.g. `export`).
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (serviceAccountKey) {
    const json = serviceAccountKey.trim().startsWith("{")
      ? serviceAccountKey
      : Buffer.from(serviceAccountKey, "base64").toString("utf8")
    return initializeApp({
      credential: cert(JSON.parse(json)),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  }

  return initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })
}

const app = createAdminApp()

export const adminDb = getFirestore(app)
export const adminAuth = getAuth(app)
