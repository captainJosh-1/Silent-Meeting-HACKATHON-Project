"use client";

import { useEffect, useRef, useState } from "react";

export default function HandTracker() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Loading MediaPipe...");
  const [handsDetected, setHandsDetected] = useState(0);

  useEffect(() => {
    let camera;
    let hands;
    let cancelled = false;

    async function setup() {
      const { Hands, HAND_CONNECTIONS } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");
      const drawingUtils = await import("@mediapipe/drawing_utils");

      if (cancelled) return;

      hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      hands.onResults((results) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const landmarkSets = results.multiHandLandmarks || [];
        setHandsDetected(landmarkSets.length);

        for (const landmarks of landmarkSets) {
          drawingUtils.drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 3,
          });
          drawingUtils.drawLandmarks(ctx, landmarks, {
            color: "#FF0000",
            lineWidth: 1,
            radius: 4,
          });
        }
        ctx.restore();
      });

      if (!videoRef.current) return;

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });

      await camera.start();
      if (!cancelled) setStatus("Tracking live");
    }

    setup().catch((err) => {
      console.error(err);
      setStatus("Couldn't start webcam/MediaPipe — check camera permissions.");
    });

    return () => {
      cancelled = true;
      if (camera) camera.stop();
      if (hands) hands.close();
    };
  }, []);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <p style={{ fontSize: "1.1rem", marginBottom: 8 }}>
        Status: {status} — hands detected: {handsDetected}
      </p>
      <div style={{ position: "relative", width: 640, height: 480 }}>
        <video
          ref={videoRef}
          style={{ position: "absolute", top: 0, left: 0, width: 640, height: 480 }}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0, width: 640, height: 480 }}
        />
      </div>
    </div>
  );
}