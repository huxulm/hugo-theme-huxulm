# TOC 自动折叠功能使用指南

## ✨ 新增功能

TOC（目录）现在支持 **父级目录自动折叠/展开** 功能！

### 🎯 核心特性

1. **自动折叠** ⬆️
   - 页面加载时，所有子目录（H3）默认折叠
   - 只显示主目录（H2）标题

2. **智能展开** ⬇️
   - 当页面滚动到某个章节时，自动展开该章节的子目录
   - 其他无关章节的子目录自动折叠

3. **手动切换** 🖱️
   - 点击父级标题（H2）可以手动展开/折叠子目录
   - 切换图标（▶ 转为 ▼）提供视觉反馈

4. **平滑动画** ✨
   - 展开/折叠使用 0.3s 缓动动画
   - 高度和透明度同时过渡，视觉流畅

## 🎬 工作原理

### 页面加载时
```
TOC 初始状态：
├── 📖 第一章 ▶ (折叠)
│   └── [隐藏的子章节]
├── 📖 第二章 ▶ (折叠)
│   └── [隐藏的子章节]
└── 📖 第三章 ▶ (折叠)
    └── [隐藏的子章节]
```

### 滚动到第二章时
```
TOC 自动更新：
├── 📖 第一章 ▶ (折叠)
├── 📘 第二章 ▼ (展开，高亮)
│   ├── 2.1 小节
│   ├── 2.2 小节
│   └── 2.3 小节
└── 📖 第三章 ▶ (折叠)
```

### 滚动到 2.2 小节时
```
TOC 精确定位：
├── 📖 第一章 ▶
├── 📘 第二章 ▼ (展开)
│   ├── 2.1 小节
│   ├── ✨ 2.2 小节 (高亮)
│   └── 2.3 小节
└── 📖 第三章 ▶
```

## 🔧 技术实现

### JavaScript 核心函数

#### 1. `initializeTOC()`
初始化时为所有父级项目添加：
- 折叠图标（▶）
- 点击事件监听器
- 初始折叠状态（max-height: 0）

```javascript
// 查找所有父级列表项（包含嵌套 ul）
const parentItems = tocContent.querySelectorAll('li:has(ul)');

// 为每个父项添加折叠功能
parentItems.forEach(parentLi => {
  // 添加切换图标
  const toggleIcon = document.createElement('span');
  toggleIcon.innerHTML = '▶';
  
  // 初始折叠子列表
  childUl.style.maxHeight = '0';
  childUl.style.opacity = '0';
});
```

#### 2. `expandSection(childUl, toggleIcon)`
展开子目录：
```javascript
childUl.style.maxHeight = childUl.scrollHeight + 'px';  // 设置为内容高度
childUl.style.opacity = '1';                            // 完全显示
toggleIcon.style.transform = 'rotate(90deg)';           // 图标旋转 90°
```

#### 3. `collapseSection(childUl, toggleIcon)`
折叠子目录：
```javascript
childUl.style.maxHeight = '0';                          // 高度归零
childUl.style.opacity = '0';                            // 透明
toggleIcon.style.transform = 'rotate(0deg)';            // 图标复位
```

#### 4. `highlightActiveTocItem()` (增强版)
滚动时的智能逻辑：
```javascript
1. 检测当前可见标题
2. 高亮对应的 TOC 链接
3. 如果是子项 (H3)：
   - 自动展开其父级 (H2)
4. 如果是父项 (H2)：
   - 展开其子目录
5. 折叠其他无关的父级目录
```

### CSS 样式

```css
/* 子目录容器 */
.toc-children {
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

/* 切换图标 */
.toc-toggle-icon {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  color: rgb(107 114 128);
}

/* 父级项目可点击 */
.toc-parent > a {
  cursor: pointer;
  user-select: none;
}
```

## 🎮 用户交互

### 自动交互（无需操作）
1. **页面加载**：所有子目录折叠
2. **向下滚动**：当前章节展开，其他折叠
3. **向上滚动**：自动切换到对应章节

