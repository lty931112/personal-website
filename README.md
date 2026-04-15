# 全栈应用项目

基于 Next.js + Spring Boot 的全栈 Web 应用，采用前后端分离架构，通过 Nginx 反向代理统一入口。

## 技术栈

### 前端
- **框架**: Next.js (React)
- **语言**: TypeScript
- **运行时**: Node.js 22
- **包管理**: npm

### 后端
- **框架**: Spring Boot 3.x
- **语言**: Java 21
- **构建工具**: Maven 3.9
- **API 文档**: Swagger / OpenAPI 3

### 基础设施
- **反向代理**: Nginx (Alpine)
- **数据库**: PostgreSQL 16
- **缓存**: Redis 7
- **对象存储**: MinIO
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

## 项目结构概览

```
.
├── frontend/                # Next.js 前端项目
│   ├── Dockerfile           # 前端多阶段构建镜像
│   ├── public/              # 静态资源
│   ├── src/                 # 源代码
│   ├── package.json         # 依赖描述
│   └── next.config.js       # Next.js 配置
├── backend/                 # Spring Boot 后端项目
│   ├── Dockerfile           # 后端多阶段构建镜像
│   ├── src/                 # 源代码
│   │   ├── main/            # 主代码
│   │   └── test/            # 测试代码
│   └── pom.xml              # Maven 项目描述
├── nginx/                   # Nginx 配置
│   └── nginx.conf           # 反向代理配置
├── .github/                 # GitHub 配置
│   └── workflows/           # CI/CD 工作流
│       └── ci.yml           # 自动化测试流水线
├── docker-compose.yml       # Docker Compose 编排文件
├── .gitignore               # Git 忽略规则
├── .editorconfig            # 编辑器配置
└── README.md                # 项目说明文档
```

## 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | >= 22 |
| Java JDK | >= 21 |
| Maven | >= 3.9 |
| Docker | >= 24.0 |
| Docker Compose | >= 2.20 |
| Git | >= 2.40 |

### 克隆项目

```bash
git clone https://github.com/your-org/your-project.git
cd your-project
```

### 前端启动

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 后端启动

```bash
# 进入后端目录
cd backend

# 编译项目
mvn clean package -DskipTests

# 启动应用
java -jar target/app.jar

# 访问 http://localhost:8080
```

### Docker 一键启动

```bash
# 构建并启动所有服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 停止并清除数据卷（慎用）
docker-compose down -v
```

启动后各服务访问地址：

| 服务 | 地址 | 说明 |
|------|------|------|
| Nginx | http://localhost | 统一入口 |
| 前端 | http://localhost:3000 | Next.js 应用 |
| 后端 API | http://localhost:8080 | Spring Boot API |
| Swagger 文档 | http://localhost/api-docs/ | API 接口文档 |
| MinIO 控制台 | http://localhost:9001 | 对象存储管理 |

## API 文档

后端集成 Swagger/OpenAPI 3，启动后可通过以下地址访问：

- **Swagger UI**: http://localhost/api-docs/
- **OpenAPI JSON**: http://localhost/v3/api-docs

API 请求路径统一以 `/api/` 为前缀，由 Nginx 反向代理转发到后端服务。

## 常用命令

```bash
# 前端代码检查
cd frontend && npm run lint

# 前端构建
cd frontend && npm run build

# 后端运行测试
cd backend && mvn test

# 后端打包
cd backend && mvn clean package -DskipTests
```
