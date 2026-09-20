import React, { useRef, useEffect, useCallback } from 'react';
import { ROTATION_FRAMES, SPECIAL_FRAMES } from '../config/f1Config';
import { imageLoader } from '../utils/imageLoader';

export interface CarBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ZoomTransform {
  scale: number;
  panX: number;
  panY: number;
  centerX: number;
  centerY: number;
}

interface F1CanvasViewerProps {
  targetProgressRef: React.MutableRefObject<number>;
  isFreeRotate: boolean;
  onFreeRotateChange?: (newProgress: number) => void;
  onBoundsChange?: (bounds: CarBoundingBox) => void;
  onTransformChange?: (transform: ZoomTransform) => void;
  onFrameUpdate?: (frameIndex: number) => void;
  specialImageKey?: string | null;
}

// Smoothstep interpolation helper
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Calculate the target tire zoom weight based on scroll progress
function calculateTireZoomWeight(progress: number): number {
  // Tire section active range: 0.16 to 0.35
  if (progress < 0.16 || progress > 0.35) return 0;
  // Peak zoom hold between 0.22 and 0.28
  if (progress >= 0.22 && progress <= 0.28) return 1.0;
  if (progress < 0.22) {
    return smoothstep(0.16, 0.22, progress);
  } else {
    return smoothstep(0.35, 0.28, progress);
  }
}

