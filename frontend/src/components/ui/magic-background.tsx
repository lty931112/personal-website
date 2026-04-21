"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";

/**
 * 全局鼠标跟随彩色云光效果
 * - 鼠标移动时触发，静止 2 秒后慢慢消失
 * - 0.2 秒滞后跟随（lerp 插值）
 * - 亮度根据鼠标移动速度变化
 * - 颜色根据背景动态变化（互补色对比）
 * - 鼠标停止移动后 2 秒内慢慢变淡直到消失
 */

interface MagicBackgroundProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
}

/* 获取页面背景主色（采样背景元素） */
function sampleBackgroundColor(): { r: number; g: number; b: number } {
  const bg = document.querySelector("[data-season-bg]");
  if (bg) {
    const style = window.getComputedStyle(bg);
    const color = style.backgroundColor;
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      return { r: +match[0], g: +match[1], b: +match[2] };
    }
  }
  return { r: 30, g: 40, b: 60 };
}

/* 计算互补色（高对比度） */
function getContrastColor(bg: { r: number; g: number; b: number }, hueOffset: number): string {
  const brightness = (bg.r * 299 + bg.g * 587 + bg.b * 114) / 1000;
  // 亮背景用深色光晕，暗背景用亮色光晕
  if (brightness > 128) {
    const h = (240 + hueOffset) % 360;
    return `hsl(${h}, 80%, 45%)`;
  } else {
    const h = (180 + hueOffset) % 360;
    return `hsl(${h}, 85%, 65%)`;
  }
}

export function MagicBackground({
  children,
  className = "",
  gradientSize = 600,
}: MagicBackgroundProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const targetRef = useRef({ x: -1000, y: -1000 });
  const currentRef = useRef({ x: -1000, y: -1000 });
  const brightnessRef = useRef(0);
  const targetBrightnessRef = useRef(0);
  const hueOffsetRef = useRef(0);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const bgRef = useRef({ r: 30, g: 40, b: 60 });
  const frameCountRef = useRef(0);

  const animate = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) {
      animFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // 0.2 秒滞后跟随
    const lerpFactor = 0.12;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerpFactor;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerpFactor;

    // 亮度缓慢衰减（约 2 秒完全消失）
    // 0.015 → 每帧衰减 1.5%，60fps 下约 2 秒衰减到接近 0
    brightnessRef.current += (targetBrightnessRef.current - brightnessRef.current) * 0.015;

    // 色相缓慢偏移
    hueOffsetRef.current = (hueOffsetRef.current + 0.2) % 360;

    const brightness = brightnessRef.current;
    const x = currentRef.current.x;
    const y = currentRef.current.y;

    // 每 30 帧采样一次背景颜色
    frameCountRef.current++;
    if (frameCountRef.current % 30 === 0) {
      bgRef.current = sampleBackgroundColor();
    }

    const contrastColor = getContrastColor(bgRef.current, hueOffsetRef.current);

    // 透明度：最高 0.8，确保明显可见
    const alpha = brightness * 0.8;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.background = `radial-gradient(${gradientSize}px circle at 50% 50%, 
      ${contrastColor} 0%, 
      transparent 65%)`;
    glow.style.opacity = `${alpha}`;

    animFrameRef.current = requestAnimationFrame(animate);
  }, [gradientSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const dt = now - lastTimeRef.current;

      const speed = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;

      // 速度映射到亮度（移动就有明显亮度，快速移动更亮）
      targetBrightnessRef.current = Math.min(1, speed * 2 + 0.5);

      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;

      // 清除停止定时器
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
    };

    const handleMouseStop = () => {
      // 鼠标停止 2 秒后开始渐隐
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(() => {
        targetBrightnessRef.current = 0;
      }, 2000);
    };

    const onMouseMoveWithStop = (e: MouseEvent) => {
      handleMouseMove(e);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(handleMouseStop, 2000);
    };

    window.addEventListener("mousemove", onMouseMoveWithStop);
    document.documentElement.addEventListener("mouseleave", () => {
      targetBrightnessRef.current = 0;
    });

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMoveWithStop);
      document.documentElement.removeEventListener("mouseleave", () => {});
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, [animate]);

  return (
    <div className={className}>
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
          filter: "blur(50px)",
          willChange: "left, top, opacity",
        }}
      />
      {children}
    </div>
  );
}
