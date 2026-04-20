"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * 鼠标跟随聚光灯背景效果
 * 在整个页面创建跟随鼠标移动的聚光灯效果
 */

interface SpotlightBackgroundProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightColor?: string;
}

export function SpotlightBackground({
  children,
  className = "",
  spotlightSize = 600,
  spotlightColor = "rgba(59, 130, 246, 0.15)",
}: SpotlightBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 聚光灯效果层 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
