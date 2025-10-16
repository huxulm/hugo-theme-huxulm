---
title: "使用开发容器快速设置本地开发环境"
date: 2025-10-16T10:02:00+08:00
draft: false
tags: ["devcontainer", "docker", "vscode", "开发环境", "容器化"]
categories: ["开发工具", "容器技术"]
cover:
  image: "cover.svg"
  alt: "开发容器环境配置指南"
  caption: "使用开发容器快速设置本地开发环境"
description: "详细介绍如何使用开发容器（Dev Container）技术快速搭建标准化、可复现的开发环境，提升团队协作效率"
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

## 设置环境
### 前置需求
- Docker
- VsCode
### 使用默认开发容器配置
安装 [DevContainer vscode 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)后，在 `vscode` 打开项目，`Ctrl+P`选择 ``, 如下图:
{{< photoswipe src=add_config.png caption=添加配置 width=800 >}}

### 可用的镜像列表
|语言/平台|镜像 Repo|镜像 Tags|使用说明|
|:----|:---|:----:|:---:|
|Node.js|`mcr.microsoft.com/devcontainers/typescript-node`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/typescript-node/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/typescript-node/about)|
|Python|`mcr.microsoft.com/devcontainers/python`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/python/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/python/about)|
|Go|`mcr.microsoft.com/devcontainers/go`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/go/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/go/about)|
|C++|`mcr.microsoft.com/devcontainers/cpp`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/cpp/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/cpp/about)|
|Rust|`mcr.microsoft.com/devcontainers/rust`|[Tag List](https://mcr.microsoft.com/v2/devcontainers/rust/tags/list)|[About](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/rust/about)|

## 项目配置参考模板
### Node.js 项目
### Python 项目
### Golang 项目
### C/C++ 项目
### Rust 项目

## 参考资料
- [在容器中开发](https://code.visualstudio.com/docs/devcontainers/containers) - VsCode
- [DevContainer](https://containers.dev/)
- [常用的镜像列表](https://mcr.microsoft.com/en-us/catalog?search=DevContainer&type=partial) - Microsoft Artifact Registry