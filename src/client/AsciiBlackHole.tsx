import React, { useEffect, useRef } from 'react';

const GLYPHS = ' .,:;!|/\\(){}[]<>irsxXzZaomwqpdbkhao*#MW&8%B@$';
const WORDS = [
  'ARJUN', 'SAVYASACHI', 'VISIBLE CONFUSION', 'ALINA', 'ADITI', 'LUMENSPACE', 'µLEARN', 'TINKERHUB',
  'KSRTC', 'CHALO', 'TICKETING', 'PAYMENT', 'WORKFLOW', 'CONFIRMATION', 'RECOVERY', 'RESEARCH',
  'FIELDWORK', 'JOURNEY', 'DESIGN', 'PRODUCT', 'INTERACTION', 'SYSTEMS', 'INTERFACES', 'EXPERIMENTS',
  'PROTOTYPES', 'OBSERVATIONS', 'QUESTIONS', 'ITERATIONS', 'OBSERVE', 'QUESTION', 'UNDERSTAND', 'MAKE',
  'TEST', 'BREAK', 'RETHINK', 'REBUILD', 'SHIP', 'PROCESS', 'INPUT', 'OUTPUT', 'SIGNAL', 'NOISE', 'DEBUG',
  'STACK', 'BUFFER', 'CACHE', 'PROTOCOL', 'KERNEL', 'INSTANCE', 'THREAD', 'STATE', 'ERROR', 'RESPONSE',
  'REQUEST', 'TRACE', 'LOG', 'PING', 'UPTIME', 'CURIOUS', 'SKEPTICAL', 'NOSY', 'TINKERING', 'THINKING',
  'MAKING', 'QUESTIONING', 'EXPLORING', 'UNFINISHED', 'ITERATION', 'SIDE QUEST', 'ROUGH CUT', 'SCRATCH',
  'DRAFT', 'FAILURE', 'VERSION', 'BUILD', 'WIP',
] as const;
const CELL_W = 7;
const CELL_H = 11;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function hashNoise(x: number, y: number, seed = 0) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) >>> 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) & 0xffff) / 65536;
}

