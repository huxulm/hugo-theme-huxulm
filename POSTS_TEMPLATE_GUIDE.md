# Posts 页面模板使用指南

本主题为 `posts` 类型的文章提供了专门设计的精美模板，包含面包屑导航和目录（TOC）功能。

## 功能特性

### 1. 📍 面包屑导航 (Breadcrumb)

- **自动生成**：基于页面路径自动生成导航链接
- **响应式设计**：移动端和桌面端完美适配
- **图标化显示**：使用 SVG 图标增强视觉效果
- **当前页面高亮**：清晰标识用户当前位置

### 2. 📑 目录系统 (Table of Contents)

- **自动提取**：从文章标题自动生成目录结构
- **智能高亮**：滚动时自动高亮当前阅读章节
- **平滑滚动**：点击目录项平滑跳转到对应章节
- **阅读进度**：实时显示文章阅读进度条
- **粘性定位**：侧边栏随滚动固定显示
- **移动端折叠**：小屏幕下支持折叠/展开

### 3. 🎨 文章页面设计

#### 顶部元信息
- ✅ 特色图片（支持 `featured_image` 参数或 page bundle `cover.*`）
- ✅ 文章标题（大标题，支持超长标题自动换行）
- ✅ 发布日期（带图标）
- ✅ 阅读时间估算
- ✅ 字数统计
- ✅ 作者信息（如设置）
- ✅ 分类和标签（彩色徽章，可点击）
- ✅ 文章描述（引用样式显示）

#### 文章内容样式
- **优化的排版**：使用 Tailwind Typography (`prose`) 类
- **深色模式支持**：完整的深色主题
- **代码高亮**：代码块美化显示
- **引用样式**：蓝色左边框，带背景色
- **表格样式**：边框、斑马纹
- **图片优化**：圆角、阴影、间距

#### 底部功能
- **社交分享**：Twitter、微信（复制链接）
- **文章导航**：上一篇/下一篇（渐变卡片设计）
- **返回列表**：快速返回文章列表页

## 文件结构

```
layouts/
├── posts/
│   └── single.html          # Posts 专用模板
├── _partials/
│   ├── breadcrumb.html      # 面包屑导航组件
│   └── toc.html             # 目录组件
└── page.html                # 通用页面模板
```

## 使用方法

### 自动应用

Hugo 会自动使用 `layouts/posts/single.html` 模板渲染 `content/posts/` 目录下的所有文章。无需额外配置！

### 创建文章

#### 方式 1: 普通文章

```bash
hugo new posts/my-article.md
```

```yaml
+++
title = '我的文章标题'
date = '2025-10-13T10:00:00Z'
draft = false
description = '文章简介'
featured_image = '/images/my-featured-image.jpg'  # 可选
categories = ['技术', '教程']
tags = ['Hugo', 'Tailwind', '前端']

[params]
  # 其他自定义参数
+++

## 第一章节

内容...

## 第二章节

内容...
```

#### 方式 2: Page Bundle (推荐)

```bash
hugo new posts/my-article/index.md
```

目录结构：
```
content/
└── posts/
    └── my-article/
        ├── index.md
        ├── cover.png         # 封面图（自动识别）
        ├── image1.jpg        # 文章中使用的图片
        └── image2.png
```

`index.md`:
```yaml
+++
title = '我的文章标题'
date = '2025-10-13T10:00:00Z'
draft = false
description = '文章简介'
# featured_image 参数可省略，会自动使用 cover.{png,jpg,jpeg,webp,svg}
categories = ['技术', '教程']
tags = ['Hugo', 'Tailwind', '前端']
+++

## 第一章节

![示例图片](./image1.jpg)  # 使用相对路径引用图片

## 第二章节

内容...
```

### 配置站点参数

在 `hugo.toml` 中配置作者信息：

```toml
[params]
  author = "你的名字"
  description = "站点描述"
```

## 面包屑导航详解

面包屑组件会根据页面 URL 自动生成导航路径：

**示例**：
- URL: `/posts/my-article/`
- 面包屑: `首页 > Posts > 我的文章标题`

**特点**：
- 🏠 首页链接带图标
- ➡️ 分隔符使用箭头图标
- 📍 当前页面加粗显示
- 🔗 中间路径可点击跳转

## 目录 (TOC) 详解

### 自动生成

Hugo 会自动从文章的 Markdown 标题生成目录：

```markdown
## 一级标题
### 二级标题
#### 三级标题
```

### 交互功能

1. **自动高亮**
   - 滚动时自动检测当前阅读位置
   - 当前章节在目录中高亮显示（蓝色背景）

2. **平滑滚动**
   - 点击目录项平滑滚动到对应章节
   - 自动偏移导航栏高度，避免遮挡

3. **阅读进度**
   - 底部显示进度条和百分比
   - 渐变色进度条（蓝色到紫色）

