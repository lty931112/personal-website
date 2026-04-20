"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 飘雪动画组件
 * 在页面上创建持续飘落的雪花效果，模拟雪夜氛围
 */

interface SnowfallProps {
  /** 雪花数量 */
  snowflakeCount?: number;
  /** 是否显示 */
  enabled?: boolean;
}

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  speed: number;
  wind: number;
  delay: number;
  wobble: number;
  wobbleSpeed: number;
}

export function Snowfall({ snowflakeCount = 80, enabled = true }: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 初始化雪花
    const snowflakes: Snowflake[] = [];
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        id: i,
        x: Math.random() * canvas.width,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 1.5 + 0.5,
        wind: Math.random() * 0.5 - 0.25,
        delay: Math.random() * 100,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
    snowflakesRef.current = snowflakes;

    // 设置 canvas 尺寸
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    setIsVisible(true);

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        // 更新位置
        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(flake.wobble) * 0.5;
        flake.wobble += flake.wobbleSpeed;

        // 超出屏幕重置
        if (flake.y > canvas.height + 10) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width + 10) flake.x = -10;
        if (flake.x < -10) flake.x = canvas.width + 10;

        // 绘制雪花
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        // 大雪花加光晕
        if (flake.size > 3) {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${flake.opacity * 0.15})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setIsVisible(false);
    };
  }, [enabled, snowflakeCount]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    />
  );
}
