# 🎨 动画背景配置指南

Hugo Theme Huxulm 提供了灵活的动画背景系统，支持多种动画类型和丰富的配置选项。

## 📋 目录

- [快速开始](#快速开始)
- [配置选项](#配置选项)
- [动画类型](#动画类型)
- [使用示例](#使用示例)
- [自定义动画](#自定义动画)
- [性能优化](#性能优化)

## 🚀 快速开始

在 `hugo.toml` 或 `config.toml` 中添加配置：

```toml
[params]
  [params.animatedBackground]
    enable = true
    type = "particles"
    homeOnly = true
    disableOnMobile = true
```

## ⚙️ 配置选项

### 全局配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | boolean | `false` | 是否启用动画背景 |
| `type` | string | `"particles"` | 动画类型：`particles`、`waves`、`gradient`、`none` |
| `homeOnly` | boolean | `true` | 仅在首页显示动画 |
| `disableOnMobile` | boolean | `true` | 在移动端禁用动画（提升性能） |

### Particles 配置

```toml
[params.animatedBackground.particles]
  number = 80              # 粒子数量
  color = "#4F46E5"        # 粒子颜色（十六进制）
  opacity = 0.5            # 粒子透明度（0-1）
  size = 3                 # 粒子大小
  lineColor = "#4F46E5"    # 连线颜色
  lineOpacity = 0.4        # 连线透明度
  moveSpeed = 2            # 移动速度
```

**效果预览：**
- 交互式粒子系统
- 鼠标悬停时粒子会连接
- 点击时增加粒子
- 适合科技感、现代感的网站

### Waves 配置

```toml
[params.animatedBackground.waves]
  waveCount = 3                           # 波浪数量（1-5）
  primaryColor = "rgba(79, 70, 229, 0.1)" # 波浪颜色
  animationDuration = 15                  # 动画时长（秒）
```

**效果预览：**
- 纯 CSS 波浪动画
- 流畅的波浪起伏效果
- 无需外部库，性能优秀
- 适合清新、优雅的网站

### Gradient 配置

```toml
[params.animatedBackground.gradient]
  fromLight = "from-blue-50"        # 亮色模式起始颜色
  toLight = "to-indigo-100"         # 亮色模式结束颜色
  fromDark = "dark:from-gray-900"   # 暗色模式起始颜色
  toDark = "dark:to-blue-900"       # 暗色模式结束颜色
```

**效果预览：**
- 动态渐变背景
- 支持暗色/亮色模式自动切换
- 轻量级，无需额外依赖
- 适合简约、优雅的网站

## 🎭 动画类型

### 1. Particles（粒子动画）

**特点：**
- ✨ 高度交互性
- 🎯 科技感强
- 📦 需要加载 particles.js（~30KB）
- 🔋 中等性能消耗

**最佳使用场景：**
- 科技公司官网
- 个人技术博客
- 产品展示页
- 作品集网站

**配置示例：**
```toml
[params.animatedBackground]
  enable = true
  type = "particles"
  homeOnly = true
  
  [params.animatedBackground.particles]
    number = 100
    color = "#3B82F6"
    opacity = 0.6
    size = 4
    lineColor = "#3B82F6"
    lineOpacity = 0.5
    moveSpeed = 3
```

### 2. Waves（波浪动画）

**特点：**
- 🌊 流畅自然
- 💨 纯 CSS，无需外部库
- ⚡ 性能优秀
- 🎨 视觉舒适

**最佳使用场景：**
- 设计工作室
- 创意机构
- 博客网站
- 个人主页

**配置示例：**
```toml
[params.animatedBackground]
  enable = true
  type = "waves"
  homeOnly = false
  
  [params.animatedBackground.waves]
    waveCount = 4
    primaryColor = "rgba(59, 130, 246, 0.15)"
    animationDuration = 20
```

### 3. Gradient（渐变动画）

**特点：**
- 🎨 优雅简约
- 🪶 超轻量级
- 🌓 完美支持暗色模式
- 🚀 最佳性能

**最佳使用场景：**
- 极简风格网站
- 企业官网
- 文档站点
- 注重性能的项目

**配置示例：**
```toml
[params.animatedBackground]
  enable = true
  type = "gradient"
  homeOnly = false
  disableOnMobile = false
  
  [params.animatedBackground.gradient]
    fromLight = "from-purple-50"
    toLight = "to-pink-100"
    fromDark = "dark:from-purple-900"
    toDark = "dark:to-pink-900"
```

## 📝 使用示例

### 示例 1: 仅首页显示 Particles

```toml
[params.animatedBackground]
  enable = true
  type = "particles"
  homeOnly = true
  disableOnMobile = true
```

### 示例 2: 所有页面显示 Waves

```toml
[params.animatedBackground]
  enable = true
  type = "waves"
  homeOnly = false
  disableOnMobile = false
  
  [params.animatedBackground.waves]
    waveCount = 3
    primaryColor = "rgba(79, 70, 229, 0.1)"
    animationDuration = 15
```

### 示例 3: 移动端友好的 Gradient

```toml
[params.animatedBackground]
  enable = true
  type = "gradient"
  homeOnly = false
  disableOnMobile = false  # Gradient 性能好，移动端也可用
```

### 示例 4: 禁用动画

```toml
[params.animatedBackground]
  enable = false
```

或者：

```toml
[params.animatedBackground]
  enable = true
  type = "none"
```

## 🛠️ 自定义动画

### 创建自定义动画类型

1. 在 `layouts/_partials/animations/` 目录下创建新文件：

```bash
layouts/_partials/animations/custom.html
```

2. 编写你的动画代码：

```html
{{- /* 自定义动画 */ -}}

<div class="custom-animation">
  <!-- 你的动画 HTML -->
</div>

<style>
.custom-animation {
  /* 你的动画 CSS */
  position: absolute;
  inset: 0;
  /* ... */
}

@keyframes customAnimation {
  /* 你的关键帧 */
}
</style>

<script>
// 可选：你的动画 JavaScript
</script>
```

3. 在配置中使用：

```toml
[params.animatedBackground]
  enable = true
  type = "custom"  # 对应文件名
```

4. 更新 `animated-background.html`（如果需要）：

```html
{{- if eq $type "custom" }}
  {{- partial "animations/custom.html" . }}
{{- end }}
```

### 自定义配置参数

在 `hugo.toml` 中添加自定义参数：

```toml
[params.animatedBackground.custom]
  myParam1 = "value1"
  myParam2 = 123
```

在 partial 中读取：

```html
{{- $config := site.Params.animatedBackground.custom }}
{{- $myParam1 := $config.myParam1 | default "defaultValue" }}
```

## ⚡ 性能优化

### 1. 移动端优化

```toml
[params.animatedBackground]
  disableOnMobile = true  # 移动端禁用
```

### 2. 尊重用户偏好

所有动画都自动支持 `prefers-reduced-motion`：

```css
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
  }
}
```

### 3. 条件加载

仅在首页加载，减少其他页面负担：

```toml
[params.animatedBackground]
  homeOnly = true
```

### 4. 选择合适的动画类型

**性能排序（从快到慢）：**
1. `gradient` - 纯 CSS，最快
2. `waves` - 纯 CSS，稍复杂
3. `particles` - 需要 JS 库和 Canvas

**建议：**
- 移动端优先使用 `gradient`
- 桌面端可以使用任何类型
- 注重性能的项目选择 `gradient` 或 `waves`

## 🎯 最佳实践

### 1. 配色建议

**保持一致性：**
```toml
# 使用品牌色
[params.animatedBackground.particles]
  color = "#4F46E5"        # 与主题色一致
  lineColor = "#4F46E5"
```

**暗色模式适配：**
```toml
# Gradient 示例
[params.animatedBackground.gradient]
  fromLight = "from-blue-50"
  fromDark = "dark:from-blue-900"  # 暗色版本
```

### 2. 动画速度

**慢速更优雅：**
```toml
[params.animatedBackground.particles]
  moveSpeed = 1.5  # 慢速（推荐）

[params.animatedBackground.waves]
  animationDuration = 20  # 慢速循环
```

### 3. 透明度设置

**避免过于抢眼：**
```toml
[params.animatedBackground.particles]
  opacity = 0.3-0.5      # 适中透明度
  lineOpacity = 0.2-0.4  # 连线更淡
```

## 🔧 故障排查

### 问题 1: 动画不显示

**检查清单：**
- [ ] `enable = true` 已设置
- [ ] 如果 `homeOnly = true`，确保在首页
- [ ] 检查浏览器控制台是否有错误
- [ ] 清除浏览器缓存

### 问题 2: Particles 加载失败

**解决方案：**
- 检查网络连接（CDN 访问）
- 查看浏览器控制台错误信息
- 尝试使用其他动画类型测试

### 问题 3: 移动端动画卡顿

**解决方案：**
```toml
[params.animatedBackground]
  disableOnMobile = true  # 禁用移动端
```

或切换到性能更好的类型：
```toml
[params.animatedBackground]
  type = "gradient"  # 性能最佳
```

### 问题 4: 动画覆盖内容

确保 baseof.html 中 `<main>` 有 `relative` 类：

```html
<main class="min-h-screen relative">
  {{ block "main" . }}{{ end }}
</main>
```

## 📚 技术细节

### 文件结构

```
layouts/
├── _partials/
│   ├── animated-background.html      # 主入口
│   └── animations/
│       ├── particles.html            # Particles 动画
│       ├── waves.html                # Waves 动画
│       └── gradient.html             # Gradient 动画
└── baseof.html                       # 在这里引入
```

### 工作原理

1. `baseof.html` 调用 `animated-background.html`
2. 根据配置读取 `params.animatedBackground`
3. 根据 `type` 加载对应的子模板
4. 应用用户配置参数
5. 渲染动画背景

### CSS 层级

所有动画背景使用：
```html
<div class="fixed inset-0 -z-10">
```

- `fixed` - 固定定位
- `inset-0` - 全屏覆盖
- `-z-10` - 确保在内容下方

## 🎉 示例网站

查看不同配置的实际效果：

1. **Particles 示例** - [查看配置](#示例-1-仅首页显示-particles)
2. **Waves 示例** - [查看配置](#示例-2-所有页面显示-waves)
3. **Gradient 示例** - [查看配置](#示例-3-移动端友好的-gradient)

## 📖 相关资源

- [Particles.js 文档](https://github.com/VincentGarreau/particles.js/)
- [Tailwind CSS 渐变](https://tailwindcss.com/docs/gradient-color-stops)
- [CSS 动画最佳实践](https://web.dev/animations/)
- [Web 性能优化](https://web.dev/performance/)

---

**享受你的动画背景！** 🎨✨

有问题或建议？[提交 Issue](https://github.com/huxulm/hugo-theme-huxulm/issues)
