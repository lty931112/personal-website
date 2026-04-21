"use client";

import { useEffect, useRef } from "react";

/**
 * 七彩晕开拖尾效果
 * 鼠标移动时产生彩色光点，光点慢慢晕开（扩散变大）并逐渐消失
 * 使用 Canvas 2D 实现
 */

interface RibbonTrailProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  ribbonCount?: number;
  /** 光点初始大小 */
  dotSize?: number;
  /** 最大扩散倍数 */
  maxSpread?: number;
  /** 衰减速度（越小消失越慢） */
  fadeSpeed?: number;
}

interface TrailDot {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
}

export function RibbonTrail({
  children,
  className = "",
  colors = ["#ff9346", "#7cff67", "#ffee51", "#00d8ff", "#ff6b9d", "#c084fc"],
  ribbonCount = 4,
  dotSize = 8,
  maxSpread = 4,
  fadeSpeed = 0.008,
}: RibbonTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dotsRef = useRef<TrailDot[]>([]);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      offsetRef.current += 1;

      // 每次鼠标移动，为每条丝带生成一个光点
      for (let i = 0; i < ribbonCount; i++) {
        const offsetX = Math.sin(offsetRef.current * 0.04 + i * 1.5) * (8 + i * 6);
        const offsetY = Math.cos(offsetRef.current * 0.03 + i * 1.2) * (4 + i * 4);
        dotsRef.current.push({
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          age: 0,
          color: colors[i % colors.length],
          size: dotSize + i * 2,
        });
      }

      // 限制总光点数（性能保护）
      if (dotsRef.current.length > 500) {
        dotsRef.current = dotsRef.current.slice(-400);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;

      // 更新并绘制每个光点
      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.age += fadeSpeed;

        // 完全消失则移除
        if (dot.age >= 1) {
          dots.splice(i, 1);
          continue;
        }

        // 透明度：先保持，后快速消失（ease-out 曲线）
        const alpha = Math.pow(1 - dot.age, 2) * 0.5;

        // 尺寸：随年龄扩散变大
        const spread = 1 + dot.age * (maxSpread - 1);
        const currentSize = dot.size * spread;

        if (alpha <= 0.01) continue;

        // 绘制光晕（外层柔光）
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, currentSize
        );
        const rgb = hexToRgb(dot.color);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 内核高光（年轻时光点中心更亮）
        if (dot.age < 0.3) {
          const coreAlpha = (1 - dot.age / 0.3) * 0.4;
          const coreSize = currentSize * 0.3;
          const coreGradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, coreSize
          );
          coreGradient.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
          coreGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, coreSize, 0, Math.PI * 2);
          ctx.fillStyle = coreGradient;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [ribbonCount, dotSize, maxSpread, fadeSpeed, colors]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
      />
      {children}
    </div>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
