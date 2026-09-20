import React from 'react';
import { ROTATION_SECTIONS } from '../config/f1Config';

interface SideNavigationProps {
  activeSectionId: string;
  onNavigateToSection: (sectionId: string) => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  activeSectionId,
  onNavigateToSection,
}) => {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 sm:left-8 lg:left-10 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto"
    >
      <div className="flex flex-col space-y-3 sm:space-y-3.5">
        {ROTATION_SECTIONS.map((sec) => {
          const isActive = activeSectionId === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => onNavigateToSection(sec.id)}
              className="group flex items-center space-x-2.5 text-left cursor-pointer focus:outline-none transition-all duration-200 py-0.5"
              title={`Navigate to ${sec.navLabel}`}
            >
              {/* Active / Inactive Dot Indicator */}
              <div className="flex items-center justify-center w-2.5 h-2.5">
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] ring-4 ring-[#e10600]/20 transition-all duration-300" />
                ) : (
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
                )}
              </div>

              {/* Two-digit Section Number */}
              <span
                className={`text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-[#e10600] font-semibold'
                    : 'text-[#525d70] group-hover:text-[#8e9aa8]'
                }`}
              >
                {sec.navNum}
              </span>

              {/* Section Name */}
              <span
                className={`text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#525d70] group-hover:text-[#cbd5e1]'
                }`}
              >
                {sec.navLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNavigation;
