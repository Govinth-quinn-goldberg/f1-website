import React, { useState, useEffect, useRef, useCallback } from 'react';

function clamp(val: number, min: number = 0, max: number = 1): number {
  return Math.max(min, Math.min(max, val));
}

// Ease in-out helper for ultra-smooth scroll-linked interpolation
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const JourneySection: React.FC = () => {
  const [journeyProgress, setJourneyProgress] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const rawProgress = scrolled / totalScrollable;
    const progress = clamp(rawProgress, 0, 1);
    setJourneyProgress(progress);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // =========================================================================
  // STAGE 1 — JOIN THE JOURNEY (0.00 to 0.18)
  // =========================================================================
  const p1 = clamp((journeyProgress - 0.00) / 0.18);
  const s1Opacity = p1 < 0.35
    ? easeInOutCubic(p1 / 0.35)
    : p1 > 0.70
    ? 1 - easeInOutCubic((p1 - 0.70) / 0.30)
    : 1;
  const s1TranslateY = p1 < 0.35
    ? (1 - easeInOutCubic(p1 / 0.35)) * 60
    : p1 > 0.70
    ? -easeInOutCubic((p1 - 0.70) / 0.30) * 80
    : 0;

  // =========================================================================
  // STAGE 2 — 01 THE FIRST TEST (0.18 to 0.42) — Vertical Video
  // =========================================================================
  const p2 = clamp((journeyProgress - 0.18) / 0.24);
  const s2Opacity = p2 < 0.25
    ? easeInOutCubic(p2 / 0.25)
    : p2 > 0.75
    ? 1 - easeInOutCubic((p2 - 0.75) / 0.25)
    : 1;
  const s2VideoScale = p2 < 0.25
    ? 0.88 + easeInOutCubic(p2 / 0.25) * 0.12
    : p2 > 0.75
    ? 1.0 - easeInOutCubic((p2 - 0.75) / 0.25) * 0.05
    : 1.0 + (p2 - 0.25) * 0.04;
  const s2TranslateY = p2 < 0.25
    ? (1 - easeInOutCubic(p2 / 0.25)) * 50
    : p2 > 0.75
    ? -easeInOutCubic((p2 - 0.75) / 0.25) * 60
    : 0;
  const s2SideLeftX = p2 < 0.25 ? (1 - easeInOutCubic(p2 / 0.25)) * -50 : 0;
  const s2SideRightX = p2 < 0.25 ? (1 - easeInOutCubic(p2 / 0.25)) * 50 : 0;

  // =========================================================================
  // STAGE 3 — 02 BUILDING THE COMPONENTS (STEERING WHEEL 2-SHOT) (0.42 to 0.70)
  // Shot 1: /f1/steering wheel.jpg (Vertical)  -> 0.42 to 0.57
  // Shot 2: /f1/steering wheels.png (Horizontal) -> 0.55 to 0.70
  // =========================================================================
  const p3 = clamp((journeyProgress - 0.42) / 0.28);
  const s3SectionOpacity = p3 < 0.15
    ? easeInOutCubic(p3 / 0.15)
    : p3 > 0.85
    ? 1 - easeInOutCubic((p3 - 0.85) / 0.15)
    : 1;
  const s3SectionTranslateY = p3 < 0.15
    ? (1 - easeInOutCubic(p3 / 0.15)) * 50
    : p3 > 0.85
    ? -easeInOutCubic((p3 - 0.85) / 0.15) * 50
    : 0;

  // Shot 1 (Vertical Steering Wheel: /f1/steering wheel.jpg)
  const p3_shot1 = clamp(p3 / 0.55);
  const shot1Opacity = p3_shot1 < 0.25
    ? easeInOutCubic(p3_shot1 / 0.25)
    : p3_shot1 > 0.75
    ? 1 - easeInOutCubic((p3_shot1 - 0.75) / 0.25)
    : 1;
  const shot1Scale = p3_shot1 < 0.25
    ? 0.88 + easeInOutCubic(p3_shot1 / 0.25) * 0.12
    : 1.0 + (p3_shot1 - 0.25) * 0.04;
  const shot1TranslateY = p3_shot1 < 0.25
    ? (1 - easeInOutCubic(p3_shot1 / 0.25)) * 40
    : p3_shot1 > 0.75
    ? -easeInOutCubic((p3_shot1 - 0.75) / 0.25) * 40
    : 0;

  // Shot 2 (Horizontal Steering Wheel: /f1/steering wheels.png)
  const p3_shot2 = clamp((p3 - 0.45) / 0.55);
  const shot2Opacity = p3_shot2 < 0.25
    ? easeInOutCubic(p3_shot2 / 0.25)
    : p3_shot2 > 0.75
    ? 1 - easeInOutCubic((p3_shot2 - 0.75) / 0.25)
    : 1;
  const shot2Scale = p3_shot2 < 0.25
    ? 0.88 + easeInOutCubic(p3_shot2 / 0.25) * 0.12
    : 1.0 + (p3_shot2 - 0.25) * 0.04;
  const shot2TranslateY = p3_shot2 < 0.25
    ? (1 - easeInOutCubic(p3_shot2 / 0.25)) * 40
    : p3_shot2 > 0.75
    ? -easeInOutCubic((p3_shot2 - 0.75) / 0.25) * 40
    : 0;

  // Active Shot Label Indicator
  const currentSteeringShot = p3 < 0.50 ? 'SHOT 01 // VERTICAL ERGONOMICS' : 'SHOT 02 // DUAL-PADDLE ASSEMBLY';

  // =========================================================================
  // STAGE 4 — BRAKE (0.70 to 0.86) — /f1/break.jpg
  // =========================================================================
  const p4 = clamp((journeyProgress - 0.70) / 0.16);
  const s4Opacity = p4 < 0.25
    ? easeInOutCubic(p4 / 0.25)
    : p4 > 0.75
    ? 1 - easeInOutCubic((p4 - 0.75) / 0.25)
    : 1;
  const s4Scale = p4 < 0.25
    ? 0.85 + easeInOutCubic(p4 / 0.25) * 0.15
    : 1.0 + (p4 - 0.25) * 0.04;
  const s4TranslateY = p4 < 0.25
    ? (1 - easeInOutCubic(p4 / 0.25)) * 60
    : p4 > 0.75
    ? -easeInOutCubic((p4 - 0.75) / 0.25) * 60
    : 0;

  // =========================================================================
  // STAGE 5 — THE JOURNEY CONTINUES (0.86 to 1.00)
  // Final resting state — remains 100% visible at the end of the scroll track!
  // =========================================================================
  const p5 = clamp((journeyProgress - 0.86) / 0.14);
  const s5Opacity = easeInOutCubic(clamp(p5 / 0.5));
  const s5TranslateY = (1 - easeInOutCubic(clamp(p5 / 0.5))) * 40;

  // Active stage name for dynamic status pill
  const activeStageName = journeyProgress < 0.18
    ? 'JOURNEY INTRODUCTION'
    : journeyProgress < 0.42
    ? '01 — THE FIRST TEST'
    : journeyProgress < 0.70
    ? `02 — STEERING (${currentSteeringShot})`
    : journeyProgress < 0.86
    ? '03 — BRAKE SYSTEM'
    : 'THE JOURNEY CONTINUES';

  return (
    <div ref={trackRef} className="relative w-full h-[520vh] bg-[#07080a] text-white select-none">
      {/* Sticky Viewport Container Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#07080a]">
        {/* Background Radial Vignette */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-50" />

        {/* Dynamic Stage Indicator Pill */}
        <div className="absolute top-8 left-8 sm:left-12 z-30 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-[#0d1017]/90 border border-[#1f2430] backdrop-blur-md text-[10px] font-mono tracking-widest text-[#8e9aa8] uppercase flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
            <span>STORY SEQUENCE // {activeStageName}</span>
          </div>
        </div>

        {/* 
          ========================================================
          STAGE 1 — JOIN THE JOURNEY
          ========================================================
        */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-12 text-center pointer-events-none"
          style={{
            opacity: s1Opacity,
            transform: `translate3d(0, ${s1TranslateY}px, 0)`,
            visibility: s1Opacity <= 0.005 ? 'hidden' : 'visible',
          }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822]/90 border border-[#1f2430] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
              BEHIND THE SCENES
            </span>
          </div>

          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display max-w-5xl text-white leading-tight">
            JOIN THE <span className="text-[#e10600]">JOURNEY</span>
          </h2>

          <p className="mt-6 text-sm sm:text-xl font-mono text-[#8e9aa8] tracking-widest uppercase max-w-2xl leading-relaxed">
            Building the racing experience, one component at a time.
          </p>
        </div>

        {/* 
          ========================================================
          STAGE 2 — 01 THE FIRST TEST (Vertical Portrait Video)
          ========================================================
        */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
          style={{
            opacity: s2Opacity,
            transform: `translate3d(0, ${s2TranslateY}px, 0)`,
            visibility: s2Opacity <= 0.005 ? 'hidden' : 'visible',
          }}
        >
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Flanking Typography (Desktop) */}
            <div
              className="lg:w-1/3 text-left transition-transform"
              style={{ transform: `translate3d(${s2SideLeftX}px, 0, 0)` }}
            >
              <div className="text-5xl sm:text-7xl font-extrabold font-display text-[#e10600] opacity-90 mb-2">
                01
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
                THE FIRST <span className="text-[#e10600]">TEST</span>
              </h3>
              <p className="hidden lg:block text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                Testing sensors, inputs and control systems became the first step toward connecting the physical world with the digital one.
              </p>
            </div>

            {/* Center Vertical Portrait Video Container */}
            <div
              className="relative flex items-center justify-center transition-transform"
              style={{ transform: `scale(${s2VideoScale})` }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#1f2430] bg-[#090b10] shadow-[0_0_60px_rgba(225,6,0,0.18)]">
                <video
                  src="/f1/testing.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[55vh] sm:h-[65vh] max-h-[620px] w-auto aspect-[9/16] object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/60 via-transparent to-[#07080a]/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center text-[9px] font-mono tracking-widest text-[#8e9aa8] uppercase bg-[#0d1017]/80 backdrop-blur-md py-1 rounded border border-white/10">
                  PORTRAIT TELEMETRY RECORDING
                </div>
              </div>
            </div>

            {/* Right Flanking Typography (Desktop) */}
            <div
              className="lg:w-1/3 text-left transition-transform"
              style={{ transform: `translate3d(${s2SideRightX}px, 0, 0)` }}
            >
              <div className="inline-block px-3 py-1 rounded bg-[#141822] border border-[#1f2430] text-[10px] font-mono text-[#e10600] font-bold tracking-widest uppercase mb-3">
                BEFORE THE SIMULATOR, THERE WAS EXPERIMENTATION
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#8e9aa8] leading-relaxed uppercase">
                Testing sensors, inputs and control systems became the first step toward connecting the physical world with the digital one.
              </p>
            </div>
          </div>
        </div>

        {/* 
          ========================================================
          STAGE 3 — 02 BUILDING THE COMPONENTS (STEERING WHEEL 2-SHOT REVEAL)
          ========================================================
        */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
          style={{
            opacity: s3SectionOpacity,
            transform: `translate3d(0, ${s3SectionTranslateY}px, 0)`,
            visibility: s3SectionOpacity <= 0.005 ? 'hidden' : 'visible',
          }}
        >
          <div className="max-w-6xl w-full flex flex-col items-center text-center relative">
            {/* Anchored Stage Header */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822] border border-[#1f2430] mb-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                02 // BUILDING THE COMPONENTS
              </span>
            </div>

            <h3 className="text-3xl sm:text-6xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
              STEERING <span className="text-[#e10600]">SYSTEM</span>
            </h3>

            <p className="text-xs sm:text-base font-mono text-[#8e9aa8] max-w-xl uppercase mb-6">
              Designed to become the driver's primary connection to the simulation.
            </p>

            {/* Crossfading 2-Shot Image Container */}
            <div className="relative w-full max-w-3xl min-h-[50vh] flex items-center justify-center">
              {/* SHOT 1: Vertical Steering Wheel (/f1/steering wheel.jpg) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-150"
                style={{
                  opacity: shot1Opacity,
                  transform: `translate3d(0, ${shot1TranslateY}px, 0) scale(${shot1Scale})`,
                  visibility: shot1Opacity <= 0.005 ? 'hidden' : 'visible',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#1f2430] bg-[#090b10] shadow-[0_0_70px_rgba(225,6,0,0.2)] p-2">
                  <img
                    src="/f1/steering wheel.jpg"
                    alt="F1 Steering Wheel Vertical Ergonomics Test"
                    className="w-auto h-auto max-h-[46vh] object-contain rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-center text-[9px] font-mono tracking-widest text-[#e10600] font-bold uppercase bg-[#0d1017]/85 backdrop-blur-md py-1 rounded border border-[#e10600]/30">
                    SHOT 01 — VERTICAL ERGONOMICS TEST
                  </div>
                </div>
              </div>

              {/* SHOT 2: Horizontal Steering Wheel (/f1/steering wheels.png) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-150"
                style={{
                  opacity: shot2Opacity,
                  transform: `translate3d(0, ${shot2TranslateY}px, 0) scale(${shot2Scale})`,
                  visibility: shot2Opacity <= 0.005 ? 'hidden' : 'visible',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#1f2430] bg-[#090b10] shadow-[0_0_70px_rgba(225,6,0,0.2)] p-2 w-full">
                  <img
                    src="/f1/steering wheels.png"
                    alt="F1 Steering Wheel Horizontal Dual-Paddle Assembly"
                    className="w-full h-auto max-h-[46vh] object-contain rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-center text-[9px] font-mono tracking-widest text-[#e10600] font-bold uppercase bg-[#0d1017]/85 backdrop-blur-md py-1 rounded border border-[#e10600]/30">
                    SHOT 02 — DUAL-PADDLE COCKPIT ASSEMBLY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          ========================================================
          STAGE 4 — BRAKE (/f1/break.jpg)
          ========================================================
        */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-12 pointer-events-none"
          style={{
            opacity: s4Opacity,
            transform: `translate3d(0, ${s4TranslateY}px, 0)`,
            visibility: s4Opacity <= 0.005 ? 'hidden' : 'visible',
          }}
        >
          <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Brake Image Showcase */}
            <div
              className="lg:w-1/2 w-full flex items-center justify-center transition-transform"
              style={{ transform: `scale(${s4Scale})` }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#1f2430] bg-[#090b10] shadow-[0_0_70px_rgba(225,6,0,0.2)] p-2">
                <img
                  src="/f1/break.jpg"
                  alt="F1 Brake System Component"
                  className="w-full h-auto max-h-[50vh] object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Brake Description */}
            <div className="lg:w-1/2 w-full text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822] border border-[#1f2430] mb-4">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                  PHYSICAL INPUT ASSEMBLY
                </span>
              </div>

              <h3 className="text-3xl sm:text-6xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
                BRAKE <span className="text-[#e10600]">SYSTEM</span>
              </h3>

              <p className="text-xs sm:text-base font-mono text-[#8e9aa8] leading-relaxed uppercase">
                Another physical input taking shape as part of the racing system.
              </p>
            </div>
          </div>
        </div>

        {/* 
          ========================================================
          STAGE 5 — THE JOURNEY CONTINUES (Final Visible State — No Empty Black Space)
          ========================================================
        */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-12 text-center pointer-events-none"
          style={{
            opacity: s5Opacity,
            transform: `translate3d(0, ${s5TranslateY}px, 0)`,
            visibility: s5Opacity <= 0.005 ? 'hidden' : 'visible',
          }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822] border border-[#1f2430] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
              NEXT ERA IN DEVELOPMENT
            </span>
          </div>

          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display max-w-5xl text-white leading-tight">
            THE JOURNEY <span className="text-[#e10600]">CONTINUES</span>
          </h2>

          <p className="mt-6 text-sm sm:text-xl font-mono text-[#8e9aa8] tracking-widest uppercase max-w-2xl leading-relaxed">
            From individual components to a complete racing experience.
          </p>

          <div className="mt-12 text-[10px] font-mono tracking-[0.3em] text-[#525d70] uppercase">
            SIMULATOR SYSTEM ARCHITECTURE // IN ACTIVE DEVELOPMENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneySection;
