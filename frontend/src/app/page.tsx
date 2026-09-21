"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [pingResult, setPingResult] = useState<{ status: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/ping")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPingResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <h1 className="text-3xl font-semibold mb-8 text-zinc-900 dark:text-zinc-100">
        Silent Meeting Assistant
      </h1>
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-medium mb-4 text-zinc-900 dark:text-zinc-100">
          Backend Connection Test
        </h2>
        {loading && <p className="text-zinc-600 dark:text-zinc-400">Connecting to backend...</p>}
        {error && (
          <p className="text-red-600 dark:text-red-400">
            Error: {error}
          </p>
        )}
        {pingResult && (
          <div className="text-green-600 dark:text-green-400 font-mono text-lg">
            Response: <span className="font-bold">{"{ status: '" + pingResult.status + "' }"}</span>
          </div>
        )}
      </div>
    </div>
  );
}