# STACK.md — locked decisions, don't redebate mid-build

## Frontend
- **Next.js (React)**
- **MediaPipe Hands** + **MediaPipe FaceMesh** — loaded client-side via
  CDN `<script>` tags (or `@mediapipe/*` npm packages), runs entirely in
  the browser. No API key.
- **DTW (Dynamic Time Warping)** — hand-written matching logic in plain
  JS/TypeScript, no external library needed. Compares a live landmark
  sequence against saved templates, picks the closest match.
- **Web Speech API** (`SpeechSynthesis`) — built into the browser, free,
  for optional text-to-speech.

## Backend
- **FastAPI (Python)**
- Job: save and load each browser's custom command library. Nothing else.
- **SQLModel** (SQLAlchemy + Pydantic) for the database layer.
- **SQLite** as the database — single file, zero setup, fine for a
  hackathon demo. (Swap for Postgres later only if this ever needs to be
  a real product.)
- **CORS enabled** for the Next.js dev origin (`http://localhost:3000`).

## No login / no accounts
- On first visit, the frontend generates a random anonymous ID
  (`crypto.randomUUID()`), stores it in `localStorage`.
- Every save/load request to FastAPI includes this ID; the backend uses
  it only to group commands, not to identify a person.

## Explicitly NOT using
- No paid AI API (Claude/OpenAI) for the core feature — the whole
  recognition pipeline is landmarks + DTW, zero cost, zero rate limits,
  works offline once the page is loaded.
- No auth library, no JWT, no sessions.
- No cloud database — SQLite file is enough for a hackathon weekend.

## Dev setup
- Frontend: `npx create-next-app@latest frontend` → runs on :3000
- Backend: FastAPI app → runs on :8000 (`uvicorn main:app --reload`)
- Frontend calls backend via `fetch("http://localhost:8000/...")`
