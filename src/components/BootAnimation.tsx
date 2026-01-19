import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BootAnimationProps {
  onComplete: () => void;
}

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSequence = [
    "BIOS Date 01/15/26 14:22:31 Ver: 1.0.2",
    "CPU: AMD Ryzen 9 5950X 16-Core Processor",
    "Memory Test: 65536K OK",
    "Detecting Primary Master ... MANUS-SSD-2TB",
    "Detecting Primary Slave ... None",
    "Booting from Hard Disk...",
    "Loading Operating System...",
    "Initializing Neural Network...",
    "Establish Connection: SECURE",
  ];

  useEffect(() => {
    let delay = 0;
    
    // Sequence text appearance
    bootSequence.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
    });

    // Progress bar starts after text
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 50);
    }, delay + 500);

    // Completion
    setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }, delay + 2500);

  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] bg-black text-green-500 font-mono p-10 flex flex-col justify-between transition-opacity duration-500",
        isComplete ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>

      <div className="w-full max-w-xl mx-auto mb-20 space-y-2">
        <div className="flex justify-between text-xs uppercase">
          <span>System Initialization</span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
        <div className="h-2 bg-gray-900 border border-green-900 rounded-sm overflow-hidden">
          <div 
            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress >= 100 && (
            <div className="text-center text-green-400 font-bold tracking-[0.2em] animate-pulse mt-4">
                ACCESS GRANTED
            </div>
        )}
      </div>
    </div>
  );
}
