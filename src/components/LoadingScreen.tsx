import React, { useEffect, useState, useRef } from 'react';
import { LoaderState } from '../utils/imageLoader';

interface LoadingScreenProps {
  loaderState?: LoaderState | null;
  onEnter: () => void;
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loaderState,
  onEnter,
  isVisible,
}) => {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [fadeExit, setFadeExit] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  // Safe fallback state if loaderState is temporarily undefined/uninitialized
  const effectiveState = loaderState || {
    loadedCount: 0,
    totalCount: 1,
    progress: 0,
    isEssentialReady: false,
    isFullyLoaded: false,
  };

  // Real loading sequence tracking progressive asset loader state
  useEffect(() => {
    if (!isVisible) return;

    const handleComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setDisplayProgress(100);

      const holdTimer = setTimeout(() => {
        setFadeExit(true);
      }, 150);

      const exitTimer = setTimeout(() => {
        onEnter();
      }, 650);

      return () => {
        clearTimeout(holdTimer);
        clearTimeout(exitTimer);
      };
    };

    // Safety fallback: if essential assets fail to decode, force exit after 6s max
    const safetyTimeout = setTimeout(() => {
      if (!completedRef.current) {
        handleComplete();
      }
    }, 6000);

    const tick = () => {
      // Direct progress target from progressive image loader
      const isReady = Boolean(effectiveState.isEssentialReady);
      const targetPercent = isReady
        ? 100
        : Math.max(5, Math.min(99, effectiveState.progress || 0));

      setDisplayProgress((prev) => {
        if (prev >= 100) return 100;
        const diff = targetPercent - prev;
        const step = Math.max(1, Math.ceil(diff * 0.18));
        const next = Math.min(100, prev + step);

        if (next >= 100 && isReady) {
          handleComplete();
        }
        return next;
      });

      if (!completedRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(safetyTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, effectiveState.isEssentialReady, effectiveState.progress, onEnter]);

  if (!isVisible) return null;

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080a] text-white select-none transition-opacity duration-700 ease-out ${
        fadeExit ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center px-6">
        {/* 1. Official F1 Logo PNG (Large, Centered, Clean, Unobstructed) */}
        <div className="mb-10 sm:mb-12 flex items-center justify-center">
          <img
            src="/f1/f1logo.png"
            alt="Formula 1"
            className="w-52 sm:w-64 md:w-80 max-w-[85vw] h-auto object-contain select-none pointer-events-none drop-shadow-md"
          />
        </div>

        {/* 2. Thin Premium Circular Loading Indicator with Percentage inside */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
            {/* Subtle background track */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="#161922"
              strokeWidth="2.5"
            />
            {/* Active Red Progress Stroke */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="#e10600"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Smooth Numeric Percentage */}
          <span className="absolute text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
            {displayProgress}%
          </span>
        </div>

        {/* 3. VELOCITY F1 Text in Red Accent */}
        <div className="text-[#e10600] font-mono text-xs sm:text-sm font-bold tracking-[0.35em] uppercase">
          VELOCITY F1
        </div>
      </div>
    </div>
  );
};
