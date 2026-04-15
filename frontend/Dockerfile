# ============================================
# Next.js 前端多阶段构建 Dockerfile
# 使用 Node.js 22 Alpine 镜像，优化镜像体积
# ============================================

# ------------------------------------------
# Stage 1: 安装依赖
# 单独阶段安装依赖，利用 Docker 缓存层优化构建速度
# ------------------------------------------
FROM node:22-alpine AS deps

# 设置工作目录
WORKDIR /app

# 复制依赖描述文件
COPY package.json package-lock.json* ./

# 安装生产依赖
# 使用 npm ci 确保依赖版本一致性
RUN npm ci --only=production && \
    # 清理 npm 缓存以减小镜像体积
    npm cache clean --force

# ------------------------------------------
# Stage 2: 构建阶段
# 编译 Next.js 项目，生成优化后的生产构建产物
# ------------------------------------------
FROM node:22-alpine AS build

# 设置工作目录
WORKDIR /app

# 从 deps 阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制项目源代码
COPY . .

# 设置构建环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 构建项目
RUN npm run build && \
    # 清理开发依赖，只保留生产依赖
    npm prune --production && \
    npm cache clean --force

# ------------------------------------------
# Stage 3: 运行时阶段
# 最小化运行时镜像，仅包含必要的生产文件
# ------------------------------------------
FROM node:22-alpine AS runner

# 设置工作目录
WORKDIR /app

# 创建非 root 用户运行应用，提高安全性
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 从 build 阶段复制构建产物
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# 复制生产依赖
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# 切换到非 root 用户
USER nextjs

# 暴露前端服务端口
EXPOSE 3000

# 健康检查：每 30 秒检查一次服务是否正常
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# 启动 Next.js 生产服务
CMD ["npm", "start"]
