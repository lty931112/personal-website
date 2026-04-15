import { SearchBar } from "@/components/knowledge/SearchBar";

/**
 * 知识检索页
 * 提供全文搜索功能，帮助用户快速找到所需知识
 */

/* 模拟搜索结果 */
const mockSearchResults = [
  {
    id: "1",
    title: "如何重置管理员密码",
    excerpt:
      "在系统设置页面，点击「安全设置」选项卡，找到密码重置功能...",
    category: "帮助中心",
    relevance: 98,
  },
  {
    id: "2",
    title: "管理员权限说明",
    excerpt:
      "系统支持三种角色权限：超级管理员、普通管理员和只读用户...",
    category: "系统管理",
    relevance: 85,
  },
  {
    id: "3",
    title: "安全策略配置",
    excerpt:
      "建议启用双因素认证、定期更换密码、限制登录 IP 范围...",
    category: "安全文档",
    relevance: 72,
  },
];

export default function KnowledgeSearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">知识检索</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          输入关键词搜索知识库，快速找到您需要的信息。
        </p>
      </div>

      {/* 搜索栏 */}
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar placeholder="输入关键词搜索知识库..." />
      </div>

      {/* 搜索结果 */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground">
          搜索结果（共 {mockSearchResults.length} 条）
        </h2>
        {mockSearchResults.map((result) => (
          <div
            key={result.id}
            className="p-6 bg-card border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                {result.title}
              </h3>
              <span className="text-sm text-muted-foreground">
                相关度 {result.relevance}%
              </span>
            </div>
            <p className="text-muted-foreground mb-3">{result.excerpt}</p>
            <span className="text-xs px-2 py-1 bg-muted rounded-full">
              {result.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
