import React from 'react';
import { TRACK_ANATOMY_PILLARS } from './roadData';
import { ScrollReveal } from '../components/ScrollReveal';

export const TrackAnatomy: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#090b10] text-white border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 03 / Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display uppercase">
              THE ANATOMY OF <span className="text-[#e10600]">SPEED</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-2xl leading-relaxed uppercase">
              What transforms an ordinary stretch of road into an FIA Grade 1 circuit? Six physical vectors governing
              downforce, kinetic deceleration, and tire degradation.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Grid Infographic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACK_ANATOMY_PILLARS.map((pillar, idx) => (
            <ScrollReveal key={idx} delayMs={(idx % 3) * 120} variant="fade-up">
              <div className="bg-[#0b0e15] border border-[#1b202c] hover:border-[#e10600]/40 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-md text-left group h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#e10600]">
                      {pillar.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-[#525d70] uppercase">
                      {pillar.description}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display uppercase tracking-tight text-white group-hover:text-[#e10600] transition-colors mb-1">
                    {pillar.title}
                  </h3>

                  <div className="text-2xl font-extrabold font-mono tracking-tight text-white mb-3 flex items-baseline space-x-1">
                    <span className="text-[#e10600] font-mono text-sm mr-1">●</span>
                    <span>{pillar.metric}</span>
                  </div>

                  <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                    {pillar.detail}
                  </p>
                </div>

                {/* Subtle visual measurement indicator */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#525d70]">
                  <span>FIA SPECIFICATION</span>
                  <span className="w-12 h-[1px] bg-[#e10600]/30" />
                  <span>ACTIVE METRIC</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
