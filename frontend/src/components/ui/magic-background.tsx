"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";

/**
 * 全局鼠标跟随彩色云光效果
 * - 鼠标移动时触发，静止后渐隐
 * - 0.2 秒滞后跟随（lerp 插值）
 * - 亮度根据鼠标移动速度变化
 * - 颜色随时间渐变
 * - 鼠标停止移动时慢慢变暗直到消失
 */

interface MagicBackgroundProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
}

export function MagicBackground({
  children,
  className = "",
  gradientSize = 500,
}: MagicBackgroundProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 目标位置（鼠标实际位置）
  const targetRef = useRef({ x: -1000, y: -1000 });
  // 当前位置（滞后跟随）
  const currentRef = useRef({ x: -1000, y: -1000 });
  // 当前亮度
  const brightnessRef = useRef(0);
  // 目标亮度
  const targetBrightnessRef = useRef(0);
  // 颜色色相
  const hueRef = useRef(250);
  // 上次鼠标位置（计算速度）
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);

  const animate = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // 0.2 秒滞后跟随（lerp 插值系数 ~0.15）
    const lerpFactor = 0.15;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerpFactor;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerpFactor;

    // 亮度平滑过渡
    brightnessRef.current += (targetBrightnessRef.current - brightnessRef.current) * 0.08;

    // 颜色缓慢渐变（每帧 +0.3 度色相）
    hueRef.current = (hueRef.current + 0.3) % 360;

    const brightness = brightnessRef.current;
    const hue = hueRef.current;
    const x = currentRef.current.x;
    const y = currentRef.current.y;

    // 根据亮度调整颜色饱和度和透明度
    const saturation = 70 + brightness * 30; // 70-100
    const lightness = 50 + brightness * 20;  // 50-70
    const alpha = brightness * 0.6;           // 0-0.6

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.background = `radial-gradient(${gradientSize}px circle at 50% 50%, 
      hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha}) 0%, 
      hsla(${(hue + 40) % 360}, ${saturation}%, ${lightness}%, ${alpha * 0.5}) 30%, 
      hsla(${(hue + 80) % 360}, ${saturation - 10}%, ${lightness}%, ${alpha * 0.2}) 50%, 
      transparent 70%)`;

    animFrameRef.current = requestAnimationFrame(animate);
  }, [gradientSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const dt = now - lastTimeRef.current;

      // 计算鼠标速度
      const speed = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;

      // 速度映射到亮度（速度越快越亮）
      targetBrightnessRef.current = Math.min(1, speed * 1.5 + 0.3);

      // 更新目标位置
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;

      // 清除淡出定时器
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };

    const handleMouseStop = () => {
      // 鼠标停止移动，开始渐隐
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        targetBrightnessRef.current = 0;
      }, 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    // 使用 mousestop 检测：短时间内无 mousemove 就认为停止
    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    const onMouseMoveWithStop = (e: MouseEvent) => {
      handleMouseMove(e);
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = setTimeout(handleMouseStop, 150);
    };

    window.addEventListener("mousemove", onMouseMoveWithStop);
    document.documentElement.addEventListener("mouseleave", () => {
      targetBrightnessRef.current = 0;
    });

    // 启动动画循环
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMoveWithStop);
      document.documentElement.removeEventListener("mouseleave", () => {});
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (stopTimer) clearTimeout(stopTimer);
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
          mixBlendMode: "screen",
          filter: "blur(30px)",
          willChange: "left, top, background",
        }}
      />
      {children}
    </div>
  );
}
