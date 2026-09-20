import React, { useState, useRef } from 'react';
import { TrackJourney } from './TrackJourney';
import { TrackTypes } from './TrackTypes';
import { TrackAnatomy } from './TrackAnatomy';
import { HistoricCircuits } from './HistoricCircuits';
import { CircuitDetail } from './CircuitDetail';
import { RoadFooter } from './RoadFooter';

interface RoadPageProps {
  onNavigateHome: () => void;
}

export const RoadPage: React.FC<RoadPageProps> = ({ onNavigateHome }) => {
  const [selectedCircuitId, setSelectedCircuitId] = useState<'monaco' | 'monza' | 'spa'>('monaco');
  const typesRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleSelectCircuit = (id: 'monaco' | 'monza' | 'spa') => {
    setSelectedCircuitId(id);
    // Smooth scroll down to Section 06 Circuit Detail
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToExplore = () => {
    if (typesRef.current) {
      typesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07080a] text-white selection:bg-[#e10600] selection:text-white">
      {/* Section 01: The Road / Poly Haven HDRI Journey */}
      <TrackJourney onScrollToExplore={handleScrollToExplore} />

      {/* Section 02: What is an F1 Circuit? */}
      <div ref={typesRef}>
        <TrackTypes />
      </div>

      {/* Section 03: The Anatomy of Speed */}
      <TrackAnatomy />

      {/* Sections 04 & 05: Circuits That Made History & Selection */}
      <HistoricCircuits
        selectedCircuitId={selectedCircuitId}
        onSelectCircuit={handleSelectCircuit}
      />

      {/* Section 06: Selected Circuit Deep-Dive Dossier */}
      <div ref={detailRef}>
        <CircuitDetail selectedCircuitId={selectedCircuitId} />
      </div>

      {/* Section 07: Epilogue & Footer */}
      <RoadFooter onReturnToTop={handleReturnToTop} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default RoadPage;
