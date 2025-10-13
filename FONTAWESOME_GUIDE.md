# Font Awesome 集成指南

## 🎯 配置说明

主题已经集成了 Font Awesome 6 Free 版本，通过以下方式配置：

### 1. 安装依赖

```bash
npm install --save-dev @fortawesome/fontawesome-free
```

### 2. Hugo 模块挂载

在 `hugo.toml` 中配置：

```toml
[module]
  # 挂载 Font Awesome webfonts 到 static 目录
  [[module.mounts]]
    source = "node_modules/@fortawesome/fontawesome-free/webfonts"
    target = "static/webfonts"
```

### 3. 自定义 CSS

创建了 `assets/css/fontawesome.css` 文件，包含：
- ✅ 正确的字体路径 `/webfonts/`
- ✅ 字体 @font-face 声明
- ✅ 常用图标类定义
- ✅ 字体平滑优化

### 4. 在模板中使用

#### 方法 1：直接使用 CSS 类

```html
<i class="fas fa-house"></i>
<i class="fas fa-heart"></i>
<i class="fab fa-github"></i>
```

#### 方法 2：使用 Hugo Partial（推荐，如果已配置）

```go
{{ partial "icon" (dict "context" . "name" "fas house" "class" "text-lg") }}
```

## 📦 已包含的图标

以下图标已在 `fontawesome.css` 中定义：

### 导航图标
- 🏠 `fa-house` / `fa-home` - 首页
- 📰 `fa-newspaper` - 文章/新闻
- 🏷️ `fa-tags` - 标签
- ℹ️ `fa-circle-info` / `fa-info-circle` - 关于/信息
- 📁 `fa-folder` - 文件夹/分类
- 📦 `fa-box-archive` / `fa-archive` - 归档
- ✉️ `fa-envelope` - 联系/邮件
- 📄 `fa-file` - 文件

### 通用图标
- ❤️ `fa-heart` - 喜欢/收藏
- ⭐ `fa-star` - 星标/评级
- 👤 `fa-user` - 用户
- 🔍 `fa-search` / `fa-magnifying-glass` - 搜索
- ☰ `fa-bars` - 菜单
- ✕ `fa-times` / `fa-xmark` - 关闭
- 🌙 `fa-moon` - 暗色模式
- ☀️ `fa-sun` - 亮色模式
- 💡 `fa-lightbulb` - 灯泡/想法

## 🔧 添加更多图标

### 方法 1：添加到自定义 CSS

编辑 `assets/css/fontawesome.css`：

```css
/* 在文件末尾添加 */
.fa-github:before { content: "\f09b"; }
.fa-twitter:before { content: "\f099"; }
```

图标 Unicode 可以在 [Font Awesome 官网](https://fontawesome.com/icons) 查找。

### 方法 2：使用完整的 Font Awesome CSS

如果需要所有图标，可以修改 `layouts/_partials/head/css.html`：

```html
{{- /* 使用完整的 Font Awesome CSS */ -}}
{{ with resources.Get "fontawesome/css/all.min.css" }}
  <link rel="stylesheet" href="{{ .RelPermalink }}">
{{ end }}
```

但需要在 `hugo.toml` 中添加 CSS 挂载：

```toml
[[module.mounts]]
  source = "node_modules/@fortawesome/fontawesome-free/css"
  target = "assets/fontawesome/css"
```

## 🎨 样式自定义

### 图标大小

使用 Tailwind CSS 类：

```html
<i class="fas fa-heart text-sm"></i>   <!-- 小 -->
<i class="fas fa-heart text-base"></i> <!-- 正常 -->
<i class="fas fa-heart text-lg"></i>   <!-- 大 -->
<i class="fas fa-heart text-xl"></i>   <!-- 超大 -->
<i class="fas fa-heart text-2xl"></i>  <!-- 2倍大 -->
```

### 图标颜色

图标会继承当前文本颜色：

```html
<i class="fas fa-heart text-red-500"></i>
<i class="fas fa-heart text-blue-600 dark:text-blue-400"></i>
```

### 旋转和动画

```html
<!-- 旋转 -->
<i class="fas fa-spinner animate-spin"></i>

<!-- 悬停效果 -->
<i class="fas fa-heart hover:scale-110 transition-transform"></i>
```

## 🚀 性能优化

当前配置的优点：

1. ✅ **按需加载**：只包含实际使用的图标
2. ✅ **字体优化**：仅加载 WOFF2 格式（现代浏览器支持）
3. ✅ **字体显示**：使用 `font-display: block` 避免闪烁
4. ✅ **CDN 友好**：字体文件在 `/webfonts/` 下，易于缓存
5. ✅ **构建优化**：生产环境自动压缩和指纹

## 📝 字体文件

包含的字体文件：
- `fa-solid-900.woff2` - Solid 实心图标（最常用）
- `fa-regular-400.woff2` - Regular 常规图标
- `fa-brands-400.woff2` - Brands 品牌图标

总大小约 500KB（已压缩）。

## 🔍 故障排查

### 图标不显示？

1. 检查浏览器控制台是否有字体加载错误
2. 确认 `/webfonts/` 目录下有字体文件
3. 检查网络请求，字体路径是否正确
4. 清除浏览器缓存重试

### 图标显示为方框？

- 确认使用的图标类已在 `fontawesome.css` 中定义
- 或使用完整的 `all.min.css`

### 在菜单中使用

查看 `layouts/_partials/menu.html` 的示例：

```html
{{- if eq .Name "Home" }}
  <i class="fas fa-house text-lg"></i>
{{- else if eq .Name "Posts" }}
  <i class="fas fa-newspaper text-lg"></i>
{{- end }}
```

---

**提示**：Font Awesome 6 Free 版本包含 2,000+ 免费图标，足够大多数项目使用！
