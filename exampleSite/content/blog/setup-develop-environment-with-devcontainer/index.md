---
title: "使用开发容器快速设置开发环境"
date: 2025-10-16T10:02:00+08:00
draft: false
tags: ["devcontainer", "docker", "vscode", "容器开发环境", "容器化"]
categories: ["开发工具", "容器技术"]
cover:
  image: "cover.svg"
  alt: "开发容器环境配置指南"
  caption: "使用开发容器快速设置开发环境"
description: "详细介绍如何使用开发容器（Dev Container）技术快速搭建标准化、可复现的开发环境，提升团队协作效率。通过阅读本文，你将能够掌握开发容器的核心概念、配置方法和最佳实践，学会使用 VS Code Dev Containers 扩展快速初始化项目环境，了解如何通过 Features 特性扩展开发工具链，以及如何自定义容器配置以满足特定项目需求。"
keywords:
- devcontainer
- docker
- vscode
- 开发环境
- 容器化开发
- 环境一致性
- 团队协作
---
## 关于开发容器

开发容器（Dev Container）是一种基于容器技术的现代化开发环境解决方案。它通过将开发环境封装在 Docker 容器中，实现了开发环境的标准化、可复现和快速部署。

### 什么是开发容器？

开发容器本质上是一个运行在 Docker 容器内的完整开发环境。它包含了项目所需的所有工具、运行时、库和依赖项。通过一个简单的配置文件（`devcontainer.json`），你可以定义整个开发环境的规格，包括：

- 基础镜像和运行时版本
- 开发工具和扩展
- 环境变量和配置
- 端口映射和网络设置
- 初始化脚本和启动命令

### 核心优势

**环境一致性**  
所有团队成员使用完全相同的开发环境，消除"在我机器上可以运行"的问题。无论是 Windows、macOS 还是 Linux，每个人都能获得一致的开发体验。

**快速上手**  
新成员加入团队时，只需克隆代码仓库并在容器中打开，几分钟内即可开始工作，无需手动配置复杂的开发环境。

**环境隔离**  
不同项目的开发环境完全隔离，避免工具版本冲突。你可以在同一台机器上同时维护使用不同 Node.js 版本的多个项目。

**可移植性强**  
开发环境配置以代码形式存储在版本控制系统中，可以轻松分享、复制和迁移。支持本地开发、远程服务器开发，甚至云端开发环境。

**安全可靠**  
容器提供了额外的安全隔离层，实验性操作不会影响主机系统。如果环境出现问题，可以快速重建而不影响本地文件。

### 工作原理

当你在 VS Code 中打开一个配置了开发容器的项目时：

1. VS Code 读取 `.devcontainer/devcontainer.json` 配置文件
2. 根据配置拉取或构建 Docker 镜像
3. 创建并启动容器，挂载项目文件
4. 在容器内安装指定的 VS Code 扩展
5. 执行初始化脚本（如 `npm install`）
6. 将 VS Code 界面连接到容器内的开发环境

此时，你在 VS Code 中的所有操作（编辑、终端、调试等）都在容器内执行，但用户体验与本地开发完全一致。

### 适用场景

- **团队协作项目**：确保所有成员使用相同的开发环境
- **开源项目**：让贡献者快速搭建环境，降低参与门槛
- **多版本维护**：同时维护需要不同工具链版本的项目
- **教学培训**：为学员提供标准化的实验环境
- **持续集成**：开发环境与 CI/CD 环境保持一致

## 设置环境
### 系统需求
本地 / 远程主机：

您可以通过以下几种方式在开发容器扩展中使用 Docker：
- 在本地安装 Docker。
- 在远程环境中安装 Docker。

