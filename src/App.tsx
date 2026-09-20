import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ROTATION_SECTIONS,
  ROTATION_FRAMES,
  RotationSection,
} from './config/f1Config';
import { imageLoader, LoaderState } from './utils/imageLoader';
import { LoadingScreen } from './components/LoadingScreen';
import { SideNavigation } from './components/SideNavigation';
import { GlobalNav, ActivePageType } from './components/GlobalNav';
import { RoadPage } from './road/RoadPage';
import { RacesPage } from './races/RacesPage';
import { ExperiencePage } from './experience/ExperiencePage';
import { F1CanvasViewer, CarBoundingBox, ZoomTransform } from './components/F1CanvasViewer';
import { TechnicalAnnotations } from './components/TechnicalAnnotations';
import { SectionOverlay } from './components/SectionOverlay';
import { FinalShowcase } from './components/FinalShowcase';
import { Footer } from './components/Footer';

export function App() {
  const [activePage, setActivePage] = useState<ActivePageType>('home');
  const [loaderState, setLoaderState] = useState<LoaderState>(imageLoader.getState());
  const [isLoadingActive, setIsLoadingActive] = useState<boolean>(true);

  // Target progress (0.0 to 1.0) stored in mutable ref for continuous 60fps interpolation
  const targetProgressRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const activeSectionRef = useRef<RotationSection>(ROTATION_SECTIONS[0]);
  const [currentSection, setCurrentSection] = useState<RotationSection>(ROTATION_SECTIONS[0]);

  // Car bounds and zoom transform refs updated in RAF/resize with zero React re-render overhead
  const boundsRef = useRef<CarBoundingBox>({ x: 0, y: 0, width: 1280, height: 720 });
  const transformRef = useRef<ZoomTransform>({ scale: 1, panX: 0, panY: 0, centerX: 640, centerY: 360 });

  // Container dimensions
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
  });

  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Pre-calculated track metrics to avoid getBoundingClientRect() forced reflows during scroll
  const trackHeightRef = useRef<number>(1);
  const trackOffsetTopRef = useRef<number>(0);

  // Start image loading on mount
  useEffect(() => {
    const unsubscribe = imageLoader.subscribe((state) => {
      setLoaderState(state);
    });
    imageLoader.startLoading();
    return () => unsubscribe();
  }, []);

  // Pre-calculate track geometry and viewport dimensions ONCE on resize (NEVER during scroll)
  const handleResize = useCallback(() => {
    setContainerSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const track = scrollTrackRef.current;
    if (track) {
      trackHeightRef.current = Math.max(1, track.scrollHeight - window.innerHeight);
      trackOffsetTopRef.current = track.offsetTop;
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Continuous scroll handler: maps scroll smoothly across the full 600vh distance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY - trackOffsetTopRef.current;
    const progress = Math.max(0, Math.min(1, scrolled / trackHeightRef.current));

    targetProgressRef.current = progress;

    // Check if active section changed
    const matched = ROTATION_SECTIONS.find(
      (sec) => progress >= sec.scrollRange[0] && progress <= sec.scrollRange[1]
    ) || ROTATION_SECTIONS[ROTATION_SECTIONS.length - 1];

    if (matched && matched.id !== activeSectionRef.current.id) {
      activeSectionRef.current = matched;
      setCurrentSection(matched);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Navigate smoothly to landmark frame of a section
  const handleNavigateToSection = (sectionId: string) => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const targetSection = ROTATION_SECTIONS.find((s) => s.id === sectionId);
    if (!targetSection) return;

    const totalFrames = ROTATION_FRAMES.length - 1;
    const targetProgress = targetSection.landmarkFrame / Math.max(1, totalFrames);
    const targetScrollY = trackOffsetTopRef.current + targetProgress * trackHeightRef.current;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white">
      {/* Global Minimal Switcher: HOME | ROAD | RACES | EXPERIENCE */}
      <GlobalNav
        activePage={activePage}
        onPageChange={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {activePage === 'experience' ? (
        <ExperiencePage onNavigateHome={() => setActivePage('home')} />
      ) : activePage === 'races' ? (
        <RacesPage onNavigateHome={() => setActivePage('home')} />
      ) : activePage === 'road' ? (
        <RoadPage onNavigateHome={() => setActivePage('home')} />
      ) : (
        <>
          {/* Loading Screen */}
          <LoadingScreen
            loaderState={loaderState}
            onEnter={() => setIsLoadingActive(false)}
            isVisible={isLoadingActive}
          />

          {/* Minimal Vertical Side Navigation Rail - Exactly 6 sections on left edge */}
          <SideNavigation
            activeSectionId={currentSection.id}
            onNavigateToSection={handleNavigateToSection}
          />

          {/* 
            TALL PARENT SCROLL CONTAINER (600vh)
            Sticky canvas stage remains locked in the center of the viewport.
          */}
          <div ref={scrollTrackRef} className="relative w-full h-[600vh]">
            {/* Sticky Viewer Port - Pinned to viewport */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#07080a]">
              {/* Central Car Stage - Unobstructed, generous negative space */}
              <div className="relative w-full h-full flex items-center justify-center">
                <F1CanvasViewer
                  targetProgressRef={targetProgressRef}
                  isFreeRotate={false}
                  onBoundsChange={(b) => {
                    boundsRef.current = b;
                  }}
                  onTransformChange={(t) => {
                    transformRef.current = t;
                  }}
                  onFrameUpdate={(frame) => {
                    currentFrameRef.current = frame;
                  }}
                />

                {/* Dynamic Technical Annotations with targetFrame proximity timing */}
                <TechnicalAnnotations
                  currentSection={currentSection}
                  currentFrameRef={currentFrameRef}
                  boundsRef={boundsRef}
                  transformRef={transformRef}
                  containerWidth={containerSize.width}
                  containerHeight={containerSize.height}
                  isFreeRotate={false}
                />

                {/* Section Typography & Information box in negative space */}
                <SectionOverlay
                  currentSection={currentSection}
                  isFreeRotate={false}
                  onScrollToExplore={() => handleNavigateToSection('tire')}
                />
              </div>
            </div>
          </div>

          {/* Final Product Showcase & Minimal Footer */}
          <FinalShowcase />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
