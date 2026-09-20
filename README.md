# Silent Meeting Assistant — Setup

See SPEC.md for what this is, STACK.md for tech decisions,
API_CONTRACT.md for how frontend/backend talk, PROGRESS.md for task list.

## 1. Push this to GitHub
```bash
git init
git add .
git commit -m "initial planning docs"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```
Add your teammate as a collaborator on GitHub, then they clone the repo.

## 2. Install the git hook (auto-updates PROGRESS.md on every commit)
```bash
cp .githooks/post-commit .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

## 3. Frontend setup
```bash
cd frontend
npx create-next-app@latest .
npm install
npm run dev   # runs on http://localhost:3000
```
Add MediaPipe:
```bash
npm install @mediapipe/hands @mediapipe/face_mesh @mediapipe/camera_utils @mediapipe/drawing_utils
```

## 4. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlmodel
uvicorn main:app --reload   # runs on http://localhost:8000
```
Enable CORS in `main.py` for `http://localhost:3000` (Next.js dev origin)
— FastAPI's `CORSMiddleware`, allow that origin, all methods, all headers.

## 5. Branch workflow
```bash
git checkout -b feature/your-feature-name
# ...code with AI tool of choice...
git add .
git commit -m "clear message"
git push origin feature/your-feature-name
# open PR on GitHub → merge into main
```

## 6. Switching AI tools mid-task
1. Commit current work: `git commit -m "wip: partway through X"`
2. Open the new AI tool in the same folder.
3. Tell it: "Read SPEC.md, STACK.md, API_CONTRACT.md, and PROGRESS.md,
   then continue from where PROGRESS.md says we left off."
4. It picks up in under a minute — no re-explaining needed.
