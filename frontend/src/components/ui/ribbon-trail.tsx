"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * 七彩丝带拖尾效果
 * 鼠标移动时产生多条彩色丝带跟随，丝带缓慢扩散并逐渐消失
 * 使用 Canvas 2D 实现，无需 WebGL 依赖
 */

interface RibbonTrailProps {
  children?: React.ReactNode;
  className?: string;
  /** 丝带颜色数组 */
  colors?: string[];
  /** 丝带数量 */
  ribbonCount?: number;
  /** 丝带最大宽度 */
  ribbonWidth?: number;
  /** 拖尾长度（历史点数） */
  trailLength?: number;
  /** 衰减速度（越小消失越慢） */
  fadeSpeed?: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function RibbonTrail({
  children,
  className = "",
  colors = ["#ff9346", "#7cff67", "#ffee51", "#00d8ff", "#ff6b9d", "#c084fc"],
  ribbonCount = 4,
  ribbonWidth = 20,
  trailLength = 60,
  fadeSpeed = 0.015,
}: RibbonTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const trailsRef = useRef<TrailPoint[][]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef(0);

  useEffect(() => {
    // 初始化每条丝带的拖尾
    trailsRef.current = Array.from({ length: ribbonCount }, () => []);

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
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      offsetRef.current += 1;

      // 为每条丝带添加新点（带偏移）
      for (let i = 0; i < ribbonCount; i++) {
        const offsetX = Math.sin(offsetRef.current * 0.05 + i * 1.5) * (10 + i * 8);
        const offsetY = Math.cos(offsetRef.current * 0.03 + i * 1.2) * (5 + i * 5);
        trailsRef.current[i].push({
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          age: 0,
        });
        // 限制拖尾长度
        if (trailsRef.current[i].length > trailLength) {
          trailsRef.current[i].shift();
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let r = 0; r < ribbonCount; r++) {
        const trail = trailsRef.current[r];
        if (trail.length < 2) continue;

        // 更新年龄
        for (let i = 0; i < trail.length; i++) {
          trail[i].age += fadeSpeed;
        }

        // 移除完全消失的点
        while (trail.length > 0 && trail[0].age >= 1) {
          trail.shift();
        }

        if (trail.length < 2) continue;

        // 绘制丝带
        const color = colors[r % colors.length];
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];

          // 透明度：越老越淡
          const alpha = Math.max(0, 1 - p1.age);
          // 宽度：越老越细，并缓慢扩散
          const width = ribbonWidth * (1 - p1.age * 0.5) * (1 + p1.age * 0.3);

          if (alpha <= 0 || width <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = hexToRgba(color, alpha * 0.6);
          ctx.lineWidth = Math.max(0.5, width);
          ctx.stroke();
        }

        // 绘制发光效果（最内层丝带）
        if (r === 0 && trail.length > 2) {
          for (let i = 1; i < trail.length; i++) {
            const p0 = trail[i - 1];
            const p1 = trail[i];
            const alpha = Math.max(0, 1 - p1.age);
            if (alpha <= 0) continue;

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            ctx.lineWidth = Math.max(0.5, ribbonWidth * 0.3 * (1 - p1.age));
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [ribbonCount, ribbonWidth, trailLength, fadeSpeed, colors]);

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

/* 十六进制颜色转 rgba */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
