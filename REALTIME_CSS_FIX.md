# 🔧 Hugo + Tailwind v4 实时编译问题修复

## 问题描述

修改主题模板中的 class 时：
- ✅ `hugo_stats.json` 可以同步更新
- ❌ `main.css` 没有实时生成新的工具类

## 根本原因

1. **缺少 PostCSS 配置** - Hugo 的 `css.TailwindCSS` 管道对 Tailwind v4 支持不完整
2. **错误的缓存配置** - `disableWatch = true` 阻止了 Hugo 监听文件变化
3. **缺少 PostCSS 依赖** - 未安装 `@tailwindcss/postcss` 插件

## 解决方案

### 1. 创建 `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

### 2. 安装必要依赖

```bash
npm install --save-dev \
  @tailwindcss/postcss \
  postcss \
  postcss-cli
```

### 3. 更新 `exampleSite/hugo.toml`

```toml
[build]
  writeStats = true  # 启用统计信息生成
  
  [build.buildStats]
    enable = true
  
  # 监听 hugo_stats.json 变化，刷新 CSS
  [[build.cachebusters]]
    source = 'hugo_stats\.json'
    target = 'css'
  
  # 监听配置文件变化
  [[build.cachebusters]]
    source = '(postcss|tailwind)\.config\.js'
    target = 'css'
  
  # 监听模板文件变化（HTML）
  [[build.cachebusters]]
    source = '(go|html)$'
    target = 'css'
```

### 4. 移除阻止监听的配置

**删除或注释掉：**
```toml
# ❌ 这行会阻止 Hugo 监听文件变化
[[module.mounts]]
  disableWatch = true  # 删除这个！
  source = 'hugo_stats.json'
  target = 'assets/notwatching/hugo_stats.json'
```

### 5. 更新 CSS 处理管道

在 `layouts/_partials/head/css.html` 中使用 PostCSS：

```html
{{ with resources.Get "css/main.css" }}
  {{ $opts := dict }}
  {{ with . | resources.PostCSS $opts }}
    {{ if hugo.IsDevelopment }}
      <link rel="stylesheet" href="{{ .RelPermalink }}">
    {{ else }}
      {{ with . | minify | fingerprint }}
        <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
      {{ end }}
    {{ end }}
  {{ end }}
{{ end }}
```

## 工作流程

### 开发流程（实时编译）

1. **启动开发服务器：**
   ```bash
   npm run dev
   ```

2. **文件变化自动触发：**
   ```
   修改模板 (*.html)
     ↓
   Hugo 重新生成 hugo_stats.json
     ↓
   build.cachebusters 检测到变化
     ↓
   触发 CSS 重新编译（PostCSS + Tailwind）
     ↓
   浏览器自动刷新（LiveReload）
   ```

### 为什么现在能实时更新？

| 配置项 | 作用 |
|--------|------|
| `writeStats = true` | Hugo 自动生成/更新 `hugo_stats.json` |
| `build.cachebusters` | 监听文件变化，触发重新编译 |
| `resources.PostCSS` | 使用 PostCSS 处理 CSS（支持 Tailwind v4） |
| `@tailwindcss/postcss` | Tailwind v4 的 PostCSS 插件，读取 `hugo_stats.json` |

## 验证修复

### 1. 测试实时更新

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 修改模板文件（如 `layouts/baseof.html`）：
   ```html
   <!-- 添加一个新的 class -->
   <div class="bg-purple-500 text-yellow-300">Test</div>
   ```

3. 检查终端输出：
   ```
   Change detected, rebuilding site.
   2024-10-13 12:34:56.789 +0800
   hugo_stats.json changed
   Rebuilding CSS...
   ```

4. 检查浏览器：
   - 页面自动刷新
   - 新的类 `bg-purple-500` 和 `text-yellow-300` 应该生效

### 2. 验证 hugo_stats.json 同步

```bash
# 监听 hugo_stats.json 变化
watch -n 1 'wc -l hugo_stats.json'
```

修改模板时，行数应该会变化。

### 3. 验证 CSS 生成

```bash
# 检查生成的 CSS 是否包含新类
grep "bg-purple-500" exampleSite/public/css/main.css
```

应该能找到对应的 CSS 规则。

## 常见问题

### Q1: 修改后 CSS 还是不更新

**解决方案：**
```bash
# 1. 清理缓存
rm -rf exampleSite/public exampleSite/resources

# 2. 重启服务器
npm run dev
```

### Q2: PostCSS 报错

**可能原因：** 依赖未安装

**解决方案：**
```bash
npm install
```

### Q3: hugo_stats.json 没有生成

**检查配置：**
```toml
[build]
  writeStats = true  # 必须启用
```

### Q4: 某些类还是没有生成

**检查 tailwind.config.js：**
```javascript
export default {
  content: [
    './hugo_stats.json',           // ← 确保包含这个
    './layouts/**/*.html',
    './content/**/*.{md,html}',
  ],
  // ...
}
```

## 性能优化

### 开发模式优化

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "hugo server -D --noHTTPCache --disableFastRender -s exampleSite --themesDir ../.. -t hugo-theme-huxulm",
    "dev:fast": "hugo server -D --disableFastRender -s exampleSite --themesDir ../.. -t hugo-theme-huxulm"
  }
}
```

### 生产构建优化

```json
{
  "scripts": {
    "build": "hugo --minify -s exampleSite --themesDir ../.. -t hugo-theme-huxulm"
  }
}
```

## 文件监听范围

Hugo 会监听以下文件的变化并触发 CSS 重新编译：

- `hugo_stats.json` - 类名变化
- `postcss.config.js` - PostCSS 配置变化
- `tailwind.config.js` - Tailwind 配置变化
- `layouts/**/*.html` - 模板文件变化
- `assets/css/**/*.css` - CSS 源文件变化

## 技术细节

### Hugo 的资源管道

```
assets/css/main.css
  ↓ resources.Get
CSS Resource
  ↓ resources.PostCSS
PostCSS 处理（调用 Tailwind）
  ↓ minify（生产环境）
优化的 CSS
  ↓ fingerprint（生产环境）
带哈希的 CSS
  ↓
/css/main.css
```

### Tailwind v4 的处理流程

```
postcss.config.js
  ↓
@tailwindcss/postcss 插件
  ↓
读取 tailwind.config.js
  ↓
扫描 content 文件（包括 hugo_stats.json）
  ↓
生成对应的工具类
  ↓
输出最终 CSS
```

## 参考资源

- [Hugo PostCSS](https://gohugo.io/hugo-pipes/postcss/)
- [Tailwind v4 PostCSS Plugin](https://tailwindcss.com/docs/v4-beta)
- [Hugo Build Stats](https://gohugo.io/getting-started/configuration/#configure-build)

---

**修复完成！** 🎉 现在修改模板时，CSS 应该能实时更新了。
