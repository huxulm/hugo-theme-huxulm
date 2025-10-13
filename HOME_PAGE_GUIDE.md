# 🏠 首页设计指南

## 📋 功能概览

全新设计的首页（`layouts/home.html`）提供了现代化、响应式的博客展示体验，包含以下功能：

### ✨ 主要特性

1. **Hero 区域** - 醒目的网站标题和描述
2. **最新博文展示** - 可配置数量的卡片式博文列表
3. **热门标签云** - 动态字体大小的标签展示
4. **完全响应式** - 移动端、平板、桌面完美适配
5. **暗色模式支持** - 全面的暗色主题
6. **精美动画** - 悬停效果、过渡动画
7. **灵活配置** - 通过 `params` 自定义

---

## ⚙️ 配置说明

### 基础配置（`hugo.toml` 或 `config.toml`）

```toml
[params]
  # 网站描述（显示在 Hero 区域）
  description = "欢迎来到我的博客，分享技术、思考与生活"
  
  # 作者名称
  author = "Your Name"
  
  # 首页最新博文显示数量（默认：6）
  recentPostsCount = 6
```

### 📊 可配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `description` | String | - | 首页 Hero 区域的描述文字 |
| `author` | String | - | 作者名称 |
| `recentPostsCount` | Integer | 6 | 首页显示的最新博文数量 |

---

## 🎨 页面结构

### 1️⃣ Hero 区域

```
┌─────────────────────────────────────┐
│        [网站标题 - 渐变大标题]        │
│                                     │
│     [描述文字 - 来自 params]         │
│                                     │
│     [自定义内容 - _index.md]         │
│                                     │
│   [开始阅读]  [浏览标签] (按钮)      │
└─────────────────────────────────────┘
```

**特点**：
- 🎨 渐变色标题（蓝→紫→粉）
- 📝 支持在 `content/_index.md` 添加自定义内容
- 🔘 两个 CTA 按钮（可自定义链接）

### 2️⃣ 最新博文区域

```
┌─────────────────────────────────────┐
│  ✨ 最新博文          [查看全部 →]   │
├─────────────────────────────────────┤
│  [卡片1]  [卡片2]  [卡片3]          │
│  [卡片4]  [卡片5]  [卡片6]          │
└─────────────────────────────────────┘
```

**卡片内容**：
- 🖼️ 特色图片（或渐变占位符）
- 🏷️ 分类标签
- 📅 发布日期
- 📖 文章标题
- 📝 文章摘要（自动截断 120 字符）
- ⏱️ 阅读时间
- 🏷️ 标签（显示前 2 个）

**响应式布局**：
- 📱 **移动端**（< 768px）：1 列
- 💻 **平板**（768px - 1024px）：2 列
- 🖥️ **桌面**（> 1024px）：3 列

### 3️⃣ 热门标签区域

```
┌─────────────────────────────────────┐
│  🏷️ 热门标签                        │
├─────────────────────────────────────┤
│  [标签1(10)] [标签2(8)] [标签3(6)]  │
│  [标签4(5)]  [标签5(4)] ...         │
│                                     │
│      [查看所有标签 →]                │
└─────────────────────────────────────┘
```

**特点**：
- 📊 标签字体大小根据文章数量动态调整
- 🎨 渐变背景（蓝→紫）
- 🔢 显示文章数量徽章
- 📱 自动换行适配

---

## 📝 使用示例

### 示例 1：自定义首页显示 9 篇文章

**`hugo.toml`**:
```toml
[params]
  description = "探索技术的无限可能"
  author = "张三"
  recentPostsCount = 9  # 显示 9 篇（3x3 网格）
```

### 示例 2：添加自定义欢迎内容

**`content/_index.md`**:
```markdown
---
title: "欢迎"
---

👋 欢迎来到我的技术博客！

这里分享关于 **Web 开发**、**云原生**、**人工智能** 的最新见解。

定期更新，欢迎订阅！
```

### 示例 3：文章添加特色图片

**`content/posts/my-post.md`**:
```markdown
---
title: "我的第一篇博文"
date: 2025-10-13
categories: ["技术"]
tags: ["Hugo", "Web开发"]
featured_image: "/images/my-featured-image.jpg"
---

文章内容...
```

---

## 🎯 视觉效果

### 卡片悬停效果

