# 🎨 Hugo 页面模板设计完整指南

## 📋 目录

- [Hugo 模板层级结构](#hugo-模板层级结构)
- [页面类型详解](#页面类型详解)
- [模板查找顺序](#模板查找顺序)
- [最佳实践](#最佳实践)
- [实战示例](#实战示例)

---

## Hugo 模板层级结构

### 📁 标准目录结构

```
layouts/
├── _default/           # 默认模板（回退模板）
│   ├── baseof.html    # 基础模板（所有页面的骨架）
│   ├── list.html      # 列表页模板
│   ├── single.html    # 单页模板
│   └── taxonomy.html  # 分类法模板
├── _partials/         # 可复用的部分模板
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── shortcodes/        # 短代码模板
│   ├── figure.html
│   └── youtube.html
├── index.html         # 首页模板（优先级最高）
├── 404.html          # 404 页面
├── section/          # 特定 section 的模板
│   └── posts.html
├── taxonomy/         # 分类法列表模板
│   └── tags.html
└── term/             # 分类法项模板
    └── tag.html
```

---

## 页面类型详解

### 1️⃣ **baseof.html - 基础模板**

**用途**：所有页面的骨架，定义页面的整体结构

**位置**：`layouts/_default/baseof.html`

**示例**：

```html
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}" class="scroll-smooth">
<head>
  {{- partial "head.html" . -}}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ block "title" . }}{{ .Site.Title }}{{ end }}</title>
  
  {{- block "meta" . }}
  <meta name="description" content="{{ .Description | default .Site.Params.description }}">
  <meta name="keywords" content="{{ delimit .Keywords ", " }}">
  {{- end }}
  
  {{- block "styles" . }}
  {{- partial "head/css.html" . }}
  {{- end }}
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  {{- partial "animated-background.html" . -}}
  
  <header>
    {{- partial "header.html" . -}}
  </header>
  
  <main class="min-h-screen">
    {{- block "main" . }}
    {{- end }}
  </main>
  
  <aside>
    {{- block "sidebar" . }}
    {{- end }}
  </aside>
  
  <footer>
    {{- partial "footer.html" . -}}
  </footer>
  
  {{- block "scripts" . }}
  {{- partial "head/js.html" . }}
  {{- end }}
</body>
</html>
```

**关键点**：
- ✅ 使用 `block` 定义可覆盖的区块
- ✅ 使用 `partial` 引入可复用组件
- ✅ 支持暗色模式、响应式设计
- ✅ SEO 友好的 meta 标签

---

### 2️⃣ **index.html - 首页模板**

**用途**：网站首页的专用模板

**位置**：`layouts/index.html`

**示例**：

```html
{{ define "main" }}
<div class="container mx-auto px-4 py-12">
  <!-- Hero Section -->
  <section class="text-center py-20">
    <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {{ .Site.Title }}
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {{ .Site.Params.description }}
    </p>
    <div class="mt-8 space-x-4">
      <a href="/posts" class="btn btn-primary">开始阅读</a>
      <a href="/about" class="btn btn-secondary">关于我</a>
    </div>
  </section>

  <!-- Featured Posts -->
  <section class="py-12">
    <h2 class="text-3xl font-bold mb-8">精选文章</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {{ range first 6 (where .Site.RegularPages "Type" "posts") }}
        {{ partial "cards/post-card.html" . }}
      {{ end }}
    </div>
  </section>

  <!-- Categories -->
  <section class="py-12">
    <h2 class="text-3xl font-bold mb-8">分类浏览</h2>
    <div class="flex flex-wrap gap-3">
      {{ range .Site.Taxonomies.categories }}
        <a href="{{ .Page.Permalink }}" 
           class="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition">
          {{ .Page.Title }} ({{ .Count }})
        </a>
      {{ end }}
    </div>
  </section>
</div>
{{ end }}
```

**特点**：
- 🎯 Hero 区域吸引眼球
- 📊 展示精选内容
- 🏷️ 分类/标签导航
- 📱 响应式布局

---

### 3️⃣ **single.html - 单页模板**

**用途**：单篇文章、单个页面的详情页

**位置**：`layouts/_default/single.html` 或 `layouts/posts/single.html`

**示例**：

```html
{{ define "main" }}
<article class="max-w-4xl mx-auto px-4 py-12">
  <!-- 面包屑 -->
  <nav class="text-sm mb-6">
    <ol class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
      <li><a href="/" class="hover:text-blue-600">首页</a></li>
      <li>/</li>
      <li><a href="{{ .Section | relURL }}" class="hover:text-blue-600">{{ .Section | title }}</a></li>
      <li>/</li>
      <li class="text-gray-900 dark:text-gray-100">{{ .Title }}</li>
    </ol>
  </nav>

  <!-- 文章头部 -->
  <header class="mb-12">
    <h1 class="text-4xl font-bold mb-4">{{ .Title }}</h1>
    
    <div class="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
      <!-- 发布日期 -->
      <time datetime="{{ .Date.Format "2006-01-02" }}">
        {{ .Date.Format "2006年01月02日" }}
      </time>
      
      <!-- 阅读时间 -->
      <span>📖 {{ .ReadingTime }} 分钟阅读</span>
      
      <!-- 字数统计 -->
      <span>{{ .WordCount }} 字</span>
    </div>
    
    <!-- 标签 -->
    {{ with .Params.tags }}
    <div class="mt-4 flex flex-wrap gap-2">
      {{ range . }}
        <a href="{{ "tags" | relURL }}/{{ . | urlize }}" 
           class="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
          #{{ . }}
        </a>
      {{ end }}
    </div>
    {{ end }}
    
    <!-- 特色图片 -->
    {{ with .Params.featured_image }}
    <img src="{{ . }}" alt="{{ $.Title }}" class="w-full rounded-lg shadow-lg mt-6">
    {{ end }}
  </header>

  <!-- 文章内容 -->
  <div class="prose prose-lg dark:prose-invert max-w-none">
    {{ .Content }}
  </div>

  <!-- 文章底部 -->
  <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
    <!-- 分享按钮 -->
    <div class="flex items-center space-x-4 mb-6">
      <span class="font-semibold">分享：</span>
      <a href="https://twitter.com/intent/tweet?text={{ .Title }}&url={{ .Permalink }}" 
         class="text-blue-500 hover:text-blue-600">Twitter</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u={{ .Permalink }}" 
         class="text-blue-600 hover:text-blue-700">Facebook</a>
    </div>
    
    <!-- 上一篇/下一篇 -->
    <div class="grid grid-cols-2 gap-4">
      {{ with .PrevInSection }}
      <a href="{{ .Permalink }}" class="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
        <div class="text-sm text-gray-600 dark:text-gray-400">← 上一篇</div>
        <div class="font-semibold">{{ .Title }}</div>
      </a>
      {{ end }}
      
      {{ with .NextInSection }}
      <a href="{{ .Permalink }}" class="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-right">
        <div class="text-sm text-gray-600 dark:text-gray-400">下一篇 →</div>
        <div class="font-semibold">{{ .Title }}</div>
      </a>
      {{ end }}
    </div>
  </footer>
</article>

<!-- 相关文章 -->
{{ $related := .Site.RegularPages.Related . | first 3 }}
{{ with $related }}
<section class="max-w-4xl mx-auto px-4 py-12">
  <h2 class="text-2xl font-bold mb-6">相关文章</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {{ range . }}
      {{ partial "cards/post-card.html" . }}
    {{ end }}
  </div>
</section>
{{ end }}
{{ end }}
```

**关键元素**：
- 📝 文章元信息（日期、阅读时间、字数）
- 🏷️ 标签和分类
- 🔗 上一篇/下一篇导航
- 📤 社交分享按钮
- 🔗 相关文章推荐

---

### 4️⃣ **list.html - 列表页模板**

**用途**：文章列表、归档页面

**位置**：`layouts/_default/list.html` 或 `layouts/posts/list.html`

**示例**：

```html
{{ define "main" }}
<div class="container mx-auto px-4 py-12">
  <!-- 页面标题 -->
  <header class="mb-12">
    <h1 class="text-4xl font-bold mb-4">{{ .Title }}</h1>
    {{ with .Params.description }}
      <p class="text-xl text-gray-600 dark:text-gray-300">{{ . }}</p>
    {{ end }}
    
    <!-- 统计信息 -->
    <div class="mt-4 text-gray-600 dark:text-gray-400">
      共 {{ len .Pages }} 篇文章
    </div>
  </header>

  <!-- 过滤/排序选项 -->
  <div class="mb-8 flex flex-wrap gap-4">
    <select class="px-4 py-2 border rounded-lg">
      <option>按日期排序</option>
      <option>按标题排序</option>
      <option>按热度排序</option>
    </select>
    
    <input type="search" 
           placeholder="搜索文章..." 
           class="px-4 py-2 border rounded-lg flex-grow max-w-md">
  </div>

  <!-- 文章列表 -->
  <div class="space-y-8">
    {{ range .Pages.GroupByDate "2006" }}
      <!-- 年份分组 -->
      <section>
        <h2 class="text-2xl font-bold mb-6 sticky top-20 bg-white dark:bg-gray-900 py-2">
          {{ .Key }}
        </h2>
        
        <div class="space-y-6">
          {{ range .Pages }}
            <article class="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
              <!-- 特色图片 -->
              {{ with .Params.featured_image }}
              <div class="flex-shrink-0">
                <img src="{{ . }}" 
                     alt="{{ $.Title }}" 
                     class="w-48 h-32 object-cover rounded-lg">
              </div>
              {{ end }}
              
              <!-- 文章信息 -->
              <div class="flex-grow">
                <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <time datetime="{{ .Date.Format "2006-01-02" }}">
                    {{ .Date.Format "01/02" }}
                  </time>
                  <span>{{ .ReadingTime }} 分钟</span>
                  {{ with .Params.category }}
                    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">{{ . }}</span>
                  {{ end }}
                </div>
                
                <h3 class="text-xl font-bold mb-2">
                  <a href="{{ .Permalink }}" class="hover:text-blue-600">{{ .Title }}</a>
                </h3>
                
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  {{ .Summary | plainify | truncate 150 }}
                </p>
                
                <!-- 标签 -->
                {{ with .Params.tags }}
                <div class="flex flex-wrap gap-2">
                  {{ range first 3 . }}
                    <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      #{{ . }}
                    </span>
                  {{ end }}
                </div>
                {{ end }}
              </div>
            </article>
          {{ end }}
        </div>
      </section>
    {{ end }}
  </div>

  <!-- 分页 -->
  {{ template "_internal/pagination.html" . }}
</div>
{{ end }}
```

**特性**：
- 📅 按年份/月份分组
- 🔍 搜索和过滤
- 📄 分页支持
- 🎨 卡片式布局

---

### 5️⃣ **taxonomy.html - 分类法列表模板**

**用途**：标签云、分类列表页

**位置**：`layouts/_default/taxonomy.html`

**示例**：

```html
{{ define "main" }}
<div class="container mx-auto px-4 py-12">
  <header class="mb-12">
    <h1 class="text-4xl font-bold mb-4">所有{{ .Title }}</h1>
    <p class="text-gray-600 dark:text-gray-300">
      共 {{ len .Data.Terms }} 个{{ .Title }}
    </p>
  </header>

  <!-- 标签云视图 -->
  {{ if eq .Data.Plural "tags" }}
  <div class="mb-12">
    <div class="flex flex-wrap gap-3">
      {{ range .Data.Terms.ByCount }}
        {{ $fontSize := add 1 (mul .Count 0.1) }}
        <a href="{{ .Page.Permalink }}" 
           style="font-size: {{ $fontSize }}rem"
           class="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition">
          {{ .Page.Title }} <span class="text-sm">({{ .Count }})</span>
        </a>
      {{ end }}
    </div>
  </div>
  {{ end }}

  <!-- 列表视图 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {{ range .Data.Terms.Alphabetical }}
      <a href="{{ .Page.Permalink }}" 
         class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition group">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold group-hover:text-blue-600">
            {{ .Page.Title }}
          </h2>
          <span class="text-2xl font-bold text-blue-600">
            {{ .Count }}
          </span>
        </div>
        
        <!-- 预览文章 -->
        <div class="space-y-2">
          {{ range first 3 .Pages }}
            <div class="text-sm text-gray-600 dark:text-gray-400 truncate">
              • {{ .Title }}
            </div>
          {{ end }}
        </div>
      </a>
    {{ end }}
  </div>
</div>
{{ end }}
```

---

### 6️⃣ **term.html - 分类法项模板**

**用途**：单个标签/分类下的文章列表

**位置**：`layouts/_default/term.html`

**示例**：

```html
{{ define "main" }}
<div class="container mx-auto px-4 py-12">
  <!-- 标签头部 -->
  <header class="mb-12 text-center">
    <div class="inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
      <span class="text-3xl">🏷️</span>
    </div>
    <h1 class="text-4xl font-bold mb-4">{{ .Title }}</h1>
    <p class="text-gray-600 dark:text-gray-300">
      {{ len .Pages }} 篇文章
    </p>
  </header>

  <!-- 文章网格 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {{ range .Pages }}
      {{ partial "cards/post-card.html" . }}
    {{ end }}
  </div>

  <!-- 分页 -->
  {{ template "_internal/pagination.html" . }}
</div>
{{ end }}
```

---

### 7️⃣ **404.html - 错误页面**

**位置**：`layouts/404.html`

**示例**：

```html
{{ define "main" }}
<div class="min-h-screen flex items-center justify-center px-4">
  <div class="text-center">
    <h1 class="text-9xl font-bold text-blue-600">404</h1>
    <h2 class="text-3xl font-bold mt-4 mb-2">页面未找到</h2>
    <p class="text-gray-600 dark:text-gray-300 mb-8">
      抱歉，您访问的页面不存在或已被删除
    </p>
    
    <div class="space-x-4">
      <a href="/" class="btn btn-primary">返回首页</a>
      <a href="/posts" class="btn btn-secondary">浏览文章</a>
    </div>
    
    <!-- 搜索框 -->
    <div class="mt-12">
      <input type="search" 
             placeholder="搜索内容..." 
             class="px-6 py-3 border rounded-lg w-full max-w-md">
    </div>
  </div>
</div>
{{ end }}
```

---

## 模板查找顺序

Hugo 按以下顺序查找模板（优先级从高到低）：

### 单页模板查找顺序
```
1. layouts/posts/single-post-1.html          # 特定文章
2. layouts/posts/single.html                 # Section 专用
3. layouts/_default/single.html              # 默认模板
```

### 列表模板查找顺序
```
1. layouts/posts/list.html                   # Section 专用
2. layouts/_default/list.html                # 默认模板
3. layouts/index.html                        # 首页（仅用于首页）
```

### 分类法模板查找顺序
```
1. layouts/taxonomy/tags.html                # 特定分类法
2. layouts/_default/taxonomy.html            # 默认分类法
3. layouts/_default/list.html                # 回退到列表模板
```

---

## 最佳实践

### 1. **使用 Partials 提高复用性**

```html
<!-- layouts/_partials/cards/post-card.html -->
<article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
  {{ with .Params.featured_image }}
  <img src="{{ . }}" alt="{{ $.Title }}" class="w-full h-48 object-cover">
  {{ end }}
  
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">
      <a href="{{ .Permalink }}" class="hover:text-blue-600">{{ .Title }}</a>
    </h3>
    
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ .Summary | plainify | truncate 100 }}
    </p>
    
    <div class="flex items-center justify-between text-sm text-gray-500">
      <time datetime="{{ .Date.Format "2006-01-02" }}">
        {{ .Date.Format "2006-01-02" }}
      </time>
      <span>{{ .ReadingTime }} min read</span>
    </div>
  </div>
</article>
```

### 2. **SEO 优化**

```html
<!-- layouts/_partials/head.html -->
<meta name="description" content="{{ .Description | default .Site.Params.description }}">
<meta name="keywords" content="{{ delimit .Keywords ", " }}">

<!-- Open Graph -->
<meta property="og:title" content="{{ .Title }}">
<meta property="og:description" content="{{ .Description }}">
<meta property="og:image" content="{{ .Params.featured_image | absURL }}">
<meta property="og:url" content="{{ .Permalink }}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ .Title }}">
<meta name="twitter:description" content="{{ .Description }}">
<meta name="twitter:image" content="{{ .Params.featured_image | absURL }}">

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ .Title }}",
  "image": "{{ .Params.featured_image | absURL }}",
  "datePublished": "{{ .Date.Format "2006-01-02" }}",
  "author": {
    "@type": "Person",
    "name": "{{ .Site.Params.author }}"
  }
}
</script>
```

### 3. **响应式设计**

```html
<!-- 使用 Tailwind CSS 断点 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- 移动端 1列，平板 2列，桌面 3列，大屏 4列 -->
</div>

<!-- 响应式图片 -->
<picture>
  <source media="(min-width: 1024px)" srcset="image-large.jpg">
  <source media="(min-width: 768px)" srcset="image-medium.jpg">
  <img src="image-small.jpg" alt="描述" class="w-full h-auto">
</picture>
```

### 4. **性能优化**

```html
<!-- 延迟加载图片 -->
<img src="{{ .Params.featured_image }}" 
     alt="{{ .Title }}" 
     loading="lazy"
     decoding="async">

<!-- 预加载关键资源 -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://cdn.example.com">
```

### 5. **无障碍访问**

```html
<!-- 语义化 HTML -->
<article>
  <header>
    <h1>{{ .Title }}</h1>
  </header>
  <main>
    {{ .Content }}
  </main>
  <footer>
    <nav aria-label="文章导航">
      <!-- 导航链接 -->
    </nav>
  </footer>
</article>

<!-- ARIA 标签 -->
<button aria-label="关闭菜单" aria-expanded="false">
  <span aria-hidden="true">×</span>
</button>

<!-- Skip to content -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  跳转到主内容
</a>
```

---

## 实战示例

### 完整的博客首页

```html
{{ define "main" }}
<div class="container mx-auto px-4">
  <!-- Hero -->
  <section class="py-20 text-center">
    <h1 class="text-6xl font-bold mb-6">
      {{ .Site.Title }}
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {{ .Site.Params.description }}
    </p>
  </section>

  <!-- Latest Posts -->
  <section class="py-12">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold">最新文章</h2>
      <a href="/posts" class="text-blue-600 hover:text-blue-700">
        查看全部 →
      </a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {{ range first 6 (where .Site.RegularPages "Type" "posts") }}
        {{ partial "cards/post-card.html" . }}
      {{ end }}
    </div>
  </section>

  <!-- Categories -->
  <section class="py-12">
    <h2 class="text-3xl font-bold mb-8">热门分类</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {{ range first 8 .Site.Taxonomies.categories.ByCount }}
        <a href="{{ .Page.Permalink }}" 
           class="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white text-center hover:shadow-xl transition">
          <div class="text-3xl mb-2">📚</div>
          <div class="font-bold">{{ .Page.Title }}</div>
          <div class="text-sm opacity-80">{{ .Count }} 篇</div>
        </a>
      {{ end }}
    </div>
  </section>
</div>
{{ end }}
```

---

## 🎯 快速参考

| 页面类型 | 模板文件 | 用途 |
|---------|---------|------|
| 首页 | `index.html` | 网站首页 |
| 文章详情 | `single.html` | 单篇文章 |
| 文章列表 | `list.html` | 文章归档 |
| 标签列表 | `taxonomy.html` | 所有标签 |
| 单个标签 | `term.html` | 某个标签的文章 |
| 404 | `404.html` | 错误页面 |
| 基础模板 | `baseof.html` | 页面骨架 |

---

## 📚 相关资源

- [Hugo 官方文档 - Templates](https://gohugo.io/templates/)
- [Hugo 模板查找顺序](https://gohugo.io/templates/lookup-order/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [本主题示例站点](https://github.com/huxulm/hugo-theme-huxulm)

---

**提示**：复制这些模板到你的 `layouts/` 目录，根据需要自定义样式和结构！
