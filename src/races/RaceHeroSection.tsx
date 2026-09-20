import React from 'react';
import { RaceEvent, DriverStanding, ConstructorStanding } from '../data/f1RacesData';
import { ChevronDown, Calendar, Trophy, Zap, Flag, RefreshCw, AlertTriangle, Activity } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface RaceHeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
  seasonYear?: number;
  nextRace?: RaceEvent;
  leaderDriver?: DriverStanding;
  leaderTeam?: ConstructorStanding;
  completedRacesCount?: number;
  totalRacesCount?: number;
  lastUpdated?: string;
  isLoading?: boolean;
  isFallback?: boolean;
  onRefresh?: () => void;
}

export const RaceHeroSection: React.FC<RaceHeroSectionProps> = ({
  onScrollToSection,
  seasonYear = 2026,
  nextRace,
  leaderDriver,
  leaderTeam,
  completedRacesCount = 0,
  totalRacesCount = 0,
  lastUpdated,
  isLoading = false,
  isFallback = false,
  onRefresh,
}) => {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 lg:px-16 bg-transparent text-white border-b border-[#1a1d26] select-none">
      {/* Background Subtle Gradient Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

      {/* Main Editorial Hero Block */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-left">
        {/* Season Pill Badge & Live API / Fallback Status */}
        <ScrollReveal delayMs={0} variant="fade-up">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#141822] border border-[#1f2430]">
              <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#e10600] font-bold uppercase">
                {seasonYear} FIA FORMULA ONE WORLD CHAMPIONSHIP
              </span>
            </div>

            {/* Live API / Fallback Indicator Badge */}
            {isLoading ? (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 text-[10px] font-mono tracking-widest uppercase">
                <RefreshCw className="w-3 h-3 animate-spin text-blue-400" />
                <span>CONNECTING TO JOLPICA F1 API...</span>
              </div>
            ) : isFallback ? (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] font-mono tracking-widest uppercase shadow-lg">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span className="font-bold">OFFLINE FALLBACK DATA ACTIVE</span>
                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    className="ml-1 underline hover:text-white transition-colors cursor-pointer"
                  >
                    RETRY
                  </button>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>LIVE API CONNECTED (JOLPICA F1)</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Editorial Heading */}
        <ScrollReveal delayMs={150} variant="fade-up">
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display leading-[0.9] text-white">
            RACE <span className="text-[#e10600]">WEEKEND</span>
          </h1>
        </ScrollReveal>

        {/* Editorial Subtitle */}
        <ScrollReveal delayMs={300} variant="fade-up">
          <p className="mt-6 text-sm sm:text-lg font-mono text-[#8e9aa8] max-w-3xl leading-relaxed uppercase">
            Tracking the latest completed Grands Prix, official results, upcoming calendar countdowns,
            and live {seasonYear} World Drivers' and Constructors' Championship standings from the Jolpica F1 API.
          </p>
        </ScrollReveal>

        {/* Quick Ticker Metric Bar */}
        <ScrollReveal delayMs={450} variant="scale">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 max-w-4xl">
            {/* Next Race */}
            <div className="bg-[#0d1017]/90 backdrop-blur-md p-4 rounded-lg border border-[#1f2430]">
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#525d70] uppercase">
                <Zap className="w-3 h-3 text-[#e10600]" />
                <span>Next Grand Prix</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-display text-white mt-1 uppercase truncate">
                {nextRace ? nextRace.name : 'SEASON COMPLETE'}
              </div>
              <div className="text-[10px] font-mono text-[#e10600] mt-0.5">
                {nextRace ? nextRace.dateDisplay : 'ALL RACES FINISHED'}
              </div>
            </div>

            {/* Championship Leader */}
            <div className="bg-[#0d1017]/90 backdrop-blur-md p-4 rounded-lg border border-[#1f2430]">
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#525d70] uppercase">
                <Trophy className="w-3 h-3 text-[#e10600]" />
                <span>P1 Driver Leader</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-display text-white mt-1 uppercase truncate">
                {leaderDriver ? leaderDriver.driver : 'TBD'}
              </div>
              <div className="text-[10px] font-mono text-[#8e9aa8] mt-0.5">
                {leaderDriver ? `${leaderDriver.points} PTS (${leaderDriver.team})` : ''}
              </div>
            </div>

            {/* Constructor Leader */}
            <div className="bg-[#0d1017]/90 backdrop-blur-md p-4 rounded-lg border border-[#1f2430]">
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#525d70] uppercase">
                <Flag className="w-3 h-3 text-[#e10600]" />
                <span>P1 Constructor</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-display text-white mt-1 uppercase truncate">
                {leaderTeam ? leaderTeam.team : 'TBD'}
              </div>
              <div className="text-[10px] font-mono text-[#8e9aa8] mt-0.5">
                {leaderTeam ? `${leaderTeam.points} PTS` : ''}
              </div>
            </div>

            {/* Season Progress */}
            <div className="bg-[#0d1017]/90 backdrop-blur-md p-4 rounded-lg border border-[#1f2430]">
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#525d70] uppercase">
                <Calendar className="w-3 h-3 text-[#e10600]" />
                <span>Season Status</span>
              </div>
              <div className="text-sm sm:text-base font-bold font-display text-white mt-1 uppercase">
                {completedRacesCount} / {totalRacesCount} COMPLETED
              </div>
              <div className="text-[10px] font-mono text-[#8e9aa8] mt-0.5">
                UPDATED {lastUpdated || 'LIVE'}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Navigation Quick Anchors & Scroll Cue */}
      <ScrollReveal delayMs={600} variant="fade-in">
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <button
              onClick={() => onScrollToSection('recent-races')}
              className="px-4 py-2 rounded bg-[#141822]/90 hover:bg-[#e10600] text-[#8e9aa8] hover:text-white border border-white/10 uppercase tracking-widest transition-all cursor-pointer"
            >
              02 RECENT RACES
            </button>
            <button
              onClick={() => onScrollToSection('upcoming-races')}
              className="px-4 py-2 rounded bg-[#141822]/90 hover:bg-[#e10600] text-[#8e9aa8] hover:text-white border border-white/10 uppercase tracking-widest transition-all cursor-pointer"
            >
              03 UPCOMING
            </button>
            <button
              onClick={() => onScrollToSection('championship')}
              className="px-4 py-2 rounded bg-[#141822]/90 hover:bg-[#e10600] text-[#8e9aa8] hover:text-white border border-white/10 uppercase tracking-widest transition-all cursor-pointer"
            >
              04 CHAMPIONSHIP
            </button>
          </div>

          <button
            onClick={() => onScrollToSection('recent-races')}
            className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#8e9aa8] hover:text-white uppercase cursor-pointer"
          >
            <span>EXPLORE SEASON</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#e10600]" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};
