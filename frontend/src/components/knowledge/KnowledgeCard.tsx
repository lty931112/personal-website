/**
 * 知识条目卡片组件
 * 在知识库管理页中展示单个知识条目的摘要信息
 */

interface KnowledgeCardProps {
  /** 知识条目 ID */
  id: string;
  /** 条目标题 */
  title: string;
  /** 条目描述 */
  description: string;
  /** 所属分类 */
  category: string;
  /** 最后更新时间 */
  updatedAt: string;
  /** 标签列表 */
  tags: string[];
}

export function KnowledgeCard({
  id,
  title,
  description,
  category,
  updatedAt,
  tags,
}: KnowledgeCardProps) {
  return (
    <div className="p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
      {/* 分类和日期 */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
          {category}
        </span>
        <time>更新于 {updatedAt}</time>
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* 描述 */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-muted rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <button className="text-sm text-primary hover:underline">查看详情</button>
        <span className="text-muted-foreground">|</span>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          编辑
        </button>
        <span className="text-muted-foreground">|</span>
        <button className="text-sm text-destructive hover:underline">删除</button>
      </div>
    </div>
  );
}
