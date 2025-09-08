KorbinAI — Autonomous workspace copilot

Clean Next.js + TypeScript app that lets users sign in, create workspaces, chat with Korbin (Gemini only), pick a default model per workspace, and connect Gmail to send emails from chat.

### Tech
- Next.js App Router + TypeScript + Tailwind CSS
- Firebase: Auth, Firestore, Storage (Admin for server routes)
- Google APIs: Gmail OAuth + send
- Gemini API via `@google/generative-ai` (Gemini 2.5 Flash/Pro)

### Features
- Authentication: Email/password + Google
- Workspaces: create/list/open; members field for future sharing
- Chats per workspace with Firestore persistence
- Model selection in chat (Gemini 2.5 Flash default, Gemini 2.5 Pro)
- Workspace settings: name, description, default model, memory toggle
- Gmail integration: OAuth connect per workspace, send email from chat

### Project structure
```
src/
  app/
    api/
      auth/gmail/authorize/route.ts
      auth/gmail/callback/route.ts
      chat/route.ts
      gmail/send/route.ts
    auth/signin.tsx
    workspaces/[workspaceId]/page.tsx
    workspaces/[workspaceId]/settings/page.tsx
    workspaces/page.tsx
    layout.tsx
    page.tsx
  components/
    Brand.tsx
    ChatInput.tsx
    MessageList.tsx
    ModelSelector.tsx
    Sidebar.tsx
  hooks/
    useAuth.ts
  lib/
    firebase/{client.ts,admin.ts}
    integrations/gmail.ts
    models/index.ts
  types/index.ts
public/
  logo.png
```

### Firestore schema
- `users/{uid}`: `{ uid, email, displayName, photoURL, createdAt }`
- `workspaces/{workspaceId}`: `{ name, description?, ownerId, members: string[], createdAt, defaultModel, memoryEnabled, integrations? }`
- `workspaces/{workspaceId}/chats/{chatId}`: `{ title, createdAt, updatedAt }`
- `workspaces/{workspaceId}/chats/{chatId}/messages/{messageId}`: `{ role, content, model, timestamp }`

### Environment (.env.local)
Paste this into `./.env.local` and fill values:
```
# Public Firebase client config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (server)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
# Keep literal \n newlines and wrap in quotes
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=

# Google OAuth for Gmail
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/gmail/callback

# Gemini API
GOOGLE_GENAI_API_KEY=
```

### One-time cloud setup
1) Firebase Console
- Create project → Add Web App → copy client config to env
- Enable Authentication (Email/Password + Google)
- Firestore: Create database
- Storage: Create bucket and put name into env

2) Google Cloud Console
- Create OAuth 2.0 Client (Web)
- Authorized redirect URI: `http://localhost:3000/api/auth/gmail/callback`
- Put client id/secret into env

### Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Using the app
1. Sign in on `/`
2. Click “New” in sidebar to create a workspace
3. Open a workspace → chat with Korbin (choose model in input bar)
4. Settings → update name/description/default model/memory; connect Gmail
5. From chat, draft content then send via Gmail using the send endpoint

### Security notes
- Add Firestore security rules to restrict access by user/workspace membership before production
- Do not commit `.env.local` or service account keys
- Server routes use Admin SDK; validate inputs server-side

### Roadmap
- Workspace membership & invites UI
- Persistent chat list and titles
- Memory store for agents; task loop
- More integrations (Notion, Sheets, Slack)

### References
- Gemini API docs: `https://ai.google.dev/gemini-api/docs`
