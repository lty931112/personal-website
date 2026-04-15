import { create } from "zustand";

/**
 * 全局状态管理（Zustand）
 * 管理应用级别的共享状态，如用户信息、主题设置、全局通知等
 */

/* 用户信息类型 */
interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "guest";
}

/* 通知消息类型 */
interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

/* 应用全局状态 */
interface AppState {
  /** 当前用户信息 */
  user: UserInfo | null;
  /** 主题模式 */
  theme: "light" | "dark" | "system";
  /** 侧边栏是否展开 */
  sidebarOpen: boolean;
  /** 全局通知列表 */
  notifications: Notification[];
  /** 是否正在加载（全局） */
  globalLoading: boolean;

  /* ---- Actions ---- */

  /** 设置用户信息 */
  setUser: (user: UserInfo | null) => void;
  /** 切换主题 */
  setTheme: (theme: "light" | "dark" | "system") => void;
  /** 切换侧边栏 */
  toggleSidebar: () => void;
  /** 添加通知 */
  addNotification: (notification: Omit<Notification, "id">) => void;
  /** 移除通知 */
  removeNotification: (id: string) => void;
  /** 设置全局加载状态 */
  setGlobalLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  /* 初始状态 */
  user: null,
  theme: "system",
  sidebarOpen: true,
  notifications: [],
  globalLoading: false,

  /* Actions */
  setUser: (user) => set({ user }),

  setTheme: (theme) => {
    set({ theme });
    // 应用主题到 document
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.add("light");
      }
    }
  },

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
