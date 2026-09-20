import React from 'react';
import { RaceEvent } from '../data/f1RacesData';
import { Trophy, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface RecentRacesSectionProps {
  recentRaces: RaceEvent[];
  seasonYear?: number;
  onSelectRace: (race: RaceEvent) => void;
}

export const RecentRacesSection: React.FC<RecentRacesSectionProps> = ({
  recentRaces,
  seasonYear = 2026,
  onSelectRace,
}) => {

  return (
    <section id="recent-races" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent text-white border-t border-[#1a1d26] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 02 // Official Results
              </span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight font-display uppercase">
              RECENT <span className="text-[#e10600]">RACES</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-2xl leading-relaxed uppercase">
              The {recentRaces.length} most recently completed Formula 1 Grands Prix of the {seasonYear} season. Click any Grand Prix card to open its detailed race dossier and podium breakdown.
            </p>
          </div>
        </ScrollReveal>

        {/* 10 Recent Races Grid - Progressive scroll reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRaces.map((race: RaceEvent, idx: number) => (
            <ScrollReveal
              key={race.round}
              delayMs={(idx % 3) * 120} // Staggered entrance timing for cards in grid rows
              variant="fade-up"
            >
              <div
                onClick={() => onSelectRace(race)}
                className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#1f2430] hover:border-[#e10600]/60 bg-[#090b10]/90 backdrop-blur-md hover:bg-[#0d1017] transition-all duration-300 cursor-pointer group p-6 shadow-lg text-left h-full"
              >
                {/* Top Meta Bar */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                      ROUND {race.round}
                    </span>
                    <div className="flex items-center space-x-2">
                      {race.isSprint && (
                        <span className="text-[9px] font-mono tracking-widest text-[#e10600] bg-[#e10600]/15 border border-[#e10600]/30 px-2 py-0.5 rounded font-bold uppercase">
                          SPRINT
                        </span>
                      )}
                      <span className="text-[10px] font-mono tracking-widest text-white bg-[#141822] px-2 py-0.5 rounded border border-white/10 font-bold uppercase">
                        {race.countryCode}
                      </span>
                    </div>
                  </div>

                  {/* Grand Prix Name */}
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display uppercase tracking-tight text-white group-hover:text-[#e10600] transition-colors mb-1">
                    {race.name}
                  </h3>

                  {/* Location & Date */}
                  <div className="flex flex-col space-y-1 text-xs font-mono text-[#8e9aa8] mb-5">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-3 h-3 text-[#525d70]" />
                      <span>{race.location}, {race.country}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3 text-[#525d70]" />
                      <span>{race.dateDisplay}</span>
                    </span>
                  </div>

                  {/* Race Winner & Podium Pill */}
                  {race.winner && (
                    <div className="bg-[#141923]/90 border border-white/10 rounded-lg p-3.5 mb-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#525d70] uppercase">
                          <Trophy className="w-3 h-3 text-[#e10600]" />
                          <span>Race Winner</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#e10600] font-bold">P1</span>
                      </div>

                      <div className="text-base font-extrabold font-display text-white uppercase">
                        {race.winner}
                      </div>

                      <div className="text-xs font-mono text-[#8e9aa8]">
                        {race.winnerTeam}
                      </div>

                      {/* Podium Summary */}
                      {race.podium && (
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8e9aa8]">
                          <span>P2: <strong className="text-white">{race.podium.p2}</strong></span>
                          <span>P3: <strong className="text-white">{race.podium.p3}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono tracking-widest text-[#8e9aa8] group-hover:text-white uppercase transition-colors">
                  <span>VIEW RACE DOSSIER</span>
                  <ChevronRight className="w-4 h-4 text-[#e10600] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
