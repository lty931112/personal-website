"use client";

import { ReactNode } from "react";

/**
 * 四季背景组件
 * 从上到下展示春夏秋冬四个季节的光线和氛围
 * 
 * 春：上午 6-7 点 - 柔和金色晨光，淡粉天空
 * 夏：中午 1-2 点 - 明亮阳光，碧蓝天空
 * 秋：下午 4-5 点 - 温暖橘色夕照，橙红天空
 * 冬：晚上 9-10 点 - 深蓝夜空，清冷月光
 */

interface SeasonBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function SeasonBackground({ children, className = "" }: SeasonBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 四季渐变背景 - 从上到下 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            /* 春 - 晨光 6-7点 */
            linear-gradient(
              180deg,
              #fce4b8 0%,
              #f8d4a0 5%,
              #f5c89a 8%,
              #f0b88c 12%,
              #e8a878 15%,
              #e0c8a8 18%,
              #d8e0c0 22%,
              #c8e0b0 25%,
              /* 春夏过渡 */
              #b8d8a0 28%,
              #a8d098 30%,
              /* 夏 - 正午 1-2点 */
              #88c8e8 33%,
              #68b8e0 36%,
              #48a8d8 40%,
              #3898d0 44%,
              #2888c8 48%,
              #2080c0 50%,
              #2888c8 52%,
              /* 夏秋过渡 */
              #3890b8 55%,
              #4898a8 58%,
              /* 秋 - 夕照 4-5点 */
              #e8a060 62%,
              #f09050 65%,
              #f88040 68%,
              #e87038 72%,
              #d06030 75%,
              #c05828 78%,
              #a04820 80%,
              /* 秋冬过渡 */
              #784028 83%,
              #583828 85%,
              /* 冬 - 夜晚 9-10点 */
              #2a2a4a 88%,
              #1e1e3a 90%,
              #181830 93%,
              #121228 95%,
              #0e0e20 98%,
              #0a0a18 100%
            )
          `,
        }}
      />

      {/* 春 - 晨光光晕 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 z-[1] pointer-events-none"
        style={{
          width: "120%",
          height: "30%",
          background: "radial-gradient(ellipse at 50% 100%, rgba(255, 220, 150, 0.4) 0%, rgba(255, 200, 120, 0.15) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* 夏 - 阳光光晕 */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "25%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 200, 0.3) 0%, rgba(135, 206, 250, 0.1) 40%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* 秋 - 夕阳光晕 */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "55%",
          right: "-10%",
          width: "60%",
          height: "30%",
          background: "radial-gradient(ellipse at 30% 50%, rgba(255, 140, 50, 0.35) 0%, rgba(255, 100, 30, 0.15) 40%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* 冬 - 月光光晕 */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "75%",
          left: "20%",
          width: "40%",
          height: "30%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(180, 200, 255, 0.15) 0%, rgba(100, 120, 180, 0.05) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* 冬 - 星星点缀 */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, transparent 75%, black 85%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 75%, black 85%, black 100%)" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 82%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 88%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 30% 80%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 90%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 85%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 60% 92%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 83%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 87%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 90% 95%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 95%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 98%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 97%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 96%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 99%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 93%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 88%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 25% 86%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 91%, rgba(255,255,255,0.6) 0%, transparent 100%)
          `,
        }} />
      </div>

      {/* 季节标签 */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[2] pointer-events-none flex flex-col gap-0">
        {[
          { label: "春 · 晨", color: "#f0b88c", top: "12%" },
          { label: "夏 · 午", color: "#48a8d8", top: "37%" },
          { label: "秋 · 暮", color: "#e87038", top: "62%" },
          { label: "冬 · 夜", color: "#6a6a9a", top: "87%" },
        ].map((season) => (
          <div
            key={season.label}
            className="text-xs tracking-widest opacity-30"
            style={{
              color: season.color,
              position: "absolute",
              top: season.top,
              right: 0,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              letterSpacing: "0.3em",
              fontFamily: "serif",
            }}
          >
            {season.label}
          </div>
        ))}
      </div>

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
