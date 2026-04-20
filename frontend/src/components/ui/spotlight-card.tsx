"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";

/**
 * 卡片聚光灯效果
 * 鼠标悬停在卡片上时显示跟随鼠标的光晕效果
 */

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.1)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 聚光灯效果 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* 边框光效 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-inherit transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
