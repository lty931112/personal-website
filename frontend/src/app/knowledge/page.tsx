import { KnowledgeCard } from "@/components/knowledge/KnowledgeCard";

/**
 * 知识库管理页
 * 展示知识库分类和条目列表，支持新增、编辑和删除
 */

/* 模拟知识库数据 */
const mockKnowledgeItems = [
  {
    id: "1",
    title: "产品使用手册",
    description: "包含所有产品的详细使用说明和操作指南。",
    category: "产品文档",
    updatedAt: "2025-01-15",
    tags: ["手册", "指南"],
  },
  {
    id: "2",
    title: "常见问题 FAQ",
    description: "汇总用户最常遇到的问题及其解决方案。",
    category: "帮助中心",
    updatedAt: "2025-01-10",
    tags: ["FAQ", "帮助"],
  },
  {
    id: "3",
    title: "API 接口文档",
    description: "开放 API 接口的详细说明和调用示例。",
    category: "开发文档",
    updatedAt: "2025-01-08",
    tags: ["API", "开发"],
  },
  {
    id: "4",
    title: "部署运维指南",
    description: "系统部署、配置和日常运维的操作手册。",
    category: "运维文档",
    updatedAt: "2025-01-05",
    tags: ["部署", "运维"],
  },
];

export default function KnowledgePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">知识库</h1>
          <p className="text-muted-foreground">
            管理和维护知识库内容，为团队和用户提供信息支持。
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          + 新增条目
        </button>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["全部", "产品文档", "帮助中心", "开发文档", "运维文档"].map(
          (category) => (
            <button
              key={category}
              className="px-4 py-1.5 rounded-full text-sm border hover:bg-accent transition-colors"
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* 知识条目列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockKnowledgeItems.map((item) => (
          <KnowledgeCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            updatedAt={item.updatedAt}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
}
