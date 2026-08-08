import { getApps, initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth"

// Browser-side Firebase SDK — only import this from Client Components.
// Public by design: Firebase web API keys identify the project, they don't
// grant access on their own (Firestore/Auth security rules do that).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const clientAuth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })

if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true" && typeof window !== "undefined") {
  connectAuthEmulator(clientAuth, "http://127.0.0.1:9099", { disableWarnings: true })
}
