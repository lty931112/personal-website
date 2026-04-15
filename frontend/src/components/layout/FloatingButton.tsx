"use client";

import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";

/**
 * 悬浮需求按钮组件
 * 固定在页面右下角，点击跳转到需求提交页面
 */
export function FloatingButton() {
  return (
    <Link
      href="/request"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all hover:scale-105"
      aria-label="提交需求"
    >
      <MessageSquarePlus className="h-5 w-5" />
      <span className="text-sm font-medium">提交需求</span>
    </Link>
  );
}
