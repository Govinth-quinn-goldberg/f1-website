import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VRCanvasViewer } from './VRCanvasViewer';
import { JourneySection } from './JourneySection';
import { ChevronDown } from 'lucide-react';

interface ExperiencePageProps {
  onNavigateHome?: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const trackHeightRef = useRef<number>(1);
  const trackOffsetTopRef = useRef<number>(0);

  // Recalculate track geometry on mount and resize
  const handleResize = useCallback(() => {
    const track = trackRef.current;
    if (track) {
      trackHeightRef.current = Math.max(1, track.scrollHeight - window.innerHeight);
      trackOffsetTopRef.current = track.offsetTop;
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Smooth scroll listener mapping window scroll to targetProgressRef (0.0 to 1.0)
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY - trackOffsetTopRef.current;
    const progress = Math.max(0, Math.min(1, scrolled / trackHeightRef.current));
    targetProgressRef.current = progress;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Typography opacity & shift based on scroll progress:
  // Remains 100% visible for ~2s longer before fading out gradually
  const fadeStart = 0.15;
  const fadeEnd = 0.45;
  const textOpacity = scrollProgress <= fadeStart
    ? 1
    : Math.max(0, 1 - (scrollProgress - fadeStart) / (fadeEnd - fadeStart));
  const textTranslateY = scrollProgress <= fadeStart
    ? 0
    : -(scrollProgress - fadeStart) * 150;

  return (
    <div className="relative w-full min-h-screen bg-[#07080a] text-white selection:bg-[#e10600] selection:text-white select-none">
      {/* 
        TALL SCROLL TRACK (450vh)
        Pins sticky VR stage to center of viewport
      */}
      <div ref={trackRef} className="relative w-full h-[450vh]">
        {/* Sticky Viewer Port - Pinned to viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#07080a]">
          {/* Central VR Canvas Stage */}
          <div className="relative w-full h-full flex items-center justify-center">
            <VRCanvasViewer targetProgressRef={targetProgressRef} />

            {/* Dark Editorial Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/60 pointer-events-none" />

            {/* Opening Heading Overlay (fades gracefully as user scrolls into VR sequence) */}
            <div
              className="absolute z-20 inset-0 flex flex-col items-center justify-center p-6 sm:p-12 text-center pointer-events-none transition-all duration-200"
              style={{
                opacity: textOpacity,
                transform: `translate3d(0, ${textTranslateY}px, 0)`,
                visibility: textOpacity <= 0.01 ? 'hidden' : 'visible',
              }}
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822]/90 border border-[#1f2430] mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                  VIRTUAL COCKPIT SIMULATOR
                </span>
              </div>

              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase font-display max-w-4xl text-[#252525] leading-tight drop-shadow-2xl">
                EXPERIENCE THE THRILL OF <span className="text-[#e10600]">RACING AT HOME</span>
              </h1>

              <p className="mt-4 text-xs sm:text-sm font-mono text-[#8e9aa8] tracking-widest uppercase max-w-xl">
                THE RACE STARTS BEFORE YOU REACH THE TRACK.
              </p>

              {/* Scroll Prompt Indicator */}
              <div className="mt-12 flex flex-col items-center space-y-2 text-xs font-mono tracking-widest text-[#8e9aa8] uppercase">
                <span>SCROLL DOWN TO WEAR VR HEADSET</span>
                <ChevronDown className="w-5 h-5 text-[#e10600] animate-bounce" />
              </div>
            </div>

            {/* Bottom Floating Progress Status Pill */}
            <div className="absolute bottom-8 right-8 sm:right-12 z-20 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-[#0d1017]/85 border border-[#1f2430] backdrop-blur-md text-[10px] font-mono tracking-widest text-[#8e9aa8] uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
                <span>POV SEQUENCE: {Math.round(scrollProgress * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        NEW SCROLL-DRIVEN STORYTELLING SECTION: JOIN THE JOURNEY
        Appended seamlessly after the opening 450vh VR helmet sequence
      */}
      <JourneySection />
    </div>
  );
};

export default ExperiencePage;
