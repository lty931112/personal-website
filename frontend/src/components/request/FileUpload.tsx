"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

/**
 * 文件上传组件
 * 支持拖拽上传和点击选择文件，显示已上传文件列表
 */

/* 允许的文件类型 */
const ACCEPTED_TYPES = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/* 最大文件大小（10MB） */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface UploadedFile {
  /** 文件名 */
  name: string;
  /** 文件大小（字节） */
  size: number;
  /** 文件对象 */
  file: File;
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /** 格式化文件大小 */
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /** 添加文件 */
  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter(
      (file) => file.size <= MAX_FILE_SIZE
    );

    const uploaded: UploadedFile[] = validFiles.map((file) => ({
      name: file.name,
      size: file.size,
      file,
    }));

    setFiles((prev) => [...prev, ...uploaded]);
  };

  /** 移除文件 */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /** 拖拽事件处理 */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* 拖拽上传区域 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          拖拽文件到此处，或{" "}
          <span className="text-primary font-medium">点击选择文件</span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          支持 PDF、Word、图片格式，单个文件不超过 10MB
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* 已上传文件列表 */}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
