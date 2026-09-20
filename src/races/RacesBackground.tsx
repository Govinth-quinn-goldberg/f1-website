import React, { useEffect, useState } from 'react';

export const RacesBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 
        Cinematic F1 Celebration Image Background Layer
        Uses /f1/f1celebrations.jpg with subtle parallax translateY
      */}
      <div
        className="absolute inset-0 w-full h-[125%] bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out opacity-[0.29]"
        style={{
          backgroundImage: `url('/f1/f1celebrations.jpg')`,
          transform: `translate3d(0, ${-scrollY * 0.12}px, 0) scale(1.04)`,
        }}
      />

      {/* Dark Vignette & Gradient Overlays to preserve 100% typography & card readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/80 via-[#07080a]/90 to-[#07080a]" />
      <div className="absolute inset-0 bg-radial-vignette opacity-75" />
    </div>
  );
};
