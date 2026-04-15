"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./FileUpload";

/**
 * 需求提交表单组件
 * 包含需求标题、描述、联系方式、优先级和文件上传
 */

/* 优先级选项 */
const priorityOptions = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
  { value: "urgent", label: "紧急" },
];

/* 需求类型选项 */
const categoryOptions = [
  { value: "feature", label: "新功能" },
  { value: "bug", label: "Bug 修复" },
  { value: "improvement", label: "优化改进" },
  { value: "consultation", label: "技术咨询" },
];

export function RequirementForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 处理表单提交 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: 调用 API 提交需求
    console.log("表单提交中...");

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 需求标题 */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          需求标题 <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          name="title"
          placeholder="请简要描述您的需求"
          required
        />
      </div>

      {/* 需求类型和优先级 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            需求类型 <span className="text-destructive">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">请选择类型</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-2">
            优先级
          </label>
          <select
            id="priority"
            name="priority"
            className="w-full h-10 px-3 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 需求描述 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          详细描述 <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="请详细描述您的需求，包括使用场景、期望效果等..."
          rows={6}
          required
        />
      </div>

      {/* 联系方式 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            您的姓名 <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="请输入您的姓名"
            required
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium mb-2">
            联系方式 <span className="text-destructive">*</span>
          </label>
          <Input
            id="contact"
            name="contact"
            placeholder="手机号或邮箱"
            required
          />
        </div>
      </div>

      {/* 文件上传 */}
      <div>
        <label className="block text-sm font-medium mb-2">
          附件上传（可选）
        </label>
        <FileUpload />
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          保存草稿
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交需求"}
        </Button>
      </div>
    </form>
  );
}
