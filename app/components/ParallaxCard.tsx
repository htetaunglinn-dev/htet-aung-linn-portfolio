"use client";

import { useRef, useState, ReactNode, memo } from "react";

interface ParallaxCardProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

function ParallaxCard({
  children,
  intensity = 15,
  className = "",
}: ParallaxCardProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || tickingRef.current) return;

    tickingRef.current = true;

    requestAnimationFrame(() => {
      if (!cardRef.current) {
        tickingRef.current = false;
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * intensity;
      const rotateY = ((centerX - x) / centerX) * intensity;

      setTransform({ x: rotateX, y: rotateY });
      tickingRef.current = false;
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} parallax-smooth`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default memo(ParallaxCard);
