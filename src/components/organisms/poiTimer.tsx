'use client';
import { useEffect, useState } from 'react';

export default function POITimer() {
  const POI_DURATION = 15;
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startPOI = () => {
    setTimeLeft(POI_DURATION);
    setIsRunning(true);
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = (POI_DURATION - timeLeft) / POI_DURATION;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <svg className="transform -rotate-90" width="280" height="280">
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform text-black -translate-x-4 -translate-y-2 text-4xl font-semibold">
          {timeLeft > 0 ? `${timeLeft}s` : '--'}
        </div>
      </div>

      <button
        onClick={startPOI}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start POI
      </button>
    </div>
  );
}
