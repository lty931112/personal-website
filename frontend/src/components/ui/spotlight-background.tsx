"use client";

import { useEffect, useRef, useState, ReactNode, useCallback } from "react";

/**
 * 全局鼠标跟随聚光灯效果
 * 在整个页面创建跟随鼠标移动的动态光效
 * 使用 requestAnimationFrame 优化性能，支持平滑过渡
 */

interface SpotlightBackgroundProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightColor?: string;
  gradientOpacity?: number;
}

export function SpotlightBackground({
  children,
  className = "",
  spotlightSize = 600,
  spotlightColor = "59, 130, 246",
  gradientOpacity = 0.12,
}: SpotlightBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsVisible(true);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 主聚光灯 - 大范围柔和光效 */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: isVisible ? gradientOpacity : 0,
          transition: "opacity 0.5s ease",
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, ${gradientOpacity}), rgba(${spotlightColor}, 0.03) 40%, transparent 70%)`,
        }}
      />
      {/* 内核高光 - 小范围强烈光效 */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: isVisible ? 0.6 : 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, 0.15), transparent 60%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
