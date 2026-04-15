import type { ApiResponse, PaginatedResponse } from "@/types/api";

/**
 * API 请求封装模块
 * 基于 fetch API 封装，支持请求/响应拦截、错误处理和类型安全
 */

/* API 基础地址，从环境变量读取 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

/* 自定义请求错误类 */
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/* 通用请求选项 */
interface RequestOptions extends RequestInit {
  /** 请求参数（会拼接到 URL query 中） */
  params?: Record<string, string | number | boolean | undefined>;
  /** 是否跳过全局错误处理 */
  skipErrorHandler?: boolean;
}

/**
 * 通用请求方法
 * @param endpoint - API 端点路径（如 "/products"）
 * @param options - 请求选项
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, skipErrorHandler, ...fetchOptions } = options;

  /* 拼接查询参数 */
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  /* 设置默认请求头 */
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  /* 发起请求 */
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  /* 处理错误响应 */
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message || `请求失败 (${response.status})`;
    throw new ApiError(response.status, message, errorData);
  }

  /* 解析响应数据 */
  const data = await response.json();
  return data as T;
}

/**
 * GET 请求
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>(endpoint, { method: "GET", params });
}

/**
 * GET 请求（分页）
 */
export async function getList<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<PaginatedResponse<T>> {
  return request<PaginatedResponse<T>>(endpoint, { method: "GET", params });
}

/**
 * POST 请求
 */
export async function post<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export async function put<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export async function del<T>(
  endpoint: string
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>(endpoint, { method: "DELETE" });
}

/**
 * 文件上传请求
 */
export async function upload<T>(
  endpoint: string,
  formData: FormData
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>(endpoint, {
    method: "POST",
    body: formData,
    headers: {},
  });
}

export { ApiError };
export default {
  get,
  getList,
  post,
  put,
  del,
  upload,
};
