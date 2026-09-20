import React, { useEffect } from 'react';
import { RaceEvent } from '../data/f1RacesData';
import { X, Calendar, MapPin, Trophy, Flag, Clock, Gauge, Compass } from 'lucide-react';

interface RaceDetailModalProps {
  race: RaceEvent | null;
  onClose: () => void;
}

export const RaceDetailModal: React.FC<RaceDetailModalProps> = ({ race, onClose }) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (race) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [race]);

  if (!race) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in select-none">
      <div
        className="relative w-full max-w-3xl bg-[#090b10] border border-[#1f2430] rounded-xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#0d1017] via-[#141923] to-[#0d1017] border-b border-[#1f2430]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#1b202e] hover:bg-[#e10600] text-[#8e9aa8] hover:text-white transition-all duration-200 cursor-pointer"
            aria-label="Close detail view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#e10600]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
              ROUND {race.round} // {race.countryCode}
            </span>
            {race.isSprint && (
              <span className="text-[9px] font-mono tracking-widest bg-[#e10600]/20 text-[#e10600] border border-[#e10600]/40 px-2 py-0.5 rounded font-bold uppercase">
                SPRINT WEEKEND
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
            {race.name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8e9aa8]">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#e10600]" />
              <span>{race.circuit}, {race.location}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#e10600]" />
              <span>{race.dateDisplay}</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Summary / Description */}
          {race.summary && (
            <div className="bg-[#0e1118] border border-white/5 rounded-lg p-4 sm:p-5">
              <div className="text-[10px] font-mono tracking-widest text-[#525d70] uppercase mb-1">
                GRAND PRIX DOSSIER
              </div>
              <p className="text-sm font-sans text-[#cbd5e1] leading-relaxed">
                {race.summary}
              </p>
            </div>
          )}

          {/* If completed, show race winner & podium */}
          {race.isCompleted && race.podium && (
            <div className="bg-[#0d1017] border border-[#1f2430] rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#e10600]" />
                <h3 className="text-xs font-mono tracking-[0.2em] text-white font-bold uppercase">
                  OFFICIAL PODIUM RESULT
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* P1 Winner */}
                <div className="p-4 rounded-lg bg-[#e10600]/10 border border-[#e10600]/30 text-center relative overflow-hidden">
                  <div className="text-[10px] font-mono tracking-widest text-[#e10600] font-bold uppercase mb-1">
                    P1 WINNER
                  </div>
                  <div className="text-lg font-extrabold font-display text-white uppercase">
                    {race.podium.p1}
                  </div>
                  <div className="text-xs font-mono text-[#8e9aa8] mt-0.5">
                    {race.winnerTeam}
                  </div>
                </div>

                {/* P2 */}
                <div className="p-4 rounded-lg bg-[#141923] border border-white/10 text-center">
                  <div className="text-[10px] font-mono tracking-widest text-[#8e9aa8] font-bold uppercase mb-1">
                    P2 PODIUM
                  </div>
                  <div className="text-base font-bold font-display text-white uppercase">
                    {race.podium.p2}
                  </div>
                </div>

                {/* P3 */}
                <div className="p-4 rounded-lg bg-[#141923] border border-white/10 text-center">
                  <div className="text-[10px] font-mono tracking-widest text-[#8e9aa8] font-bold uppercase mb-1">
                    P3 PODIUM
                  </div>
                  <div className="text-base font-bold font-display text-white uppercase">
                    {race.podium.p3}
                  </div>
                </div>
              </div>

              {/* Pole & Fastest Lap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                {race.polePosition && (
                  <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[#525d70]">POLE POSITION</span>
                    <span className="text-white font-bold">{race.polePosition}</span>
                  </div>
                )}
                {race.fastestLap && (
                  <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded bg-black/40 border border-white/5">
                    <span className="text-[#525d70]">FASTEST LAP</span>
                    <span className="text-white font-bold">{race.fastestLap.driver} ({race.fastestLap.time})</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Circuit Technical Specifications */}
          <div className="bg-[#0d1017] border border-[#1f2430] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-[#e10600]" />
              <h3 className="text-xs font-mono tracking-[0.2em] text-white font-bold uppercase">
                CIRCUIT TECHNICAL METRICS
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded bg-[#141822] border border-white/5">
                <div className="text-[9px] font-mono text-[#525d70] uppercase">Circuit Length</div>
                <div className="text-base font-mono font-bold text-white mt-0.5">
                  {race.circuitLengthKm ? `${race.circuitLengthKm} km` : 'TBD'}
                </div>
              </div>
              <div className="p-3 rounded bg-[#141822] border border-white/5">
                <div className="text-[9px] font-mono text-[#525d70] uppercase">Total Laps</div>
                <div className="text-base font-mono font-bold text-white mt-0.5">
                  {race.laps || 'TBD'}
                </div>
              </div>
              <div className="p-3 rounded bg-[#141822] border border-white/5">
                <div className="text-[9px] font-mono text-[#525d70] uppercase">Race Distance</div>
                <div className="text-base font-mono font-bold text-white mt-0.5">
                  {race.distanceKm ? `${race.distanceKm} km` : 'TBD'}
                </div>
              </div>
              <div className="p-3 rounded bg-[#141822] border border-white/5">
                <div className="text-[9px] font-mono text-[#525d70] uppercase">Corners</div>
                <div className="text-base font-mono font-bold text-white mt-0.5">
                  {race.corners || 'TBD'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#07080a] border-t border-[#1f2430] flex items-center justify-between">
          <div className="text-[10px] font-mono text-[#525d70] uppercase">
            STATUS: {race.isCompleted ? 'COMPLETED RESULT' : 'UPCOMING GRAND PRIX'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#e10600] hover:bg-[#b80500] text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