### 手动交互
1. **点击 H2 标题**：
   - 折叠状态 → 展开（图标转 90°）
   - 展开状态 → 折叠（图标复位）

2. **点击 H3 标题**：
   - 平滑滚动到对应位置
   - 不会触发父级折叠（使用 `stopPropagation()`）

## 📊 示例场景

### 长文章优化

**文章结构**：
```markdown
## 第一章：简介（4个子章节）
### 1.1 背景
### 1.2 目标
### 1.3 意义
### 1.4 概述

## 第二章：方法（6个子章节）
### 2.1 准备工作
### 2.2 实施步骤
### 2.3 技术选型
### 2.4 架构设计
### 2.5 代码实现
### 2.6 测试验证

## 第三章：结果（3个子章节）
### 3.1 性能分析
### 3.2 效果展示
### 3.3 对比评估
```

**TOC 显示优化**：
- 初始：只显示 3 个主章节（第一、二、三章）
- 阅读第二章时：只展开第二章的 6 个子章节
- 减少视觉混乱，聚焦当前内容

### 移动端优化

**屏幕空间有限时**：
- 折叠功能尤其重要
- 避免 TOC 占据过多屏幕空间
- 只展示当前相关内容

## 🐛 常见问题

### Q: 图标不显示？
**A**: 检查浏览器控制台是否有 JavaScript 错误。确保页面完全加载后才初始化。

### Q: 折叠/展开没有动画？
**A**: 确保 CSS 样式正确加载。检查 `.toc-children` 的 `transition` 属性。

### Q: 点击标题没反应？
**A**: 查看浏览器控制台。可能是事件监听器未正确绑定。

### Q: 自动展开不工作？
**A**: 确保：
1. 文章使用 H2/H3 标题结构
2. 标题有正确的 `id` 属性
3. TOC 正确生成（Hugo 的 `.TableOfContents`）

## 🔍 调试技巧

### 浏览器控制台检查

```javascript
// 查看所有父级项目
document.querySelectorAll('.toc-parent')

// 查看当前展开的子目录
document.querySelectorAll('.toc-children')
  .forEach(el => console.log(el.style.maxHeight))

// 手动展开某个子目录
const childUl = document.querySelector('.toc-children');
childUl.style.maxHeight = childUl.scrollHeight + 'px';
childUl.style.opacity = '1';
```

### 样式检查

```css
/* 临时高亮父级项目 */
.toc-parent {
  background: yellow !important;
}

/* 临时显示所有子目录 */
.toc-children {
  max-height: none !important;
  opacity: 1 !important;
}
```

## ⚙️ 自定义配置

### 修改动画速度

编辑 `layouts/_partials/toc.html`：

```javascript
// 从 0.3s 改为 0.5s（更慢）
childUl.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
```

### 修改切换图标

```javascript
// 使用不同的图标
toggleIcon.innerHTML = '➕';  // 折叠时
// 展开时旋转改为：
toggleIcon.innerHTML = '➖';  // 或者改变内容而非旋转
```

### 修改触发距离

```javascript
// 当标题距离顶部 150px 时触发（默认）
if (rect.top <= 150) {
  currentHeading = heading;
}

// 改为 100px（更早触发）
if (rect.top <= 100) {
  currentHeading = heading;
}
```

## 🎨 视觉效果

### 折叠图标样式

**当前样式**：
- 图标：▶（向右箭头）
- 展开后：旋转 90° 变为 ▼
- 颜色：灰色（跟随文字颜色）
- 大小：0.7em（相对文字大小）

**自定义示例**：

```css
/* 使用彩色图标 */
.toc-toggle-icon {
  color: rgb(59 130 246) !important;  /* 蓝色 */
}

/* 使用更大的图标 */
.toc-toggle-icon {
  font-size: 1em !important;
}

/* 使用其他 Unicode 符号 */
toggleIcon.innerHTML = '⏵';  // 或 ◆ ► ▸ ⯈
```

## 📈 性能优化

