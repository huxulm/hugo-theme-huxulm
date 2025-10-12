# Tailwind CSS 暗色模式实现方案对比

## 📊 三种模式对比

### 1. `class` 模式（✅ 当前推荐）

```js
// tailwind.config.js
export default {
  darkMode: 'class',
}
```

#### ✅ 优点
- 完全的用户控制权
- 可实现亮/暗/自动三态切换
- localStorage 持久化简单
- 适合有主题切换按钮的网站
- 可以在任何时候切换，不依赖系统

#### ❌ 缺点
- 需要 JavaScript 实现
- 需要防止 FOUC（闪烁）

#### 使用场景
- ✅ 博客、文档站（用户需要控制阅读体验）
- ✅ SaaS 应用（用户偏好重要）
- ✅ 需要持久化主题设置的网站

#### 实现方式

```html
<!-- 添加/移除 dark class -->
<html class="dark">
```

```js
// 切换
document.documentElement.classList.toggle('dark');
```

---

### 2. `media` 模式

```js
// tailwind.config.js
export default {
  darkMode: 'media',
}
```

#### ✅ 优点
- 零配置，自动跟随系统
- 无需 JavaScript
- 自动响应系统主题变化
- 无 FOUC 问题

#### ❌ 缺点
- 用户无法手动切换
- 无持久化控制
- 只能跟随系统设置

#### 使用场景
- ✅ 简单的静态网站
- ✅ 不需要用户控制的场景
- ✅ 强调系统一致性的应用

#### 实现方式

```css
/* 自动响应 */
@media (prefers-color-scheme: dark) {
  /* 暗色样式 */
}
```

---

### 3. `selector` 模式（Tailwind v3.4+）

```js
// tailwind.config.js
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
}
```

#### ✅ 优点
- 完全自定义选择器
- 可使用 `data-*` 属性
- 支持复杂的主题逻辑
- 可以有多个主题

#### ❌ 缺点
- 配置相对复杂
- 需要理解 CSS 选择器

#### 使用场景
- ✅ 需要多个主题的应用
- ✅ 使用 data 属性管理状态
- ✅ 复杂的主题系统

#### 实现方式

```html
<html data-theme="dark">
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## 🏆 推荐方案：`class` + 三态切换

### 为什么选择 `class` 模式？

1. **用户体验最好**：用户可以自由选择
2. **功能最丰富**：支持 Auto/Light/Dark 三态
3. **兼容性最好**：所有现代浏览器支持
4. **社区标准**：大多数流行网站使用

### 三态切换实现

```
Auto → Light → Dark → Auto
 ↑                       ↓
 └───────────────────────┘
```

#### 状态说明

| 模式 | 显示 | 行为 |
|------|------|------|
| **Auto** | 🌓 | 跟随系统设置 |
| **Light** | ☀️ | 强制亮色模式 |
| **Dark** | 🌙 | 强制暗色模式 |

### 完整实现代码

#### 1. Tailwind 配置

```js
// tailwind.config.js
export default {
  darkMode: 'class',  // ← 关键配置
  content: ['./hugo_stats.json'],
}
```

#### 2. 防止 FOUC（页面闪烁）

```html
<!-- 在 <head> 中内联执行 -->
<script>
  (function() {
    const theme = localStorage.getItem('theme') || 'auto';
    const effectiveTheme = theme === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

#### 3. 主题切换逻辑

```js
// theme-toggle.js
function toggleTheme() {
  const themes = ['auto', 'light', 'dark'];
  const current = localStorage.getItem('theme') || 'auto';
  const currentIndex = themes.indexOf(current);
  const next = themes[(currentIndex + 1) % themes.length];
  
  localStorage.setItem('theme', next);
  applyTheme(next);
}
```

#### 4. HTML 结构

```html
<button id="theme-toggle">
  <!-- Auto 图标 -->
  <svg id="theme-toggle-auto-icon" class="hidden">...</svg>
  
  <!-- Light 图标 -->
  <svg id="theme-toggle-light-icon" class="hidden">...</svg>
  
  <!-- Dark 图标 -->
  <svg id="theme-toggle-dark-icon" class="hidden">...</svg>
</button>
```

#### 5. CSS 使用

```html
<!-- 亮色模式样式 -->
<div class="bg-white text-gray-900">
  
<!-- 暗色模式样式 -->  
<div class="dark:bg-gray-900 dark:text-gray-100">

<!-- 同时定义两种模式 -->
<button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
```

---

## 📈 性能对比

| 指标 | `class` | `media` | `selector` |
|------|---------|---------|------------|
| JS 大小 | ~2KB | 0KB | ~2KB |
| 初始化时间 | <10ms | 0ms | <10ms |
| 切换速度 | 即时 | N/A | 即时 |
| FOUC 风险 | 中 | 无 | 中 |

---

## 🎯 使用建议

### 选择 `class` 模式，如果你需要：
- ✅ 用户可以切换主题
- ✅ 持久化用户偏好
- ✅ 提供三态切换（auto/light/dark）
- ✅ 完整的主题控制

### 选择 `media` 模式，如果：
- ✅ 只需要自动跟随系统
- ✅ 不需要用户控制
- ✅ 追求零 JS 的简洁性

### 选择 `selector` 模式，如果：
- ✅ 需要多个主题（不只是亮/暗）
- ✅ 使用复杂的主题系统
- ✅ 需要自定义选择器逻辑

---

## 🚀 当前项目配置

你的项目使用：**`class` 模式 + 三态切换**

### 文件结构
```
tailwind.config.js          # darkMode: 'class'
assets/js/
├── theme-toggle.js         # 基础版本（已实现）
└── theme-toggle-enhanced.js # 增强版本（新增）
layouts/
├── baseof.html            # 内联 FOUC 防护脚本
└── _partials/menu.html    # 主题切换按钮
```

### 升级建议

如果需要三态切换（auto/light/dark），替换为增强版本：

```html
<!-- 在 layouts/_partials/head/js.html -->
{{- with resources.Get "js/theme-toggle-enhanced.js" }}
  ...
{{- end }}
```

### API 使用

```js
// 切换主题
window.theme.toggle();

// 设置特定主题
window.theme.set('dark');
window.theme.set('light');
window.theme.set('auto');

// 获取当前主题
window.theme.get();
// { saved: 'auto', effective: 'dark', system: 'dark' }
```

---

## 📚 参考资源

- [Tailwind CSS Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Web.dev: prefers-color-scheme](https://web.dev/prefers-color-scheme/)

---

**结论**：对于大多数网站和应用，**`class` 模式是最佳选择**，它提供了最好的用户体验和最大的灵活性。
