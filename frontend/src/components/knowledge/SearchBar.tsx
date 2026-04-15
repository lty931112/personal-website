"use client";

import { useState } from "react";
import { Search } from "lucide-react";

/**
 * 搜索栏组件
 * 知识检索页的搜索输入框，支持回车触发搜索
 */

interface SearchBarProps {
  /** 输入框占位文本 */
  placeholder?: string;
  /** 搜索回调函数 */
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "搜索...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  /** 处理搜索提交 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border rounded-lg bg-background text-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
    </form>
  );
}
