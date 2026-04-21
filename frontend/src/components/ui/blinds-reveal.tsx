"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

interface BlindsRevealProps {
  children: ReactNode;
  className?: string;
  /** 卷帘条数 */
  slats?: number;
  /** 每条延迟（ms） */
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 卷帘遮罩 */}
      <div className="absolute inset-0 z-10 flex flex-col" style={{ pointerEvents: isVisible ? "none" : "auto" }}>
        {Array.from({ length: slats }, (_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
              transform: isVisible ? `translateY(-100%)` : "translateY(0)",
              transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * staggerDelay}ms`,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
