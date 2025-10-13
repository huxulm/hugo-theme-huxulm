# Post.css 使用指南

## 📋 概述

`post.css` 是一个专门用于文章页面（`posts/single.html`）的样式文件，它继承了 `main.css` 的所有基础样式，并添加了大量文章特定的增强样式。

## 🎯 设计理念

### 1. 继承与扩展
```css
@import "tailwindcss";
@import "./main.css";  /* 继承 main.css */
/* 然后添加文章特定样式 */
```

### 2. 按需加载
- **main.css**: 所有页面加载（基础样式）
- **post.css**: 仅文章页面加载（扩展样式）
- 优化性能，减少非文章页面的 CSS 体积

### 3. 条件加载逻辑
```html
<!-- layouts/_partials/head/css.html -->
{{ if eq .Type "posts" }}
  <!-- 仅当页面类型为 "posts" 时加载 post.css -->
  <link rel="stylesheet" href="post.css">
{{ end }}
```

## ✨ 主要功能模块

### 1️⃣ 文章容器样式
```css
.post-container     /* 主容器 */
.post-content       /* 内容区域 */
```

### 2️⃣ 面包屑导航增强
```css
.breadcrumb-nav     /* 导航容器 */
- 悬停时链接向右平移
- 响应式布局
- 图标优化
```

### 3️⃣ 特色图片优化
```css
.featured-image
- 圆角 + 阴影
- 悬停放大效果（1.05x）
- 加载淡入动画
- 深色模式适配
```

**效果**：
- 悬停时图片放大
- 深色模式下阴影更深
- 加载时平滑淡入

### 4️⃣ 元信息样式
```css
.post-meta          /* 日期、阅读时间、字数等 */
.post-meta-item     /* 单个元信息项 */
```

**包含**：
- 日期（蓝色图标）
- 阅读时间（紫色图标）
- 字数统计（绿色图标）
- 作者信息（粉色图标）

### 5️⃣ 分类和标签徽章
```css
.category-badge     /* 分类徽章（蓝色渐变） */
.tag-badge          /* 标签徽章（紫色渐变） */
```

**特点**：
- 渐变背景
- 悬停上浮效果
- 阴影强化
- 深色模式完美适配

### 6️⃣ 文章描述引用框
```css
.post-description
- 蓝色渐变背景
- 左侧边框
- 大引号装饰（左上角）
- 斜体文字
- 阴影效果
```

### 7️⃣ 文章正文排版（核心）

#### H2 标题增强
```css
article.prose h2
- 底部边框
- 左侧彩色装饰条（蓝到紫渐变）
- 3rem 顶部边距
- scroll-margin-top（锚点定位优化）
```

#### H3 标题增强
```css
article.prose h3
- 左侧圆点装饰（紫色）
- 左边距缩进
```

#### 链接样式
```css
article.prose a
- 底部滑动下划线（从右到左动画）
- 外部链接显示🔗图标
- 蓝色文字
- 悬停效果
```

#### 代码块
```css
article.prose pre
- 深色背景（rgb(17 24 39)）
- 圆角 + 阴影
- 右上角语言标签
- 横向滚动
```

**示例**：
```javascript
// 代码块会自动显示 "JAVASCRIPT" 标签
console.log('Hello World');
```

#### 行内代码
```css
article.prose code
- 粉色文字
- 灰色背景
- 圆角
- 中等字重
```

**示例**：`npm install` 会显示为彩色徽章样式

#### 引用块
```css
article.prose blockquote
- 蓝色渐变背景
- 左侧蓝色边框
- 💡 图标装饰
- 无斜体（font-style: normal）
- 阴影效果
```

#### 列表
```css
article.prose ul li::marker  /* 蓝色圆点 */
article.prose ol li::marker  /* 紫色数字 */
```

#### 表格
```css
article.prose table
- 蓝色渐变表头
- 斑马纹行（奇偶不同色）
- 悬停高亮
- 圆角 + 阴影
- 响应式横向滚动
```

