import React, { useState } from 'react';
import { F1_2026_DATA, DriverStanding, ConstructorStanding } from '../data/f1RacesData';
import { Trophy, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ChampionshipSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers');

  const { driverStandings, constructorStandings } = F1_2026_DATA;

  return (
    <section id="championship" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-transparent text-white border-t border-[#1a1d26] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Tab Selector - Progressive Reveal */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#e10600]" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
                  Section 04 // Official Standings
                </span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight font-display uppercase">
                CHAMPIONSHIP <span className="text-[#e10600]">STANDINGS</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-xl uppercase">
                Full verified 2026 points standings after Round 14 (Madrid GP).
              </p>
            </div>

            {/* Toggle Switcher: DRIVERS | CONSTRUCTORS */}
            <div className="flex items-center bg-[#0d1017]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#1f2430] self-start md:self-auto">
              <button
                onClick={() => setActiveTab('drivers')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'drivers'
                    ? 'bg-[#e10600] text-white font-bold shadow-lg'
                    : 'text-[#8e9aa8] hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>DRIVERS ({driverStandings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('constructors')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeTab === 'constructors'
                    ? 'bg-[#e10600] text-white font-bold shadow-lg'
                    : 'text-[#8e9aa8] hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>CONSTRUCTORS ({constructorStandings.length})</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* DRIVERS TABLE */}
        {activeTab === 'drivers' && (
          <ScrollReveal delayMs={100} variant="scale">
            <div className="bg-[#090b10]/95 backdrop-blur-md border border-[#1f2430] rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#0d1017] border-b border-[#1f2430] text-[10px] font-mono tracking-[0.2em] text-[#525d70] uppercase">
                      <th className="py-4 px-6 w-16 text-center">POS</th>
                      <th className="py-4 px-4 w-16 text-center">NO</th>
                      <th className="py-4 px-6">DRIVER</th>
                      <th className="py-4 px-6">TEAM</th>
                      <th className="py-4 px-4 text-center">WINS</th>
                      <th className="py-4 px-4 text-center">PODIUMS</th>
                      <th className="py-4 px-6 text-right">POINTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-mono">
                    {driverStandings.map((driver: DriverStanding) => {
                      const isTop3 = driver.position <= 3;
                      return (
                        <tr
                          key={driver.driverCode}
                          className="hover:bg-[#141824] transition-colors duration-150 group"
                        >
                          {/* POS */}
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded font-extrabold text-xs ${
                                driver.position === 1
                                  ? 'bg-[#e10600] text-white shadow-md'
                                  : isTop3
                                  ? 'bg-[#1e2433] text-white border border-white/20'
                                  : 'text-[#8e9aa8]'
                              }`}
                            >
                              {driver.position}
                            </span>
                          </td>

                          {/* NUMBER */}
                          <td className="py-4 px-4 text-center font-bold text-[#8e9aa8] group-hover:text-white">
                            #{driver.number}
                          </td>

                          {/* DRIVER NAME */}
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <span
                                className="w-1 h-5 rounded-full"
                                style={{ backgroundColor: driver.teamColor }}
                              />
                              <div>
                                <div className="font-extrabold font-display uppercase tracking-tight text-white group-hover:text-[#e10600] transition-colors">
                                  {driver.driver}
                                </div>
                                <div className="text-[10px] text-[#525d70] uppercase">
                                  {driver.country}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* TEAM */}
                          <td className="py-4 px-6 text-xs text-[#8e9aa8] group-hover:text-white">
                            {driver.team}
                          </td>

                          {/* WINS */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-white">
                            {driver.wins}
                          </td>

                          {/* PODIUMS */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-[#8e9aa8] group-hover:text-white">
                            {driver.podiums}
                          </td>

                          {/* POINTS */}
                          <td className="py-4 px-6 text-right font-extrabold text-base text-white">
                            <span className="text-glow-red font-mono">{driver.points}</span>
                            <span className="text-[10px] text-[#525d70] ml-1 font-normal uppercase">PTS</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* CONSTRUCTORS TABLE */}
        {activeTab === 'constructors' && (
          <ScrollReveal delayMs={100} variant="scale">
            <div className="bg-[#090b10]/95 backdrop-blur-md border border-[#1f2430] rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#0d1017] border-b border-[#1f2430] text-[10px] font-mono tracking-[0.2em] text-[#525d70] uppercase">
                      <th className="py-4 px-6 w-16 text-center">POS</th>
                      <th className="py-4 px-6">CONSTRUCTOR / TEAM</th>
                      <th className="py-4 px-6">POWER UNIT</th>
                      <th className="py-4 px-6">DRIVERS</th>
                      <th className="py-4 px-4 text-center">WINS</th>
                      <th className="py-4 px-4 text-center">PODIUMS</th>
                      <th className="py-4 px-6 text-right">POINTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-mono">
                    {constructorStandings.map((team: ConstructorStanding) => {
                      return (
                        <tr
                          key={team.team}
                          className="hover:bg-[#141824] transition-colors duration-150 group"
                        >
                          {/* POS */}
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded font-extrabold text-xs ${
                                team.position === 1
                                  ? 'bg-[#e10600] text-white shadow-md'
                                  : 'bg-[#1e2433] text-white border border-white/10'
                              }`}
                            >
                              {team.position}
                            </span>
                          </td>

                          {/* TEAM */}
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <span
                                className="w-1.5 h-6 rounded-full"
                                style={{ backgroundColor: team.teamColor }}
                              />
                              <div className="font-extrabold font-display uppercase tracking-tight text-white group-hover:text-[#e10600] transition-colors">
                                {team.team}
                              </div>
                            </div>
                          </td>

                          {/* POWER UNIT */}
                          <td className="py-4 px-6 text-xs text-[#8e9aa8]">
                            {team.engine}
                          </td>

                          {/* DRIVERS */}
                          <td className="py-4 px-6 text-xs text-[#8e9aa8]">
                            {team.drivers.join(' / ')}
                          </td>

                          {/* WINS */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-white">
                            {team.wins}
                          </td>

                          {/* PODIUMS */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-[#8e9aa8]">
                            {team.podiums}
                          </td>

                          {/* POINTS */}
                          <td className="py-4 px-6 text-right font-extrabold text-base text-white">
                            <span className="text-glow-red font-mono">{team.points}</span>
                            <span className="text-[10px] text-[#525d70] ml-1 font-normal uppercase">PTS</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
