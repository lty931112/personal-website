"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

interface BootAnimationProps {
  className?: string;
  /** 动画完成后显示的内容 */
  children: ReactNode;
}

export function BootAnimation({ className = "", children }: BootAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "booting" | "loading" | "done">("idle");
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // 检查 sessionStorage 是否已播放过
    if (sessionStorage.getItem("boot-played")) {
      setHasPlayed(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed && phase === "idle") {
          setPhase("booting");
          sessionStorage.setItem("boot-played", "true");
          setHasPlayed(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed, phase]);

  // 开机动画时序
  useEffect(() => {
    if (phase === "booting") {
      const t1 = setTimeout(() => setPhase("loading"), 800);
      const t2 = setTimeout(() => setPhase("done"), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase]);

  if (hasPlayed && phase === "idle") {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 电脑屏幕外壳 */}
      <div className="relative mx-auto max-w-3xl">
        {/* 屏幕边框 */}
        <div className="rounded-xl border-4 border-slate-700 bg-slate-900 overflow-hidden shadow-2xl">
          {/* 屏幕内容 */}
          <div className="aspect-video relative flex items-center justify-center bg-black">
            {/* 开机动画 */}
            {phase === "booting" && (
              <div className="text-center animate-fade-in">
                <div
                  className="h-16 w-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  L
                </div>
                <p className="text-slate-500 text-sm tracking-widest">LOADING</p>
              </div>
            )}
            {phase === "loading" && (
              <div className="text-center">
                <div
                  className="h-16 w-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  L
                </div>
                <div className="w-48 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      animation: "bootProgress 1.5s ease-out forwards",
                    }}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-3 tracking-widest">SYSTEM STARTING...</p>
              </div>
            )}
            {phase === "done" && (
              <div className="text-center animate-fade-in">
                {children}
              </div>
            )}
          </div>
        </div>
        {/* 底座 */}
        <div className="mx-auto w-32 h-4 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b-lg" />
        <div className="mx-auto w-48 h-2 bg-slate-700 rounded-b-lg" />
      </div>

      {/* 内联关键帧 - 使用 dangerouslySetInnerHTML 代替 styled-jsx */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bootProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      ` }} />
    </div>
  );
}
