# SPEC.md — Silent Meeting Assistant

## One-liner
A real-time browser tool that recognizes predefined hand gestures and lip
movements via webcam and converts them into text (and optionally speech),
so someone can communicate silently in a meeting.

## Problem it solves
People who can't or don't want to speak aloud in a meeting need a way to
communicate that's recognized in real time, without solving general
lip-reading or sign language (explicitly out of scope per the brief).

## Must-have features (build these first, in this order)
1. Webcam capture in the browser.
2. Hand landmark tracking (MediaPipe Hands) — live, on screen.
3. Face/lip landmark tracking (MediaPipe FaceMesh) — live, on screen.
4. "Record a command" flow: user demonstrates a gesture or mouths a phrase
   3–5 times, we save the landmark-movement pattern + a text label.
5. Live matching: compare the current live movement against all saved
   patterns using DTW (Dynamic Time Warping); show the best match as text
   on screen in real time.
6. A starter set of pre-loaded commands: hand gestures for "yes"/"no"/
   "stop"/"help", lip phrases for "yes"/"no"/"hello".
7. Persist each browser's saved commands via the backend (anonymous ID,
   no login).

## Nice-to-have (only after the above works end-to-end)
- Text-to-speech: speak the recognized text out loud.
- Confidence display (e.g. "87% match") so users see how reliable a
  reading was.
- Delete / rename saved commands.
- Export/import a command library as JSON (share command sets between
  users without needing accounts).

## Explicitly out of scope
- General/unconstrained lip-reading.
- Sign language recognition (ASL etc.) — this is gesture *and* phrase
  matching against a small, user-defined vocabulary, not a language model.
- User accounts, login, authentication.
- Multi-user real-time sync (each browser has its own command library).

## Definition of done (demo-ready)
- Judges can walk up, the app is already loaded, a few default commands
  are pre-trained.
- Someone mouths "yes" or does a "stop" hand gesture and the correct text
  appears on screen within ~1 second.
- Someone records a brand-new custom gesture live, in front of judges, and
  it works on the next attempt.
- Nothing crashes if a gesture isn't recognized — it just shows "no match"
  or similar, gracefully.
