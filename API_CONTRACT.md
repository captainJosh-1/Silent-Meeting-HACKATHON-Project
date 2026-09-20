# API_CONTRACT.md — agreed shape between Next.js and FastAPI

Base URL (dev): `http://localhost:8000`

## POST /commands
Save a new custom command (gesture or lip phrase).

Request body:
```json
{
  "user_id": "anonymous-uuid-from-localstorage",
  "label": "yes",
  "type": "hand" | "lip",
  "template": [[x, y, z, ...], [x, y, z, ...], ...]
}
```
- `template` = the recorded landmark sequence (array of frames, each frame
  is a flat array of landmark coordinates). Exact shape depends on
  MediaPipe's output — lock this down once the frontend team has it
  working, then update this file.

Response `201`:
```json
{ "id": 1, "label": "yes", "type": "hand" }
```

## GET /commands?user_id=anonymous-uuid
Load all saved commands for this browser.

Response `200`:
```json
[
  { "id": 1, "label": "yes", "type": "hand", "template": [...] },
  { "id": 2, "label": "no", "type": "lip", "template": [...] }
]
```

## DELETE /commands/{id}
Remove a saved command.

Response `204`, no body.

## Notes for both sides
- All matching (DTW) happens **client-side**, in the browser, using the
  templates loaded from GET /commands. The backend never runs matching
  logic — it's just storage.
- `type` distinguishes hand-gesture templates from lip-movement templates
  so the frontend knows which MediaPipe pipeline to compare against.
- Keep this file updated the moment the real landmark shape is decided —
  it's the thing that lets frontend and backend work in parallel without
  blocking each other.
