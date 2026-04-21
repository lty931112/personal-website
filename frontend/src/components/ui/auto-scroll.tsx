"use client";

import { useRef, useState, useEffect, ReactNode, useCallback } from "react";

/**
 * 横向自动滚动容器
 * 内容自动横向滚动，鼠标悬停暂停，移走继续
 * 支持无限循环（内容复制一份拼接）
 */

interface AutoScrollProps {
  children: ReactNode;
  className?: string;
  /** 滚动速度（px/s） */
  speed?: number;
  /** 暂停间隔（ms） */
  pauseInterval?: number;
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

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (!isPaused) {
      offsetRef.current -= speed * dt;

      const content = contentRef.current;
      if (content) {
        const halfWidth = content.scrollWidth / 2;
        // 无限循环：偏移量超过一半宽度时重置
        if (Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current += halfWidth;
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
