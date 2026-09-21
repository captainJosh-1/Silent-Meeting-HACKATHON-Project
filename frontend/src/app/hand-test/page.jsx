"use client";

import HandTracker from "../../components/HandTracker";

export default function HandTestPage() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Hand Tracking Test</h1>
      <p>Allow camera access, then hold your hand up to the webcam.</p>
      <HandTracker />
    </main>
  );
}