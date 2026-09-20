import React, { useState } from 'react';
import { RacesBackground } from './RacesBackground';
import { RaceHeroSection } from './RaceHeroSection';
import { RecentRacesSection } from './RecentRacesSection';
import { UpcomingRacesSection } from './UpcomingRacesSection';
import { ChampionshipSection } from './ChampionshipSection';
import { SeasonOverviewSection } from './SeasonOverviewSection';
import { RaceDetailModal } from './RaceDetailModal';
import { RaceEvent } from '../data/f1RacesData';
import { useF1Data } from '../hooks/useF1Data';

interface RacesPageProps {
  onNavigateHome?: () => void;
}

export const RacesPage: React.FC<RacesPageProps> = () => {
  const [selectedRace, setSelectedRace] = useState<RaceEvent | null>(null);
  const f1Data = useF1Data();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07080a] text-white selection:bg-[#e10600] selection:text-white overflow-x-hidden">
      {/* Cinematic F1 Celebration Background Visual Layer */}
      <RacesBackground />

      {/* Main Content Sections Layer (Positioned above fixed background) */}
      <div className="relative z-10 w-full">
        {/* 01 — RACE WEEKEND HERO */}
        <RaceHeroSection
          onScrollToSection={handleScrollToSection}
          seasonYear={f1Data.seasonData.seasonYear}
          nextRace={f1Data.nextRace}
          leaderDriver={f1Data.leaderDriver}
          leaderTeam={f1Data.leaderTeam}
          completedRacesCount={f1Data.completedRaces.length}
          totalRacesCount={f1Data.seasonData.races.length}
          lastUpdated={f1Data.seasonData.lastUpdated}
          isLoading={f1Data.isLoading}
          isFallback={f1Data.isFallback}
          onRefresh={f1Data.refetch}
        />

        {/* 02 — RECENT RACES */}
        <RecentRacesSection
          recentRaces={f1Data.recentRaces}
          seasonYear={f1Data.seasonData.seasonYear}
          onSelectRace={(race) => setSelectedRace(race)}
        />

        {/* 03 — UPCOMING RACES */}
        <UpcomingRacesSection
          upcomingRaces={f1Data.displayUpcomingRaces}
          seasonYear={f1Data.seasonData.seasonYear}
          onSelectRace={(race) => setSelectedRace(race)}
        />

        {/* 04 — CHAMPIONSHIP STANDINGS */}
        <ChampionshipSection
          driverStandings={f1Data.seasonData.driverStandings}
          constructorStandings={f1Data.seasonData.constructorStandings}
          seasonYear={f1Data.seasonData.seasonYear}
          completedRacesCount={f1Data.completedRaces.length}
        />

        {/* 05 — SEASON OVERVIEW / CLOSING */}
        <SeasonOverviewSection
          lastUpdated={f1Data.seasonData.lastUpdated}
          seasonYear={f1Data.seasonData.seasonYear}
          isFallback={f1Data.isFallback}
          onReturnToTop={handleReturnToTop}
        />
      </div>

      {/* RACE DETAIL OVERLAY DOSSIER MODAL */}
      <RaceDetailModal
        race={selectedRace}
        onClose={() => setSelectedRace(null)}
      />
    </div>
  );
};

export default RacesPage;
