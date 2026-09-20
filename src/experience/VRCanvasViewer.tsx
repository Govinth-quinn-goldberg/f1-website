import React, { useEffect, useRef, useState } from 'react';

const TOTAL_VR_FRAMES = 194;

const getFrameUrl = (index: number): string => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/f1/VRheadset/ezgif-frame-${frameNumber}.jpg`;
};

interface VRCanvasViewerProps {
  targetProgressRef: React.MutableRefObject<number>;
  onFrameChange?: (currentFrameIndex: number) => void;
}

export const VRCanvasViewer: React.FC<VRCanvasViewerProps> = ({
  targetProgressRef,
  onFrameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_VR_FRAMES).fill(null));
  const currentFrameIndexRef = useRef<number>(0);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

  // 1. Initial preload: First 20 frames + progressive background decoding
  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          imagesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    // Preload initial buffer (frames 0 to 19)
    const initialBatch = Array.from({ length: 20 }, (_, i) => loadFrame(i));
    Promise.all(initialBatch)
      .then(() => {
        if (!isCancelled) {
          setInitialLoaded(true);
          // Progressively load remaining frames in background idle chunks
          let remainingIndex = 20;
          const loadNextChunk = () => {
            if (isCancelled || remainingIndex >= TOTAL_VR_FRAMES) return;
            const end = Math.min(TOTAL_VR_FRAMES, remainingIndex + 10);
            const chunkPromises = [];
            for (let i = remainingIndex; i < end; i++) {
              chunkPromises.push(loadFrame(i));
            }
            remainingIndex = end;
            Promise.all(chunkPromises).then(() => {
              if (!isCancelled && remainingIndex < TOTAL_VR_FRAMES) {
                if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                  (window as any).requestIdleCallback(loadNextChunk, { timeout: 200 });
                } else {
                  setTimeout(loadNextChunk, 50);
                }
              }
            });
          };

          loadNextChunk();
        }
      })
      .catch((err) => {
        console.warn('Initial VR frame preload error:', err);
        setInitialLoaded(true);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. High-performance requestAnimationFrame render loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastDrawnIndex = -1;

    const render = () => {
      const targetProgress = targetProgressRef.current;
      const targetIndex = Math.min(
        TOTAL_VR_FRAMES - 1,
        Math.max(0, Math.floor(targetProgress * TOTAL_VR_FRAMES))
      );

      // Find best available loaded frame if targetIndex is still loading
      let frameToDrawIndex = targetIndex;
      if (!imagesRef.current[frameToDrawIndex]) {
        // Search backwards then forwards for nearest loaded frame
        for (let offset = 1; offset < TOTAL_VR_FRAMES; offset++) {
          if (frameToDrawIndex - offset >= 0 && imagesRef.current[frameToDrawIndex - offset]) {
            frameToDrawIndex = frameToDrawIndex - offset;
            break;
          }
          if (frameToDrawIndex + offset < TOTAL_VR_FRAMES && imagesRef.current[frameToDrawIndex + offset]) {
            frameToDrawIndex = frameToDrawIndex + offset;
            break;
          }
        }
      }

      if (frameToDrawIndex !== lastDrawnIndex) {
        const img = imagesRef.current[frameToDrawIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          // Resize canvas buffer to match display container
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          // Cover aspect ratio scaling logic
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = width / height;
          let drawW = width;
          let drawH = height;
          let drawX = 0;
          let drawY = 0;

          if (canvasAspect > imgAspect) {
            drawH = width / imgAspect;
            drawY = (height - drawH) / 2;
          } else {
            drawW = height * imgAspect;
            drawX = (width - drawW) / 2;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          lastDrawnIndex = frameToDrawIndex;
          currentFrameIndexRef.current = frameToDrawIndex;
          if (onFrameChange) {
            onFrameChange(frameToDrawIndex);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetProgressRef, onFrameChange, initialLoaded]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#07080a]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-500 select-none pointer-events-none"
        style={{ opacity: initialLoaded ? 1 : 0 }}
      />

      {!initialLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#07080a] text-white">
          <div className="w-8 h-8 border-2 border-[#e10600] border-t-transparent rounded-full animate-spin" />
          <div className="text-xs font-mono tracking-widest text-[#8e9aa8] uppercase">
            LOADING VR EXPERIENCE...
          </div>
        </div>
      )}
    </div>
  );
};
