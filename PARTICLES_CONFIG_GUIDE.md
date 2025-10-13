# 🎯 Particles 配置加载机制说明

## 配置优先级

Particles 动画支持两种配置方式，优先级从高到低：

1. **JSON 配置文件** (`assets/particles-config.json`) - 最高优先级
2. **Hugo 配置** (`hugo.toml` 中的 `params.animatedBackground.particles`)

## 方式 1: 使用 JSON 配置文件（推荐）

### 优点
- ✅ 完整的 Particles.js 配置选项
- ✅ 更好的可读性和可维护性
- ✅ 支持复杂的配置结构
- ✅ 可以直接从 Particles.js 官方示例复制配置
- ✅ 语法高亮和 IDE 支持

### 使用方法

1. **创建配置文件** `assets/particles-config.json`：

```json
{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#4F46E5"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#4F46E5",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    }
  },
  "retina_detect": true
}
```

2. **启用 Particles 动画** 在 `hugo.toml` 中：

```toml
[params.animatedBackground]
  enable = true
  type = "particles"
```

就这么简单！Hugo 会自动加载 `assets/particles-config.json`。

### 技术细节

Hugo 使用以下函数加载配置：

```go-html-template
{{- $configFile := resources.Get "particles-config.json" }}
{{- if $configFile }}
  {{- $particlesConfig = $configFile | transform.Unmarshal }}
{{- end }}
```

- `resources.Get` - 从 `assets/` 目录加载文件
- `transform.Unmarshal` - 将 JSON 解析为 Hugo 数据结构
- `jsonify` - 转换为 JavaScript 对象
- `safeJS` - 安全地嵌入到 JavaScript 中

## 方式 2: 使用 Hugo 配置

### 优点
- ✅ 配置集中在 `hugo.toml`
- ✅ 简单配置足够使用
- ✅ 无需额外文件

### 缺点
- ❌ 配置选项有限（仅基础参数）
- ❌ 不支持复杂嵌套结构

### 使用方法

在 `hugo.toml` 中配置：

```toml
[params.animatedBackground]
  enable = true
  type = "particles"
  
  [params.animatedBackground.particles]
    number = 100
    color = "#3B82F6"
    opacity = 0.6
    size = 4
    lineColor = "#3B82F6"
    lineOpacity = 0.5
    moveSpeed = 3
```

**支持的参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `number` | int | 80 | 粒子数量 |
| `color` | string | "#4F46E5" | 粒子颜色 |
| `opacity` | float | 0.5 | 粒子透明度 (0-1) |
| `size` | int | 3 | 粒子大小 |
| `lineColor` | string | "#4F46E5" | 连线颜色 |
| `lineOpacity` | float | 0.4 | 连线透明度 (0-1) |
| `moveSpeed` | int | 2 | 移动速度 |

## 配置示例

### 示例 1: 科技蓝（使用 JSON）

`assets/particles-config.json`:
```json
{
  "particles": {
    "number": { "value": 100 },
    "color": { "value": "#3B82F6" },
    "opacity": { "value": 0.6 },
    "size": { "value": 4, "random": true },
    "line_linked": {
      "enable": true,
      "color": "#3B82F6",
      "opacity": 0.5
    },
    "move": { "speed": 3 }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" }
    }
  }
}
```

### 示例 2: 紫色星空（使用 JSON）

`assets/particles-config.json`:
```json
{
  "particles": {
    "number": { "value": 150 },
    "color": { "value": "#9333EA" },
    "shape": { "type": "star" },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1
      }
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true
    }
  }
}
```

### 示例 3: 简约白（使用 Hugo 配置）

`hugo.toml`:
```toml
[params.animatedBackground.particles]
  number = 60
  color = "#FFFFFF"
  opacity = 0.3
  size = 2
  lineColor = "#FFFFFF"
  lineOpacity = 0.2
  moveSpeed = 1
```

## 完整的 Particles.js 配置选项

如果使用 JSON 文件，你可以配置所有 Particles.js 选项：

```json
{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",  // "circle", "edge", "triangle", "polygon", "star", "image"
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",  // "none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"
      "random": false,
      "straight": false,
      "out_mode": "out",  // "out", "bounce"
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"  // "grab", "bubble", "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"  // "push", "remove", "bubble", "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
```

## 如何切换配置方式

### 从 Hugo 配置切换到 JSON 文件

1. 创建 `assets/particles-config.json`
2. 将配置写入 JSON 文件
3. Hugo 会自动优先使用 JSON 文件

### 从 JSON 文件切换回 Hugo 配置

1. 删除或重命名 `assets/particles-config.json`
2. 在 `hugo.toml` 中配置参数
3. Hugo 会回退到使用 Hugo 配置

## 调试

### 查看当前使用的配置

打开浏览器控制台，可以看到：

```javascript
Particles.js animation initialized with config: {...}
```

### 验证配置加载

检查 Hugo 构建输出，如果使用 JSON 文件，会看到：

```
Processing: assets/particles-config.json
```

## 最佳实践

1. **新手推荐**：使用 Hugo 配置（`hugo.toml`），简单直接
2. **进阶用户**：使用 JSON 配置文件，获得完整控制
3. **团队协作**：使用 JSON 文件，便于版本控制和修改追踪
4. **快速原型**：使用 Hugo 配置，快速测试
5. **生产环境**：使用 JSON 文件，配置更稳定

## 参考资源

- [Particles.js 官方文档](https://github.com/VincentGarreau/particles.js/)
- [Particles.js 配置生成器](https://vincentgarreau.com/particles.js/)
- [Hugo Resources 文档](https://gohugo.io/hugo-pipes/introduction/)
- [Hugo transform.Unmarshal 文档](https://gohugo.io/functions/transform/unmarshal/)

---

**提示**：访问 [Particles.js 配置生成器](https://vincentgarreau.com/particles.js/) 可视化生成配置，然后复制 JSON 到 `assets/particles-config.json`！
