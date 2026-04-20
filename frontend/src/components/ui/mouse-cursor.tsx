"use client";

import { useEffect, useState } from "react";

/**
 * 鼠标跟随光标效果
 * 创建一个跟随鼠标移动的自定义光标，带有拖尾效果
 */

interface CursorPosition {
  x: number;
  y: number;
}

export function MouseCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 只在桌面端显示
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* 主光标 */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      {/* 光标拖尾 */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-primary/50 ${isClicking ? "scale-75" : "scale-100"} transition-transform duration-200`} />
      </div>
    </>
  );
}
