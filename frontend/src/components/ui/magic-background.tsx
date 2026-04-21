"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * 全局鼠标跟随彩色云光效果
 * 挂载到页面上，鼠标移动时整个页面出现大型彩色光晕跟随
 * 使用 document 级别事件监听，覆盖整个可视区域
 */

interface MagicBackgroundProps {
  children: React.ReactNode;
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
  gradientSize = 500,
  gradientColor = "#818cf8",
  gradientOpacity = 0.15,
}: MagicBackgroundProps) {
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(gradientOpacity);
  }, [gradientOpacity]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div className={`relative ${className}`}>
      {/* 全局彩色云光 - fixed 定位覆盖整个视口 */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-500 ease-out"
        style={{
          opacity: opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 50%)`,
        }}
      />
      {/* 内容 */}
      <div className="relative">{children}</div>
    </div>
  );
}
