import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 bg-[#07080a] border-t border-[#232936]/60 text-[#525d70] font-mono text-xs py-10 px-6 sm:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
          <span className="text-white font-bold font-display tracking-widest text-xs uppercase">
            VELOCITY <span className="text-[#e10600]">F1</span>
          </span>
          <span className="text-[#323b4e]">|</span>
          <span className="text-[10px] text-[#8e9aa8]">CHAMPIONSHIP SPECIFICATION</span>
        </div>

        {/* Minimal Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-wider text-[#8e9aa8] uppercase">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#careers" className="hover:text-white transition-colors">Careers</a>
          <a href="#media" className="hover:text-white transition-colors">Media</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="#social" className="hover:text-white transition-colors">Social</a>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-[#525d70]">
          © 2026 VELOCITY F1. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
