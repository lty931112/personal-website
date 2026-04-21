"use client";

import { useState, ReactNode } from "react";

/**
 * 翻转卡片组件
 * 默认展示正面（项目说明），鼠标悬停翻转展示背面（效果图）
 * 3D 翻转动画，perspective 透视效果
 */

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FlipCard({ front, back, className = "", style }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`group ${className}`}
      style={{
        perspective: "1000px",
        ...style,
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* 正面 - 项目说明（用 grid 让正面撑起高度） */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* 背面 - 效果图（absolute 覆盖在正面之上） */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