4. **响应式**
   - **桌面端**：侧边栏固定显示（sticky）
   - **移动端**：可折叠/展开（点击箭头图标）

### 禁用 TOC

如果某篇文章不需要目录，可以在 front matter 中设置：

```yaml
+++
title = '无目录文章'
# ... 其他参数

[params]
  hideToc = true  # 未来可能支持
+++
```

注：当前版本会根据内容是否有标题自动决定是否显示 TOC。

## 样式定制

### 修改配色

编辑 `layouts/posts/single.html`，找到相应的 Tailwind 类名进行修改：

```html
<!-- 例如：修改面包屑链接颜色 -->
<a href="..." class="hover:text-blue-600 dark:hover:text-blue-400">
  <!-- 改为 -->
  class="hover:text-purple-600 dark:hover:text-purple-400"
</a>
```

### 修改布局比例

默认布局：内容区 8 列，侧边栏 4 列（12 栏网格）

```html
<!-- 在 single.html 中 -->
<div class="lg:col-span-8 xl:col-span-8">  <!-- 内容区 -->
<aside class="lg:col-span-4 xl:col-span-4">  <!-- 侧边栏 -->
```

修改为 9:3 比例：

```html
<div class="lg:col-span-9 xl:col-span-9">
<aside class="lg:col-span-3 xl:col-span-3">
```

### 修改 TOC 样式

编辑 `layouts/_partials/toc.html` 的 `<style>` 部分：

```html
<style>
  .toc-content ul {
    /* 修改列表样式 */
  }
</style>
```

## 最佳实践

### 1. 文章结构

为了更好的 TOC 体验，建议：

```markdown
# 文章标题（Front Matter 中的 title，不要在正文中使用 H1）

## 引言（H2 作为主要章节）

正文内容...

### 子章节（H3 作为子章节）

详细内容...

## 第二章

...
```

### 2. 图片优化

- **使用 Page Bundle**：图片和文章放在同一目录
- **封面图命名**：使用 `cover.png/jpg` 自动识别
- **压缩图片**：建议宽度不超过 1920px
- **WebP 格式**：优先使用 WebP 获得更好性能

### 3. 描述和摘要

```yaml
+++
title = '文章标题'
description = '这段描述会显示在文章顶部的引用框中，约 100-200 字为宜'
+++

这是文章的第一段，会作为摘要显示在列表页。

<!--more-->

这之后的内容不会出现在摘要中。
```

### 4. 分类和标签

```yaml
categories = ['技术']           # 1-2 个分类
tags = ['Hugo', 'Tailwind']    # 3-5 个标签
```

## 性能优化

### 1. 图片懒加载

文章内图片自动使用懒加载：

```html
<img loading="lazy" ...>
```

但封面图使用 `loading="eager"` 确保快速显示。

### 2. TOC 脚本优化

- 使用节流（throttle）减少滚动事件计算
- 仅在必要时更新 DOM
- 轻量级 JavaScript 实现

### 3. CSS 优化

- 使用 Tailwind 的 JIT 模式，仅生成使用的类
- 深色模式使用 CSS 变量，无需重复样式

## 常见问题

### Q: TOC 不显示？

**A**: 检查文章是否包含 H2/H3 标题。TOC 基于 `{{ .TableOfContents }}` 生成，如果文章只有文本没有标题，不会显示 TOC。

### Q: 面包屑路径不正确？

**A**: 确保文章放在 `content/posts/` 目录下，Hugo 会根据目录结构生成 URL。

### Q: 封面图不显示？

**A**: 检查：
1. `featured_image` 参数路径是否正确
2. 如使用 Page Bundle，确保图片名为 `cover.{png,jpg,jpeg,webp,svg}`
3. 图片文件是否存在

### Q: 如何自定义分享按钮？

**A**: 编辑 `layouts/posts/single.html` 的分享部分，添加更多社交平台：

```html
<!-- 添加 Facebook -->
<a 
  href="https://www.facebook.com/sharer/sharer.php?u={{ .Permalink }}" 
  target="_blank"
  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
>
  Facebook
</a>
```

## 示例文章

参考 `exampleSite/content/posts/first/index.md` 查看完整的示例文章，包含：

- ✅ 完整的 front matter 配置
- ✅ 丰富的标题层级（H2、H3、H4）
- ✅ 代码块、引用、列表
- ✅ 表格、图片
- ✅ 分类、标签

## 技术栈

- **Hugo**: 静态站点生成器
- **Tailwind CSS v4**: 样式框架
- **Vanilla JavaScript**: TOC 交互功能
- **SVG Icons**: 矢量图标

## 更新日志

### v1.0.0 (2025-10-13)
- ✨ 初始发布
- ✅ 面包屑导航
- ✅ 目录系统（带高亮和进度）
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ 社交分享功能
- ✅ 上下篇导航

---

💡 **提示**：如有问题或建议，欢迎提交 Issue！
