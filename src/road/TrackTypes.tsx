import React from 'react';
import { TRACK_TYPES } from './roadData';
import { ScrollReveal } from '../components/ScrollReveal';

export const TrackTypes: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#07080a] text-white border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 02 / Typology
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display uppercase">
              WHAT IS AN <span className="text-[#e10600]">F1 CIRCUIT?</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-2xl leading-relaxed uppercase">
              Every Grand Prix circuit falls into three fundamental archetypes. Each demands a distinct aerodynamic compromise,
              braking strategy, and psychological threshold.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Typology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TRACK_TYPES.map((item, idx) => (
            <ScrollReveal key={idx} delayMs={idx * 150} variant="fade-up">
              <div className="flex flex-col justify-between bg-[#0a0c12] border border-[#1e2330] hover:border-[#e10600]/40 rounded-lg p-6 sm:p-8 transition-all duration-300 shadow-xl group h-full">
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                      0{idx + 1}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-[#8e9aa8] bg-[#141722] px-2.5 py-0.5 rounded uppercase border border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white group-hover:text-[#e10600] transition-colors">
                    {item.type}
                  </h3>
                  <div className="text-[10px] font-mono text-[#525d70] tracking-wider uppercase mt-1 mb-4">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed mb-6 uppercase">
                    {item.description}
                  </p>

                  {/* Key Specifications Table */}
                  <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col text-left py-1">
                        <span className="text-[9px] font-mono text-[#525d70] uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-[11px] font-mono text-white font-semibold uppercase">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notable Circuit Examples */}
                <div className="pt-4 border-t border-white/5">
                  <div className="text-[9px] font-mono text-[#525d70] uppercase tracking-wider mb-2">
                    Historic Venues:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.examples.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        className="text-[9px] font-mono text-[#cbd5e1] bg-[#111520] px-2 py-0.5 rounded border border-white/5 uppercase"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
