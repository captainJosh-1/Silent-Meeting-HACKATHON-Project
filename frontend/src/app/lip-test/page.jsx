"use client";

import LipTracker from "../../components/LipTracker";

export default function LipTestPage() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Lip Tracking Test</h1>
      <p>Allow camera access, then look at the camera and move your mouth (say "yes" or "no").</p>
      <LipTracker />
    </main>
  );
}