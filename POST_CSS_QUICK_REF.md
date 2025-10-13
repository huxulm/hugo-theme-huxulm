# Post.css 快速参考

## ✅ 已完成

成功创建了 `post.css` 文章专用样式文件，继承 `main.css` 并扩展了大量文章特定样式。

## 📁 文件结构

```
assets/css/
├── main.css              # 基础样式（所有页面）
└── post.css              # 文章样式（仅 posts 页面）← 新增

layouts/_partials/head/
└── css.html              # CSS 加载逻辑（已更新）
```

## 🎯 加载逻辑

```
所有页面：
└── main.css ✅

文章页面（posts/*）：
├── main.css ✅
└── post.css ✅ （继承 + 扩展）

其他页面（home, 404, etc）：
└── main.css ✅
```

## 🎨 核心样式类

### 容器类
```css
.post-container          /* 文章主容器 */
.post-content            /* 内容区域 */
.breadcrumb-nav          /* 面包屑导航 */
```

### 元信息类
```css
.post-meta               /* 元信息容器 */
.post-meta-item          /* 单个元信息（日期/时间/字数） */
.post-taxonomies         /* 分类标签容器 */
.category-badge          /* 分类徽章（蓝色） */
.tag-badge               /* 标签徽章（紫色） */
.post-description        /* 描述引用框 */
```

### 交互类
```css
.share-buttons           /* 分享按钮容器 */
.share-button            /* 单个分享按钮 */
.post-navigation         /* 上下篇导航容器 */
.nav-card                /* 导航卡片 */
.toc-sidebar             /* TOC 侧边栏 */
```

### 内容样式（自动应用）
```css
article.prose h2         /* 主标题（装饰条） */
article.prose h3         /* 子标题（圆点） */
article.prose a          /* 链接（滑动下划线） */
article.prose code       /* 行内代码（粉色） */
article.prose pre        /* 代码块（深色） */
article.prose blockquote /* 引用块（💡） */
article.prose table      /* 表格（蓝色表头） */
article.prose img        /* 图片（圆角阴影） */
article.prose hr         /* 分割线（渐变） */
```

## 🎯 主要增强

| 元素 | 增强效果 |
|------|---------|
| **H2 标题** | 左侧彩色装饰条（蓝紫渐变） + 底部边框 |
| **H3 标题** | 左侧紫色圆点 |
| **链接** | 底部滑动下划线 + 外部链接🔗图标 |
| **代码块** | 右上角语言标签 + 深色主题 + 阴影 |
| **行内代码** | 粉色文字 + 灰色背景 |
| **引用块** | 蓝色渐变 + 💡 图标 + 左边框 |
| **列表** | 蓝色圆点（ul）/ 紫色数字（ol） |
| **表格** | 蓝色渐变表头 + 斑马纹 + 悬停高亮 |
| **图片** | 圆角 + 阴影 + 标题居中显示 |
| **分割线** | 透明→蓝色→透明 渐变 |
| **特色图** | 悬停放大 + 加载淡入 |
| **分类徽章** | 蓝色渐变 + 悬停上浮 |
| **标签徽章** | 紫色渐变 + 悬停上浮 |

## 📱 响应式

| 屏幕 | 布局 |
|------|------|
| **桌面** (≥1024px) | 两栏（内容 + TOC） |
| **平板** (768-1023px) | 单栏（TOC 在上） |
| **移动** (<768px) | 单栏（紧凑布局） |

## 🌓 深色模式

所有样式都有深色模式变体：
```css
.dark article.prose h2 { ... }
```

## 🖨️ 打印优化

打印时自动：
- 隐藏导航、分享、TOC
- 显示链接 URL
- 避免标题分页断开

## ⚡ 性能

| 指标 | 值 |
|------|-----|
| **post.css 大小** | ~45KB（开发）/ ~25KB（生产） |
| **加载时机** | 仅文章页面 |
| **缓存策略** | 文件指纹（生产环境） |

## 🔧 快速自定义

### 修改 H2 装饰条颜色

```css
/* assets/css/post.css */
article.prose h2::before {
  background: linear-gradient(180deg, red, orange);
}
```

### 修改链接颜色

```css
article.prose a {
  color: purple;
}
.dark article.prose a {
  color: pink;
}
```

### 修改代码块背景

```css
article.prose pre {
  background: rgb(25 35 50);
}
```

### 修改分类徽章样式

```css
.category-badge {
  background: linear-gradient(135deg, purple, pink);
  color: white;
}
```

## 🧪 测试

访问：**http://localhost:51289/posts/first/**

**检查项**：
- [ ] H2 标题左侧有彩色装饰条
- [ ] H3 标题左侧有紫色圆点
- [ ] 链接悬停出现滑动下划线
- [ ] 代码块右上角显示语言标签
- [ ] 引用块左上角有 💡 图标
- [ ] 表格表头是蓝色渐变
- [ ] 图片有圆角和阴影
- [ ] 分类是蓝色徽章，标签是紫色徽章
- [ ] 特色图悬停时放大
- [ ] 深色模式所有颜色正确

## 📚 完整文档

详见：`POST_CSS_GUIDE.md`

## 💡 使用提示

1. **样式继承**：post.css 继承 main.css，无需重复定义
2. **按需加载**：仅文章页面加载，优化性能
3. **深色模式**：所有样式都要考虑 `.dark` 变体
4. **响应式**：使用 `@media` 适配不同屏幕
5. **打印友好**：重要内容打印时可见

## 🎉 完成清单

- ✅ 创建 post.css（继承 main.css）
- ✅ 更新 head/css.html（条件加载）
- ✅ 添加文章容器样式
- ✅ 增强面包屑导航
- ✅ 优化特色图片
- ✅ 美化元信息
- ✅ 增强分类标签
- ✅ 优化文章描述
- ✅ 完整的正文排版
  - H2/H3 标题装饰
  - 链接动画
  - 代码块样式
  - 引用块增强
  - 列表优化
  - 表格美化
  - 图片处理
  - 分割线渐变
- ✅ 社交分享按钮
- ✅ 文章导航卡片
- ✅ TOC 侧边栏
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ 打印优化
- ✅ 无障碍功能
- ✅ 性能优化

---

**现在访问文章页面，查看全新的样式效果！** 🚀

**服务器**：http://localhost:51289/  
**示例文章**：http://localhost:51289/posts/first/
