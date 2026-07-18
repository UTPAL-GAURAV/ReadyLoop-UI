# ReadyLoop — Claude Session Instructions

## Project Overview
ReadyLoop is an AI-powered interview preparation application.
- **Frontend**: React (this repository)
- **Backend**: Node.js (separate repository)
- **AI**: Claude (Anthropic) — only AI provider for now

## Session Continuity Rules
- On every new session, read `appIdea.md` in this directory to restore full context on the app design, decisions, and open questions.
- Treat `appIdea.md` as the single source of truth for product decisions.
- After any discussion that finalizes or changes a decision, update `appIdea.md` before the session ends.

## Working Conventions
- UI: React (component library / styling TBD — see appIdea.md)
- Backend: Node.js REST or tRPC (TBD — see appIdea.md)
- AI integration: Claude API via Anthropic SDK (server-side only; never expose API keys to the client)
- Keep API keys and secrets out of source; use environment variables

## Key Files
- `appIdea.md` — living product spec: features, flows, open questions, and decisions log
- `CLAUDE.md` — this file; session bootstrap instructions
