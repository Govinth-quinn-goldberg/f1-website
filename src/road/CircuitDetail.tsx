import React from 'react';
import { HISTORIC_CIRCUITS, CircuitDetailData } from './roadData';
import { Trophy, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface CircuitDetailProps {
  selectedCircuitId: string;
}

export const CircuitDetail: React.FC<CircuitDetailProps> = ({ selectedCircuitId }) => {
  const circuit: CircuitDetailData =
    HISTORIC_CIRCUITS.find((c) => c.id === selectedCircuitId) || HISTORIC_CIRCUITS[0];

  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#08090d] text-white border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto text-left">
        {/* Chapter Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-12">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 06 / Chapter Dossier
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#8e9aa8] tracking-widest uppercase mb-1">
                  {circuit.country} · {circuit.location}
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display uppercase tracking-tight text-white">
                  {circuit.name}
                </h2>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono text-[#8e9aa8] bg-[#0e1118] px-4 py-2 rounded-lg border border-white/10 self-start lg:self-auto">
                <MapPin className="w-4 h-4 text-[#e10600]" />
                <span className="uppercase">{circuit.tagline}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Main Section: Track Map + Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Visual Circuit Layout Map (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delayMs={100} variant="fade-up">
              <div className="bg-[#0b0e15] border border-[#1b202c] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#e10600] uppercase">
                      Official Circuit Map & Schematic
                    </span>
                    <span className="text-[10px] font-mono text-[#525d70] uppercase">
                      {circuit.corners} Corners ({circuit.cornersLeft} Left · {circuit.cornersRight} Right)
                    </span>
                  </div>

                  {/* High-Resolution Circuit Map Image */}
                  <div className="relative w-full aspect-[16/10] bg-[#07080a] rounded-lg overflow-hidden border border-white/5 p-4 flex items-center justify-center">
                    <img
                      src={circuit.mapImage}
                      alt={`${circuit.name} Track Map`}
                      className="max-h-full max-w-full object-contain filter invert contrast-125 brightness-110 drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* Textual Turn-by-Turn Route Breakdown */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono text-[#8e9aa8] tracking-widest uppercase mb-2 font-semibold">
                    Turn-by-Turn Circuit Sequence:
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-2 scrollbar-thin">
                    {circuit.turnByTurnLayout.map((turn, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono text-[#cbd5e1] bg-[#141822] px-2 py-1 rounded border border-white/5 uppercase"
                      >
                        {turn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Key Statistics & Records (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Primary Metrics Card */}
            <ScrollReveal delayMs={150} variant="fade-up">
              <div className="bg-[#0b0e15] border border-[#1b202c] rounded-xl p-6 shadow-xl space-y-3">
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#e10600] uppercase pb-2 border-b border-white/5">
                  Grand Prix Specifications
                </h3>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <div className="text-[9px] font-mono text-[#525d70] uppercase">Circuit Length</div>
                    <div className="text-base font-mono font-bold text-white">{circuit.lengthKm} km ({circuit.lengthMiles} mi)</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#525d70] uppercase">Race Distance</div>
                    <div className="text-base font-mono font-bold text-white">{circuit.raceDistanceKm} km ({circuit.raceLaps} Laps)</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#525d70] uppercase">First Grand Prix</div>
                    <div className="text-xs font-mono font-bold text-white">{circuit.firstGrandPrix}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#525d70] uppercase">Elevation Delta</div>
                    <div className="text-base font-mono font-bold text-white">{circuit.elevationChangeMeters} meters</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Official Race Lap Record vs Fastest Recorded Lap */}
            <ScrollReveal delayMs={200} variant="fade-up">
              <div className="bg-[#0b0e15] border border-[#1b202c] rounded-xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#e10600] uppercase pb-2 border-b border-white/5 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#e10600]" />
                  <span>Lap Records (Official vs Fastest Recorded)</span>
                </h3>

                {/* 1. Official Race Lap Record */}
                <div className="p-3 bg-[#11141c] rounded border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-[#8e9aa8] font-bold uppercase">
                      OFFICIAL RACE LAP RECORD
                    </span>
                    <span className="text-sm font-mono font-bold text-[#e10600]">
                      {circuit.officialLapRecord.time}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-white font-semibold">
                    {circuit.officialLapRecord.driver} ({circuit.officialLapRecord.year})
                  </div>
                  <div className="text-[10px] font-mono text-[#525d70] mt-0.5">
                    {circuit.officialLapRecord.car} · {circuit.officialLapRecord.notes}
                  </div>
                </div>

                {/* 2. Qualifying / Fastest Recorded Lap */}
                <div className="p-3 bg-[#11141c] rounded border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-[#8e9aa8] font-bold uppercase">
                      FASTEST RECORDED LAP (QUALIFYING)
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                      {circuit.fastestRecordedLap.time}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-white font-semibold">
                    {circuit.fastestRecordedLap.driver} ({circuit.fastestRecordedLap.year})
                  </div>
                  <div className="text-[10px] font-mono text-[#525d70] mt-0.5">
                    {circuit.fastestRecordedLap.session} · {circuit.fastestRecordedLap.notes}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Most Wins */}
            <ScrollReveal delayMs={250} variant="fade-up">
              <div className="bg-[#0b0e15] border border-[#1b202c] rounded-xl p-5 shadow-xl flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-[#e10600]/10 border border-[#e10600]/30 text-[#e10600]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-[#525d70] uppercase">Most Circuit Victories</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">
                    {circuit.mostWins.driver} — {circuit.mostWins.wins} Wins
                  </div>
                  {circuit.mostWins.runnerUp && (
                    <div className="text-[9px] font-mono text-[#8e9aa8] mt-0.5">
                      Runner-up: {circuit.mostWins.runnerUp}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Notable Corners & Track Characteristics */}
        <div className="mb-16">
          <ScrollReveal variant="fade-up">
            <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mb-6 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
              <span>Notable Corner Profiles</span>
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {circuit.notableCorners.map((corner, cIdx) => (
              <ScrollReveal key={cIdx} delayMs={(cIdx % 3) * 100} variant="fade-up">
                <div className="bg-[#0b0e15] border border-[#1b202c] rounded-lg p-5 text-left shadow h-full">
                  <div className="text-[9px] font-mono text-[#e10600] font-bold uppercase mb-1">
                    {corner.number}
                  </div>
                  <div className="text-sm font-mono font-bold text-white uppercase mb-2">
                    {corner.name}
                  </div>
                  <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                    {corner.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Historical Moments & Lore */}
        <div className="mb-16">
          <ScrollReveal variant="fade-up">
            <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mb-6 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
              <span>Historic Moments & Lore</span>
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circuit.historicalMoments.map((moment, mIdx) => (
              <ScrollReveal key={mIdx} delayMs={mIdx * 120} variant="fade-up">
                <div className="bg-[#0b0e15] border border-[#1b202c] rounded-lg p-6 text-left shadow-lg h-full">
                  <div className="text-xs font-mono font-bold text-[#e10600] mb-1">
                    {moment.year}
                  </div>
                  <h4 className="text-base font-bold font-display uppercase text-white mb-2">
                    {moment.title}
                  </h4>
                  <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                    {moment.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Historical Fatalities & Safety Evolution (Dignified & Contextual) */}
        <ScrollReveal variant="fade-up">
          <div className="bg-[#0b0e15] border border-[#1f2430] border-l-4 border-l-[#e10600] rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-2 mb-2 text-[#e10600]">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">
                Historical Fatalities & Safety Evolution
              </span>
            </div>

            <div className="text-[10px] font-mono text-[#525d70] uppercase mb-3">
              Scope Definition: {circuit.historicalFatalities.definition}
            </div>

            <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed max-w-4xl uppercase mb-6">
              {circuit.historicalFatalities.context}
            </p>

            <div className="space-y-3">
              {circuit.historicalFatalities.notableRecords.map((record, rIdx) => (
                <div key={rIdx} className="bg-[#11141c] p-4 rounded border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-white">
                      {record.driver}
                    </span>
                    <span className="text-xs font-mono text-[#e10600] font-bold">
                      {record.year}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#8e9aa8] leading-relaxed uppercase">
                    {record.circumstances}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