export const F1CanvasViewer: React.FC<F1CanvasViewerProps> = ({
  targetProgressRef,
  isFreeRotate,
  onFreeRotateChange,
  onBoundsChange,
  onTransformChange,
  onFrameUpdate,
  specialImageKey,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentProgressRef = useRef<number>(targetProgressRef.current);
  const currentZoomWeightRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animationFrameId = useRef<number | null>(null);

  // Pre-calculated layout metrics - calculated ONLY on window resize, NEVER on scroll!
  const renderBoundsRef = useRef<CarBoundingBox>({ x: 0, y: 0, width: 1280, height: 720 });
  const zoomTransformRef = useRef<ZoomTransform>({ scale: 1, panX: 0, panY: 0, centerX: 640, centerY: 360 });

  // Drag interaction state for 360 free drag
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startProgress = useRef<number>(0);

  // Renders exactly ONE single, sharp, clean frame at 100% full opacity (ZERO ghosting, ZERO alpha crossfade)
  const drawFrame = useCallback((frameIdx: number, zoomWeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const b = renderBoundsRef.current;

    // Macro beauty close-up shot
    if (specialImageKey === 'rearDetailCloseUp') {
      const img = imageLoader.getSpecialImage('rearDetailCloseUp');
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img, b.x, b.y, b.width, b.height);
      return;
    }

    // Select the single nearest actual frame from verified 179 frames
    const totalFrames = ROTATION_FRAMES.length;
    const nearestIdx = Math.round(frameIdx);
    const clampedIdx = Math.max(0, Math.min(totalFrames - 1, nearestIdx));

    const img = imageLoader.getImage(clampedIdx);
    if (!img) return;

    // Calculate dynamic tire zoom matrix
    const scale = 1.0 + zoomWeight * 0.42;
    const stageCenterX = canvas.width / 2;
    const stageCenterY = canvas.height / 2;

    // Tire center in frame (left rear wheel: 41.7% width, 56.2% height)
    const tireTargetX = b.x + 0.417 * b.width;
    const tireTargetY = b.y + 0.562 * b.height;

    // Center the tire horizontally in the left-center viewing area
    const panTargetX = (stageCenterX * 0.88 - tireTargetX);
    const panTargetY = (stageCenterY - tireTargetY);
    const panX = panTargetX * zoomWeight;
    const panY = panTargetY * zoomWeight;

    zoomTransformRef.current = {
      scale,
      panX,
      panY,
      centerX: stageCenterX,
      centerY: stageCenterY,
    };

    if (onTransformChange) {
      onTransformChange(zoomTransformRef.current);
    }

    // Completely clear canvas to eliminate any ghosting or stale pixels
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (zoomWeight > 0.0005) {
      ctx.translate(stageCenterX + panX, stageCenterY + panY);
      ctx.scale(scale, scale);
      ctx.translate(-stageCenterX, -stageCenterY);
    }

    // Render single real frame at full 100% opacity - zero ghosting or blur
    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, b.x, b.y, b.width, b.height);

    ctx.restore();

    lastRenderedFrameRef.current = clampedIdx;

    if (onFrameUpdate) {
      onFrameUpdate(clampedIdx);
    }
  }, [specialImageKey, onFrameUpdate, onTransformChange]);

  // Handle DPR canvas resizing: PRE-CALCULATE bounds once here, NEVER on every frame!
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const canvasW = Math.round(rect.width * dpr);
    const canvasH = Math.round(rect.height * dpr);

    canvas.width = canvasW;
    canvas.height = canvasH;

    // Standard 16:9 F1 car frame aspect ratio
    const imgRatio = 16 / 9;
    const canvasRatio = canvasW / canvasH;

    let renderW = canvasW;
    let renderH = canvasH;
    let renderX = 0;
    let renderY = 0;

    if (canvasRatio > imgRatio) {
      renderH = canvasH;
      renderW = Math.round(canvasH * imgRatio);
      renderX = Math.round((canvasW - renderW) / 2);
      renderY = 0;
    } else {
      renderW = canvasW;
      renderH = Math.round(canvasW / imgRatio);
      renderX = 0;
      renderY = Math.round((canvasH - renderH) / 2);
    }

    renderBoundsRef.current = {
      x: renderX,
      y: renderY,
      width: renderW,
      height: renderH,
    };

    if (onBoundsChange) {
      onBoundsChange(renderBoundsRef.current);
    }

    const totalFrames = ROTATION_FRAMES.length - 1;
    drawFrame(currentProgressRef.current * totalFrames, currentZoomWeightRef.current);
  }, [drawFrame, onBoundsChange]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Unified single 60 FPS RAF loop: smoothly interpolates progress toward targetProgress
  // and renders the single nearest frame at full opacity with zero ghosting
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      // Calculate target zoom weight from progress
      const targetZoomWeight = isFreeRotate ? 0 : calculateTireZoomWeight(target);
      const zoomDiff = targetZoomWeight - currentZoomWeightRef.current;

      const needsUpdate = Math.abs(diff) > 0.00008 || Math.abs(zoomDiff) > 0.0005 || specialImageKey;

      if (needsUpdate) {
        // Smooth responsive progress approach: follows scroll naturally without lag or floatiness
        currentProgressRef.current += diff * 0.22;
        currentZoomWeightRef.current += zoomDiff * 0.16;

        const totalFrames = ROTATION_FRAMES.length - 1;
        const floatFrame = currentProgressRef.current * totalFrames;
        const nearestInt = Math.round(floatFrame);

        // Proactively prioritize upcoming frames in direction of scroll
        imageLoader.prioritizeAround(nearestInt);

        drawFrame(nearestInt, currentZoomWeightRef.current);
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawFrame, targetProgressRef, specialImageKey, isFreeRotate]);

  // Handle special image key changes
  useEffect(() => {
    if (specialImageKey) {
      const totalFrames = ROTATION_FRAMES.length - 1;
      drawFrame(currentProgressRef.current * totalFrames, 0);
    }
  }, [specialImageKey, drawFrame]);

  // Pointer drag for 360 free rotate
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startProgress.current = currentProgressRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const sensitivity = 1 / 500;
    let newProgress = startProgress.current + deltaX * sensitivity;

    // Wrap around smoothly in 360 mode
    newProgress = ((newProgress % 1) + 1) % 1;

    targetProgressRef.current = newProgress;
    if (onFreeRotateChange) {
      onFreeRotateChange(newProgress);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      //
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain ${
          isFreeRotate ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
        }`}
        onPointerDown={isFreeRotate ? handlePointerDown : undefined}
        onPointerMove={isFreeRotate ? handlePointerMove : undefined}
        onPointerUp={isFreeRotate ? handlePointerUp : undefined}
        onPointerCancel={isFreeRotate ? handlePointerUp : undefined}
      />
    </div>
  );
};
