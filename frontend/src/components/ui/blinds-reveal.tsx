"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

/**
 * 卷帘门展开动画
 * 卷帘条从中间向上下两边分开，露出下方内容
 */

interface BlindsRevealProps {
  children: ReactNode;
  className?: string;
  slats?: number;
  staggerDelay?: number;
}

export function BlindsReveal({ children, className = "", slats = 8, staggerDelay = 60 }: BlindsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const totalDuration = slats * staggerDelay + 600;
      const timer = setTimeout(() => setIsDone(true), totalDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, slats, staggerDelay]);

  // 将 slats 分成上下两半
  const halfSlats = Math.ceil(slats / 2);

  return (
    <div ref={containerRef} className={className}>
      {/* 内容层 */}
      {children}

      {/* 卷帘遮罩层 - 上半部分向上移出，下半部分向下移出 */}
      {!isDone && (
        <div
          className="absolute inset-0 z-20 flex flex-col"
          style={{ pointerEvents: "none" }}
        >
          {/* 上半部分卷帘 - 向上移出 */}
          {Array.from({ length: halfSlats }, (_, i) => (
            <div
              key={`top-${i}`}
              className="flex-1"
              style={{
                background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
                transform: isVisible ? `translateY(-100%)` : "translateY(0)",
                transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * staggerDelay}ms`,
              }}
            />
          ))}
          {/* 下半部分卷帘 - 向下移出 */}
          {Array.from({ length: slats - halfSlats }, (_, i) => (
            <div
              key={`bottom-${i}`}
              className="flex-1"
              style={{
                background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
                transform: isVisible ? `translateY(100%)` : "translateY(0)",
                transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(halfSlats + i) * staggerDelay}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
