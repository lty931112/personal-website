"use client";

import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

/**
 * 横向自动滚动容器
 * 内容自动横向滚动，鼠标悬停暂停，移走继续
 * 支持正向/反向无限循环
 */

interface AutoScrollProps {
  children: ReactNode;
  className?: string;
  /** 滚动速度（px/s），负值表示反向 */
  speed?: number;
}

export function AutoScroll({
  children,
  className = "",
  speed = 40,
}: AutoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (!isPaused) {
      offsetRef.current -= speed * dt;

      const content = contentRef.current;
      if (content) {
        // 首次计算一半宽度
        if (halfWidthRef.current === 0) {
          halfWidthRef.current = content.scrollWidth / 2;
        }
        const halfWidth = halfWidthRef.current;

        if (halfWidth > 0) {
          // 正向滚动（speed > 0）：offset 变负，超过 halfWidth 时重置
          if (speed > 0 && offsetRef.current <= -halfWidth) {
            offsetRef.current += halfWidth;
          }
          // 反向滚动（speed < 0）：offset 变正，超过 halfWidth 时重置
          if (speed < 0 && offsetRef.current >= 0) {
            offsetRef.current -= halfWidth;
          }
        }

        content.style.transform = `translateX(${offsetRef.current}px)`;
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }, [isPaused, speed]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={contentRef} className="flex w-max">
        {children}
        {/* 复制一份实现无限循环 */}
        {children}
      </div>
    </div>
  );
}