#### 图片
```css
article.prose img
- 圆角
- 阴影
- 居中显示
- 后续 em 标签作为图片标题
```

**用法**：
```markdown
![图片描述](image.jpg)
*这是图片标题*  <!-- 会自动居中显示为灰色小字 -->
```

#### 水平分割线
```css
article.prose hr
- 渐变色（透明 → 蓝色 → 透明）
- 2px 高度
- 上下 3rem 边距
```

### 8️⃣ 社交分享按钮
```css
.share-buttons      /* 按钮容器 */
.share-button       /* 单个按钮 */
- 悬停上浮
- 阴影加强
- 图标 + 文字
```

### 9️⃣ 文章导航（上下篇）
```css
.post-navigation    /* 网格容器 */
.nav-card           /* 导航卡片 */
- 渐变背景
- 悬停上浮
- 渐变遮罩效果
```

### 🔟 TOC 侧边栏
```css
.toc-sidebar
- 粘性定位（sticky top-6rem）
- 最大高度限制
- 自定义滚动条（细窄型）
- 圆角 + 阴影
```

## 🎨 样式覆盖与自定义

### 方式 1：直接修改 post.css

编辑 `assets/css/post.css`，修改对应样式：

```css
/* 例如：修改 H2 标题装饰条颜色 */
article.prose h2::before {
  background: linear-gradient(180deg, red, orange); /* 改为红橙渐变 */
}
```

### 方式 2：创建自定义 CSS

创建 `assets/css/custom-post.css`：

```css
/* 覆盖特定样式 */
article.prose h2 {
  color: purple !important;
}
```

然后在 `head/css.html` 中添加：

```html
{{ if eq .Type "posts" }}
  <!-- post.css -->
  <!-- custom-post.css -->
{{ end }}
```

### 方式 3：使用 HTML class

在文章 front matter 中添加自定义 class：

```yaml
+++
title = "文章标题"
[params]
  articleClass = "custom-article-style"
+++
```

然后在 `single.html` 中：

```html
<article class="prose {{ .Params.articleClass }}">
```

CSS 中：

```css
.custom-article-style h2 {
  /* 自定义样式 */
}
```

## 📐 响应式断点

### 桌面端（>= 1024px）
- TOC 侧边栏显示
- 两栏布局（内容 + TOC）
- H2 标题左侧装饰条

### 平板端（768px - 1023px）
- TOC 移到内容上方
- 单栏布局
- 表格横向滚动

### 移动端（< 768px）
- 元信息垂直排列
- 代码块更小内边距
- 表格横向滚动
- H2 装饰条靠左

## 🌓 深色模式

所有样式都完整支持深色模式：

```css
.dark article.prose h2 {
  /* 深色模式特定样式 */
}
```

**自动适配**：
- 背景色
- 文字颜色
- 边框颜色
- 阴影效果
- 图标颜色

## 🖨️ 打印优化

```css
@media print {
  /* 隐藏交互元素 */
  .breadcrumb-nav { display: none; }
  .share-buttons { display: none; }
  .toc-sidebar { display: none; }
  
  /* 显示链接 URL */
  article.prose a::after {
    content: " (" attr(href) ")";
  }
  
  /* 避免分页断开 */
  h2, h3, h4 { page-break-after: avoid; }
}
```

## ♿ 无障碍功能

### 高对比度模式
```css
@media (prefers-contrast: high) {
  article.prose a {
    text-decoration: underline;  /* 确保链接可见 */
  }
}
```

### 减少动画模式
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 跳过导航链接
```css
.skip-to-content:focus {
  /* 键盘用户可见 */
}
```

## 🔧 性能优化

### 1. 条件加载
- 仅文章页面加载 post.css
- 其他页面不加载，节省带宽

### 2. CSS 压缩
生产环境自动压缩：
```html
{{ if hugo.IsDevelopment }}
  <!-- 开发环境：未压缩 -->
{{ else }}
  {{ with . | fingerprint }}
    <!-- 生产环境：压缩 + 指纹 -->
  {{ end }}
{{ end }}
```

