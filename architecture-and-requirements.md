# 个人网站 - 架构设计与需求说明文档

> **版本**: v1.0
> **日期**: 2026-04-15
> **状态**: 初稿

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术选型](#2-技术选型)
3. [系统架构设计](#3-系统架构设计)
4. [功能模块详细设计](#4-功能模块详细设计)
5. [数据模型设计](#5-数据模型设计)
6. [API 接口设计](#6-api-接口设计)
7. [页面结构与交互流程](#7-页面结构与交互流程)
8. [需求提交模块详细设计](#8-需求提交模块详细设计)
9. [知识库模块详细设计](#9-知识库模块详细设计)
10. [部署方案](#10-部署方案)
11. [非功能性需求](#11-非功能性需求)
12. [后续扩展规划](#12-后续扩展规划)

---

## 1. 项目概述

### 1.1 项目背景

构建一个个人品牌网站，用于展示个人作品/产品、发布博客文章、管理知识库，并接收外部需求提交。网站需要具备良好的可维护性和可扩展性，方便后续新增页面和功能模块。

### 1.2 核心目标

| 目标 | 说明 |
|------|------|
| **内容展示** | 首页、产品展示、博客三大内容模块 |
| **知识管理** | 知识库管理与智能检索（基于 MAGMA 记忆系统） |
| **需求收集** | 通过悬浮入口收集外部需求，支持文件上传 |
| **可维护性** | 页面结构清晰，新增页面成本低 |
| **可扩展性** | 架构支持后续功能模块的无缝扩展 |

### 1.3 用户角色

| 角色 | 描述 |
|------|------|
| **访客** | 浏览首页、产品、博客，提交需求 |
| **管理员** | 管理内容、产品、博客、知识库，处理需求 |

---

## 2. 技术选型

### 2.1 前端技术栈

| 技术 | 版本 | 选型理由 |
|------|------|----------|
| **Next.js** | 15.x | React 生态最成熟的 SSR/SSG 框架，SEO 友好，App Router 支持布局嵌套 |
| **React** | 19.x | 主流 UI 库，生态丰富 |
| **TypeScript** | 5.x | 类型安全，提升代码质量和开发体验 |
| **Tailwind CSS** | 4.x | 原子化 CSS，快速构建自定义 UI |
| **shadcn/ui** | latest | 基于 Radix UI + Tailwind，组件源码可控，完全可定制，SSR 原生支持 |
| **Framer Motion** | 11.x | 动画库，用于页面过渡和微交互 |
| **Zustand** | 5.x | 轻量级状态管理 |
| **React Hook Form** | 7.x + Zod | 表单管理 + Schema 校验 |
| **TanStack Query** | 5.x | 数据请求与缓存管理 |

### 2.2 后端技术栈

| 技术 | 版本 | 选型理由 |
|------|------|----------|
| **Java** | 21 LTS | 长期支持版本，性能优异 |
| **Spring Boot** | 3.4.x | Java 生态最成熟的 Web 框架 |
| **Spring Security** | 6.x | 认证与授权 |
| **MyBatis-Plus** | 3.5.x | ORM 框架，简化数据库操作 |
| **Spring AI** | 1.x | AI 集成框架，支持向量数据库对接 |

### 2.3 数据存储

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| **PostgreSQL** | 主数据库 | 功能强大，支持 JSONB、全文检索、轻量化部署（相比 ES） |
| **Milvus Lite / Qdrant** | 向量数据库 | 轻量化向量检索引擎，支持 Docker 单节点部署，适合知识库向量搜索 |
| **MinIO** | 对象存储 | 兼容 S3 协议，轻量化自建文件存储，用于文件上传 |
| **Redis** | 缓存 | 会话管理、热点数据缓存、限流 |

### 2.4 知识库检索方案

| 技术 | 用途 | 说明 |
|------|------|------|
| **MAGMA 记忆系统** | 知识库核心检索架构 | 基于 Multi-Graph 的智能记忆架构，支持语义、时序、因果、实体四维检索 |
| **BGE-M3 Embedding** | 文本向量化 | 支持多语言、混合稠密+稀疏检索，中文表现优秀 |
| **Neo4j** | 图数据库（可选） | 存储 MAGMA 的关系图谱（语义图、时序图、因果图、实体图） |

> **关于 MAGMA 的说明**：MAGMA（Multi-Graph based Agentic Memory Architecture）是一种基于多图的智能记忆架构（论文 arXiv:2601.03236），它将记忆项在四个正交关系图（语义图、时序图、因果图、实体图）中表示，并通过自适应遍历策略实现查询意图驱动的智能检索。在本项目中，MAGMA 将作为知识库的核心检索引擎，提供比传统向量检索更深层次的语义理解和推理能力。

### 2.5 DevOps 工具链

| 工具 | 用途 |
|------|------|
| **Docker + Docker Compose** | 容器化部署 |
| **Nginx** | 反向代理与静态资源服务 |
| **GitHub Actions** | CI/CD 流水线 |

---

## 3. 系统架构设计

### 3.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         客户端 (Browser)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  首页    │ │ 产品展示  │ │   博客    │ │  知识库   │ │ 需求   │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                     Next.js (SSR/SSG)                           │
│                   shadcn/ui + Tailwind CSS                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Nginx 反向代理                              │
│              (SSL终止 / 静态资源 / 负载均衡)                      │
└──────────┬──────────────────────────────┬───────────────────────┘
           │ /api/*                        │ /*
           ▼                               ▼
┌─────────────────────┐    ┌──────────────────────────────────────┐
│   Spring Boot API   │    │       Next.js 前端服务                │
│   (Java 21)         │    │       (Node.js)                      │
│                     │    │                                      │
│ ┌─────────────────┐ │    │  SSG: 首页、产品列表、博客列表        │
│ │  Controller层   │ │    │  SSR: 博客详情、知识库检索            │
│ ├─────────────────┤ │    │  CSR: 需求提交表单、管理后台           │
│ │  Service层      │ │    └──────────────────────────────────────┘
│ ├─────────────────┤ │
│ │  Repository层   │ │
│ └─────────────────┘ │
└──────────┬──────────┘
           │
    ┌──────┼──────┬──────────┬──────────┐
    ▼      ▼      ▼          ▼          ▼
┌──────┐┌──────┐┌──────┐┌──────────┐┌──────┐
│ PgSQL││Redis ││MinIO ││ 向量数据库 ││Neo4j │
│      ││      ││      ││(Milvus/  ││(可选)│
│      ││      ││      ││ Qdrant)  ││      │
└──────┘└──────┘└──────┘└──────────┘└──────┘
```

### 3.2 前端架构（Next.js App Router）

```
src/
├── app/                          # App Router 页面
│   ├── layout.tsx                # 根布局（导航栏、侧边栏、悬浮按钮）
│   ├── page.tsx                  # 首页
│   ├── products/
│   │   ├── page.tsx              # 产品列表
│   │   └── [id]/
│   │       └── page.tsx          # 产品详情
│   ├── blog/
│   │   ├── page.tsx              # 博客列表
│   │   └── [slug]/
│   │       └── page.tsx          # 博客详情
│   ├── knowledge/
│   │   ├── page.tsx              # 知识库管理
│   │   └── search/
│   │       └── page.tsx          # 知识检索
│   ├── request/
│   │   └── page.tsx              # 需求提交页
│   └── admin/                    # 管理后台（后续扩展）
│       ├── layout.tsx
│       ├── products/
│       ├── blog/
│       ├── knowledge/
│       └── requests/
├── components/                   # 共享组件
│   ├── ui/                       # shadcn/ui 组件
│   ├── layout/                   # 布局组件
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingButton.tsx    # 悬浮需求提交按钮
│   ├── home/                     # 首页专用组件
│   ├── products/                 # 产品模块组件
│   ├── blog/                     # 博客模块组件
│   ├── knowledge/                # 知识库模块组件
│   └── request/                  # 需求提交组件
├── lib/                          # 工具库
│   ├── api.ts                    # API 请求封装
│   ├── auth.ts                   # 认证工具
│   └── utils.ts                  # 通用工具
├── hooks/                        # 自定义 Hooks
├── stores/                       # Zustand 状态管理
├── types/                        # TypeScript 类型定义
└── styles/                       # 全局样式
```

### 3.3 后端架构（Spring Boot）

```
src/main/java/com/personal/
├── PersonalWebsiteApplication.java
├── config/                       # 配置类
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   ├── FileUploadConfig.java
│   └── RedisConfig.java
├── controller/                   # 控制器层
│   ├── ProductController.java
│   ├── BlogController.java
│   ├── KnowledgeController.java
│   ├── RequestController.java
│   ├── FileController.java
│   └── AuthController.java
├── service/                      # 业务逻辑层
│   ├── ProductService.java
│   ├── BlogService.java
│   ├── KnowledgeService.java
│   ├── RequestService.java
│   ├── FileService.java
│   ├── SearchService.java        # MAGMA 检索服务
│   └── EmbeddingService.java     # 向量化服务
├── mapper/                       # MyBatis-Plus Mapper
├── entity/                       # 数据库实体
├── dto/                          # 数据传输对象
│   ├── request/                  # 请求 DTO
│   └── response/                 # 响应 DTO
├── vo/                           # 视图对象
├── common/                       # 公共模块
│   ├── Result.java               # 统一响应体
│   ├── PageResult.java           # 分页响应
│   ├── BusinessException.java    # 业务异常
│   └── enums/                    # 枚举类
├── validation/                   # 自定义校验注解
├── security/                     # 安全模块
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── UserDetailsServiceImpl.java
├── magma/                        # MAGMA 记忆系统模块
│   ├── MemoryStore.java          # 记忆存储接口
│   ├── RelationGraph.java        # 关系图定义
│   ├── QueryRouter.java          # 查询意图路由
│   ├── AdaptiveTraversal.java    # 自适应遍历策略
│   ├── MemoryEvolution.java      # 记忆演化（写入/更新）
│   └── ContextSynthesizer.java   # 上下文合成
└── infrastructure/               # 基础设施层
    ├── vector/                   # 向量数据库适配
    ├── storage/                  # 文件存储适配
    └── embedding/                # Embedding 模型适配
```

### 3.4 前后端交互架构

```
┌──────────────┐     REST API      ┌──────────────┐
│  Next.js     │ ◄──────────────► │  Spring Boot  │
│  (前端)      │   JSON / FormData │  (后端 API)   │
└──────────────┘                   └──────────────┘
        │                                  │
        │ SSG/ISR                          │
        ▼                                  ▼
┌──────────────┐                   ┌──────────────┐
│  静态资源     │                   │  PostgreSQL  │
│  (CDN/Nginx) │                   │  Redis       │
└──────────────┘                   │  MinIO       │
                                   │  向量数据库   │
                                   └──────────────┘
```

---

## 4. 功能模块详细设计

### 4.1 首页模块

#### 4.1.1 功能描述

首页作为网站的门面，需要展示个人品牌形象、核心内容导航和最新动态。

#### 4.1.2 页面区块

| 区块 | 内容 | 渲染方式 |
|------|------|----------|
| **Hero 区域** | 个人介绍、核心标语、CTA 按钮 | SSG |
| **最新动态** | 最新博客文章 × 3、最新产品 × 3 | ISR（增量静态再生） |
| **技能/专长** | 个人技能展示 | SSG |
| **数据统计** | 博客数、产品数、知识库条目数 | CSR（动态获取） |
| **联系方式** | 社交链接、邮箱 | SSG |

#### 4.1.3 技术实现

- 使用 Framer Motion 实现滚动动画
- ISR 策略：每 60 秒重新生成静态页面
- 响应式设计：移动端优先

---

### 4.2 产品展示模块

#### 4.2.1 功能描述

展示个人项目/产品，支持分类筛选和详情查看。

#### 4.2.2 页面结构

```
/products              → 产品列表页（SSG + 客户端筛选）
/products/[id]         → 产品详情页（SSG）
```

#### 4.2.3 核心功能

| 功能 | 描述 |
|------|------|
| **产品列表** | 卡片式布局，支持分类标签筛选 |
| **产品详情** | 图文展示、技术栈标签、项目链接 |
| **分类管理** | 后台可自定义产品分类 |
| **排序** | 按时间、热度排序 |

#### 4.2.4 数据模型

```sql
CREATE TABLE product (
    id            BIGSERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    description   TEXT,
    cover_image   VARCHAR(500),
    category_id   BIGINT REFERENCES product_category(id),
    content       TEXT,           -- Markdown 内容
    tech_stack    JSONB,          -- 技术栈标签
    demo_url      VARCHAR(500),
    source_url    VARCHAR(500),
    status        SMALLINT DEFAULT 1,  -- 0:草稿 1:已发布 2:归档
    sort_order    INT DEFAULT 0,
    view_count    INT DEFAULT 0,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_category (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    slug          VARCHAR(100) UNIQUE NOT NULL,
    sort_order    INT DEFAULT 0,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4.3 博客模块

#### 4.3.1 功能描述

个人博客系统，支持文章发布、分类、标签、搜索。

#### 4.3.2 页面结构

```
/blog                  → 博客列表页（SSG + 筛选）
/blog/[slug]           → 博客详情页（SSR）
/blog/category/[slug]  → 分类归档页（SSG）
/blog/tag/[slug]       → 标签归档页（SSG）
```

#### 4.3.3 核心功能

| 功能 | 描述 |
|------|------|
| **文章列表** | 支持分页、分类筛选、标签筛选 |
| **文章详情** | Markdown 渲染、代码高亮、目录导航（TOC） |
| **搜索** | 前端全文搜索（标题+摘要） |
| **归档** | 按年月归档展示 |
| **阅读统计** | 文章阅读量统计 |

#### 4.3.4 数据模型

```sql
CREATE TABLE blog_post (
    id            BIGSERIAL PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    slug          VARCHAR(200) UNIQUE NOT NULL,
    summary       VARCHAR(500),
    cover_image   VARCHAR(500),
    content       TEXT NOT NULL,     -- Markdown 内容
    category_id   BIGINT REFERENCES blog_category(id),
    status        SMALLINT DEFAULT 0,  -- 0:草稿 1:已发布 2:归档
    is_pinned     BOOLEAN DEFAULT FALSE,
    view_count    INT DEFAULT 0,
    word_count    INT DEFAULT 0,
    published_at  TIMESTAMP,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_category (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    slug          VARCHAR(100) UNIQUE NOT NULL,
    description   VARCHAR(500),
    sort_order    INT DEFAULT 0
);

CREATE TABLE blog_tag (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE blog_post_tag (
    post_id       BIGINT REFERENCES blog_post(id) ON DELETE CASCADE,
    tag_id        BIGINT REFERENCES blog_tag(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);
```

---

### 4.4 需求提交模块

> 详见 [第 8 节 - 需求提交模块详细设计](#8-需求提交模块详细设计)

---

### 4.5 知识库模块

> 详见 [第 9 节 - 知识库模块详细设计](#9-知识库模块详细设计)

---

## 5. 数据模型设计

### 5.1 ER 关系总览

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  product     │────►│product_category│     │  blog_post   │
│              │     └──────────────┘     │              │
└──────────────┘                          └──┬───────┬───┘
                                              │       │
                                    ┌─────────┘       └─────────┐
                                    ▼                           ▼
                            ┌──────────────┐           ┌──────────────┐
                            │blog_category │           │ blog_post_tag│──►blog_tag
                            └──────────────┘           └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  requirement │────►│req_attachment│     │knowledge_entry│
│              │     └──────────────┘     │              │
└──────────────┘                          └──────────────┘

┌──────────────┐     ┌──────────────┐
│   sys_user   │     │  sys_file    │
│              │     │              │
└──────────────┘     └──────────────┘
```

### 5.2 系统管理表

```sql
-- 用户表
CREATE TABLE sys_user (
    id            BIGSERIAL PRIMARY KEY,
    username      VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nickname      VARCHAR(100),
    avatar_url    VARCHAR(500),
    email         VARCHAR(200),
    role          VARCHAR(20) DEFAULT 'ADMIN',  -- ADMIN, EDITOR
    status        SMALLINT DEFAULT 1,
    last_login_at TIMESTAMP,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文件表
CREATE TABLE sys_file (
    id            BIGSERIAL PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    stored_name   VARCHAR(255) NOT NULL,
    file_path     VARCHAR(500) NOT NULL,
    file_size     BIGINT NOT NULL,
    content_type  VARCHAR(100),
    bucket        VARCHAR(100) DEFAULT 'default',
    uploader_id   BIGINT REFERENCES sys_user(id),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. API 接口设计

### 6.1 接口规范

**基础路径**: `/api/v1`

**统一响应格式**:
```json
{
    "code": 200,
    "message": "success",
    "data": { ... },
    "timestamp": 1713158400000
}
```

**分页响应格式**:
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "list": [ ... ],
        "total": 100,
        "page": 1,
        "size": 10,
        "totalPages": 10
    }
}
```

### 6.2 接口列表

#### 6.2.1 产品模块

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | `/api/v1/products` | 获取产品列表（分页+筛选） | 否 |
| GET | `/api/v1/products/{id}` | 获取产品详情 | 否 |
| GET | `/api/v1/products/categories` | 获取产品分类列表 | 否 |
| POST | `/api/v1/admin/products` | 创建产品 | 是 |
| PUT | `/api/v1/admin/products/{id}` | 更新产品 | 是 |
| DELETE | `/api/v1/admin/products/{id}` | 删除产品 | 是 |

#### 6.2.2 博客模块

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | `/api/v1/blogs` | 获取博客列表（分页+筛选） | 否 |
| GET | `/api/v1/blogs/{slug}` | 获取博客详情 | 否 |
| GET | `/api/v1/blogs/categories` | 获取博客分类 | 否 |
| GET | `/api/v1/blogs/tags` | 获取标签列表 | 否 |
| GET | `/api/v1/blogs/archives` | 获取归档统计 | 否 |
| POST | `/api/v1/admin/blogs` | 创建博客 | 是 |
| PUT | `/api/v1/admin/blogs/{id}` | 更新博客 | 是 |
| DELETE | `/api/v1/admin/blogs/{id}` | 删除博客 | 是 |

#### 6.2.3 需求提交模块

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | `/api/v1/requirements` | 提交需求 | 否 |
| POST | `/api/v1/files/upload` | 上传文件 | 否（限流） |
| GET | `/api/v1/admin/requirements` | 获取需求列表 | 是 |
| PUT | `/api/v1/admin/requirements/{id}/status` | 更新需求状态 | 是 |

#### 6.2.4 知识库模块

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | `/api/v1/knowledge` | 获取知识条目列表 | 否 |
| GET | `/api/v1/knowledge/{id}` | 获取知识条目详情 | 否 |
| POST | `/api/v1/knowledge/search` | 知识检索（MAGMA） | 否 |
| POST | `/api/v1/admin/knowledge` | 创建知识条目 | 是 |
| PUT | `/api/v1/admin/knowledge/{id}` | 更新知识条目 | 是 |
| DELETE | `/api/v1/admin/knowledge/{id}` | 删除知识条目 | 是 |
| POST | `/api/v1/admin/knowledge/{id}/index` | 手动触发索引重建 | 是 |

#### 6.2.5 认证模块

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | `/api/v1/auth/login` | 管理员登录 | 否 |
| POST | `/api/v1/auth/refresh` | 刷新 Token | 否 |
| GET | `/api/v1/auth/me` | 获取当前用户信息 | 是 |

---

## 7. 页面结构与交互流程

### 7.1 全局布局

```
┌─────────────────────────────────────────────────────┐
│  Header (固定顶部)                                   │
│  [Logo]  [首页] [产品] [博客] [知识库]    [管理入口]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  Main Content Area                   │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Footer                                             │
│  [版权信息]  [社交链接]  [备案号]                     │
└─────────────────────────────────────────────────────┘
                                    ┌──────────┐
                                    │  💬 悬浮  │  ← 右下角悬浮按钮
                                    │  需求按钮  │     所有页面可见
                                    └──────────┘
```

### 7.2 导航与路由映射

| 路由 | 页面 | 布局 | 渲染策略 |
|------|------|------|----------|
| `/` | 首页 | 公共布局 | SSG + ISR |
| `/products` | 产品列表 | 公共布局 | SSG + CSR 筛选 |
| `/products/[id]` | 产品详情 | 公共布局 | SSG |
| `/blog` | 博客列表 | 公共布局 | SSG + CSR 筛选 |
| `/blog/[slug]` | 博客详情 | 公共布局 | SSR |
| `/blog/category/[slug]` | 分类归档 | 公共布局 | SSG |
| `/knowledge` | 知识库管理 | 公共布局 | CSR |
| `/knowledge/search` | 知识检索 | 公共布局 | CSR |
| `/request` | 需求提交 | 公共布局 | CSR |
| `/admin/*` | 管理后台 | 管理布局 | CSR |

### 7.3 悬浮需求按钮交互流程

```
用户浏览任意页面
        │
        ▼
  点击右下角悬浮按钮 💬
        │
        ▼
  ┌─────────────────────┐
  │  展开悬浮菜单        │
  │  ┌─────────────────┐│
  │  │ 📝 提交需求      ││
  │  └─────────────────┘│
  │  ┌─────────────────┐│
  │  │ 📎 查看我的需求   ││  ← 可选：通过查询码查看
  │  └─────────────────┘│
  └─────────────────────┘
        │
        ▼ 点击"提交需求"
  路由跳转至 /request
  （或弹出全屏 Modal）
        │
        ▼
  ┌─────────────────────────────────┐
  │  需求提交表单                    │
  │  ┌───────────────────────────┐  │
  │  │ 联系方式（邮箱/手机）*     │  │
  │  │ 需求标题 *                │  │
  │  │ 需求分类（下拉选择）*      │  │
  │  │ 需求描述（富文本）*        │  │
  │  │ 优先级（低/中/高）        │  │
  │  │ 预算范围（可选）           │  │
  │  │ 附件上传（拖拽/点击）      │  │
  │  │                           │  │
  │  │  [取消]        [提交需求]  │  │
  │  └───────────────────────────┘  │
  └─────────────────────────────────┘
        │
        ▼ 提交成功
  返回查询码，用户可凭此查询处理进度
```

---

## 8. 需求提交模块详细设计

### 8.1 功能概述

通过网站侧边悬浮按钮进入需求填写页面，支持文件上传，对输入内容和文件进行严格校验。

### 8.2 前端校验规则

#### 8.2.1 表单字段校验（Zod Schema）

```typescript
const requirementSchema = z.object({
  // 联系方式（二选一必填）
  contactType: z.enum(['email', 'phone']),
  email: z.string().email('邮箱格式不正确')
    .optional()
    .refine((val) => val === undefined || val.length <= 200, '邮箱过长'),
  phone: z.string()
    .regex(/^1[3-9]\d{9}$/, '手机号格式不正确')
    .optional(),

  // 需求标题
  title: z.string()
    .min(2, '标题至少2个字符')
    .max(100, '标题最多100个字符')
    .trim(),

  // 需求分类
  category: z.enum([
    'website', 'app', 'consultation',
    'cooperation', 'other'
  ], { required_error: '请选择需求分类' }),

  // 需求描述
  description: z.string()
    .min(10, '描述至少10个字符')
    .max(5000, '描述最多5000个字符')
    .trim(),

  // 优先级
  priority: z.enum(['low', 'medium', 'high']).default('medium'),

  // 预算范围（可选）
  budgetRange: z.string().optional(),

  // 附件（可选，最多5个）
  attachments: z.array(z.object({
    fileId: z.string(),
    fileName: z.string(),
    fileSize: z.number(),
  })).max(5, '最多上传5个附件').optional(),
}).refine(
  (data) => {
    if (data.contactType === 'email') return !!data.email;
    if (data.contactType === 'phone') return !!data.phone;
    return false;
  },
  { message: '请填写联系方式', path: ['email'] }
);
```

#### 8.2.2 文件上传校验

| 校验项 | 规则 | 错误提示 |
|--------|------|----------|
| **文件数量** | 单次最多 5 个 | "最多上传5个附件" |
| **单文件大小** | ≤ 10MB | "文件大小不能超过10MB" |
| **总文件大小** | ≤ 50MB | "附件总大小不能超过50MB" |
| **文件类型** | 图片: jpg/png/gif/webp (≤5MB)<br>文档: pdf/doc/docx/xls/xlsx/ppt/pptx<br>压缩包: zip/rar/7z<br>文本: txt/md | "不支持的文件类型" |
| **文件名** | ≤ 200 字符，不含特殊字符 | "文件名不合法" |
| **病毒扫描** | 后端 ClamAV 扫描 | "文件安全检查未通过" |

### 8.3 后端校验与安全

| 校验层 | 措施 |
|--------|------|
| **接口限流** | 同一 IP 每小时最多提交 5 次需求 |
| **文件上传限流** | 同一 IP 每分钟最多 10 次上传请求 |
| **内容安全** | XSS 过滤、SQL 注入防护、敏感词检测 |
| **文件安全** | MIME 类型校验、文件头魔数校验、ClamAV 病毒扫描 |
| **验证码** | 可选：提交前人机验证（Turnstile/reCAPTCHA） |

### 8.4 数据模型

```sql
CREATE TABLE requirement (
    id              BIGSERIAL PRIMARY KEY,
    query_code      VARCHAR(20) UNIQUE NOT NULL,  -- 查询码，用户可凭此查询进度
    contact_type    VARCHAR(10) NOT NULL,          -- email / phone
    contact_value   VARCHAR(200) NOT NULL,         -- 脱敏存储
    title           VARCHAR(100) NOT NULL,
    category        VARCHAR(50) NOT NULL,
    description     TEXT NOT NULL,
    priority        VARCHAR(10) DEFAULT 'medium',
    budget_range    VARCHAR(100),
    status          VARCHAR(20) DEFAULT 'pending', -- pending/reviewing/accepted/rejected/completed
    admin_remark    TEXT,                          -- 管理员备注
    ip_address      VARCHAR(50),
    user_agent      VARCHAR(500),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requirement_attachment (
    id              BIGSERIAL PRIMARY KEY,
    requirement_id  BIGINT REFERENCES requirement(id) ON DELETE CASCADE,
    file_id         BIGINT REFERENCES sys_file(id),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8.5 交互细节

- **悬浮按钮**：固定在页面右下角，带呼吸动画效果
- **展开菜单**：点击后向上展开，显示"提交需求"和"查看进度"两个选项
- **表单页面**：支持路由跳转（`/request`）或全屏 Modal 两种方式
- **文件上传**：支持拖拽上传和点击上传，显示上传进度条
- **提交反馈**：提交成功后显示查询码，并提供"复制查询码"按钮
- **进度查询**：输入查询码 + 联系方式，可查看需求处理状态

---

## 9. 知识库模块详细设计

### 9.1 功能概述

知识库模块提供知识的录入、管理和智能检索功能。核心检索能力基于 **MAGMA 多图记忆架构** 实现，支持语义、时序、因果、实体四维度的智能检索。

### 9.2 MAGMA 记忆系统集成架构

```
┌─────────────────────────────────────────────────────────────┐
│                     知识库检索流程                             │
│                                                             │
│  用户查询                                                    │
│      │                                                      │
│      ▼                                                      │
│  ┌──────────────────┐                                       │
│  │ 1. 查询分析       │  意图分类(Why/When/Entity/Fact)       │
│  │    Query Router   │  时间解析 → 绝对时间窗口               │
│  │                  │  生成: 稠密向量 + 稀疏关键词            │
│  └────────┬─────────┘                                       │
│           ▼                                                 │
│  ┌──────────────────┐                                       │
│  │ 2. 锚点识别       │  RRF 融合多信号:                      │
│  │  Anchor Finder   │  - 向量语义相似度                      │
│  │                  │  - 关键词精确匹配                      │
│  │                  │  - 时间窗口过滤                        │
│  └────────┬─────────┘                                       │
│           ▼                                                 │
│  ┌──────────────────┐                                       │
│  │ 3. 自适应遍历     │  根据查询意图动态选择遍历策略:          │
│  │  Adaptive        │  - "为什么" → 因果图遍历               │
│  │  Traversal       │  - "什么时候" → 时序图遍历             │
│  │                  │  - "关于XX" → 实体图遍历               │
│  │                  │  - 一般查询 → 语义图遍历               │
│  └────────┬─────────┘                                       │
│           ▼                                                 │
│  ┌──────────────────┐                                       │
│  │ 4. 上下文合成     │  融合多图遍历结果                       │
│  │  Context         │  生成结构化检索结果                     │
│  │  Synthesizer     │  附带推理路径说明                       │
│  └──────────────────┘                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.3 MAGMA 数据结构层

#### 9.3.1 四维关系图

| 图类型 | 存储内容 | 边关系 | 检索场景 |
|--------|----------|--------|----------|
| **语义图** | 概念相似的知识条目 | 无向边（cos 相似度 > 阈值） | 一般性知识查询 |
| **时序图** | 按时间排序的知识条目 | 有向边（时间先后） | "什么时候"、"最新" |
| **因果图** | 有因果关系的知识条目 | 有向边（逻辑推导） | "为什么"、"原因" |
| **实体图** | 共享实体的知识条目 | 连接实体节点 | "关于 XX"、"相关" |

#### 9.3.2 存储方案

| 数据 | 存储位置 | 说明 |
|------|----------|------|
| **知识条目原文** | PostgreSQL | 结构化存储，支持 CRUD |
| **稠密向量** | Milvus / Qdrant | BGE-M3 生成的 Embedding |
| **关系图谱** | Neo4j（推荐）/ PostgreSQL JSONB | 四维关系图 |
| **稀疏索引** | PostgreSQL 全文检索 | BM25 关键词匹配 |

### 9.4 知识条目数据模型

```sql
CREATE TABLE knowledge_entry (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(300) NOT NULL,
    content         TEXT NOT NULL,           -- Markdown 内容
    summary         VARCHAR(1000),           -- AI 生成摘要
    category        VARCHAR(100),
    tags            JSONB DEFAULT '[]',      -- 标签数组
    source_url      VARCHAR(500),            -- 来源链接
    status          SMALLINT DEFAULT 1,      -- 0:草稿 1:已发布 2:归档
    embedding_id    VARCHAR(100),            -- 向量数据库中的 ID
    is_indexed      BOOLEAN DEFAULT FALSE,   -- 是否已建立索引
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 知识条目之间的关系（因果/引用/衍生）
CREATE TABLE knowledge_relation (
    id              BIGSERIAL PRIMARY KEY,
    source_id       BIGINT REFERENCES knowledge_entry(id) ON DELETE CASCADE,
    target_id       BIGINT REFERENCES knowledge_entry(id) ON DELETE CASCADE,
    relation_type   VARCHAR(20) NOT NULL,    -- causal, reference, derived, temporal
    weight          FLOAT DEFAULT 1.0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (source_id, target_id, relation_type)
);
```

### 9.5 知识库管理功能

| 功能 | 描述 |
|------|------|
| **知识录入** | 支持 Markdown 编辑器录入，支持富文本 |
| **批量导入** | 支持文件批量导入（Markdown、TXT、PDF） |
| **分类与标签** | 多级分类 + 自由标签 |
| **AI 摘要** | 录入时自动生成摘要 |
| **索引管理** | 手动/自动触发向量索引构建 |
| **关系维护** | AI 辅助识别知识条目间的因果关系 |
| **版本管理** | 知识条目修改历史（可选） |

### 9.6 知识检索功能

| 功能 | 描述 |
|------|------|
| **智能搜索** | 基于 MAGMA 的意图识别 + 多图遍历检索 |
| **关键词搜索** | 传统全文检索（PostgreSQL tsvector） |
| **分类浏览** | 按分类/标签浏览知识条目 |
| **搜索建议** | 输入时实时搜索建议 |
| **结果高亮** | 搜索结果关键词高亮 |
| **推理路径** | 展示 MAGMA 检索的推理路径（为什么返回这条结果） |

### 9.7 MAGMA 检索 API 设计

**请求**:
```json
POST /api/v1/knowledge/search
{
    "query": "如何优化 Spring Boot 的启动速度？",
    "filters": {
        "category": "技术",
        "tags": ["Java", "Spring Boot"],
        "dateRange": {
            "start": "2025-01-01",
            "end": "2026-12-31"
        }
    },
    "searchType": "smart",    // smart | keyword | hybrid
    "topK": 10,
    "includeReasoning": true  // 是否返回推理路径
}
```

**响应**:
```json
{
    "code": 200,
    "data": {
        "results": [
            {
                "id": 1,
                "title": "Spring Boot 启动优化实践",
                "summary": "...",
                "score": 0.95,
                "matchType": "semantic+causal",
                "reasoningPath": [
                    "查询意图: How-to (技术实践)",
                    "遍历路径: 语义图 → 因果图",
                    "匹配原因: 语义相似度 0.92 + 因果关联 '启动慢 → 类加载过多'"
                ],
                "highlights": {
                    "title": ["<em>Spring Boot</em> 启动优化实践"],
                    "content": ["...通过<em>懒加载</em>减少<em>启动时间</em>..."]
                }
            }
        ],
        "total": 15,
        "queryIntent": "How-to",
        "traversalDetails": {
            "semanticGraph": { "nodesTraversed": 23, "timeMs": 45 },
            "causalGraph": { "nodesTraversed": 8, "timeMs": 12 },
            "entityGraph": { "nodesTraversed": 5, "timeMs": 8 }
        }
    }
}
```

---

## 10. 部署方案

### 10.1 轻量化云端部署

> 考虑到轻量化部署需求，推荐以下方案：

#### 10.1.1 推荐方案：单服务器 Docker Compose

```
┌─────────────────────────────────────────────────────┐
│                  单台云服务器 (4C8G 起)               │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │            Docker Compose                    │    │
│  │                                             │    │
│  │  ┌──────────┐  ┌──────────┐                 │    │
│  │  │ Next.js  │  │ Nginx    │                 │    │
│  │  │ :3000    │  │ :80/443  │                 │    │
│  │  └──────────┘  └──────────┘                 │    │
│  │                                             │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │Spring Boot│  │PostgreSQL│  │  Redis   │  │    │
│  │  │ :8080    │  │ :5432    │  │  :6379   │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  │    │
│  │                                             │    │
│  │  ┌──────────┐  ┌──────────┐                │    │
│  │  │  Milvus  │  │  MinIO   │                │    │
│  │  │ Lite     │  │ :9000    │                │    │
│  │  └──────────┘  └──────────┘                │    │
│  │                                             │    │
│  │  ┌──────────┐  (可选)                       │    │
│  │  │  Neo4j   │                               │    │
│  │  └──────────┘                               │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

#### 10.1.2 资源需求估算

| 服务 | 最低配置 | 推荐配置 | 说明 |
|------|----------|----------|------|
| **Next.js** | 512MB | 1GB | SSR 渲染 |
| **Spring Boot** | 1GB | 2GB | Java 应用 |
| **PostgreSQL** | 512MB | 1GB | 主数据库 |
| **Redis** | 256MB | 512MB | 缓存 |
| **Milvus Lite** | 512MB | 1GB | 向量检索（嵌入式模式） |
| **MinIO** | 256MB | 512MB | 文件存储 |
| **Neo4j**（可选） | 512MB | 1GB | 图数据库 |
| **总计** | ~3.5GB | ~6GB | |

> **轻量化建议**：
> - 初期可使用 **Milvus Lite**（嵌入式模式，无需独立服务）替代完整 Milvus 集群
> - Neo4j 可用 PostgreSQL JSONB + 关系表替代，减少一个服务
> - 最小化部署仅需：Next.js + Spring Boot + PostgreSQL + Redis，约 2.5GB 内存

#### 10.1.3 云服务商推荐

| 方案 | 适用场景 | 预估月费 |
|------|----------|----------|
| **轻量应用服务器**（腾讯/阿里） | 个人项目，流量不大 | ¥50-100/月 |
| **VPS**（Vultr/DigitalOcean） | 海外访问需求 | $6-12/月 |
| **Serverless**（Vercel + 云函数） | 极致轻量，按量付费 | 接近免费 |

### 10.2 Docker Compose 配置（概要）

```yaml
# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    depends_on: [frontend, backend]

  frontend:
    build: ./frontend
    environment:
      - NEXT_PUBLIC_API_URL=/api

  backend:
    build: ./backend
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/personal_web
      - SPRING_REDIS_HOST=redis
      - MINIO_ENDPOINT=http://minio:9000

  postgres:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine

  minio:
    image: minio/minio
    command: server /data

volumes:
  pgdata:
```

---

## 11. 非功能性需求

### 11.1 性能要求

| 指标 | 目标 |
|------|------|
| **首屏加载 (LCP)** | ≤ 2.5s |
| **交互响应 (FID)** | ≤ 100ms |
| **视觉稳定 (CLS)** | ≤ 0.1 |
| **API 响应时间** | P95 ≤ 500ms |
| **知识检索延迟** | ≤ 2s（含向量检索） |

### 11.2 安全要求

| 措施 | 说明 |
|------|------|
| **HTTPS** | 全站 HTTPS，Let's Encrypt 免费证书 |
| **CORS** | 严格配置跨域策略 |
| **XSS 防护** | 输入过滤 + CSP 头 + HttpOnly Cookie |
| **CSRF 防护** | Token 校验 |
| **SQL 注入** | MyBatis 参数化查询 |
| **文件安全** | MIME 校验 + 魔数校验 + 病毒扫描 + 独立存储域 |
| **限流** | 接口级限流 + IP 级限流 |
| **敏感数据** | 联系方式脱敏存储 |

### 11.3 可维护性要求

| 措施 | 说明 |
|------|------|
| **页面可配置** | 新增页面只需添加路由 + 组件，无需修改框架代码 |
| **CMS 化** | 博客、产品内容通过后台管理，无需改代码 |
| **组件化** | UI 组件基于 shadcn/ui，源码可控，易于定制 |
| **API 版本化** | `/api/v1` 前缀，支持后续版本迭代 |
| **日志** | 结构化日志 + 请求链路追踪 |
| **监控** | 健康检查接口 + 基础监控告警 |

### 11.4 SEO 要求

| 措施 | 说明 |
|------|------|
| **SSR/SSG** | 首页、产品、博客使用服务端渲染 |
| **Meta 标签** | 每个页面自定义 title、description、keywords |
| **Open Graph** | 社交分享预览 |
| **Sitemap** | 自动生成 sitemap.xml |
| **结构化数据** | JSON-LD 结构化标记 |

---

## 12. 后续扩展规划

### 12.1 短期规划（Phase 2）

| 功能 | 描述 |
|------|------|
| **管理后台** | 完整的内容管理后台（基于 shadcn/ui 的 Admin 模板） |
| **评论系统** | 博客文章评论（支持 GitHub 登录） |
| **暗色模式** | 全站暗色/亮色主题切换 |
| **国际化** | 中英文双语支持 |

### 12.2 中期规划（Phase 3）

| 功能 | 描述 |
|------|------|
| **AI 对话** | 基于知识库的 AI 问答助手 |
| **RSS 订阅** | 博客 RSS 输出 |
| **邮件通知** | 需求状态变更邮件通知 |
| **数据分析** | 访问统计、热门内容分析 |

### 12.3 长期规划（Phase 4）

| 功能 | 描述 |
|------|------|
| **多用户系统** | 注册/登录，个人空间 |
| **API 开放平台** | 对外提供 API 接口 |
| **微服务拆分** | 按需拆分为微服务架构 |
| **MAGMA 增强** | 引入强化学习优化检索策略 |

---

## 附录 A：技术选型对比

### A.1 前端 UI 组件库对比

| 特性 | **shadcn/ui** ✅ | Ant Design | MUI | Chakra UI |
|------|------------------|------------|-----|-----------|
| **设计风格** | 现代简约 | 企业级 | Material | 灵活 |
| **代码可控性** | ✅ 源码在项目中 | ❌ 黑盒依赖 | ❌ 黑盒依赖 | ❌ 黑盒依赖 |
| **SSR 支持** | ✅ 原生支持 | ⚠️ 需调整 | ⚠️ 有限 | ⚠️ 有限 |
| **可定制性** | ✅ 完全可控 | ⚠️ 主题系统 | ⚠️ 主题系统 | ⚠️ 主题系统 |
| **包体积** | ✅ 按需引入 | ⚠️ 较大 | ⚠️ 较大 | ⚠️ 中等 |
| **Next.js 适配** | ✅ 最佳 | ⚠️ 需配置 | ⚠️ 需配置 | ⚠️ 需配置 |
| **中文社区** | ⚠️ 成长中 | ✅ 成熟 | ✅ 成熟 | ⚠️ 一般 |

### A.2 向量数据库对比（轻量化场景）

| 特性 | **Milvus Lite** ✅ | Qdrant | Weaviate | Chroma |
|------|-------------------|--------|----------|--------|
| **部署复杂度** | ✅ 嵌入式，零配置 | ⚠️ 需独立服务 | ⚠️ 需独立服务 | ✅ 嵌入式 |
| **内存占用** | ✅ 低 | ⚠️ 中等 | ⚠️ 较高 | ✅ 低 |
| **中文支持** | ✅ 良好 | ✅ 良好 | ✅ 良好 | ✅ 良好 |
| **Java SDK** | ✅ 有 | ✅ 有 | ✅ 有 | ⚠️ 有限 |
| **扩展性** | ✅ 可升级集群版 | ✅ 分布式 | ✅ 分布式 | ⚠️ 有限 |
| **适合场景** | 个人/中小项目 | 中大型项目 | 企业级 | 原型开发 |

---

## 附录 B：项目目录结构总览

```
personal-website/
├── frontend/                     # Next.js 前端
│   ├── src/
│   │   ├── app/                  # App Router
│   │   ├── components/           # 组件
│   │   ├── lib/                  # 工具库
│   │   ├── hooks/                # Hooks
│   │   ├── stores/               # 状态管理
│   │   ├── types/                # 类型定义
│   │   └── styles/               # 样式
│   ├── public/                   # 静态资源
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                      # Spring Boot 后端
│   ├── src/main/java/
│   │   └── com/personal/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── mapper/
│   │       ├── entity/
│   │       ├── dto/
│   │       ├── config/
│   │       ├── security/
│   │       ├── magma/            # MAGMA 记忆系统
│   │       └── infrastructure/
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── mapper/
│   └── pom.xml
│
├── docker-compose.yml            # Docker 编排
├── nginx/                        # Nginx 配置
│   └── nginx.conf
├── docs/                         # 项目文档
│   └── architecture.md           # 本文档
├── .github/workflows/            # CI/CD
└── README.md
```

---

> **文档结束** — 本文档为初稿，后续将根据实际开发情况持续更新。
