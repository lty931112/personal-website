"use client";

import { useRef, useCallback, useState, ReactNode } from "react";

/**
 * 全局鼠标跟随彩色云光背景
 * 在整个页面上创建跟随鼠标移动的大型彩色光晕
 */

interface MagicBackgroundProps {
  children: ReactNode;
  className?: string;
  /** 光晕半径（px） */
  gradientSize?: number;
  /** 光晕颜色 */
  gradientColor?: string;
  /** 光晕透明度 */
  gradientOpacity?: number;
}

export function MagicBackground({
  children,
  className = "",
  gradientSize = 600,
  gradientColor = "#818cf8",
  gradientOpacity = 0.07,
}: MagicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(gradientOpacity);
  }, [gradientOpacity]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 大范围柔和光晕 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 50%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
