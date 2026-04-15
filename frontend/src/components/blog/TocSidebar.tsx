"use client";

/**
 * 目录导航侧边栏组件
 * 在博客详情页右侧展示文章的目录结构，支持点击跳转
 */

interface TocHeading {
  /** 锚点 ID */
  id: string;
  /** 标题文本 */
  text: string;
  /** 标题级别（2 = h2, 3 = h3） */
  level: number;
}

interface TocSidebarProps {
  /** 目录标题列表 */
  headings: TocHeading[];
}

export function TocSidebar({ headings }: TocSidebarProps) {
  /** 点击目录项滚动到对应位置 */
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-24">
      <h4 className="text-sm font-semibold mb-4">目录</h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
