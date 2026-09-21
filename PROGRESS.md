# PROGRESS.md

> AI tools: read SPEC.md and STACK.md first, then this file, before doing
> anything. This is what's done, what's next, and any gotchas hit so far.
> Update "Right now" after every session. Git hook auto-logs commits below.

## Project
Silent Meeting Assistant — webcam-based hand gesture + lip phrase
recognition, converts to live text. See SPEC.md for full scope.

## Team
- Frontend (Next.js + MediaPipe + DTW): by me 
- Backend (FastAPI + SQLite): by me 
for now only i will do whole project
*(fill in — or same person for both if solo)*

## Task list (build in this order — riskiest parts first)
- [x] Webcam capture working in Next.js page
- [x] MediaPipe Hands wired up, landmarks drawn live on screen
- [x] MediaPipe FaceMesh wired up, mouth landmarks drawn live on screen
- [ ] DTW matching function written + tested with dummy data (**do this
      early — it's the riskiest part, confirm it works before building
      UI around it**)
- [ ] "Record a command" flow (demonstrate 3–5x, save template + label)
- [ ] FastAPI: POST /commands endpoint + SQLite table
- [ ] FastAPI: GET /commands endpoint
- [ ] Frontend: load saved commands on page load, run live DTW matching
      against them
- [ ] Display recognized text in real time on screen
- [ ] Pre-load starter commands (yes/no/stop/help gestures, yes/no/hello
      lip phrases)
- [ ] Text-to-speech for recognized output (nice-to-have)
- [ ] UI polish — accessible, high contrast, large text
- [ ] Test full demo flow end to end, on the actual demo laptop/webcam

## Right now
- **Working on:** DTW matching function with dummy data (next task)
- **Blocked on:** nothing
- **Next step:** implement DTW utility and test with dummy sequences

## Decisions made (don't redebate)
- Hands + lips only, no full lip-reading (see SPEC.md scope).
- No login — anonymous ID in localStorage.
- DTW for matching, no ML training.
- SQLite, no cloud database.

## Known issues / gotchas
- (none yet)

---
## Auto-log (appended by git hook, don't edit below by hand)
