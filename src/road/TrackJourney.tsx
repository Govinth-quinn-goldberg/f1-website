import React, { useEffect, useRef, useState } from 'react';
import { loadTrackEnvironment } from './exrLoader';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface TrackJourneyProps {
  onScrollToExplore?: () => void;
}

export const TrackJourney: React.FC<TrackJourneyProps> = ({ onScrollToExplore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const envCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnvironmentReady, setIsEnvironmentReady] = useState(false);

  // Scroll and motion state
  const scrollYRef = useRef<number>(0);
  const distanceRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    loadTrackEnvironment().then((canvas) => {
      if (isMounted && canvas) {
        envCanvasRef.current = canvas;
        setIsEnvironmentReady(true);
      }
    });

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // 1. Calculate scroll-driven velocity and smooth momentum
      const currentScroll = scrollYRef.current;
      const scrollDelta = Math.abs(currentScroll - lastScrollYRef.current);
      lastScrollYRef.current = currentScroll;

      // Accelerate forward with scroll; decay smoothly when scrolling stops
      const targetSpeed = Math.min(25, 0.4 + scrollDelta * 0.45);
      velocityRef.current += (targetSpeed - velocityRef.current) * 0.12;
      distanceRef.current += velocityRef.current;

      const dist = distanceRef.current;

      // 2. Clear stage with deep dark background
      ctx.fillStyle = '#07080a';
      ctx.fillRect(0, 0, width, height);

      // 3. Render Authentic Poly Haven Track HDRI Panorama
      const envCanvas = envCanvasRef.current;
      if (envCanvas) {
        // Generous scaling to cover the full viewport while preserving authentic 2:1 panoramic ratio
        const scale = Math.max(height / envCanvas.height, width / envCanvas.width) * (1.0 + ((dist * 0.0003) % 0.06));
        const drawW = envCanvas.width * scale;
        const drawH = envCanvas.height * scale;

        // Position camera horizon naturally at ~48% viewport height
        const drawY = height * 0.48 - drawH * 0.5;

        // Seamless 360-degree cylindrical panoramic wrap driven by scroll motion
        const panSpeed = 0.5;
        let panX = (-dist * panSpeed) % drawW;
        if (panX > 0) panX -= drawW;

        while (panX < width) {
          ctx.drawImage(envCanvas, panX, drawY, drawW, drawH);
          panX += drawW;
        }

        // Cinematic editorial vignette
        const vignette = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.35,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.85
        );
        vignette.addColorStop(0, 'rgba(7, 8, 10, 0)');
        vignette.addColorStop(0.65, 'rgba(7, 8, 10, 0.25)');
        vignette.addColorStop(1, 'rgba(7, 8, 10, 0.85)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        // Soft bottom gradient for crisp text legibility
        const bottomGrad = ctx.createLinearGradient(0, height - 180, 0, height);
        bottomGrad.addColorStop(0, 'rgba(7, 8, 10, 0)');
        bottomGrad.addColorStop(1, 'rgba(7, 8, 10, 0.88)');
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, height - 180, width, 180);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#07080a] select-none">
      {/* 60fps Perspective Track Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Editorial Title & Atmosphere Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10">
        {/* Top Header */}
        <ScrollReveal delayMs={0} variant="fade-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 01 / Track Experience
              </span>
            </div>

            <span className="text-[10px] font-mono text-[#525d70] tracking-widest uppercase">
              Poly Haven HDRI Environment
            </span>
          </div>
        </ScrollReveal>

        {/* Center Editorial Title */}
        <div className="max-w-2xl text-left my-auto">
          <ScrollReveal delayMs={100} variant="fade-up">
            <div className="text-xs sm:text-sm font-mono tracking-[0.35em] text-[#252525] uppercase font-semibold mb-3">
              WHERE SPEED BECOMES HISTORY
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={200} variant="fade-up">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
              THE <span className="text-[#e10600]">ROAD</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={300} variant="fade-up">
            <p className="mt-4 text-xs sm:text-sm font-mono text-[#B8B8B8] max-w-lg leading-relaxed uppercase">
              Formula 1 circuits are not merely lengths of tarmac. They are high-speed amphitheaters where topography,
              asphalt friction, and human nerve collide at 350 km/h.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Scroll Prompt */}
        <ScrollReveal delayMs={400} variant="fade-up">
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-[10px] font-mono text-[#525d70] tracking-wider uppercase">
              Travel Forward via Scroll
            </div>

            <button
              onClick={onScrollToExplore}
              className="pointer-events-auto flex items-center space-x-2 text-[10px] font-mono text-[#B8B8B8] hover:text-white uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <span>DISCOVER THE ANATOMY</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#e10600] animate-bounce" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
