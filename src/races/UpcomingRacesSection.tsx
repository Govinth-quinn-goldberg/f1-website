import React, { useState, useEffect } from 'react';
import { RaceEvent } from '../data/f1RacesData';
import { Calendar, MapPin, Clock, ChevronRight, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface UpcomingRacesSectionProps {
  upcomingRaces: RaceEvent[];
  seasonYear?: number;
  onSelectRace: (race: RaceEvent) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<{ targetIso: string }> = ({ targetIso }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetIso).getTime();
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  return (
    <div className="grid grid-cols-4 gap-1.5 text-center bg-[#07090e] p-2.5 rounded-lg border border-white/10 font-mono">
      <div>
        <div className="text-sm sm:text-base font-bold text-white">{timeLeft.days}</div>
        <div className="text-[8px] text-[#525d70] uppercase">DAYS</div>
      </div>
      <div>
        <div className="text-sm sm:text-base font-bold text-white">{timeLeft.hours}</div>
        <div className="text-[8px] text-[#525d70] uppercase">HRS</div>
      </div>
      <div>
        <div className="text-sm sm:text-base font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-[8px] text-[#525d70] uppercase">MIN</div>
      </div>
      <div>
        <div className="text-sm sm:text-base font-bold text-[#e10600]">{timeLeft.seconds}</div>
        <div className="text-[8px] text-[#525d70] uppercase">SEC</div>
      </div>
    </div>
  );
};

export const UpcomingRacesSection: React.FC<UpcomingRacesSectionProps> = ({
  upcomingRaces,
  seasonYear = 2026,
  onSelectRace,
}) => {
  return (
    <section id="upcoming-races" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent text-white border-t border-[#1a1d26] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                Section 03 // Calendar Schedule
              </span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight font-display uppercase">
              UPCOMING <span className="text-[#e10600]">RACES</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-2xl leading-relaxed uppercase">
              The next scheduled Formula 1 Grands Prix on the {seasonYear} World Championship calendar with live real-time race countdowns.
            </p>
          </div>
        </ScrollReveal>

        {/* Upcoming Races Grid - Progressive scroll reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingRaces.map((race: RaceEvent, index: number) => {
            const isNextImmediate = index === 0;

            return (
              <ScrollReveal
                key={race.round}
                delayMs={(index % 3) * 120} // Staggered card entrance as user scrolls down
                variant="fade-up"
              >
                <div
                  onClick={() => onSelectRace(race)}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer group p-6 text-left h-full ${
                    isNextImmediate
                      ? 'border-[#e10600] ring-1 ring-[#e10600]/40 bg-[#0e111a]/95 backdrop-blur-md'
                      : 'border-[#1f2430] hover:border-[#e10600]/60 bg-[#090b10]/90 backdrop-blur-md hover:bg-[#0d1017]'
                  }`}
                >
                  {/* Top Header Pill */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                        ROUND {race.round}
                      </span>

                      <div className="flex items-center space-x-2">
                        {isNextImmediate && (
                          <span className="text-[9px] font-mono tracking-widest text-white bg-[#e10600] px-2.5 py-0.5 rounded font-bold uppercase shadow-md flex items-center space-x-1">
                            <Zap className="w-2.5 h-2.5" />
                            <span>NEXT RACE</span>
                          </span>
                        )}
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

                    {/* Location & Weekend Dates */}
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

                    {/* Real-time Countdown Timer */}
                    <div className="mb-5">
                      <div className="text-[9px] font-mono text-[#525d70] uppercase mb-1.5 flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5 text-[#e10600]" />
                        <span>Countdown to Lights Out</span>
                      </div>
                      <CountdownTimer targetIso={race.raceIsoTimestamp} />
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono tracking-widest text-[#8e9aa8] group-hover:text-white uppercase transition-colors">
                    <span>PREVIEW CIRCUIT</span>
                    <ChevronRight className="w-4 h-4 text-[#e10600] group-hover:translate-x-1 transition-transform" />
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
