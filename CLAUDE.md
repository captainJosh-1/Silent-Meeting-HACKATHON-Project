# Instructions for AI coding tools working in this repo

1. **Read in this order before writing any code**: SPEC.md → STACK.md →
   API_CONTRACT.md → PROGRESS.md. They contain the scope, the locked tech
   decisions, the frontend/backend contract, and current status. Don't
   suggest a different stack or re-scope the project — it's already
   decided.

2. **Never commit automatically.** When a feature or fix seems done:
   - Say clearly what you built/changed and how to test it.
   - Wait for the user to actually run it and confirm it works.
   - Only after they say it's confirmed working, run:
     - `git add .`
     - `git commit -m "short clear message describing what now works"`
   - If the user says it's still broken, keep iterating — don't commit
     yet, even a `wip:` commit, unless they ask you to save a checkpoint
     mid-debugging.
     
3. **Update PROGRESS.md** when you finish a task or hit a blocker — check
   off items in the task list, update "Right now". Keep it short.

4. **Stay in your lane.** Frontend code goes in `/frontend`, backend in
   `/backend`. Don't cross into the other folder without flagging it to
   the user first — a teammate's AI tool may be working there.

5. **Pull before you push.** `git pull origin main` before starting new
   work.

6. **If you change the API shape** (request/response format between
   frontend and backend), update API_CONTRACT.md in the same commit —
   don't let it drift out of sync with the code.

7. **Ask before big structural changes** (new dependencies, changing the
   matching algorithm, swapping MediaPipe for something else) — confirm
   with the user first, these were deliberate decisions.