### 节流处理

滚动事件使用 50ms 节流：

```javascript
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    updateReadingProgress();
    highlightActiveTocItem();
  }, 50);  // 50ms 节流
});
```

### DOM 操作优化

- 只在需要时更新 DOM
- 使用 CSS 过渡而非 JavaScript 动画
- 避免频繁的布局重排

## 🚀 测试步骤

### 1. 基础功能测试

访问：http://localhost:50969/posts/first/

**检查项**：
- [ ] 页面加载时，所有 H3 子目录折叠
- [ ] 只显示 H2 主目录和切换图标（▶）
- [ ] 图标样式正确（灰色、小号）

### 2. 自动展开测试

**操作**：慢慢向下滚动页面

**预期**：
- [ ] 滚动到某个 H2 章节时，该章节自动展开
- [ ] 图标旋转 90° 变为 ▼
- [ ] 展开动画流畅（0.3s）
- [ ] 当前章节高亮（蓝色背景）

### 3. 自动折叠测试

**操作**：继续滚动到下一个章节

**预期**：
- [ ] 上一个章节的子目录自动折叠
- [ ] 当前章节的子目录展开
- [ ] 只有一个章节保持展开状态

### 4. 手动切换测试

**操作**：点击某个 H2 标题

**预期**：
- [ ] 子目录展开/折叠切换
- [ ] 图标旋转动画
- [ ] 不影响页面滚动位置

### 5. H3 点击测试

**操作**：点击展开的 H3 子标题

**预期**：
- [ ] 页面平滑滚动到对应位置
- [ ] 不触发父级折叠
- [ ] 高亮正确的子项

### 6. 响应式测试

**桌面端** (>= 1024px)：
- [ ] TOC 在右侧边栏显示
- [ ] 折叠/展开正常工作

**移动端** (< 1024px)：
- [ ] TOC 可整体折叠
- [ ] 内部章节折叠功能仍然工作

### 7. 深色模式测试

**操作**：切换到深色主题

**预期**：
- [ ] 图标颜色适配深色模式
- [ ] 高亮颜色正确显示
- [ ] 动画效果无异常

## 🎯 最佳实践

### 1. 文章结构建议

```markdown
# 文章标题（Front Matter 的 title，不在正文中使用 H1）

## 第一章（H2 - 自动折叠组）
### 1.1 小节（H3 - 可折叠项）
### 1.2 小节

## 第二章
### 2.1 小节
### 2.2 小节
```

**避免**：
- 跳级使用（H2 直接到 H4）
- 过深嵌套（建议最多到 H3）
- H2 下没有 H3（不会显示折叠图标）

### 2. 目录层级控制

**推荐**：每个 H2 下 2-6 个 H3
- 太少（1个）：折叠意义不大
- 太多（>10个）：即使折叠仍显得拥挤

### 3. 标题命名

- 简洁明了（避免过长标题）
- 使用数字编号（如 1.1, 2.3）
- 语义化清晰

## 📝 更新日志

### v2.0.0 (2025-10-13)
- ✨ 新增父级目录自动折叠功能
- ✨ 新增滚动时智能展开
- ✨ 新增手动切换功能
- ✨ 新增切换图标（▶/▼）
- ✨ 新增平滑展开/折叠动画
- 🔧 优化滚动事件性能（50ms 节流）
- 🎨 改进视觉交互反馈

### v1.0.0 (2025-10-13)
- ✅ 基础 TOC 功能
- ✅ 滚动高亮
- ✅ 阅读进度条

## 💡 提示

- **长文章**：折叠功能让 TOC 更简洁
- **短文章**：如果只有几个章节，折叠效果可能不明显
- **移动端**：折叠功能节省宝贵的屏幕空间
- **无障碍**：使用键盘 Tab 和 Enter 也能操作

---

**测试地址**：http://localhost:50969/posts/first/  
**示例文章**：包含完整的 H2/H3 层级结构

现在访问示例文章，体验智能折叠功能吧！🎉
