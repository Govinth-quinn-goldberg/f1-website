import React from 'react';
import { TECHNICAL_SPECS } from '../config/f1Config';
import { ArrowRight } from 'lucide-react';

export const FinalShowcase: React.FC = () => {
  return (
    <section className="relative z-30 bg-[#07080a] border-t border-[#232936]/60 py-20 px-6 sm:px-12 lg:px-16 text-white select-none">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#e10600] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
            <span>BESPOKE MOTORSPORT SPECIFICATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase leading-tight">
            VELOCITY <span className="text-[#e10600]">F1</span>
          </h2>
          <p className="text-lg sm:text-xl font-mono text-white mt-1 uppercase font-bold tracking-wide">
            BUILD YOUR VELOCITY F1
          </p>

          <p className="text-xs text-[#8e9aa8] font-mono mt-3 leading-relaxed">
            Precision-engineered ground-effect aerodynamics, 1,050+ horsepower hybrid powertrain, and carbon composite chassis architecture.
          </p>

          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3.5 bg-[#e10600] hover:bg-[#ff1801] text-white text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,6,0,0.4)] flex items-center space-x-2 cursor-pointer">
              <span>INQUIRE ALLOCATION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimal Engineering Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {TECHNICAL_SPECS.map((spec) => (
            <div
              key={spec.label}
              className="bg-[#0a0d14]/70 border border-[#232936]/80 p-3.5 rounded text-left"
            >
              <span className="text-[9px] font-mono text-[#525d70] tracking-wider block mb-1 uppercase">
                {spec.label}
              </span>
              <span className="text-xs sm:text-sm font-bold font-mono text-white block">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
