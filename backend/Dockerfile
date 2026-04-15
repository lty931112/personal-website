# ============================================
# Spring Boot 后端多阶段构建 Dockerfile
# Stage 1 使用 Maven 编译打包
# Stage 2 使用 JRE 运行，最小化镜像体积
# ============================================

# ------------------------------------------
# Stage 1: 构建阶段
# 使用 Maven 编译 Spring Boot 项目，生成可执行 JAR
# ------------------------------------------
FROM maven:3.9-eclipse-temurin-21 AS build

# 设置工作目录
WORKDIR /app

# 先复制 pom.xml，利用 Docker 缓存层优化依赖下载
# 当源代码变更时，只要 pom.xml 不变，依赖缓存仍然有效
COPY pom.xml .

# 下载依赖（不编译），缓存到本地仓库
RUN mvn dependency:go-offline -B

# 复制项目源代码
COPY src ./src

# 编译打包，跳过测试以加快构建速度
# -B: 批处理模式，减少日志输出
# -DskipTests: 跳过测试执行
RUN mvn clean package -DskipTests -B

# ------------------------------------------
# Stage 2: 运行时阶段
# 使用 JRE Alpine 镜像，仅包含运行时所需组件
# ------------------------------------------
FROM eclipse-temurin:21-jre-alpine AS runtime

# 安装必要工具并创建非 root 用户
# curl: 用于健康检查
# fontconfig: 解决 Java 应用中文字体渲染问题
RUN apk add --no-cache curl fontconfig tzdata && \
    # 设置时区为中国标准时间
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    # 创建非 root 用户运行应用，提高安全性
    addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 appuser

# 设置工作目录
WORKDIR /app

# 从 build 阶段复制编译好的 JAR 文件
# 使用通配符匹配，避免硬编码 JAR 文件名
COPY --from=build /app/target/*.jar app.jar

# 创建日志和临时文件目录
RUN mkdir -p /app/logs /app/tmp && \
    chown -R appuser:appgroup /app

# 切换到非 root 用户
USER appuser

# 暴露后端服务端口
EXPOSE 8080

# 设置 JVM 参数
# -XX:+UseG1GC: 使用 G1 垃圾回收器
# -Xmx512m: 最大堆内存 512MB
# -Xms256m: 初始堆内存 256MB
# -Djava.security.egd: 解决 Alpine 下随机数生成较慢的问题
ENV JAVA_OPTS="-XX:+UseG1GC -Xmx512m -Xms256m -Djava.security.egd=file:/dev/./urandom"

# 健康检查：每 30 秒检查一次服务是否正常
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# 启动 Spring Boot 应用
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
