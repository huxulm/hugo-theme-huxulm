# 🎨 增强版主题切换使用指南

## ✅ 已完成的配置

### 1. 文件结构
```
assets/js/
├── theme-toggle-enhanced.js    # ✅ 增强版主题切换（已启用）
├── theme-toggle.js.backup      # 旧版本（已备份）
└── main.js                     # 主脚本

layouts/_partials/
├── menu.html                   # ✅ 已添加 Auto 图标
└── head/js.html                # ✅ 已加载增强版脚本

tailwind.config.js              # ✅ darkMode: 'class'
```

### 2. 功能特性

#### 🌓 三态切换
点击主题按钮循环切换：

```
Auto → Light → Dark → Auto
 🔆     ☀️      🌙      🔆
```

| 模式 | 图标 | 行为 | 说明 |
|------|------|------|------|
| **Auto** | 🔆 灯泡 | 跟随系统设置 | 默认模式，自动适配 |
| **Light** | ☀️ 太阳 | 强制亮色模式 | 始终使用亮色主题 |
| **Dark** | 🌙 月亮 | 强制暗色模式 | 始终使用暗色主题 |

#### 💾 持久化存储
- 使用 localStorage 保存用户选择
- 刷新页面后保持用户偏好
- 跨标签页同步（同域名）

#### ⚡ 性能优化
- 内联脚本防止 FOUC（页面闪烁）
- 首次加载 < 10ms
- 主题切换即时响应
- 生产环境自动压缩

---

## 🚀 使用方法

### 用户端使用

#### 1. 切换主题
点击右上角的主题按钮：
- 第一次点击：切换到 Light 模式 ☀️
- 第二次点击：切换到 Dark 模式 🌙
- 第三次点击：返回 Auto 模式 🔆

#### 2. 查看当前模式
主题按钮会显示对应的图标：
- 🔆 = Auto（跟随系统）
- ☀️ = Light（亮色）
- 🌙 = Dark（暗色）

#### 3. 悬停提示
鼠标悬停在主题按钮上会显示当前模式

---

## 🔧 开发者 API

### JavaScript API

增强版主题切换暴露了全局 API，可以通过 `window.theme` 访问：

#### 1. 切换主题
```js
// 循环切换（auto → light → dark → auto）
window.theme.toggle();
```

#### 2. 设置特定主题
```js
// 设置为自动模式
window.theme.set('auto');

// 设置为亮色模式
window.theme.set('light');

// 设置为暗色模式
window.theme.set('dark');
```

#### 3. 获取当前主题
```js
const themeInfo = window.theme.get();

console.log(themeInfo);
// 输出：
// {
//   saved: 'auto',       // 用户保存的设置
//   effective: 'dark',   // 实际显示的主题
//   system: 'dark'       // 系统主题设置
// }
```

#### 4. 主题常量
```js
window.theme.THEME_AUTO   // 'auto'
window.theme.THEME_LIGHT  // 'light'
window.theme.THEME_DARK   // 'dark'
```

### 使用示例

#### 示例 1: 在控制台测试
```js
// 打开浏览器控制台（F12）

// 查看当前主题
window.theme.get();

// 切换到暗色模式
window.theme.set('dark');

// 切换到自动模式
window.theme.set('auto');

// 循环切换
window.theme.toggle();
```

#### 示例 2: 自定义按钮
```html
<button onclick="window.theme.set('dark')">
  强制暗色模式
</button>

<button onclick="window.theme.set('light')">
  强制亮色模式
</button>

<button onclick="window.theme.set('auto')">
  跟随系统
</button>
```

#### 示例 3: 监听主题变化
```js
// 使用 MutationObserver 监听 class 变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('主题已切换为:', isDark ? '暗色' : '亮色');
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});
```

---

## 🎯 Tailwind CSS 使用

### 基础用法
```html
<!-- 默认亮色，暗色模式下变化 -->
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-gray-100">
    文本内容
  </p>
</div>
```

### 按钮样式
```html
<button class="
  bg-blue-500 hover:bg-blue-600
  dark:bg-blue-600 dark:hover:bg-blue-700
  text-white
  px-4 py-2 rounded-lg
  transition-colors duration-200
">
  按钮
</button>
```

