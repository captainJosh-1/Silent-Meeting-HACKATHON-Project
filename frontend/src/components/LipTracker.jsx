"use client";

import { useEffect, useRef, useState } from "react";

export default function LipTracker() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Loading MediaPipe...");
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    let camera;
    let faceMesh;
    let cancelled = false;

    async function setup() {
      const { FaceMesh, FACEMESH_LIPS } = await import("@mediapipe/face_mesh");
      const { Camera } = await import("@mediapipe/camera_utils");
      const drawingUtils = await import("@mediapipe/drawing_utils");

      if (cancelled) return;

      faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const faces = results.multiFaceLandmarks || [];
        setFaceDetected(faces.length > 0);

        for (const landmarks of faces) {
          drawingUtils.drawConnectors(ctx, landmarks, FACEMESH_LIPS, {
            color: "#00E5FF",
            lineWidth: 2,
          });
        }
        ctx.restore();
      });

      if (!videoRef.current) return;

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await faceMesh.send({ image: videoRef.current });
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
      if (faceMesh) faceMesh.close();
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, []);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <p style={{ fontSize: "1.1rem", marginBottom: 8 }}>
        Status: {status} — face detected: {faceDetected ? "yes" : "no"}
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