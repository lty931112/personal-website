"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

interface ScrollSplitProps {
  children: ReactNode;
  className?: string;
}

export function ScrollSplit({ children, className = "" }: ScrollSplitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      setSplit(progress * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ minHeight: "100vh" }}>
      {/* 左半部分 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `polygon(0 0, ${50 - split / 2}% 0, ${50 - split / 2 - 10}% 100%, 0 100%)`,
          background: "linear-gradient(135deg, #4c1d95, #6d28d9)",
          transition: "none",
        }}
      />
      {/* 右半部分 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `polygon(${50 + split / 2}% 0, 100% 0, 100% 100%, ${50 + split / 2 + 10}% 100%)`,
          background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
          transition: "none",
        }}
      />
      {/* 斜线装饰 */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - split / 50),
          background: `linear-gradient(${155}deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)`,
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
