# 动画背景快速配置

## 🚀 三步启用

### 1. 编辑 `hugo.toml`
```toml
[params.animatedBackground]
  enable = true
  type = "particles"  # 或 "waves" 或 "gradient"
```

### 2. 重启服务器
```bash
npm run dev
```

### 3. 完成！
打开 http://localhost:1313 查看效果

---

## 📌 快速配置模板

### Particles（推荐用于首页）
```toml
[params.animatedBackground]
  enable = true
  type = "particles"
  homeOnly = true
  disableOnMobile = true
```

### Waves（优雅流畅）
```toml
[params.animatedBackground]
  enable = true
  type = "waves"
  homeOnly = false
```

### Gradient（性能最佳）
```toml
[params.animatedBackground]
  enable = true
  type = "gradient"
  disableOnMobile = false
```

---

## 🎨 颜色自定义

### 修改 Particles 颜色
```toml
[params.animatedBackground.particles]
  color = "#3B82F6"      # 蓝色
  lineColor = "#3B82F6"
```

### 修改 Gradient 颜色
```toml
[params.animatedBackground.gradient]
  fromLight = "from-purple-50"
  toLight = "to-pink-100"
```

---

## ⚙️ 所有配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | bool | `false` | 启用/禁用 |
| `type` | string | `"particles"` | 动画类型 |
| `homeOnly` | bool | `true` | 仅首页 |
| `disableOnMobile` | bool | `true` | 移动端禁用 |

完整文档：[ANIMATED_BACKGROUND_GUIDE.md](ANIMATED_BACKGROUND_GUIDE.md)
