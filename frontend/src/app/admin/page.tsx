/**
 * 管理后台首页（仪表盘）
 * 展示系统概览数据、快捷操作和最近活动
 */

/* 模拟统计数据 */
const stats = [
  { label: "总产品数", value: "128", change: "+12%", trend: "up" },
  { label: "博客文章", value: "56", change: "+5%", trend: "up" },
  { label: "待处理需求", value: "23", change: "-3%", trend: "down" },
  { label: "本月访问量", value: "12,345", change: "+18%", trend: "up" },
];

export default function AdminPage() {
  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <p className="text-muted-foreground">系统概览和关键指标</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-card rounded-lg border shadow-sm"
          >
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p
              className={`text-sm mt-2 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} 较上月
            </p>
          </div>
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">快捷操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow text-left">
            <h3 className="font-semibold mb-1">发布新文章</h3>
            <p className="text-sm text-muted-foreground">
              创建并发布一篇新的博客文章
            </p>
          </button>
          <button className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow text-left">
            <h3 className="font-semibold mb-1">添加产品</h3>
            <p className="text-sm text-muted-foreground">
              添加新的产品到产品中心
            </p>
          </button>
          <button className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow text-left">
            <h3 className="font-semibold mb-1">处理需求</h3>
            <p className="text-sm text-muted-foreground">
              查看并处理用户提交的需求
            </p>
          </button>
        </div>
      </div>

      {/* 最近活动 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">最近活动</h2>
        <div className="bg-card border rounded-lg divide-y">
          {[
            {
              action: "发布了新文章",
              target: "Next.js 15 入门指南",
              time: "10 分钟前",
            },
            {
              action: "更新了产品",
              target: "产品 A - v2.0",
              time: "1 小时前",
            },
            {
              action: "处理了需求",
              target: "#REQ-2025-0042",
              time: "3 小时前",
            },
            {
              action: "新增了知识条目",
              target: "API 接口文档",
              time: "昨天",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4"
            >
              <div>
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
