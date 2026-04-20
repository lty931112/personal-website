# ============================================
# Next.js 前端多阶段构建 Dockerfile
# 使用 Node.js 22 Alpine 镜像，优化镜像体积
# ============================================

# ------------------------------------------
# Stage 1: 安装依赖
# 单独阶段安装依赖，利用 Docker 缓存层优化构建速度
# ------------------------------------------
FROM node:24-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

# 安装全部依赖（包括 devDependencies，构建需要）
RUN npm ci

# ------------------------------------------
# Stage 2: 构建阶段
# 编译 Next.js 项目，生成优化后的生产构建产物
# ------------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# 从 deps 阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制项目源代码
COPY . .

# 设置构建环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=http://localhost/api

# 构建项目
RUN npm run build

# ------------------------------------------
# Stage 3: 运行时阶段
# 最小化运行时镜像，仅包含必要的生产文件
# standalone 模式会生成自包含的输出
# ------------------------------------------
FROM node:24-alpine AS runner

WORKDIR /app

# 设置时区
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 创建非 root 用户运行应用
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 从 build 阶段复制 standalone 输出
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露前端服务端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# 启动 Next.js 生产服务（standalone 模式使用 node 直接启动）
CMD ["node", "server.js"]
