"use client";
import { useEffect, useRef, useState } from "react";

const FULL_TIME = 435;

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && elapsedTime < FULL_TIME) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isRunning, elapsedTime]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const radius = 280;
  const circumference = 2 * Math.PI * radius;
  const progress = elapsedTime / FULL_TIME;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="relative">
        <svg className="transform -rotate-90" width="620" height="620">
          <circle
            cx="300"
            cy="300"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="300"
            cy="300"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-black top-1/2 left-1/2 transform -translate-x-32 -translate-y-6 text-8xl font-semibold">
          {formatTime(elapsedTime)}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setElapsedTime(0);
            setIsRunning(false);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
