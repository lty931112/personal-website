# ============================================
# Next.js 前端多阶段构建 Dockerfile
# 使用国内镜像源解决 Docker Hub 访问问题
# ============================================

# 镜像源（国内加速）
FROM docker.1ms.run/library/node:24-slim AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

FROM docker.1ms.run/library/node:24-slim AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=http://localhost/api

RUN npm run build

FROM docker.1ms.run/library/node:24-slim AS runner

WORKDIR /app

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
