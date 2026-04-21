"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

/**
 * 卷帘门展开动画
 * 滚动到可视区域时，卷帘条依次向下收起，露出下方内容
 */

interface BlindsRevealProps {
  children: ReactNode;
  className?: string;
  slats?: number;
  staggerDelay?: number;
}

export function BlindsReveal({ children, className = "", slats = 8, staggerDelay = 80 }: BlindsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 内容层 */}
      <div className="relative z-0">{children}</div>

      {/* 卷帘遮罩层 - 覆盖在内容上方 */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{ pointerEvents: isVisible ? "none" : "auto" }}
      >
        {Array.from({ length: slats }, (_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
              // 向下移出视口，露出下方内容
              transform: isVisible ? `translateY(100%)` : "translateY(0)",
              transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * staggerDelay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
