"use client";

import { useRef, useState, useEffect } from "react";

/**
 * 电脑开机动画
 * 进入视口时播放一次：黑屏 → Logo → 加载条 → 屏幕内显示按钮
 * 文字在屏幕下方渐显
 * 每次会话只播放一次（sessionStorage）
 */

export function BootAnimation({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "booting" | "loading" | "done">("idle");
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("boot-played")) {
      setHasPlayed(true);
      setPhase("done");
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed, phase]);

  useEffect(() => {
    if (phase === "booting") {
      const t1 = setTimeout(() => setPhase("loading"), 800);
      const t2 = setTimeout(() => setPhase("done"), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase]);

  const showText = phase === "done";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 电脑屏幕外壳 */}
      <div className="relative mx-auto max-w-3xl mb-8">
        {/* 屏幕边框 */}
        <div className="rounded-xl border-4 border-slate-700 bg-slate-900 overflow-hidden shadow-2xl">
          {/* 屏幕内容 */}
          <div className="aspect-video relative flex items-center justify-center bg-black">
            {phase === "idle" && !hasPlayed && (
              <div className="text-slate-600 text-sm tracking-widest">READY</div>
            )}
            {phase === "booting" && (
              <div className="text-center" style={{ animation: "bootFadeIn 0.5s ease-out forwards" }}>
                <div
                  className="h-14 w-14 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  L
                </div>
                <p className="text-slate-500 text-xs tracking-widest">LOADING</p>
              </div>
            )}
            {phase === "loading" && (
              <div className="text-center">
                <div
                  className="h-14 w-14 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  L
                </div>
                <div className="w-40 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      animation: "bootProgress 1.5s ease-out forwards",
                    }}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-2 tracking-widest">SYSTEM STARTING...</p>
              </div>
            )}
            {phase === "done" && (
              <div className="text-center px-6" style={{ animation: "bootFadeIn 0.6s ease-out forwards" }}>
                <div
                  className="h-12 w-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 25px rgba(99,102,241,0.5)" }}
                >
                  L
                </div>
                <p className="text-white text-sm font-semibold mb-4">刘桐宇 · Full Stack Developer</p>
                {/* 按钮在屏幕内 */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="/request"
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-white text-sm font-medium transition-all hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      borderRadius: "9999px",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    提交需求
                    <span className="text-xs">→</span>
                  </a>
                  <a
                    href="/knowledge"
                    className="inline-flex items-center gap-1.5 px-5 py-2 border border-slate-500 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors"
                    style={{ borderRadius: "9999px" }}
                  >
                    探索知识库
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 底座 */}
        <div className="mx-auto w-28 h-3 bg-gradient-to-b from-slate-600 to-slate-700 rounded-b-lg" />
        <div className="mx-auto w-40 h-1.5 bg-slate-700 rounded-b-lg" />
      </div>

      {/* 文字在屏幕下方渐显 */}
      <div
        className="text-center"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
          有项目想法？让我们一起实现
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          无论是产品开发、技术咨询还是技术合作，我都期待与您交流
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bootProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes bootFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      ` }} />
    </div>
  );
}