### 渐变效果
```html
<div class="
  bg-gradient-to-r from-blue-500 to-purple-600
  dark:from-blue-600 dark:to-purple-700
">
  渐变背景
</div>
```

### 边框和阴影
```html
<div class="
  border border-gray-200 dark:border-gray-700
  shadow-sm dark:shadow-lg
  rounded-lg
">
  卡片内容
</div>
```

---

## 📱 测试指南

### 1. 功能测试

#### 测试切换功能
1. 打开网站：http://localhost:1313
2. 点击右上角主题按钮
3. 验证图标和主题正确切换
4. 刷新页面，主题应该保持

#### 测试 Auto 模式
1. 切换到 Auto 模式（🔆 图标）
2. 打开系统设置，切换系统主题
3. 网站应该自动跟随系统主题变化

#### 测试持久化
1. 设置为 Dark 模式
2. 刷新页面
3. 主题应该保持 Dark 模式
4. 打开新标签页（同域名）
5. 主题应该同步为 Dark 模式

### 2. 浏览器兼容性测试

在不同浏览器测试：
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ 移动浏览器（iOS Safari, Chrome Mobile）

### 3. 性能测试

使用浏览器开发工具：
1. 打开 Performance 面板
2. 录制页面加载
3. 检查主题初始化时间应 < 10ms
4. 检查无 FOUC（页面闪烁）

---

## 🐛 故障排除

### 问题 1: 主题切换没有反应
**解决方案：**
1. 检查浏览器控制台是否有错误
2. 确认 `theme-toggle-enhanced.js` 已加载
3. 检查按钮 ID 是否为 `theme-toggle`

### 问题 2: 页面刷新后主题丢失
**解决方案：**
1. 检查浏览器是否允许 localStorage
2. 打开控制台输入：`localStorage.getItem('theme')`
3. 如果隐私模式，localStorage 可能被禁用

### 问题 3: Auto 模式不跟随系统
**解决方案：**
1. 检查浏览器是否支持 `prefers-color-scheme`
2. 确认系统主题设置正确
3. 重启浏览器后重试

### 问题 4: 页面加载时闪烁
**解决方案：**
1. 检查 `baseof.html` 中的内联脚本
2. 确保脚本在 `<head>` 中
3. 清除浏览器缓存

---

## 🎨 自定义配置

### 修改默认主题
编辑 `theme-toggle-enhanced.js` 第 18 行：
```js
function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || THEME_AUTO;  // 改为 THEME_LIGHT 或 THEME_DARK
}
```

### 更改图标
编辑 `menu.html` 中的 SVG 图标：
```html
<!-- 自定义 Auto 图标 -->
<svg id="theme-toggle-auto-icon" ...>
  <!-- 你的 SVG 路径 -->
</svg>
```

### 添加过渡动画
在主题切换按钮添加旋转动画：
```html
<button id="theme-toggle" class="transition-transform hover:rotate-12">
```

---

## 📊 数据属性

增强版会在 `<html>` 元素添加数据属性：

```html
<html 
  class="dark"
  data-theme="auto"
  data-effective-theme="dark"
>
```

可以在 CSS 中使用：
```css
/* 只在 Auto 模式下应用 */
[data-theme="auto"] .special {
  /* 样式 */
}

/* 根据实际显示的主题 */
[data-effective-theme="dark"] .content {
  /* 样式 */
}
```

---

## 🚀 启动测试

```bash
# 启动开发服务器
npm run dev

# 访问网站
open http://localhost:1313

# 打开浏览器控制台
# 输入：window.theme.get()
# 查看当前主题状态
```

---

## ✨ 功能总结

- ✅ 三态切换（Auto/Light/Dark）
- ✅ 图标自动更新
- ✅ LocalStorage 持久化
- ✅ 系统主题跟随
- ✅ 防止页面闪烁
- ✅ 完整的 JavaScript API
- ✅ 数据属性支持
- ✅ 平滑动画过渡
- ✅ 移动端友好
- ✅ 键盘可访问

**恭喜！增强版主题切换已经完全配置好了！** 🎉
