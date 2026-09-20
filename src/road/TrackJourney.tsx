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
  const supportingTextRef = useRef<HTMLParagraphElement | null>(null);
  const textColorRef = useRef<{ r: number; g: number; b: number }>({ r: 184, g: 184, b: 184 });
  const [isEnvironmentReady, setIsEnvironmentReady] = useState(false);

  // Scroll and motion state
  const scrollYRef = useRef<number>(0);
  const distanceRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const autoPanXRef = useRef<number>(0);

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
      // 1. Automatic slow continuous right -> left HDRI panning
      autoPanXRef.current += 0.45;
      const currentAutoPan = autoPanXRef.current;

      // 2. Clear stage with deep dark background
      ctx.fillStyle = '#07080a';
      ctx.fillRect(0, 0, width, height);

      // 3. Render Authentic Poly Haven Track HDRI Panorama
      const envCanvas = envCanvasRef.current;
      if (envCanvas) {
        // Generous scaling to cover full viewport while preserving authentic 2:1 panoramic ratio
        const scale = Math.max(height / envCanvas.height, width / envCanvas.width) * 1.05;
        const drawW = envCanvas.width * scale;
        const drawH = envCanvas.height * scale;

        // Position camera horizon naturally at ~48% viewport height
        const drawY = height * 0.48 - drawH * 0.5;

        // Seamless 360-degree cylindrical panoramic wrap: continuous right -> left movement
        let panX = (-currentAutoPan) % drawW;
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

      // 4. Measure background luminance under supporting text for smooth adaptive contrast
      const textElem = supportingTextRef.current;
      if (textElem) {
        const rect = textElem.getBoundingClientRect();
        const boxX = Math.max(0, Math.floor(rect.left));
        const boxY = Math.max(0, Math.floor(rect.top));
        const boxW = Math.min(Math.floor(rect.width), width - boxX);
        const boxH = Math.min(Math.floor(rect.height), height - boxY);

        if (boxW > 10 && boxH > 10) {
          try {
            const imgData = ctx.getImageData(boxX, boxY, boxW, boxH);
            const data = imgData.data;
            let totalLum = 0;
            let sampleCount = 0;

            // Subsample pixels for 60fps performance
            for (let i = 0; i < data.length; i += 16) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              totalLum += lum;
              sampleCount++;
            }

            const avgLum = sampleCount > 0 ? totalLum / sampleCount : 0.2;

            // Map perceived background luminance (0.0 to 1.0) to smooth text RGB:
            // Bright background (avgLum -> 1.0) => dark charcoal text rgb(25, 30, 40)
            // Dark background (avgLum -> 0.0) => light slate text rgb(225, 225, 230)
            const targetR = 225 - avgLum * (225 - 25);
            const targetG = 225 - avgLum * (225 - 30);
            const targetB = 230 - avgLum * (230 - 40);

            // Smooth 60fps exponential lerp filter (prevents flickering or abrupt jumps)
            const lerpFactor = 0.08;
            textColorRef.current.r += (targetR - textColorRef.current.r) * lerpFactor;
            textColorRef.current.g += (targetG - textColorRef.current.g) * lerpFactor;
            textColorRef.current.b += (targetB - textColorRef.current.b) * lerpFactor;

            const rInt = Math.round(textColorRef.current.r);
            const gInt = Math.round(textColorRef.current.g);
            const bInt = Math.round(textColorRef.current.b);

            textElem.style.color = `rgb(${rInt}, ${gInt}, ${bInt})`;
          } catch {
            // Silently fallback if canvas read is unavailable
          }
        }
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
            <p ref={supportingTextRef} className="mt-4 text-xs sm:text-sm font-mono text-[#B8B8B8] max-w-lg leading-relaxed uppercase transition-colors duration-150">
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
