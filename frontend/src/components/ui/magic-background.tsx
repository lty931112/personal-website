"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";

/**
 * 全局鼠标跟随彩色云光效果
 * 使用 CSS mix-blend-mode 确保在深色背景上清晰可见
 * 鼠标移动时显示，停止移动后自动淡出
 */

interface MagicBackgroundProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicBackground({
  children,
  className = "",
  gradientSize = 600,
  gradientColor = "#818cf8",
  gradientOpacity = 0.2,
}: MagicBackgroundProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showGlow = useCallback(() => {
    setIsVisible(true);
    // 清除之前的淡出定时器
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
    }
    // 3 秒无移动后淡出
    fadeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      showGlow();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.left = `${e.clientX}px`;
          glowRef.current.style.top = `${e.clientY}px`;
          glowRef.current.style.opacity = "1";
        }
      });
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [showGlow]);

  return (
    <div className={className}>
      {/* 全局彩色云光 - 使用 transform 定位避免触发 layout */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: `${gradientSize}px`,
          height: `${gradientSize}px`,
          left: "-1000px",
          top: "-1000px",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.8s ease-out",
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
          mixBlendMode: "screen",
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
}