export class AsciiBlackHoleErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('AsciiBlackHole rendering fallback active:', error);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function AsciiBlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let frameId = 0;
    let lastFrame = 0;
    const started = performance.now();
    const particles = Array.from({ length: 18 }, (_, index) => ({
      phase: index * 0.349,
      speed: 0.2 + (index % 6) * 0.027,
      offset: (index * 1.37) % 7,
    }));

    const resize = () => {
      try {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const parentRect = canvas.parentElement?.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(0, rect.width || parentRect?.width || canvas.clientWidth || 0);
        const h = Math.max(0, rect.height || parentRect?.height || canvas.clientHeight || 0);
        if (w <= 0 || h <= 0) return;
        width = w;
        height = h;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        if (context) {
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.font = `500 ${CELL_H}px "Mona Sans Mono", "IBM Plex Mono", "SFMono-Regular", Consolas, monospace`;
          context.textBaseline = 'middle';
          context.textAlign = 'center';
        }
        columns = Math.max(1, Math.ceil(width / CELL_W));
        rows = Math.max(1, Math.ceil(height / CELL_H));
      } catch (err) {
        // Safe resize guard
      }
    };

    const colorFor = (intensity: number, region: string) => {
      if (region === 'disk') {
        const red = Math.round(0 + 91 * intensity);
        const green = Math.round(55 + 118 * intensity);
        const blue = Math.round(92 + 103 * intensity);
        return `rgb(${red}, ${green}, ${blue})`;
      }
      if (region === 'dust') {
        const red = Math.round(0 + 38 * intensity);
        const green = Math.round(30 + 92 * intensity);
        const blue = Math.round(56 + 115 * intensity);
        return `rgb(${red}, ${green}, ${blue})`;
      }
      if (region === 'ring') {
        const red = Math.round(0 + 158 * intensity);
        const green = Math.round(93 + 116 * intensity);
        const blue = Math.round(150 + 91 * intensity);
        return `rgb(${red}, ${green}, ${blue})`;
      }
      const blue = Math.round(72 + 74 * intensity);
      return `rgb(${Math.round(blue * 0.32)}, ${Math.round(blue * 0.67)}, ${blue})`;
    };

    const draw = (now: number) => {
      try {
        if (width <= 0 || height <= 0 || columns <= 0 || rows <= 0) {
          resize();
          if (width <= 0 || height <= 0 || columns <= 0 || rows <= 0) return;
        }
        const elapsed = reducedMotion.matches ? 3.4 : (now - started) / 1000;
        context.clearRect(0, 0, width, height);

        const cx = width * 0.5;
        const cy = height * 0.5;
        const horizon = Math.max(64, Math.min(width / 8.7, height / 3.25));
        const ringRadius = horizon * 1.18;
        const diskRadius = Math.min(width * 0.47, horizon * 6.2);
        const diskHalfHeight = Math.max(17, horizon * 0.31);

        for (let row = 0; row < rows; row += 1) {
          const py = row * CELL_H + CELL_H / 2;
          const y = py - cy;
          for (let column = 0; column < columns; column += 1) {
            const px = column * CELL_W + CELL_W / 2;
            const x = px - cx;
            const radius = Math.hypot(x, y * 1.08);
            const angle = Math.atan2(y * 1.08, x);
            let intensity = 0;
            let region = '';
            let glyph = '';

            const starNoise = hashNoise(column + Math.floor(elapsed * 0.55), row, 31);
            if (starNoise > 0.994 && radius > horizon * 1.8) {
              intensity = 0.14 + 0.3 * (0.5 + 0.5 * Math.sin(elapsed * 1.5 + column * 1.61 + row));
              region = 'star';
              glyph = intensity > 0.34 ? '+' : '.';
            }

            const radialPosition = Math.abs(x) / diskRadius;
            const turbulentWarp = Math.sin(x * 0.018 - elapsed * 1.4) * diskHalfHeight * 0.16;
            const warpedY = y - turbulentWarp;

            const dustHalfHeight = diskHalfHeight * 2.35 * Math.max(0.08, 1 - radialPosition);
            if (Math.abs(x) < diskRadius && Math.abs(warpedY) < dustHalfHeight && radius > horizon * 1.03) {
              const dustVertical = Math.abs(warpedY) / Math.max(dustHalfHeight, 1);
              const dustNoise = hashNoise(column + Math.floor(elapsed * 4), row, 73);
              const dustIntensity = clamp((1 - radialPosition) * (1 - dustVertical) * (0.2 + dustNoise * 0.46));
              if (dustIntensity > intensity && dustNoise > 0.27) {
                intensity = dustIntensity;
                region = 'dust';
                glyph = GLYPHS[Math.max(1, Math.floor(dustIntensity * (GLYPHS.length - 1)))];
              }
            }

            const bands = [
              { width: 1.72, speed: 1.8, frequency: 0.041, phase: 0.4, strength: 0.3 },
              { width: 1.3, speed: -2.8, frequency: 0.066, phase: 1.2, strength: 0.48 },
              { width: 0.91, speed: 4.2, frequency: 0.105, phase: 2.1, strength: 0.66 },
              { width: 0.58, speed: -6.1, frequency: 0.158, phase: 3.3, strength: 0.84 },
              { width: 0.3, speed: 8.4, frequency: 0.238, phase: 4.6, strength: 1.0 },
            ];
            for (const band of bands) {
              const availableHalfHeight = diskHalfHeight * band.width * Math.max(0.05, 1 - 0.5 * radialPosition);
              if (Math.abs(x) < diskRadius && Math.abs(warpedY) < availableHalfHeight && radius > horizon * 0.91) {
                const vertical = Math.abs(warpedY) / Math.max(availableHalfHeight, 1);
                const envelope = clamp((1 - radialPosition ** 1.85) * (1 - vertical ** 1.55));
                const stream = 0.58
                  + 0.24 * Math.sin(x * band.frequency - elapsed * band.speed + Math.sin(y * 0.14))
                  + 0.18 * Math.sin(x * band.frequency * 2.37 + elapsed * band.speed * 0.62 + band.phase);
                const beaming = 1 + 0.4 * (-x / diskRadius);
                const bandIntensity = clamp(envelope * stream * beaming * band.strength);
                if (bandIntensity > intensity) {
                  intensity = bandIntensity;
                  region = 'disk';
                  glyph = GLYPHS[Math.floor(bandIntensity * (GLYPHS.length - 1))];
                }
              }
            }

            const shellRadii = [1.08, 1.36, 1.68];
            const shellStrengths = [0.32, 0.19, 0.11];
            for (let shell = 0; shell < shellRadii.length; shell += 1) {
              const shellDistance = Math.abs(radius - ringRadius * shellRadii[shell]);
              let shellIntensity = Math.exp(-((shellDistance / Math.max(8, horizon * (0.13 + shell * 0.035))) ** 2));
              shellIntensity *= shellStrengths[shell] * (0.72 + 0.28 * Math.sin(angle * (5 + shell * 2) - elapsed * (1.7 - shell * 0.25)));
              if (shellIntensity > intensity && shellIntensity > 0.055) {
                intensity = shellIntensity;
                region = shell === 0 ? 'ring' : 'dust';
                glyph = GLYPHS[Math.max(1, Math.floor(shellIntensity * (GLYPHS.length - 1)))];
              }
            }

            const spiralRadius = ringRadius * (1.55 + 0.34 * Math.sin(angle * 2.4 - elapsed * 0.8));
            const spiralDistance = Math.abs(radius - spiralRadius);
            const spiralNoise = hashNoise(column + Math.floor(elapsed * 2), row, 109);
            const spiralIntensity = Math.exp(-((spiralDistance / Math.max(7, horizon * 0.09)) ** 2)) * 0.28 * spiralNoise;
            if (spiralIntensity > intensity && spiralIntensity > 0.06) {
              intensity = spiralIntensity;
              region = 'dust';
              glyph = GLYPHS[Math.max(1, Math.floor(spiralIntensity * (GLYPHS.length - 1)))];
            }

            const ringDistance = Math.abs(radius - ringRadius);
            let lensIntensity = Math.exp(-((ringDistance / Math.max(4.5, horizon * 0.075)) ** 2));
            lensIntensity *= 0.74 + 0.22 * Math.sin(angle * 6 - elapsed * 3.1);
            if (lensIntensity > intensity && lensIntensity > 0.13) {
              intensity = clamp(lensIntensity);
              region = 'ring';
              glyph = GLYPHS[Math.max(1, Math.floor(intensity * (GLYPHS.length - 1)))];
            }

            if (radius < horizon) {
              glyph = '';
              intensity = 0;
              region = '';
            }

            for (const particle of particles) {
              const particleAngle = elapsed * particle.speed + particle.phase;
              const particleRadius = ringRadius * (1.82 - 0.075 * ((elapsed * 0.72 + particle.offset) % 7));
              const particleX = Math.cos(particleAngle) * particleRadius;
              const particleY = Math.sin(particleAngle) * particleRadius * 0.58;
              if (Math.abs(x - particleX) < CELL_W * 0.7 && Math.abs(y - particleY) < CELL_H * 0.62 && radius > horizon) {
                glyph = '*';
                intensity = 0.92;
                region = 'ring';
              }
            }

            if (glyph && glyph !== ' ') {
              context.fillStyle = colorFor(intensity, region);
              context.fillText(glyph, px, py);
            }
          }
        }

        const wordCount = width < 500 ? 7 : width < 900 ? 10 : 15;
        context.save();
        context.font = `600 ${Math.max(9, CELL_H - 1)}px "Mona Sans Mono", "IBM Plex Mono", "SFMono-Regular", Consolas, monospace`;
        context.textBaseline = 'middle';
        context.textAlign = 'center';

        for (let index = 0; index < wordCount; index += 1) {
          const duration = 4.8 + hashNoise(index, 17, 811) * 6.4;
          const timeOffset = hashNoise(index, 29, 823) * duration * 2.7 + index * 0.83;
          const entityTime = reducedMotion.matches ? timeOffset + duration * 0.5 : elapsed + timeOffset;
          const entityEpoch = Math.floor(entityTime / duration);
          const life = (entityTime % duration) / duration;
          const visibility = life >= 0.08 && life < 0.86 ? 1 : 0;
          if (visibility === 0) continue;

          const selector = hashNoise(index * 31 + entityEpoch * 17, entityEpoch * 13 + index, 401);
          const wordIdx = Math.abs(Math.floor(selector * WORDS.length)) % WORDS.length;
          const word = WORDS[wordIdx];
          if (!word) continue;

          const orbitSeed = hashNoise(index * 19, entityEpoch * 11, 503);
          const placementMode = index % 3;
          const direction = hashNoise(index, 43, 827) > 0.5 ? 1 : -1;
          const driftSpeed = 0.018 + hashNoise(index, 47, 829) * 0.032;
          const individualDrift = (life - 0.5) * direction;
          let wordX = cx;
          let wordY = cy;

          if (placementMode === 0) {
            let localX = (orbitSeed * 2 - 1) * diskRadius * 0.8;
            if (Math.abs(localX) < horizon * 1.32) localX += Math.sign(localX || 1) * horizon * 1.45;
            localX += individualDrift * diskRadius * 0.1;
            wordX = cx + localX;
            wordY = cy + Math.sin(localX * 0.018 - entityTime * 0.23) * diskHalfHeight * 0.16
              + (hashNoise(index, entityEpoch, 601) - 0.5) * diskHalfHeight * 1.25;
          } else {
            const initialAngle = orbitSeed * Math.PI * 2;
            const orbitalAngle = initialAngle + entityTime * driftSpeed * direction;
            const orbitalRadius = ringRadius * (1.16 + hashNoise(index, entityEpoch, 607) * 0.54);
            wordX = cx + Math.cos(orbitalAngle) * orbitalRadius;
            wordY = cy + Math.sin(orbitalAngle) * orbitalRadius * 0.94;
          }

          const measured = context.measureText(word).width;
          wordX = clamp(wordX, measured / 2 + 6, width - measured / 2 - 6);
          wordY = clamp(wordY, 10, height - 10);
          const emphasis = 0.38 + hashNoise(index, entityEpoch, 709) * 0.14;
          context.fillStyle = 'rgba(16, 17, 16, 0.34)';
          context.fillRect(wordX - measured / 2 - 2, wordY - 6, measured + 4, 12);
          context.fillStyle = `rgba(126, 199, 236, ${emphasis})`;
          context.fillText(word, wordX, wordY);
        }
        context.restore();
      } catch (err) {
        // Safe fallback for unhandled render calculations
      }
    };

    const loop = (now: number) => {
      if (now - lastFrame >= 1000 / 24) {
        draw(now);
        lastFrame = now;
      }
      frameId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
    }
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-black-hole" aria-label="Animated ASCII black hole" role="img" />;
}
