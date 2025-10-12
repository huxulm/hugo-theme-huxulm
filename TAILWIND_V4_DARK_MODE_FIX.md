# 🔧 Tailwind v4 暗色模式修复指南

## ❌ 问题描述

**症状**：
- 配置了 `darkMode: 'class'`
- 但生成的 CSS 被 `@media (prefers-color-scheme: dark)` 包装
- 点击主题切换按钮无效

## 🔍 根本原因

### Tailwind CSS v3 vs v4 的区别

#### ❌ Tailwind v3 配置（不适用于 v4）
```js
// tailwind.config.js (v3)
export default {
  darkMode: 'class',  // v4 中无效！
  content: [...],
}
```

#### ✅ Tailwind v4 配置（正确方式）
```css
/* main.css (v4) */
@import "tailwindcss";

/* 配置暗色模式使用 class 策略 */
@variant dark (.dark &);

@source "../../hugo_stats.json";
```

## ✅ 解决方案

### 步骤 1: 检查 Tailwind 版本

```bash
# 查看 package.json
cat package.json
```

如果看到：
```json
{
  "devDependencies": {
    "@tailwindcss/cli": "^4.x.x",  // ← v4
    "tailwindcss": "^4.x.x"
  }
}
```

说明你在使用 **Tailwind v4**。

### 步骤 2: 删除/备份 v3 配置文件

```bash
# Tailwind v4 不需要 tailwind.config.js
mv tailwind.config.js tailwind.config.js.v3.backup
```

### 步骤 3: 更新 main.css

```css
@import "tailwindcss";

/* ✅ Tailwind v4 暗色模式配置 */
@variant dark (.dark &);

/* Hugo 内容源 */
@source "../../hugo_stats.json";

/* 其他自定义样式... */
```

### 步骤 4: 重启开发服务器

```bash
npm run dev
```

## 📊 配置对比

### Tailwind v3 方式（旧）

**配置位置**：`tailwind.config.js`
```js
module.exports = {
  darkMode: 'class',  // 在 JS 配置
  content: ['./src/**/*.{html,js}'],
}
```

**CSS 文件**：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind v4 方式（新）

**配置位置**：直接在 CSS 文件中
```css
@import "tailwindcss";
@variant dark (.dark &);  /* 在 CSS 配置 */
@source "../../hugo_stats.json";
```

**无需** `tailwind.config.js` 文件！

## 🎯 验证修复

### 1. 检查生成的 CSS

打开浏览器开发工具，查看生成的 CSS：

**❌ 错误（使用 media query）：**
```css
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: rgb(17 24 39);
  }
}
```

**✅ 正确（使用 class）：**
```css
.dark .dark\:bg-gray-900 {
  background-color: rgb(17 24 39);
}
```

### 2. 测试主题切换

1. 打开浏览器控制台
2. 检查 `<html>` 元素：
   ```js
   document.documentElement.classList.contains('dark')
   ```
3. 点击主题按钮
4. 再次检查，应该看到 `dark` class 被添加/移除
5. 页面样式应该立即响应

## 🔄 Tailwind v4 的变化

### 配置方式

| 特性 | v3 | v4 |
|------|-----|-----|
| 配置文件 | `tailwind.config.js` | CSS 文件中 |
| 暗色模式 | `darkMode: 'class'` | `@variant dark (.dark &);` |
| 内容源 | `content: [...]` | `@source "...";` |
| 主题扩展 | `theme.extend` | `@theme { }` |
| 插件 | `plugins: [...]` | `@plugin "...";` |

### @variant 语法

```css
/* 基础语法 */
@variant dark (.dark &);

/* 等价于 v3 的 */
darkMode: 'class'

/* 可以自定义选择器 */
@variant dark ([data-theme="dark"] &);
@variant dark (.dark-mode &);
```

### 更多 @variant 示例

```css
/* 响应式变体 */
@variant mobile (@media (max-width: 640px));

/* 状态变体 */
@variant active (&:active);

/* 组合变体 */
@variant dark-hover (.dark &:hover);
```

## 🛠️ 高级配置

### 自定义主题颜色（v4）

```css
@import "tailwindcss";

@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  
  --font-sans: system-ui, sans-serif;
  --font-mono: 'Courier New', monospace;
}

@variant dark (.dark &);
```

### 多主题支持

```css
/* 亮色主题 */
@variant light (.light &);

/* 暗色主题 */
@variant dark (.dark &);

/* 自动模式 */
@variant auto (.auto &);
```

然后在 HTML 中：
```html
<html class="dark">  <!-- 暗色 -->
<html class="light"> <!-- 亮色 -->
<html class="auto">  <!-- 自动 -->
```

## 📝 完整示例

### main.css
```css
@import "tailwindcss";

/* 暗色模式使用 class 策略 */
@variant dark (.dark &);

/* Hugo 内容源 */
@source "../../hugo_stats.json";

/* 自定义主题（可选） */
@theme {
  --color-brand: #3b82f6;
  --spacing-section: 4rem;
}

/* 平滑过渡 */
* {
  transition: background-color 0.2s, color 0.2s;
}
```

### HTML 使用
```html
<!-- 正常使用 dark: 前缀 -->
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-white">
    内容
  </p>
</div>
```

### JavaScript 控制
```js
// 切换暗色模式
document.documentElement.classList.toggle('dark');

// 添加暗色模式
document.documentElement.classList.add('dark');

// 移除暗色模式
document.documentElement.classList.remove('dark');
```

## 🚨 常见错误

### 错误 1: 混用 v3 和 v4 配置

❌ **错误**：
```
tailwind.config.js 存在（v3 格式）
+ main.css 中有 @variant（v4 格式）
= 冲突！
```

✅ **正确**：
```
只使用 main.css 配置（v4）
删除 tailwind.config.js
```

### 错误 2: @source 路径错误

❌ **错误**：
```css
@source "hugo_stats.json";  /* 找不到文件 */
```

✅ **正确**：
```css
@source "../../hugo_stats.json";  /* 相对于 assets/css/ */
```

### 错误 3: 忘记 @variant

❌ **错误**：
```css
@import "tailwindcss";
@source "hugo_stats.json";
/* 没有 @variant dark，默认使用 media query */
```

✅ **正确**：
```css
@import "tailwindcss";
@variant dark (.dark &);  /* 必须！ */
@source "hugo_stats.json";
```

## ✅ 检查清单

- [ ] 确认 Tailwind 版本是 v4.x
- [ ] 删除或备份 `tailwind.config.js`
- [ ] 在 `main.css` 顶部添加 `@variant dark (.dark &);`
- [ ] 重启 Hugo 开发服务器
- [ ] 打开浏览器检查生成的 CSS
- [ ] 测试主题切换功能
- [ ] 验证 `<html class="dark">` 会触发暗色样式

## 📚 参考资源

- [Tailwind CSS v4 Alpha Docs](https://tailwindcss.com/docs/v4-alpha)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [CSS-First Configuration](https://tailwindcss.com/blog/tailwindcss-v4-alpha)

---

**问题已解决！** 🎉

现在你的 Tailwind v4 配置应该正确使用 `class` 模式，主题切换功能应该正常工作了。
