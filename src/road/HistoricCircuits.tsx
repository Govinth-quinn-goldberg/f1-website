import React from 'react';
import { HISTORIC_CIRCUITS, CircuitDetailData } from './roadData';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface HistoricCircuitsProps {
  selectedCircuitId: string;
  onSelectCircuit: (id: 'monaco' | 'monza' | 'spa') => void;
}

export const HistoricCircuits: React.FC<HistoricCircuitsProps> = ({
  selectedCircuitId,
  onSelectCircuit,
}) => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#07080a] text-white border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Sections 04 & 05 / Circuit Selection
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display uppercase">
              CIRCUITS THAT <span className="text-[#e10600]">MADE HISTORY</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-2xl leading-relaxed uppercase">
              Three iconic venues that have hosted Formula 1 since the inaugural 1950 championship season. Select a circuit
              to open its complete historical chapter.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Large Visual Choice Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HISTORIC_CIRCUITS.map((circuit: CircuitDetailData, idx: number) => {
            const isSelected = selectedCircuitId === circuit.id;

            return (
              <ScrollReveal key={circuit.id} delayMs={idx * 150} variant="fade-up">
                <div
                  onClick={() => onSelectCircuit(circuit.id)}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer group select-none h-full ${
                    isSelected
                      ? 'border-[#e10600] ring-2 ring-[#e10600]/30 shadow-2xl bg-[#0d1017]'
                      : 'border-[#1f2430] hover:border-[#e10600]/50 bg-[#090b10]'
                  }`}
                >
                  {/* Hero Image Header with Gradient Veil */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                    <img
                      src={circuit.heroImage}
                      alt={circuit.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 uppercase font-bold">
                        {circuit.country}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] font-mono tracking-widest text-white bg-[#e10600] px-2.5 py-1 rounded font-bold uppercase shadow-lg">
                          ACTIVE CHAPTER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow text-left">
                    <div>
                      <div className="text-[10px] font-mono tracking-[0.2e] text-[#e10600] uppercase font-bold mb-1">
                        {circuit.tagline}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
                        {circuit.name}
                      </h3>
                      <div className="text-xs font-mono text-[#8e9aa8] mb-6">
                        {circuit.location}
                      </div>

                      {/* Quick Metric Trio */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-6">
                        <div>
                          <div className="text-[9px] font-mono text-[#525d70] uppercase">Length</div>
                          <div className="text-sm font-mono font-bold text-white mt-0.5">{circuit.lengthKm} km</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-[#525d70] uppercase">Corners</div>
                          <div className="text-sm font-mono font-bold text-white mt-0.5">{circuit.corners}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-[#525d70] uppercase">First GP</div>
                          <div className="text-sm font-mono font-bold text-white mt-0.5">1950</div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCircuit(circuit.id);
                      }}
                      className={`w-full py-2.5 px-4 rounded flex items-center justify-between text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#e10600] text-white font-bold shadow-lg'
                          : 'bg-[#141822] group-hover:bg-[#e10600] text-[#cbd5e1] group-hover:text-white border border-white/10'
                      }`}
                    >
                      <span>{isSelected ? 'EXPLORING CHAPTER' : 'ENTER CHAPTER'}</span>
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
