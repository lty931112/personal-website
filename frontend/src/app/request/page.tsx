import { RequirementForm } from "@/components/request/RequirementForm";

/**
 * 需求提交页
 * 用户可以在此页面填写并提交需求，支持文件上传
 */
export default function RequestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">提交需求</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          请详细描述您的需求，我们的团队将在 24 小时内与您联系。
        </p>
      </div>

      {/* 需求表单 */}
      <div className="max-w-2xl mx-auto">
        <RequirementForm />
      </div>
    </div>
  );
}
