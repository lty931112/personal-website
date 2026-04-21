"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";

/**
 * 四季背景组件
 * 背景跟随页面滚动从春→夏→秋→冬渐变
 * 
 * 春：上午 6-7 点 - 柔和金色晨光
 * 夏：中午 1-2 点 - 明亮碧蓝天空
 * 秋：下午 4-5 点 - 温暖橘色夕照
 * 冬：晚上 9-10 点 - 深蓝夜空星光
 */

interface SeasonBackgroundProps {
  children: ReactNode;
  className?: string;
}

/* 四季颜色定义 */
const seasons = [
  { name: "春 · 晨", top: "#fce4b8", mid: "#f0b88c", bottom: "#c8e0b0", glow: "rgba(255, 220, 150, 0.4)", labelColor: "#f0b88c" },
  { name: "夏 · 午", top: "#88c8e8", mid: "#48a8d8", bottom: "#2888c8", glow: "rgba(255, 255, 200, 0.3)", labelColor: "#48a8d8" },
  { name: "秋 · 暮", top: "#e8a060", mid: "#f08040", bottom: "#c05828", glow: "rgba(255, 140, 50, 0.35)", labelColor: "#e87038" },
  { name: "冬 · 夜", top: "#2a2a4a", mid: "#1e1e3a", bottom: "#3d2e1a", glow: "rgba(180, 200, 255, 0.15)", labelColor: "#6a6a9a" },
];

/* 颜色插值 */
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, "0")}`;
}

export function SeasonBackground({ children, className = "" }: SeasonBackgroundProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);
      setCurrentSeason(Math.min(3, Math.floor(progress * 4)));
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // 根据滚动进度计算背景颜色
  const p = scrollProgress;
  const seasonIndex = p * 3; // 0-3
  const idx = Math.floor(seasonIndex);
  const t = seasonIndex - idx;
  const from = seasons[Math.min(idx, 3)];
  const to = seasons[Math.min(idx + 1, 3)];

  const topColor = lerpColor(from.top, to.top, t);
  const midColor = lerpColor(from.mid, to.mid, t);
  const bottomColor = lerpColor(from.bottom, to.bottom, t);

  // 光晕透明度随季节变化
  const glowOpacity = idx === currentSeason ? 0.8 : 0.2;

  return (
    <div className={`relative ${className}`}>
      {/* 动态背景 - 跟随滚动渐变 */}
      <div
        className="fixed inset-0 z-0 transition-all duration-300"
        data-season-bg
        style={{
          background: `linear-gradient(180deg, ${topColor} 0%, ${midColor} 50%, ${bottomColor} 100%)`,
        }}
      />

      {/* 当前季节光晕 */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-700"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${from.glow} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* 星星 - 只在冬天（滚动到底部）显示 */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: Math.max(0, (p - 0.7) / 0.3), // 滚动到 70% 后开始显示
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 15%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 50%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 70%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 85%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 75%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 25%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 55%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 35%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 65%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 30% 55%, rgba(255,255,255,0.7) 0%, transparent 100%)
          `,
        }}
      />

      {/* 季节标签 */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[2] pointer-events-none">
        <div className="flex flex-col gap-3">
          {seasons.map((season, i) => (
            <div
              key={season.name}
              className="text-xs tracking-widest transition-all duration-500"
              style={{
                color: season.labelColor,
                opacity: currentSeason === i ? 0.8 : 0.2,
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: "0.3em",
                fontFamily: "serif",
                transform: currentSeason === i ? "scale(1.1)" : "scale(1)",
                textShadow: currentSeason === i ? `0 0 10px ${season.labelColor}` : "none",
              }}
            >
              {season.name}
            </div>
          ))}
        </div>
      </div>

      {/* 滚动进度条 */}
      <div className="fixed top-0 left-0 right-0 z-[3] h-0.5 pointer-events-none">
        <div
          className="h-full transition-all duration-200"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, ${seasons[currentSeason].labelColor}, ${seasons[Math.min(currentSeason + 1, 3)].labelColor})`,
          }}
        />
      </div>

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
