"use client";

import { useRef, useCallback, useState, ReactNode, MouseEvent as ReactMouseEvent } from "react";

/**
 * Magic Card - 鼠标跟随彩色云光效果
 * 灵感来自 Magic UI / Inspira UI 的 Card Spotlight 组件
 * 鼠标移动时卡片上出现柔和的彩色光晕跟随效果
 */

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  /** 光晕半径（px） */
  gradientSize?: number;
  /** 光晕颜色 */
  gradientColor?: string;
  /** 光晕透明度 */
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className = "",
  gradientSize = 300,
  gradientColor = "#6366f1",
  gradientOpacity = 0.15,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // 渐入效果
    requestAnimationFrame(() => {
      setOpacity(gradientOpacity);
    });
  }, [gradientOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 彩色云光效果 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 60%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