- ✨ 阴影增强（shadow-lg → shadow-2xl）
- 🔍 图片缩放（scale-110）
- 🎨 标题变色（蓝色高亮）
- 🌑 渐变遮罩显示

### 按钮效果

- 🌈 渐变背景按钮（主按钮）
- 🔲 边框按钮（次要按钮）
- ➡️ 箭头平移动画（查看全部链接）

### 标签云效果

- 📏 动态字体大小（基于文章数量）
- 🎨 渐变悬停效果
- 🔢 徽章缩放动画

---

## 📱 响应式断点

```css
/* 移动端 */
< 768px:
  - 1 列博文卡片
  - 小号 Hero 标题（text-4xl）
  - 紧凑间距

/* 平板 */
768px - 1024px:
  - 2 列博文卡片
  - 中号 Hero 标题（text-5xl）
  - 中等间距

/* 桌面 */
> 1024px:
  - 3 列博文卡片
  - 大号 Hero 标题（text-6xl）
  - 宽松间距
```

---

## 🎨 自定义样式

### 修改渐变颜色

**Hero 标题渐变**：
```html
<!-- 默认：蓝→紫→粉 -->
<h1 class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">

<!-- 自定义：绿→青→蓝 -->
<h1 class="bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600">
```

**按钮渐变**：
```html
<!-- 默认：蓝→紫 -->
<a class="bg-gradient-to-r from-blue-600 to-purple-600">

<!-- 自定义：橙→红 -->
<a class="bg-gradient-to-r from-orange-600 to-red-600">
```

### 调整卡片间距

```html
<!-- 默认间距 -->
<div class="gap-6 md:gap-8">

<!-- 紧凑间距 -->
<div class="gap-4 md:gap-6">

<!-- 宽松间距 -->
<div class="gap-8 md:gap-10">
```

---

## 🔧 常见问题

### Q1: 如何隐藏热门标签区域？

**方法 1**：删除模板中的标签区域代码（第 163-195 行）

**方法 2**：添加条件判断
```html
{{ if and .Site.Taxonomies.tags .Site.Params.showPopularTags }}
  <!-- 标签区域 -->
{{ end }}
```

然后在 `hugo.toml` 中设置：
```toml
[params]
  showPopularTags = false
```

### Q2: 如何更改博文排序？

默认按日期降序排列。可以修改：

```html
<!-- 按日期降序（默认） -->
{{ $recentPosts := where .Site.RegularPages "Type" "posts" | first $recentCount }}

<!-- 按标题排序 -->
{{ $recentPosts := where .Site.RegularPages "Type" "posts" | sort ".Title" | first $recentCount }}

<!-- 按权重排序 -->
{{ $recentPosts := where .Site.RegularPages "Type" "posts" | sort ".Weight" | first $recentCount }}
```

### Q3: 如何添加更多 Section（不仅仅是 posts）？

```html
<!-- 原代码 -->
{{ $recentPosts := where .Site.RegularPages "Type" "posts" | first $recentCount }}

<!-- 包含多个 Section -->
{{ $recentPosts := where .Site.RegularPages "Type" "in" (slice "posts" "blog" "articles") | first $recentCount }}
```

### Q4: 空状态时显示什么？

当没有文章时，会显示：
```
    📝
  暂无文章
开始创建你的第一篇博文吧！
```

---

## 📚 相关文件

```
layouts/
├── home.html              # 🏠 首页模板
├── baseof.html            # 📄 基础框架
├── _partials/
│   ├── header.html        # 🎯 页头
│   ├── footer.html        # 📌 页脚
│   └── animated-background.html  # ✨ 动画背景

content/
└── _index.md              # 📝 首页自定义内容

hugo.toml                  # ⚙️ 配置文件
```

---

## 🚀 快速开始

1. **配置参数**：
```toml
# hugo.toml
[params]
  description = "你的网站描述"
  recentPostsCount = 6
```

2. **创建文章**：
```bash
hugo new posts/my-first-post.md
```

3. **启动服务器**：
```bash
npm run dev
# 或
hugo server -D
```

4. **访问首页**：
打开 http://localhost:1313/

---

## 🎯 效果预览

访问以下链接查看实际效果：
- 🏠 首页：http://localhost:1313/
- 📰 文章列表：http://localhost:1313/posts/
- 🏷️ 标签页：http://localhost:1313/tags/

---

**提示**：所有样式都使用 Tailwind CSS v4，支持完整的暗色模式和响应式设计！
