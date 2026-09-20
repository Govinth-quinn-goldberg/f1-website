import React, { useState } from 'react';
import { RacesBackground } from './RacesBackground';
import { RaceHeroSection } from './RaceHeroSection';
import { RecentRacesSection } from './RecentRacesSection';
import { UpcomingRacesSection } from './UpcomingRacesSection';
import { ChampionshipSection } from './ChampionshipSection';
import { SeasonOverviewSection } from './SeasonOverviewSection';
import { RaceDetailModal } from './RaceDetailModal';
import { RaceEvent } from '../data/f1RacesData';

interface RacesPageProps {
  onNavigateHome?: () => void;
}

export const RacesPage: React.FC<RacesPageProps> = () => {
  const [selectedRace, setSelectedRace] = useState<RaceEvent | null>(null);

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
        <RaceHeroSection onScrollToSection={handleScrollToSection} />

        {/* 02 — RECENT RACES */}
        <RecentRacesSection onSelectRace={(race) => setSelectedRace(race)} />

        {/* 03 — UPCOMING RACES */}
        <UpcomingRacesSection onSelectRace={(race) => setSelectedRace(race)} />

        {/* 04 — CHAMPIONSHIP STANDINGS */}
        <ChampionshipSection />

        {/* 05 — SEASON OVERVIEW / CLOSING */}
        <SeasonOverviewSection onReturnToTop={handleReturnToTop} />
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
