"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * 点击水滴晕开动画
 * 鼠标点击时产生彩色水滴向外扩散并消失
 */

interface RippleClickProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  /** 水滴最大扩散半径 */
  maxRadius?: number;
  /** 扩散持续时间（ms） */
  duration?: number;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  color: string;
  maxR: number;
}

export function RippleClick({
  children,
  className = "",
  colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#00d8ff", "#7cff67"],
  maxRadius = 120,
  duration = 800,
}: RippleClickProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const colorIdxRef = useRef(0);

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

    const handleClick = (e: MouseEvent) => {
      const color = colors[colorIdxRef.current % colors.length];
      colorIdxRef.current++;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        color,
        maxR: maxRadius + Math.random() * 40 - 20,
      });
    };

    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age += 16; // ~60fps

        const progress = r.age / duration;
        if (progress >= 1) {
          ripples.splice(i, 1);
          continue;
        }

        // ease-out 扩散
        const eased = 1 - Math.pow(1 - progress, 3);
        const radius = r.maxR * eased;
        // 透明度：快速出现，慢慢消失
        const alpha = Math.pow(1 - progress, 1.5) * 0.4;

        if (alpha <= 0.01 || radius <= 0) continue;

        const rgb = hexToRgb(r.color);

        // 外圈水波纹
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 2.5 * (1 - progress);
        ctx.stroke();

        // 第二圈（延迟）
        if (progress > 0.1) {
          const p2 = (progress - 0.1) / 0.9;
          const eased2 = 1 - Math.pow(1 - p2, 3);
          const r2 = r.maxR * 0.7 * eased2;
          const a2 = Math.pow(1 - p2, 1.5) * 0.25;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a2})`;
          ctx.lineWidth = 1.5 * (1 - p2);
          ctx.stroke();
        }

        // 内部填充光晕
        const gradient = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, radius * 0.6);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [colors, maxRadius, duration]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
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
