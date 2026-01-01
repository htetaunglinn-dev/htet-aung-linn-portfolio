'use client';

import { useEffect, useRef, memo } from 'react';

function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      // Draw meridians (vertical lines)
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8 + rotation;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 1;

        for (let j = 0; j <= 100; j++) {
          const lat = (j / 100) * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(lat) * Math.sin(angle);
          const y = centerY + radius * Math.sin(lat);
          const z = radius * Math.cos(lat) * Math.cos(angle);

          // Simple perspective
          const scale = 1 - z / (radius * 2);
          const px = centerX + (x - centerX) * scale;
          const py = centerY + (y - centerY) * scale;

          if (z > 0) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
          } else {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
          }

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Draw parallels (horizontal lines)
      for (let i = 0; i < 12; i++) {
        const lat = (i / 11) * Math.PI - Math.PI / 2;

        ctx.beginPath();

        for (let j = 0; j <= 100; j++) {
          const angle = (j / 100) * Math.PI * 2 + rotation;
          const x = centerX + radius * Math.cos(lat) * Math.cos(angle);
          const y = centerY + radius * Math.sin(lat);
          const z = radius * Math.cos(lat) * Math.sin(angle);

          const scale = 1 - z / (radius * 2);
          const px = centerX + (x - centerX) * scale;
          const py = centerY + (y - centerY) * scale;

          if (z > 0) {
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
          } else {
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
          }

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Add some glowing points
      const points = 30;
      for (let i = 0; i < points; i++) {
        const angle1 = (i / points) * Math.PI * 2 + rotation * 0.5;
        const angle2 = Math.sin(rotation + i) * Math.PI;

        const x = centerX + radius * Math.cos(angle2) * Math.cos(angle1);
        const y = centerY + radius * Math.sin(angle2);
        const z = radius * Math.cos(angle2) * Math.sin(angle1);

        if (z > 0) {
          const scale = 1 - z / (radius * 2);
          const px = centerX + (x - centerX) * scale;
          const py = centerY + (y - centerY) * scale;

          const gradient = ctx.createRadialGradient(px, py, 0, px, py, 4);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rotation += 0.003;
      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}

export default memo(WireframeGlobe);