以下是在本地或远程主机上配置 Docker 的几种具体方式:
- Windows: 在 Windows 10 专业版/企业版上安装 [Docker Desktop](https://www.docker.com/products/docker-desktop) 2.0+。Windows 10 家庭版（2004+）需要 Docker Desktop 2.3+ 和 [WSL 2 后端](https://docs.docker.com/desktop/features/wsl/)。
- MacOS: 安装 [Docker Desktop](https://www.docker.com/products/docker-desktop) 2.0+
- Linux: 安装 [Docker CE/EE](https://docs.docker.com/engine/) 18.06+ 和 Docker Compose 1.21+。（不支持 Ubuntu snap 软件包）
- 远程主机: 需要 1 GB 内存，但建议至少 2 GB 内存和双核 CPU。

### 安装
- 安装 [Dev Containers 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)。如果你需要在 VS Code 中使用其他远程扩展，可以选择安装 [Remote Development 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)包。


### 使用开发容器配置模板
安装 [DevContainer vscode 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)后，在 `vscode` 打开项目，`Ctrl+P`选择 `Add Dev Container Configuration Files...`, 如下图:
{{< photoswipe src=add_config.png caption="1. 添加配置" width=800 >}}
确认后，从模板列表选择所需模板，如下图：

{{< photoswipe src=select_templetes.png caption="2. 选择模板" width=600 >}}

确认模板后，从列表中选择合适的 `image:tag`：
{{< photoswipe src=select_tags.png caption="3. 选择 image:tag" width=600 >}}

选择 image tag 后, 继续选择 `features`(可选), 详细参考 [Dev Container 特性](#dev-container-特性) 章节

基于我前面的选择，最终会在项目根目录得到一个 `.devcontainer` 的文件夹，里面包含 `devcontainer.json` 的配置文件。

{{< photoswipe src=setup_results.png width=1280 caption="4. 最终" >}}

至此我们已经得到了一个基本的 **Node & Typescript** 的开发环境。如果你想继续在当前目录进行开发，`Ctrl+P`可以选择在开发容器中打开当前目录。

{{< photoswipe src=run.png width=600 caption="在开发容器中打开当前目录" >}}

一切顺利，将进入已经在Docker中运行的开发容器环境,可以通过新开 Terminal 窗口验证 `node`, `npm` 等工具是否正确安装：

{{< photoswipe src=environment.png width=1280 caption="开发容器环境：容器运行Terminal (左)、用户开启的新 Terminal（右侧）" >}}



## Dev Container 特性
开发容器“特性（Features）” 是独立的、可共享的安装代码和开发容器配置单元。这个名称来源于这样一个理念：引用其中一个特性，可以让你快速轻松地向开发容器中添加更多工具、运行时或库“特性”!，供你或你的协作者使用。

当你使用 `Dev Containers: Add Dev Container Configuration Files` 时，系统会显示一个脚本列表，用于自定义现有的开发容器配置，例如安装 Git 或 Azure CLI：
{{< photoswipe src=select_features_1.png width=800 caption="选择开发容器特性" >}}

当你重建并在容器中重新打开时，你选择的特性将出现在 devcontainer.json 中：
```json
"features": {
  "ghcr.io/devcontainers/features/github-cli:1": {
    "version": "latest"
    }
}
```
在 devcontainer.json 中直接编辑 "features" 属性时，你将获得智能感知提示：

{{< photoswipe src=intelligence.png width=800 caption="智能感知提示" >}}

## 自定义开发容器配置
DevContainer 支持大多数docker容器的运行时配置, 如环境变量、端口映射、卷挂载等。你可以通过编辑 `devcontainer.json` 文件来自定义这些配置。完整配置规范参考 [Dev Container metadata reference](https://containers.dev/implementors/json_reference/)。

### 常用配置项说明

**基础配置**
```json
{
  "name": "项目名称",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

**端口转发**
```json
{
  "forwardPorts": [3000, 8080],
  "portsAttributes": {
    "3000": {
      "label": "Application",
      "onAutoForward": "notify"
    }
  }
}
```

**环境变量**
```json
{
  "containerEnv": {
    "NODE_ENV": "development",
    "API_URL": "http://localhost:8080"
  }
}
```

**卷挂载**
```json
{
  "mounts": [
    "source=${localWorkspaceFolder}/data,target=/data,type=bind,consistency=cached"
  ]
}
```

**安装 VS Code 扩展**
```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
      ]
    }
  }
}
```

**启动后执行命令**
```json
{
  "postCreateCommand": "npm install",
  "postStartCommand": "npm run dev"
}
```

**容器用户配置**
```json
{
  "remoteUser": "node",
  "containerUser": "node"
}
```
### 常用的开发容器镜像列表

以下是 Microsoft 提供的官方开发容器镜像，涵盖主流编程语言和开发平台：

|语言/平台|镜像 Repo|镜像 Tags|使用说明|
|:----|:---|:----:|:---:|
|Node.js|`mcr.microsoft.com/devcontainers/typescript-node`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/typescript-node/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/typescript-node/about)|
|Python|`mcr.microsoft.com/devcontainers/python`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/python/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/python/about)|
|Go|`mcr.microsoft.com/devcontainers/go`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/go/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/go/about)|
|C++|`mcr.microsoft.com/devcontainers/cpp`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/cpp/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/cpp/about)|
|Rust|`mcr.microsoft.com/devcontainers/rust`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/rust/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/rust/about)|

## 参考资料
- [在容器中开发](https://code.visualstudio.com/docs/devcontainers/containers) - VsCode
- [DevContainer](https://containers.dev/)
- [常用的镜像列表](https://mcr.microsoft.com/en-us/catalog?search=DevContainer&type=partial) - Microsoft Artifact Registry