### 3. 文件指纹
生产环境添加 hash：
```
post.abc123.css  <!-- 缓存破坏 -->
```

### 4. 懒加载图片
配合 HTML：
```html
<img loading="lazy" ... >
```

## 📊 文件大小

| 文件 | 开发版 | 生产版 |
|------|--------|--------|
| main.css | ~15KB | ~8KB |
| post.css | ~45KB | ~25KB |
| 总计（文章页） | ~60KB | ~33KB |

**优化效果**：
- 非文章页面：仅加载 ~8KB
- 文章页面：加载 ~33KB
- 节省 ~25KB（非文章页面）

## 🎓 使用示例

### 基础文章

```markdown
+++
title = "我的文章"
date = "2025-10-13"
description = "文章简介"
categories = ["技术"]
tags = ["Hugo", "CSS"]
+++

## 第一章

这是段落文字。

### 1.1 小节

这里有一个 `行内代码` 示例。

```javascript
// 代码块
console.log('Hello');
```

> 这是引用块，会显示 💡 图标。

![示例图片](image.jpg)
*图片标题会居中显示*

---

下面是表格：

| 列1 | 列2 |
|-----|-----|
| A   | B   |
```

### 渲染效果

- ✅ H2 标题带彩色装饰条
- ✅ H3 标题带紫色圆点
- ✅ 行内代码粉色背景
- ✅ 代码块深色主题，右上角显示 "JAVASCRIPT"
- ✅ 引用块蓝色渐变背景，左上角 💡
- ✅ 图片圆角阴影，下方居中标题
- ✅ 水平线渐变效果
- ✅ 表格蓝色表头，斑马纹行

## 🐛 常见问题

### Q1: post.css 没有生效？
**A**: 检查：
1. 文章是否在 `content/posts/` 目录下
2. `.Type` 是否为 "posts"
3. 浏览器开发者工具查看是否加载了 post.css

### Q2: 样式冲突？
**A**: post.css 样式优先级高于 main.css（后加载）。使用 `!important` 强制覆盖。

### Q3: 深色模式颜色不对？
**A**: 确保使用了 `.dark` 前缀：
```css
.dark article.prose h2 { ... }
```

### Q4: 打印时样式丢失？
**A**: 打印样式在 `@media print` 中定义，确保没有被覆盖。

### Q5: 移动端样式错乱？
**A**: 检查响应式断点 `@media (max-width: ...)` 中的样式。

## 🚀 进一步优化

### 短期
1. 添加代码复制按钮
2. 图片点击放大功能
3. 文章目录自动高亮优化
4. 添加更多动画效果

### 中期
1. 支持自定义配色主题
2. 文章评论样式集成
3. 相关文章推荐样式
4. 阅读进度指示器

### 长期
1. 支持多种文章布局
2. 可视化样式编辑器
3. AI 智能配色建议
4. 性能监控和优化

## 📝 更新日志

### v1.0.0 (2025-10-13)
- ✨ 初始发布
- ✅ 完整的文章排版样式
- ✅ 深色模式支持
- ✅ 响应式设计
- ✅ 打印优化
- ✅ 无障碍功能
- ✅ 性能优化（按需加载）

---

## 💡 提示

**最佳实践**：
1. 不要直接修改 main.css，文章特定样式放在 post.css
2. 使用浏览器开发者工具实时调试样式
3. 遵循响应式设计原则
4. 保持深色模式兼容性
5. 考虑打印和无障碍需求

**开发工作流**：
```bash
# 1. 修改 post.css
vim assets/css/post.css

# 2. 启动开发服务器（自动重载）
npm run dev

# 3. 浏览器访问文章页面
http://localhost:1313/posts/first/

# 4. 开发者工具实时调试
F12 → Elements → Styles
```

现在你可以尽情定制文章页面的样式了！🎨
