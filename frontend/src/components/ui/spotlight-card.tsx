"use client";

import { useRef, useState, useCallback, ReactNode, MouseEvent as ReactMouseEvent } from "react";

/**
 * 卡片鼠标跟随光效
 * 鼠标悬停在卡片上时显示跟随鼠标的光晕 + 边框发光效果
 * 使用 requestAnimationFrame 优化性能
 */

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlow?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "59, 130, 246",
  borderGlow = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景聚光灯 */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, 0.12), transparent 50%)`,
        }}
      />
      {/* 边框发光效果 */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(250px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, 0.25), transparent 50%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
            borderRadius: "inherit",
          }}
        />
      )}
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
