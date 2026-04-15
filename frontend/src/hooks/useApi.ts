"use client";

import { useState, useCallback } from "react";
import { ApiError } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

/**
 * useApi - 通用 API 请求 Hook
 * 封装请求状态管理（loading / error / data），支持手动触发和自动执行
 *
 * @example
 * const { data, loading, error, execute } = useApi(() => get("/products"));
 */

interface UseApiState<T> {
  /** 响应数据 */
  data: T | null;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  /** 手动触发请求 */
  execute: (...args: unknown[]) => Promise<T | null>;
  /** 重置状态 */
  reset: () => void;
}

/**
 * @param apiFn - 返回 Promise 的 API 调用函数
 * @param options - 配置选项
 */
export function useApi<T>(
  apiFn: () => Promise<ApiResponse<T>>,
  options?: {
    /** 是否在挂载时自动执行 */
    immediate?: boolean;
    /** 成功回调 */
    onSuccess?: (data: T) => void;
    /** 失败回调 */
    onError?: (error: string) => void;
  }
): UseApiReturn<T> {
  const { immediate = false, onSuccess, onError } = options || {};

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  /** 执行请求 */
  const execute = useCallback(
    async (..._args: unknown[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFn();
        const data = response.data;

        setState({ data, loading: false, error: null });
        onSuccess?.(data);
        return data;
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "请求失败，请稍后重试";

        setState((prev) => ({ ...prev, loading: false, error: message }));
        onError?.(message);
        return null;
      }
    },
    [apiFn, onSuccess, onError]
  );

  /** 重置状态 */
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}
