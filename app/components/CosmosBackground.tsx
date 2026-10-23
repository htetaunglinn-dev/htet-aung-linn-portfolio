'use client';

import { memo, useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  depth: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const STAR_COLORS = ['255, 255, 255', '255, 255, 255', '255, 255, 255', '173, 196, 255', '120, 150, 240', '255, 228, 196'];

function createStars(width: number, height: number): Star[] {
  const count = Math.min(420, Math.round((width * height) / 5000));
  return Array.from({ length: count }, () => {
    const depth = Math.random();
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.3 + depth * 1.4,
      depth,
      alpha: 0.25 + depth * 0.65,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    };
  });
}

/**
 * Fixed, full-page starfield. Stars drift at depth-dependent speeds as the page scrolls,
 * twinkle, and occasionally a shooting star crosses. Also publishes `--page-progress`
 * on every element marked `data-page-progress` (nebulae, progress bars, footer horizon).
 * Setting it on those elements alone, not on <html>, keeps scrolling from restyling the whole page.
 */
function CosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    let progressTargets: HTMLElement[] = [];
    let progressFrame = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let nextShootingStarAt = performance.now() + 2500;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    };

    const collectProgressTargets = () => {
      progressTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-page-progress]'));
    };

    const updatePageProgress = () => {
      progressFrame = 0;
      const scrollable = root.scrollHeight - window.innerHeight;
      const value = scrollable > 0 ? (window.scrollY / scrollable).toFixed(4) : '0';
      for (const target of progressTargets) target.style.setProperty('--page-progress', value);
    };

    const spawnShootingStar = () => {
      const angle = Math.PI / 5 + Math.random() * (Math.PI / 8);
      const speed = 9 + Math.random() * 6;
      shootingStars.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 50 + Math.random() * 30,
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scrollY = reduceMotion ? 0 : window.scrollY;

      for (const star of stars) {
        // Nearer stars (higher depth) drift faster: classic parallax.
        const offset = scrollY * (0.03 + star.depth * 0.22);
        const y = (((star.y - offset) % height) + height) % height;
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        if (star.depth > 0.92) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(65, 105, 225, ${alpha * 0.12})`;
          ctx.fill();
        }
      }

      if (reduceMotion) return;

      if (time > nextShootingStarAt) {
        spawnShootingStar();
        nextShootingStarAt = time + 4000 + Math.random() * 6000;
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        const fade = 1 - s.life / s.maxLife;
        const tailX = s.x - s.vx * 9;
        const tailY = s.y - s.vy * 9;
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
        gradient.addColorStop(0.3, `rgba(90, 125, 238, ${0.45 * fade})`);
        gradient.addColorStop(1, 'rgba(65, 105, 225, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (!progressFrame) progressFrame = requestAnimationFrame(updatePageProgress);
    };

    const onResize = () => {
      resize();
      collectProgressTargets();
      updatePageProgress();
      if (reduceMotion) draw(0);
    };

    resize();
    collectProgressTargets();
    updatePageProgress();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(progressFrame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black">
      {/* Nebula clouds: drift and recolour as --page-progress goes 0 → 1 */}
      <div data-page-progress className="nebula nebula-a" />
      <div data-page-progress className="nebula nebula-b" />
      <div data-page-progress className="nebula nebula-c" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}

export default memo(CosmosBackground);
