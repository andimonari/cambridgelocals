# Deploying Cambridge Locals to Firebase

This app runs on Firestore (data) + Firebase Auth (email-link sign-in) + Firebase App Hosting (the Next.js app itself, SSR-aware). Commands below assume you're in the repo root; `firebase` resolves via the `firebase-tools` devDependency (`npx firebase ...`) or your global CLI install (already present in this environment: `firebase --version` → 15.26.0).

## 1. One-time account & project setup

```bash
# Authenticate the CLI (opens a browser)
firebase login

# Create a new Firebase project (pick a globally-unique id)
firebase projects:create cambridge-locals-prod --display-name "Cambridge Locals"

# Point this repo's Firebase config at it (writes .firebaserc)
firebase use cambridge-locals-prod
```

If you'd rather use an existing project, skip `projects:create` and just run `firebase use <your-project-id>`.

## 2. Enable Firestore and Auth

```bash
# Create the (default) Firestore database — pick a region close to users,
# e.g. europe-west2 (London) for a Cambridge, England audience
firebase firestore:databases:create '(default)' --location=europe-west2
```

Enabling the **Email Link (passwordless)** sign-in provider currently has no CLI command — do it once in the console:
`https://console.firebase.google.com/project/<your-project-id>/authentication/providers` → Email/Password → enable "Email link (passwordless sign-in)".

Deploy the Firestore rules and indexes checked into this repo:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## 3. Get your web app config

```bash
# Registers a web app in the project and prints the config object
firebase apps:create web "Cambridge Locals Web"
firebase apps:sdkconfig web
```

Copy `apiKey`, `authDomain`, and `projectId` from the output into `.env.local` (see `.env.example`) and into `apphosting.yaml`.

## 4. Local development

```bash
npm run emulators   # firebase emulators:start — Firestore :8080, Auth :9099, UI :4000
```

With `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local`, the app talks to the emulators instead of your real project — no real credentials needed, and email-link sign-in auto-confirms without sending real email (the emulator UI at `http://localhost:4000` shows the link to click).

In another terminal:

```bash
npm run dev
npm run db:seed     # populates the emulator with locations/categories/experts/guides/reviews
```

## 5. Deploy the app (Firebase App Hosting)

App Hosting deploys are continuous from a connected GitHub branch, not a one-shot `firebase deploy`:

```bash
# One-time: create a backend and connect it to this GitHub repo + branch
firebase apphosting:backends:create --project cambridge-locals-prod

# Store the Resend API key as a secret (referenced from apphosting.yaml)
firebase apphosting:secrets:set auth-resend-key --project cambridge-locals-prod

# Manually trigger a rollout (otherwise happens automatically on push to the connected branch)
firebase apphosting:rollouts:create --project cambridge-locals-prod
```

Before your first deploy, fill in the `REPLACE_WITH_...` placeholders in `apphosting.yaml` with the values from step 3.

## 6. Useful ongoing commands

```bash
firebase projects:list                          # see all projects you have access to
firebase use --add                              # add a project alias (e.g. staging vs prod)
firebase apphosting:backends:list               # see App Hosting backends
firebase apphosting:rollouts:list <backend-id>  # deploy history
firebase firestore:indexes                      # print currently deployed indexes
firebase deploy --only firestore:rules          # redeploy rules after editing firestore.rules
firebase emulators:export ./seed-snapshot       # snapshot emulator data (e.g. after seeding)
firebase emulators:start --import=./seed-snapshot  # restart emulators with that snapshot
```
