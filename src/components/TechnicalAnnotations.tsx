import React, { useRef, useEffect, useCallback } from 'react';
import { RotationSection } from '../config/f1Config';
import { CarBoundingBox, ZoomTransform } from './F1CanvasViewer';

interface TechnicalAnnotationsProps {
  currentSection: RotationSection;
  currentFrameRef: React.MutableRefObject<number>;
  boundsRef: React.MutableRefObject<CarBoundingBox>;
  transformRef: React.MutableRefObject<ZoomTransform>;
  containerWidth: number;
  containerHeight: number;
  isFreeRotate: boolean;
}

interface CardCoord {
  edgeX: number;
  edgeY: number;
}

export const TechnicalAnnotations: React.FC<TechnicalAnnotationsProps> = ({
  currentSection,
  currentFrameRef,
  boundsRef,
  transformRef,
  containerWidth,
  containerHeight,
  isFreeRotate,
}) => {
  const cardElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const cardCoordsRef = useRef<Map<string, CardCoord>>(new Map());

  // Direct DOM references for SVG elements and card containers
  const polylinesRef = useRef<Map<string, SVGPolylineElement>>(new Map());
  const dotsRef = useRef<Map<string, SVGCircleElement>>(new Map());
  const ringsRef = useRef<Map<string, SVGCircleElement>>(new Map());

  // Measure card docking points once on section change or resize
  const measureCards = useCallback(() => {
    const newCoords = new Map<string, CardCoord>();
    cardElementsRef.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const ann = currentSection.annotations.find((a) => a.id === id);
      const isLeft = ann?.side === 'left';
      newCoords.set(id, {
        edgeX: isLeft ? rect.right : rect.left,
        edgeY: rect.top + rect.height / 2,
      });
    });
    cardCoordsRef.current = newCoords;
  }, [currentSection]);

  useEffect(() => {
    const timer = setTimeout(measureCards, 50);
    window.addEventListener('resize', measureCards, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureCards);
    };
  }, [measureCards]);

  // Imperative 60 FPS RAF loop: calculates exact targetFrame proximity and executes staged reveal
  useEffect(() => {
    let animId: number;

    const syncAnnotations = () => {
      const currentFrame = currentFrameRef.current;
      const b = boundsRef.current;
      const t = transformRef.current;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

      const displayX = b.x / dpr;
      const displayY = b.y / dpr;
      const displayW = b.width / dpr;
      const displayH = b.height / dpr;

      const stageCenterX = t.centerX / dpr;
      const stageCenterY = t.centerY / dpr;
      const scale = t.scale || 1.0;
      const panX = t.panX / dpr;
      const panY = t.panY / dpr;

      currentSection.annotations.forEach((ann) => {
        const polyline = polylinesRef.current.get(ann.id);
        const dot = dotsRef.current.get(ann.id);
        const ring = ringsRef.current.get(ann.id);
        const cardEl = cardElementsRef.current.get(ann.id);
        const coord = cardCoordsRef.current.get(ann.id);

        // 1. Strict safety boundary check
        const inSafetyRange =
          currentFrame >= ann.visibleFrameRange[0] && currentFrame <= ann.visibleFrameRange[1];

        // 2. Primary activation based on targetFrame proximity
        const frameDist = Math.abs(currentFrame - ann.targetFrame);
        const threshold = ann.minVisibilityThreshold;

        let visibility = 0;
        if (inSafetyRange && frameDist <= threshold) {
          const rawT = 1.0 - frameDist / threshold;
          visibility = rawT * rawT * (3 - 2 * rawT); // Smoothstep curve
        }

        // If not visible, hide all elements completely
        if (visibility <= 0.01) {
          if (dot) dot.setAttribute('opacity', '0');
          if (ring) ring.setAttribute('opacity', '0');
          if (polyline) polyline.setAttribute('opacity', '0');
          if (cardEl) {
            cardEl.style.opacity = '0';
            cardEl.style.pointerEvents = 'none';
          }
          return;
        }

        // Calculate exact physically attached coordinate on the rendered car
        const rawX = displayX + (ann.targetX / 100) * displayW;
        const rawY = displayY + (ann.targetY / 100) * displayH;
        const targetX = stageCenterX + panX + (rawX - stageCenterX) * scale;
        const targetY = stageCenterY + panY + (rawY - stageCenterY) * scale;

        const fallbackX = ann.side === 'left' ? 260 : containerWidth - 260;
        const cardEdgeX = coord ? coord.edgeX : fallbackX;
        const cardEdgeY = coord ? coord.edgeY : targetY;

        // Staged reveal animation:
        // Stage 1 (0 -> 0.25): Anchor dot fades in at exact target component
        // Stage 2 (0.25 -> 0.65): Leader line draws from target toward card
        // Stage 3 (0.35 -> 1.0): Card smoothly reveals and remains readable longer
        const dotAlpha = Math.min(1, visibility / 0.25);

        let lineProgress = 0;
        if (visibility > 0.2) {
          lineProgress = Math.min(1, (visibility - 0.2) / 0.4);
        }

        let cardAlpha = 0;
        if (visibility > 0.3) {
          cardAlpha = Math.min(1, (visibility - 0.3) / 0.5);
        }

        // Update anchor dot directly at the car component
        if (dot) {
          dot.setAttribute('cx', String(targetX));
          dot.setAttribute('cy', String(targetY));
          dot.setAttribute('opacity', String(dotAlpha));
        }

        if (ring) {
          ring.setAttribute('cx', String(targetX));
          ring.setAttribute('cy', String(targetY));
          ring.setAttribute('opacity', String(dotAlpha * 0.7));
        }

        // Draw leader line extending from targetX, targetY toward cardEdgeX, cardEdgeY
        if (polyline) {
          if (lineProgress > 0.05) {
            // Segment line: target point -> elbow -> card edge
            const midX = ann.side === 'left' ? cardEdgeX + 20 : cardEdgeX - 20;

            // Interpolate line endpoint from targetX, targetY out to cardEdgeX, cardEdgeY
            const currentX = targetX + (cardEdgeX - targetX) * lineProgress;
            const currentY = targetY + (cardEdgeY - targetY) * lineProgress;

            if (lineProgress < 0.7) {
              // Drawing straight out from target
              polyline.setAttribute('points', `${targetX},${targetY} ${currentX},${currentY}`);
            } else {
              // Full elbow connection
              polyline.setAttribute('points', `${targetX},${targetY} ${midX},${cardEdgeY} ${cardEdgeX},${cardEdgeY}`);
            }
            polyline.setAttribute('opacity', String(lineProgress * 0.8));
          } else {
            polyline.setAttribute('opacity', '0');
          }
        }

        // Update card opacity
        if (cardEl) {
          cardEl.style.opacity = String(cardAlpha);
          cardEl.style.pointerEvents = cardAlpha > 0.6 ? 'auto' : 'none';
        }
      });

      animId = requestAnimationFrame(syncAnnotations);
    };

    animId = requestAnimationFrame(syncAnnotations);
    return () => cancelAnimationFrame(animId);
  }, [currentSection, currentFrameRef, boundsRef, transformRef, containerWidth]);

  if (isFreeRotate || currentSection.annotations.length === 0) {
    return null;
  }

  const leftAnnotations = currentSection.annotations.filter((a) => a.side === 'left');
  const rightAnnotations = currentSection.annotations.filter((a) => a.side === 'right');

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* Thin SVG Leader Lines attached to car components */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="thinLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e10600" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#525d70" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {currentSection.annotations.map((ann) => (
          <g key={`line-${ann.id}`}>
            <polyline
              ref={(el) => {
                if (el) polylinesRef.current.set(ann.id, el);
                else polylinesRef.current.delete(ann.id);
              }}
              fill="none"
              stroke="url(#thinLineGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0"
            />
            <circle
              ref={(el) => {
                if (el) dotsRef.current.set(ann.id, el);
                else dotsRef.current.delete(ann.id);
              }}
              r="3"
              fill="#e10600"
              opacity="0"
            />
            <circle
              ref={(el) => {
                if (el) ringsRef.current.set(ann.id, el);
                else ringsRef.current.delete(ann.id);
              }}
              r="6"
              fill="none"
              stroke="#e10600"
              strokeWidth="1"
              opacity="0"
            />
          </g>
        ))}
      </svg>

      {/* Left Gutter Docked Cards (Desktop) - offset to prevent side navigation overlap */}
      {leftAnnotations.length > 0 && (
        <div className="hidden md:flex absolute left-36 lg:left-44 top-1/2 -translate-y-1/2 flex-col space-y-3 max-w-[240px] pointer-events-auto">
          {leftAnnotations.map((ann) => (
            <div
              key={ann.id}
              ref={(el) => {
                if (el) cardElementsRef.current.set(ann.id, el);
                else cardElementsRef.current.delete(ann.id);
              }}
              style={{ opacity: 0 }}
              className="bg-[#080a0f]/90 backdrop-blur-md border border-[#232936] p-2.5 rounded text-left shadow-xl transition-opacity duration-150"
            >
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#e10600] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
                <span>{ann.targetComponent}</span>
              </div>
              <h4 className="text-[11px] font-mono font-bold text-white tracking-wide uppercase mt-0.5">
                {ann.label}
              </h4>
              {ann.sublabel && (
                <p className="text-[10px] font-mono text-[#8e9aa8] mt-0.5 leading-snug">
                  {ann.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Right Gutter Docked Cards (Desktop) */}
      {rightAnnotations.length > 0 && (
        <div className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col space-y-3 max-w-[240px] pointer-events-auto">
          {rightAnnotations.map((ann) => (
            <div
              key={ann.id}
              ref={(el) => {
                if (el) cardElementsRef.current.set(ann.id, el);
                else cardElementsRef.current.delete(ann.id);
              }}
              style={{ opacity: 0 }}
              className="bg-[#080a0f]/90 backdrop-blur-md border border-[#232936] p-2.5 rounded text-left shadow-xl transition-opacity duration-150"
            >
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#e10600] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
                <span>{ann.targetComponent}</span>
              </div>
              <h4 className="text-[11px] font-mono font-bold text-white tracking-wide uppercase mt-0.5">
                {ann.label}
              </h4>
              {ann.sublabel && (
                <p className="text-[10px] font-mono text-[#8e9aa8] mt-0.5 leading-snug">
                  {ann.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mobile Horizontal Carousel */}
      <div className="md:hidden absolute bottom-4 left-4 right-4 flex overflow-x-auto space-x-2 pb-2 pointer-events-auto scrollbar-none">
        {currentSection.annotations.map((ann) => (
          <div
            key={`mobile-${ann.id}`}
            className="flex-shrink-0 bg-[#080a0f]/95 border border-[#232936] p-2 rounded max-w-[200px] text-left shadow-lg"
          >
            <div className="flex items-center space-x-1 text-[8px] font-mono text-[#e10600] font-bold uppercase">
              <span className="w-1 h-1 rounded-full bg-[#e10600]" />
              <span>{ann.targetComponent}</span>
            </div>
            <h4 className="text-[10px] font-mono font-bold text-white uppercase mt-0.5 truncate">
              {ann.label}
            </h4>
            {ann.sublabel && (
              <p className="text-[9px] font-mono text-[#8e9aa8] mt-0.5 line-clamp-2">
                {ann.sublabel}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
