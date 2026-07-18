# ReadyLoop UI

React dashboard for [ReadyLoop](https://github.com/UTPAL-GAURAV/readyloop) — an AI-powered interview preparation app. This UI is **display-only**: all interview interaction happens via local Claude sessions. The dashboard shows your interview plans, round status, attempt history, and per-question feedback.

---

## Prerequisites

- Node.js 18+
- A Google OAuth Client ID (from [Google Cloud Console](https://console.cloud.google.com/))
- ReadyLoop backend running locally or on Render

---

## Running locally

**1. Clone the repo**

```bash
git clone https://github.com/UTPAL-GAURAV/ReadyLoop-UI.git
cd ReadyLoop-UI
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set:

```
VITE_API_BASE_URL=http://localhost:3001   # URL of the ReadyLoop backend
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

To get your Google Client ID:
- Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
- Create an OAuth 2.0 Client ID (Web application)
- Add `http://localhost:5173` to Authorised JavaScript origins
- Copy the Client ID into `.env`

**4. Start the dev server**

```bash
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173).

---

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to any static host (Vercel recommended — `vercel.json` is already configured with SPA rewrite rules).

---

## Vercel deployment

Set these environment variables in your Vercel project settings:

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | Your Render backend URL (e.g. `https://readyloop-api.onrender.com`) |
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |

Add your Vercel deployment URL to the Authorised JavaScript origins in Google Cloud Console.

---

## Project structure

```
src/
  api/          # Axios client + per-resource API modules
  components/   # UI components (layout, applications, rounds, attempts, home)
  hooks/        # React Query data hooks
  pages/        # Route-level page components
  types/        # TypeScript interfaces matching the backend data model
  lib/          # Utilities (cn, JWT helpers)
```

---

## Related repos

- [ReadyLoop](https://github.com/UTPAL-GAURAV/readyloop) — Agent repo (clone this to run interviews)
- [ReadyLoop-Backend](https://github.com/UTPAL-GAURAV/ReadyLoop-Backend) — Node.js REST API
