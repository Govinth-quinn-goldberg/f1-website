import React from 'react';
import { RotationSection } from '../config/f1Config';
import { ChevronDown } from 'lucide-react';

interface SectionOverlayProps {
  currentSection: RotationSection;
  isFreeRotate: boolean;
  onScrollToExplore?: () => void;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  currentSection,
  isFreeRotate,
  onScrollToExplore,
}) => {
  if (isFreeRotate) return null;

  const isHero = currentSection.id === 'hero';
  const infoBox = currentSection.infoBox;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none">
      {/* Top Left Title & Subtitle - Clean, minimal typography */}
      <div className="absolute top-20 left-8 sm:left-12 lg:left-16 max-w-sm sm:max-w-md transition-opacity duration-300">
        {/* Large Crisp Header */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
          {currentSection.title}
          <br />
          <span className="text-[#e10600]">
            {currentSection.accentTitle}
          </span>
        </h2>

        {/* Hero Prominent Subtitle */}
        {isHero && currentSection.heroSubtitle && (
          <p className="mt-2 text-sm sm:text-base font-mono font-bold tracking-wider text-white">
            THE VELOCITY <span className="text-[#e10600]">F1</span>.
          </p>
        )}

        {/* Short Description (e.g. Body & Chassis) */}
        {currentSection.description && (
          <p className="mt-2.5 text-[10px] sm:text-[11px] text-[#8e9aa8] font-mono leading-relaxed max-w-xs uppercase">
            {currentSection.description}
          </p>
        )}
      </div>

      {/* One Single Small Compact Information Box in Negative Space */}
      {infoBox && (
        <div className="hidden lg:block absolute bottom-10 left-12 max-w-sm bg-[#080a0f]/90 backdrop-blur-md border border-[#232936] border-l-2 border-l-[#e10600] p-3.5 rounded shadow-xl pointer-events-auto transition-opacity duration-300">
          <div className="flex items-center space-x-1.5 mb-1 text-[10px] font-mono text-[#e10600] font-bold tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-[#e10600]" />
            <span>{infoBox.title}</span>
          </div>

          {infoBox.subtitle && (
            <div className="text-[8px] font-mono text-[#525d70] tracking-wider uppercase mb-1.5">
              {infoBox.subtitle}
            </div>
          )}

          <div className="space-y-1 text-[10px] font-mono text-[#8e9aa8] leading-relaxed">
            {infoBox.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      )}

      {/* Hero "SCROLL DOWN TO EXPLORE" Indicator */}
      {isHero && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center animate-bounce">
          <button
            onClick={onScrollToExplore}
            className="pointer-events-auto group flex flex-col items-center space-y-1 cursor-pointer"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8e9aa8] group-hover:text-white uppercase font-semibold">
              SCROLL DOWN TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-[#e10600]" />
          </button>
        </div>
      )}
    </div>
  );
};
