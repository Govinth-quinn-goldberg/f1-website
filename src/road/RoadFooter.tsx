import React from 'react';
import { ArrowUp } from 'lucide-react';

interface RoadFooterProps {
  onReturnToTop: () => void;
  onNavigateHome: () => void;
}

export const RoadFooter: React.FC<RoadFooterProps> = ({
  onReturnToTop,
  onNavigateHome,
}) => {
  return (
    <footer className="relative w-full py-20 px-6 sm:px-12 lg:px-16 bg-[#050608] text-white border-t border-[#1a1d26] select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Section 07 Editorial Conclusion */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="w-4 h-[2px] bg-[#e10600]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#e10600] font-bold uppercase">
              Section 07 / Epilogue
            </span>
            <span className="w-4 h-[2px] bg-[#e10600]" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display uppercase tracking-tight text-white leading-tight mb-4">
            F1 CIRCUITS ARE MORE THAN ROADS.
            <br />
            <span className="text-[#e10600]">THEY ARE HISTORY.</span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#8e9aa8] max-w-xl mx-auto leading-relaxed uppercase">
            From the claustrophobic barriers of Monte Carlo to the flat-out sweeps of the Ardennes, each circuit is a
            sacred archive of speed, sacrifice, and aerodynamic triumphs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded bg-[#e10600] hover:bg-[#b50500] text-white font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-lg cursor-pointer"
          >
            RETURN TO 360 CAR EXPERIENCE
          </button>

          <button
            onClick={onReturnToTop}
            className="px-6 py-3 rounded bg-[#11141c] hover:bg-[#1a1f2b] border border-white/10 text-[#cbd5e1] hover:text-white font-mono text-xs tracking-widest uppercase transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>BACK TO START OF THE ROAD</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#e10600]" />
          </button>
        </div>

        {/* Minimal Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#525d70]">
          <div>FORMULA 1 HISTORICAL ARCHIVE · EDITORIAL TRACK EXPERIENCE</div>
          <div className="mt-2 sm:mt-0">OFFICIAL FIA DATA AND CIRCUIT SOURCING</div>
        </div>
      </div>
    </footer>
  );
};
