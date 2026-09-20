/**
 * High-performance OpenEXR Loader for Poly Haven track HDRI (public/f1/track.exr)
 * Decodes all 128 ZIP_COMPRESSION blocks (2048 scanlines) and tonemaps float32 HDR luminance
 * into a clean 2048x1024 60fps canvas texture with zero scanlines or static artifacts.
 */

let cachedCanvas: HTMLCanvasElement | null = null;
let loadPromise: Promise<HTMLCanvasElement | null> | null = null;

async function decompressBlock(compressed: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('deflate');
  const writer = ds.writable.getWriter();
  writer.write(compressed as any);
  writer.close();

  const reader = ds.readable.getReader();
  const chunks: Uint8Array[] = [];
  let totalLen = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      totalLen += value.length;
    }
  }

  const raw = new Uint8Array(totalLen);
  let pos = 0;
  for (const chunk of chunks) {
    raw.set(chunk, pos);
    pos += chunk.length;
  }
  return raw;
}

export async function loadTrackEnvironment(): Promise<HTMLCanvasElement | null> {
  if (cachedCanvas) return cachedCanvas;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      // 1. Fetch public/f1/track.exr
      const response = await fetch('/f1/track.exr');
      if (!response.ok) {
        console.warn('Could not fetch /f1/track.exr, status:', response.status);
        return createFallbackCanvas();
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const view = new DataView(arrayBuffer);

      // Validate OpenEXR Magic: 0x01312f76
      const magic = view.getUint32(0, true);
      if (magic !== 0x01312f76) {
        console.warn('Invalid OpenEXR magic signature in track.exr');
        return createFallbackCanvas();
      }

      // Parse OpenEXR Header
      let offset = 8;
      const header: Record<string, { type: string; size: number }> = {};
      while (offset < buffer.byteLength) {
        let name = '';
        while (buffer[offset] !== 0 && offset < buffer.byteLength) {
          name += String.fromCharCode(buffer[offset++]);
        }
        offset++;
        if (!name) break;

        let type = '';
        while (buffer[offset] !== 0 && offset < buffer.byteLength) {
          type += String.fromCharCode(buffer[offset++]);
        }
        offset++;

        const size = view.getUint32(offset, true);
        offset += 4;
        header[name] = { type, size };
        offset += size;
      }

      // OpenEXR scanline offset table (ZIP_COMPRESSION: 16 scanlines per block)
      const numBlocks = Math.ceil(2048 / 16); // 128 blocks for 2048 height
      const blockOffsets: number[] = [];
      for (let i = 0; i < numBlocks; i++) {
        if (offset + 8 <= buffer.byteLength) {
          const low = view.getUint32(offset, true);
          const high = view.getUint32(offset + 4, true);
          blockOffsets.push(low + high * 4294967296);
          offset += 8;
        }
      }

      if (blockOffsets.length < numBlocks) {
        console.warn('Incomplete block offset table in track.exr');
        return createFallbackCanvas();
      }

      // Prepare target Canvas (subsampled 2048 x 1024 for pristine 60fps performance)
      const targetW = 2048;
      const targetH = 1024;
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return createFallbackCanvas();

      const imgData = ctx.createImageData(targetW, targetH);
      const rgba = imgData.data;

      if (typeof DecompressionStream === 'undefined') {
        console.warn('DecompressionStream unsupported on this platform');
        return createFallbackCanvas();
      }

      const scanlineStride = 4 * 4096 * 4; // 65536 bytes per EXR scanline (4 channels * 4096 * 4)
      const chStride = 4096 * 4;           // 16384 bytes per channel in a scanline

      // ACES Filmic tonemapping with gamma 2.2 approximation
      const tonemap = (val: number): number => {
        const xVal = Math.max(0, val * 1.25);
        const cur = Math.min(1, Math.max(0, (xVal * (2.51 * xVal + 0.03)) / (xVal * (2.43 * xVal + 0.59) + 0.14)));
        return (Math.sqrt(cur) * 255) | 0;
      };

      // Process all 128 blocks in parallel batches of 16 for maximum throughput
      const batchSize = 16;
      for (let start = 0; start < numBlocks; start += batchSize) {
        const end = Math.min(numBlocks, start + batchSize);
        const promises: Promise<{ b: number; raw: Uint8Array }>[] = [];

        for (let b = start; b < end; b++) {
          const blockOffset = blockOffsets[b];
          if (!blockOffset || blockOffset + 8 >= buffer.byteLength) continue;

          const blockSize = view.getInt32(blockOffset + 4, true);
          if (blockSize <= 0 || blockOffset + 8 + blockSize > buffer.byteLength) continue;

          const compressed = buffer.subarray(blockOffset + 8, blockOffset + 8 + blockSize);
          promises.push(decompressBlock(compressed).then((raw) => ({ b, raw })));
        }

        const batchResults = await Promise.all(promises);

        for (const { b, raw } of batchResults) {
          // OpenEXR Predictor: raw[i] = (raw[i-1] + raw[i] - 128) & 0xFF
          for (let i = 1; i < raw.length; i++) {
            raw[i] = (raw[i - 1] + raw[i] - 128) & 0xff;
          }

          // OpenEXR Interleave reconstruction
          const un = new Uint8Array(raw.length);
          const half = Math.floor(raw.length / 2);
          let w = 0;
          let t1 = 0;
          let t2 = half;
          while (w < raw.length) {
            un[w++] = raw[t1++];
            if (w < raw.length) un[w++] = raw[t2++];
          }

          const unView = new DataView(un.buffer, un.byteOffset, un.byteLength);
          const targetBaseY = b * 8; // Each 16-line block contributes 8 target lines

          for (let dy = 0; dy < 8; dy++) {
            const targetY = targetBaseY + dy;
            if (targetY >= targetH) break;

            const line = dy * 2;
            const lineOff = line * scanlineStride;

            for (let x = 0; x < targetW; x++) {
              const pixOff = (x * 2) * 4;
              // Channels in alphabetical order: A=0, B=1, G=2, R=3
              const r = unView.getFloat32(lineOff + 3 * chStride + pixOff, true);
              const g = unView.getFloat32(lineOff + 2 * chStride + pixOff, true);
              const bVal = unView.getFloat32(lineOff + 1 * chStride + pixOff, true);

              const destIdx = (targetY * targetW + x) * 4;
              rgba[destIdx] = tonemap(r);
              rgba[destIdx + 1] = tonemap(g);
              rgba[destIdx + 2] = tonemap(bVal);
              rgba[destIdx + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      cachedCanvas = canvas;
      return canvas;
    } catch (e) {
      console.warn('Failed to parse track.exr:', e);
      return createFallbackCanvas();
    }
  })();

  return loadPromise;
}

function createFallbackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Cinematic natural sky & asphalt circuit gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 1080);
  grad.addColorStop(0, '#0d131f');
  grad.addColorStop(0.45, '#1e2838');
  grad.addColorStop(0.5, '#475569');
  grad.addColorStop(0.52, '#1e293b');
  grad.addColorStop(1, '#080a0f');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 1080);

  cachedCanvas = canvas;
  return canvas;
}
