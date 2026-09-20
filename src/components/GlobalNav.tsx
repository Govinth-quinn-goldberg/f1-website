import React from 'react';

export type ActivePageType = 'home' | 'road' | 'races' | 'experience';

interface GlobalNavProps {
  activePage: ActivePageType;
  onPageChange: (page: ActivePageType) => void;
}

export const GlobalNav: React.FC<GlobalNavProps> = ({ activePage, onPageChange }) => {
  return (
    <nav
      aria-label="Experience switcher"
      className="fixed top-6 right-6 sm:right-10 z-50 select-none pointer-events-auto"
    >
      <div className="flex items-center bg-[#07090e]/85 backdrop-blur-md border border-[#1f2430] rounded-full p-1 shadow-2xl">
        {/* HOME Button (F1 360 Viewer) */}
        <button
          onClick={() => onPageChange('home')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
            activePage === 'home'
              ? 'bg-[#e10600] text-white font-bold shadow-md'
              : 'text-[#8e9aa8] hover:text-white'
          }`}
        >
          {activePage === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          <span>HOME</span>
        </button>

        {/* ROAD Button (The Circuit Experience) */}
        <button
          onClick={() => onPageChange('road')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
            activePage === 'road'
              ? 'bg-[#e10600] text-white font-bold shadow-md'
              : 'text-[#8e9aa8] hover:text-white'
          }`}
        >
          {activePage === 'road' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          <span>ROAD</span>
        </button>

        {/* RACES Button (Editorial F1 Race Weekend & Standings) */}
        <button
          onClick={() => onPageChange('races')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
            activePage === 'races'
              ? 'bg-[#e10600] text-white font-bold shadow-md'
              : 'text-[#8e9aa8] hover:text-white'
          }`}
        >
          {activePage === 'races' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          <span>RACES</span>
        </button>

        {/* EXPERIENCE Button (VR Cockpit POV Experience) */}
        <button
          onClick={() => onPageChange('experience')}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
            activePage === 'experience'
              ? 'bg-[#e10600] text-white font-bold shadow-md'
              : 'text-[#8e9aa8] hover:text-white'
          }`}
        >
          {activePage === 'experience' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          <span>EXPERIENCE</span>
        </button>
      </div>
    </nav>
  );
};

export default GlobalNav;

