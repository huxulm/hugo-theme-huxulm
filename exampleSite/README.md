# Hugo Theme Example Site

这是 `hugo-theme-huxulm` 主题的示例站点。

## 🔧 配置说明

### 模块导入与本地开发

#### 方式 1: Module Replacements（推荐）⭐

在 `hugo.toml` 中配置：

```toml
[module]
  # 默认从 GitHub 导入（生产环境）
  [[module.imports]]
    path = "github.com/huxulm/hugo-theme-huxulm"
  
  # 本地开发替换
  [[module.replacements]]
    old = "github.com/huxulm/hugo-theme-huxulm"
    new = "../.."
```

**使用方法：**

- **生产/CI 环境**：注释掉 `module.replacements` 部分
- **本地开发**：取消注释 `module.replacements` 部分

**优点：**
- ✅ 一个配置文件同时支持生产和开发
- ✅ 只需注释/取消注释一个块
- ✅ Hugo 官方推荐方式
- ✅ 支持多个替换规则

#### 方式 2: 环境变量配置文件

创建两个配置文件：

**`hugo.toml`（生产环境）：**
```toml
[module]
  [[module.imports]]
    path = "github.com/huxulm/hugo-theme-huxulm"
```

**`hugo.development.toml`（开发环境）：**
```toml
[module]
  [[module.imports]]
    path = "../.."
```

**使用方法：**
```bash
# 生产环境
hugo

# 开发环境
hugo --environment development
```

#### 方式 3: 直接使用相对路径（最简单）

如果只在本地开发，直接使用：

```toml
[module]
  [[module.imports]]
    path = "../.."
```

**缺点：** 部署到生产环境时需要手动修改。

## 🚀 本地开发

### 启用本地开发模式

编辑 `hugo.toml`，取消注释替换配置：

```toml
# 取消下面三行的注释
[[module.replacements]]
  old = "github.com/huxulm/hugo-theme-huxulm"
  new = "../.."
```

### 启动开发服务器

```bash
# 在主题根目录运行
npm run dev

# 或者直接在 exampleSite 目录运行
cd exampleSite
hugo server -D --noHTTPCache --disableFastRender
```

## 📦 部署到生产环境

### 1. 注释掉本地替换

编辑 `hugo.toml`，注释掉替换配置：

```toml
# 注释掉以下部分
# [[module.replacements]]
#   old = "github.com/huxulm/hugo-theme-huxulm"
#   new = "../.."
```

### 2. 初始化模块

```bash
hugo mod get -u
hugo mod tidy
```

### 3. 构建站点

```bash
hugo --minify
```

## 🔍 验证模块配置

查看当前模块依赖：

```bash
hugo mod graph
```

查看模块信息：

```bash
hugo mod list
```

## 📝 注意事项

1. **本地开发时**：确保 `module.replacements` 已启用
2. **提交代码前**：记得注释掉 `module.replacements`（可选，看团队约定）
3. **CI/CD 环境**：使用默认配置（从 GitHub 拉取）
4. **模块缓存**：如遇问题，运行 `hugo mod clean` 清理缓存

## 🛠️ 故障排查

### 问题：主题文件找不到

```bash
# 清理模块缓存
hugo mod clean

# 重新获取模块
hugo mod get -u
```

### 问题：CSS 样式未生效

1. 检查 `build.writeStats` 是否启用
2. 确认 `hugo_stats.json` 已生成
3. 重启开发服务器

### 问题：模块路径错误

```bash
# 查看当前模块配置
hugo config | grep module

# 查看模块依赖树
hugo mod graph
```

## 📚 相关文档

- [Hugo Modules](https://gohugo.io/hugo-modules/)
- [Module Replacements](https://gohugo.io/hugo-modules/configuration/#module-config-mounts)
- [主题开发指南](../README.md)
