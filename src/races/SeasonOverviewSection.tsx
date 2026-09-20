import React from 'react';
import { F1_2026_DATA } from '../data/f1RacesData';
import { ArrowUp, RefreshCw, Cpu, Gauge, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SeasonOverviewSectionProps {
  onReturnToTop: () => void;
}

export const SeasonOverviewSection: React.FC<SeasonOverviewSectionProps> = ({ onReturnToTop }) => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent text-white border-t border-[#1a1d26] select-none">
      <div className="max-w-7xl mx-auto text-left">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#e10600]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
              Section 05 // Season Overview & Technical Era
            </span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight font-display uppercase mb-6">
            THE <span className="text-[#e10600]">2026 ERA</span>
          </h2>
        </ScrollReveal>

        {/* Editorial Content Cards Grid - Progressive Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Active Aerodynamics */}
          <ScrollReveal delayMs={0} variant="fade-up">
            <div className="bg-[#090b10]/90 backdrop-blur-md border border-[#1f2430] p-6 sm:p-8 rounded-xl h-full">
              <Cpu className="w-6 h-6 text-[#e10600] mb-4" />
              <h3 className="text-lg font-extrabold font-display uppercase tracking-tight text-white mb-2">
                Active Aerodynamics
              </h3>
              <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                2026 introduced dynamic front and rear wing active aero configurations (Z-mode for cornering downforce, X-mode for low-drag straightline speed), revolutionizing wheel-to-wheel overtaking dynamics.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: 100% Sustainable Fuel */}
          <ScrollReveal delayMs={150} variant="fade-up">
            <div className="bg-[#090b10]/90 backdrop-blur-md border border-[#1f2430] p-6 sm:p-8 rounded-xl h-full">
              <Zap className="w-6 h-6 text-[#e10600] mb-4" />
              <h3 className="text-lg font-extrabold font-display uppercase tracking-tight text-white mb-2">
                100% Advanced Sustainable Fuels
              </h3>
              <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                The 2026 power unit regulations mandate drop-in 100% sustainable fuels paired with an amplified 350kW MGU-K electrical deployment ratio for net-zero carbon racing.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3: 11-Team Grid */}
          <ScrollReveal delayMs={300} variant="fade-up">
            <div className="bg-[#090b10]/90 backdrop-blur-md border border-[#1f2430] p-6 sm:p-8 rounded-xl h-full">
              <Gauge className="w-6 h-6 text-[#e10600] mb-4" />
              <h3 className="text-lg font-extrabold font-display uppercase tracking-tight text-white mb-2">
                11-Team Expanded Grid
              </h3>
              <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                Cadillac Formula 1 Team joined the grid with Sergio Pérez and Valtteri Bottas, expanding the championship to 22 drivers across 11 world-class constructors.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Data Freshness Metadata Badge */}
        <ScrollReveal delayMs={200} variant="scale">
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-[#0d1017]/90 backdrop-blur-md border border-[#1f2430] gap-4">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-4 h-4 text-[#e10600] animate-spin" />
              <div>
                <div className="text-[10px] font-mono text-[#525d70] uppercase">DATA ARCHITECTURE METADATA</div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  LAST UPDATED: <span className="text-[#e10600]">{F1_2026_DATA.lastUpdated}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onReturnToTop}
              className="flex items-center space-x-2 px-5 py-2.5 rounded bg-[#141822] hover:bg-[#e10600] text-white text-xs font-mono tracking-widest uppercase transition-all duration-200 border border-white/10 cursor-pointer"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
