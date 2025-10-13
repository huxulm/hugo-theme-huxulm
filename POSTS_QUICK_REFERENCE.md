# Posts 模板快速参考

## 📁 文件位置

```
layouts/
├── posts/
│   └── single.html              # Posts 专用模板（自动应用）
└── _partials/
    ├── breadcrumb.html          # 面包屑组件
    └── toc.html                 # 目录组件
```

## 🚀 快速开始

### 创建文章（推荐 Page Bundle 方式）

```bash
hugo new posts/my-article/index.md
```

### Front Matter 示例

```yaml
+++
title = '文章标题'
date = '2025-10-13T10:00:00Z'
draft = false
description = '文章简介（显示在头部引用框）'
# featured_image = './cover.png'  # 可选，会自动查找 cover.*
categories = ['技术']
tags = ['Hugo', 'Tailwind']
+++

## 第一章

内容...

### 1.1 小节

详细内容...

## 第二章

更多内容...
```

## ✨ 主要功能

### 1️⃣ 面包屑导航
- **位置**：页面顶部
- **功能**：显示 `首页 > Posts > 当前文章`
- **样式**：带图标，当前页高亮

### 2️⃣ 目录（TOC）
- **位置**：右侧边栏（桌面）/ 文章顶部（移动）
- **功能**：
  - 自动提取 H2/H3 标题
  - 滚动自动高亮当前章节
  - 点击平滑滚动
  - 显示阅读进度条
- **交互**：粘性定位，移动端可折叠

### 3️⃣ 文章头部
- 特色图片（16:9 或 21:9）
- 标题（超大字体）
- 元信息（日期、阅读时间、字数、作者）
- 分类/标签徽章
- 描述引用框

### 4️⃣ 文章底部
- 社交分享（Twitter、微信）
- 上一篇/下一篇导航
- 返回列表按钮

## 🎨 样式特点

### 正文排版（Tailwind Typography）
- H2：带下边框，大号字体
- H3/H4：层级分明
- 代码块：深色背景，圆角阴影
- 引用：蓝色左边框，浅蓝背景
- 链接：蓝色，悬停下划线
- 图片：圆角，阴影

### 响应式布局
- **桌面**：内容 8 列 + TOC 4 列（12 栏网格）
- **移动**：单栏，TOC 可折叠

### 深色模式
- 全组件支持
- 自动适配图标和文本颜色

## 🔧 常用自定义

### 修改布局比例（9:3）

编辑 `layouts/posts/single.html`:

```html
<div class="lg:col-span-9">  <!-- 内容 -->
<aside class="lg:col-span-3">  <!-- TOC -->
```

### 修改配色

```html
<!-- 蓝色改为紫色 -->
class="text-blue-600"  →  class="text-purple-600"
class="bg-blue-100"    →  class="bg-purple-100"
```

### 添加社交分享

在 `layouts/posts/single.html` 分享部分添加：

```html
<a href="https://..." class="px-4 py-2 bg-blue-600 text-white rounded-lg">
  Facebook
</a>
```

## 📊 图片处理

### 方式 1：Page Bundle（推荐）

```
posts/my-article/
├── index.md
├── cover.png       # 自动识别为封面
└── image1.jpg
```

Front matter 可省略 `featured_image`

### 方式 2：指定路径

```yaml
featured_image = '/images/my-cover.jpg'
# 或
featured_image = './cover.png'  # Page Bundle 相对路径
```

## 🧪 测试

访问：http://localhost:52055/posts/first/

检查：
- [x] 面包屑显示正确
- [x] TOC 自动生成
- [x] 滚动时 TOC 高亮
- [x] 点击 TOC 平滑滚动
- [x] 进度条更新
- [x] 响应式布局正常
- [x] 深色模式正常

## 📚 完整文档

- **POSTS_TEMPLATE_GUIDE.md**：详细使用指南
- **POSTS_TEMPLATE_IMPLEMENTATION.md**：技术实现总结

## 💡 提示

1. **TOC 不显示？** → 确保文章有 H2/H3 标题
2. **面包屑错误？** → 确保文章在 `content/posts/` 目录
3. **封面不显示？** → 检查 `featured_image` 路径或 `cover.*` 文件名
4. **样式异常？** → 清除缓存：`hugo --cleanDestinationDir`

---

**开发服务器**：http://localhost:52055/  
**示例文章**：http://localhost:52055/posts/first/
