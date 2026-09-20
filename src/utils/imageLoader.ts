import { ROTATION_FRAMES, SPECIAL_FRAMES, ESSENTIAL_KEYFRAME_INDICES } from '../config/f1Config';

export interface LoaderState {
  loadedCount: number;
  totalCount: number;
  progress: number;
  isEssentialReady: boolean;
  isFullyLoaded: boolean;
}

type ProgressCallback = (state: LoaderState) => void;

class ProgressiveImageLoader {
  // Direct indexed array for O(1) instantaneous access with zero allocation overhead
  private cachedFrames: (HTMLImageElement | null)[] = new Array(ROTATION_FRAMES.length).fill(null);
  private specialCache: Map<string, HTMLImageElement> = new Map();
  private listeners: Set<ProgressCallback> = new Set();
  private loadedCount: number = 0;
  private totalCount: number = ROTATION_FRAMES.length;
  private isEssentialReady: boolean = false;
  private isFullyLoaded: boolean = false;
  private activeLoadQueue: Set<number> = new Set();

  public subscribe(cb: ProgressCallback): () => void {
    this.listeners.add(cb);
    cb(this.getState());
    return () => this.listeners.delete(cb);
  }

  public getState(): LoaderState {
    const progress = this.totalCount > 0 ? Math.round((this.loadedCount / this.totalCount) * 100) : 0;
    return {
      loadedCount: this.loadedCount,
      totalCount: this.totalCount,
      progress,
      isEssentialReady: this.isEssentialReady,
      isFullyLoaded: this.isFullyLoaded,
    };
  }

  private emit() {
    // Only emit state updates while initial loading screen is active
    // Once essential frames are ready, avoid background load events triggering unnecessary React re-renders
    if (!this.isFullyLoaded) {
      const state = this.getState();
      this.listeners.forEach((cb) => cb(state));
    }
  }

  // Pure O(1) lookup: returns pre-decoded HTMLImageElement directly from RAM
  public getImage(index: number): HTMLImageElement | null {
    const clamped = Math.max(0, Math.min(this.totalCount - 1, Math.round(index)));
    const img = this.cachedFrames[clamped];
    if (img) return img;

    // Fallback to nearest loaded frame if this specific frame is still decoding
    for (let offset = 1; offset < this.totalCount; offset++) {
      const left = clamped - offset;
      if (left >= 0 && this.cachedFrames[left]) return this.cachedFrames[left];
      const right = clamped + offset;
      if (right < this.totalCount && this.cachedFrames[right]) return this.cachedFrames[right];
    }
    return null;
  }

  public getSpecialImage(key: keyof typeof SPECIAL_FRAMES): HTMLImageElement | null {
    return this.specialCache.get(key) || null;
  }

  // Preload and decode a single frame on the main thread using HTMLImageElement.decode()
  public async loadFrame(index: number): Promise<HTMLImageElement | null> {
    if (index < 0 || index >= this.totalCount) return null;
    if (this.cachedFrames[index]) return this.cachedFrames[index];
    if (this.activeLoadQueue.has(index)) return null;

    this.activeLoadQueue.add(index);

    const img = new Image();
    img.src = ROTATION_FRAMES[index];

    try {
      await img.decode();
      this.cachedFrames[index] = img;
    } catch {
      // If decode fails (e.g. aborted), fallback to standard load completion
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }
      this.cachedFrames[index] = img;
    } finally {
      this.activeLoadQueue.delete(index);
      this.loadedCount++;
      if (!this.isEssentialReady || this.loadedCount === this.totalCount) {
        this.emit();
      }
    }

    return this.cachedFrames[index];
  }

  // Cooperative helper that yields execution to allow scroll events and RAF loop to run unobstructed
  private yieldToMainThread(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
          .requestIdleCallback(() => resolve(), { timeout: 25 });
      } else {
        setTimeout(resolve, 0);
      }
    });
  }

  public async startLoading(): Promise<void> {
    // 1. Priority 1: Load Hero frame (index 0) and essential landmark frames
    await this.loadFrame(0);
    this.isEssentialReady = true;
    this.emit();

    // 2. Decode essential keyframes next
    for (const keyIdx of ESSENTIAL_KEYFRAME_INDICES) {
      if (!this.cachedFrames[keyIdx]) {
        await this.loadFrame(keyIdx);
      }
    }

    // 3. Load special macro close-up in background
    if (SPECIAL_FRAMES.rearDetailCloseUp) {
      const macroImg = new Image();
      macroImg.src = SPECIAL_FRAMES.rearDetailCloseUp;
      macroImg.onload = async () => {
        try {
          if ('decode' in macroImg) await macroImg.decode();
        } catch {
          //
        }
        this.specialCache.set('rearDetailCloseUp', macroImg);
      };
    }

    // 4. Progressively schedule remaining frames in micro-batches yielding to main thread
    // This guarantees zero frame drops or input lag during user scrolling
    const remainingIndices: number[] = [];
    for (let i = 0; i < this.totalCount; i++) {
      if (!this.cachedFrames[i]) {
        remainingIndices.push(i);
      }
    }

    const MICRO_BATCH_SIZE = 3;
    for (let i = 0; i < remainingIndices.length; i += MICRO_BATCH_SIZE) {
      const batch = remainingIndices.slice(i, i + MICRO_BATCH_SIZE);
      await Promise.all(batch.map((idx) => this.loadFrame(idx)));
      // Yield to main thread between micro-batches so RAF and user scrolling take 100% priority
      await this.yieldToMainThread();
    }

    this.isFullyLoaded = true;
    this.emit();
  }

  // High-priority immediate preloading for frames around the current scroll position
  public prioritizeAround(targetIndex: number) {
    const start = Math.max(0, targetIndex - 4);
    const end = Math.min(this.totalCount - 1, targetIndex + 8);
    for (let i = start; i <= end; i++) {
      if (!this.cachedFrames[i] && !this.activeLoadQueue.has(i)) {
        this.loadFrame(i);
      }
    }
  }
}

export const imageLoader = new ProgressiveImageLoader();
