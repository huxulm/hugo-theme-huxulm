---
title: "Kubernetes 中 ETCD 数据备份与恢复"
date: 2024-02-28T01:44:12+08:00
tags: ["kubernetes", "etcd", "备份", "运维", "集群管理"]
featured_image: "cover.png"
description: "详细介绍如何在 Kubernetes 集群中进行 ETCD 数据的备份与恢复操作，确保集群数据安全"
keywords:
- etcd
- kubernetes
- 备份
- 恢复
- 容器化
- 数据保护
- 集群管理
- 高可用
---

ETCD 作为 Kubernetes 集群的核心数据存储，保存着集群的所有配置信息、状态数据和元数据。定期备份 ETCD 数据对于保障集群安全和业务连续性至关重要。本文将详细介绍如何在 Kubernetes 环境中进行 ETCD 数据的备份与恢复操作。

## ETCD 在 Kubernetes 中的重要性

ETCD 是 Kubernetes 集群的"大脑"，存储着：
- 所有 Kubernetes 对象的定义和状态
- 集群配置信息和网络策略
- 服务发现和负载均衡配置
- 认证和授权信息
- 节点和 Pod 的状态数据

一旦 ETCD 数据丢失，整个 Kubernetes 集群将无法正常工作。

## 准备工作

### 环境要求
- Kubernetes 集群正常运行
- Docker 环境可用
- 具有集群管理员权限
- ETCD 集群的 TLS 证书文件

### 获取 ETCD 连接信息

首先需要获取 ETCD 集群的连接信息：

```shell
# 查看 ETCD Pod 信息
kubectl get pods -n kube-system | grep etcd

# 获取 ETCD 端点信息
kubectl get endpoints -n kube-system etcd -o yaml

# 查看 ETCD 配置
kubectl describe pod etcd-master -n kube-system
```

### 证书文件位置

通常 ETCD 证书文件位于以下路径：
- CA 证书：`/etc/kubernetes/pki/etcd/ca.crt`
- 客户端证书：`/etc/kubernetes/pki/etcd/healthcheck-client.crt`
- 客户端私钥：`/etc/kubernetes/pki/etcd/healthcheck-client.key`

## 数据备份

### 方法一：使用 Docker 容器备份

这是推荐的方法，使用 etcd 官方容器进行备份操作：

```shell
# 创建备份目录
mkdir -p /backup/etcd

# 执行备份操作
docker run --rm \
  -v /etc/kubernetes/pki/etcd:/etc/kubernetes/pki/etcd:ro \
  -v /backup:/backup \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  --endpoints=https://192.168.1.100:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \
  snapshot save /backup/etcd-snapshot-$(date +%Y%m%d_%H%M%S).db

# 验证备份文件
docker run --rm \
  -v /backup:/backup \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  --write-out=table \
  snapshot status /backup/etcd-snapshot-$(date +%Y%m%d)*.db
```

### 方法二：在 Master 节点直接备份

如果可以直接访问 Master 节点：

```shell
# 在 Master 节点执行
sudo ETCDCTL_API=3 etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \
  snapshot save /backup/etcd-snapshot-$(date +%Y%m%d_%H%M%S).db
```

### 自动化备份脚本

创建自动化备份脚本 `etcd-backup.sh`：

```shell
#!/bin/bash

# 配置变量
ETCD_ENDPOINTS="https://192.168.1.100:2379,https://192.168.1.101:2379,https://192.168.1.102:2379"
BACKUP_DIR="/backup/etcd"
RETENTION_DAYS=7
ETCD_VERSION="v3.5.5"

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 生成时间戳
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/etcd-snapshot-${TIMESTAMP}.db"

echo "开始备份 ETCD 数据..."
echo "备份时间: $(date)"
echo "备份文件: ${BACKUP_FILE}"

# 执行备份
docker run --rm \
  -v /etc/kubernetes/pki/etcd:/etc/kubernetes/pki/etcd:ro \
  -v ${BACKUP_DIR}:${BACKUP_DIR} \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:${ETCD_VERSION} \
  /usr/local/bin/etcdctl \
  --endpoints=${ETCD_ENDPOINTS} \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \
  snapshot save ${BACKUP_FILE}

if [ $? -eq 0 ]; then
    echo "备份成功完成!"
    
    # 验证备份文件
    echo "验证备份文件..."
    docker run --rm \
      -v ${BACKUP_DIR}:${BACKUP_DIR} \
      -e ETCDCTL_API=3 \
      quay.io/coreos/etcd:${ETCD_VERSION} \
      /usr/local/bin/etcdctl \
      --write-out=table \
      snapshot status ${BACKUP_FILE}
    
    # 清理旧备份文件
    echo "清理 ${RETENTION_DAYS} 天前的备份文件..."
    find ${BACKUP_DIR} -name "etcd-snapshot-*.db" -mtime +${RETENTION_DAYS} -delete
    
    echo "备份任务完成!"
else
    echo "备份失败!"
    exit 1
fi
```

### 设置定时备份

使用 crontab 设置定时备份：

```shell
# 编辑 crontab
crontab -e

# 添加以下行，每天凌晨 2 点执行备份
0 2 * * * /path/to/etcd-backup.sh >> /var/log/etcd-backup.log 2>&1
```

## 数据恢复

### 停止 Kubernetes 组件

在恢复之前，需要停止相关的 Kubernetes 组件：

```shell
# 停止 API Server
sudo systemctl stop kubelet
sudo systemctl stop docker

# 或者移动 ETCD Pod 清单文件
sudo mv /etc/kubernetes/manifests/etcd.yaml /etc/kubernetes/etcd.yaml.backup
```

### 恢复数据

```shell
# 清理现有数据目录
sudo rm -rf /var/lib/etcd

# 使用容器恢复数据
docker run --rm \
  -v /backup:/backup \
  -v /var/lib/etcd:/var/lib/etcd \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  snapshot restore /backup/etcd-snapshot-20241028_140530.db \
  --data-dir=/var/lib/etcd \
  --name=master \
  --initial-cluster=master=https://192.168.1.100:2380 \
  --initial-cluster-token=etcd-cluster \
  --initial-advertise-peer-urls=https://192.168.1.100:2380

# 修复目录权限
sudo chown -R etcd:etcd /var/lib/etcd
```

### 多节点集群恢复

对于多节点 ETCD 集群，需要在所有节点上执行恢复操作：

```shell
# 节点 1
docker run --rm \
  -v /backup:/backup \
  -v /var/lib/etcd:/var/lib/etcd \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  snapshot restore /backup/etcd-snapshot.db \
  --data-dir=/var/lib/etcd \
  --name=etcd-1 \
  --initial-cluster=etcd-1=https://192.168.1.100:2380,etcd-2=https://192.168.1.101:2380,etcd-3=https://192.168.1.102:2380 \
  --initial-cluster-token=etcd-cluster \
  --initial-advertise-peer-urls=https://192.168.1.100:2380

# 节点 2
docker run --rm \
  -v /backup:/backup \
  -v /var/lib/etcd:/var/lib/etcd \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  snapshot restore /backup/etcd-snapshot.db \
  --data-dir=/var/lib/etcd \
  --name=etcd-2 \
  --initial-cluster=etcd-1=https://192.168.1.100:2380,etcd-2=https://192.168.1.101:2380,etcd-3=https://192.168.1.102:2380 \
  --initial-cluster-token=etcd-cluster \
  --initial-advertise-peer-urls=https://192.168.1.101:2380

# 节点 3 (类似配置...)
```

### 启动服务

```shell
# 恢复 ETCD Pod 清单文件
sudo mv /etc/kubernetes/etcd.yaml.backup /etc/kubernetes/manifests/etcd.yaml

# 启动服务
sudo systemctl start docker
sudo systemctl start kubelet

# 验证集群状态
kubectl get nodes
kubectl get pods --all-namespaces
```

## 验证和测试

### 验证 ETCD 集群状态

```shell
# 检查 ETCD 集群健康状态
docker run --rm \
  -v /etc/kubernetes/pki/etcd:/etc/kubernetes/pki/etcd:ro \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  --endpoints=https://192.168.1.100:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \
  endpoint health

# 查看集群成员
docker run --rm \
  -v /etc/kubernetes/pki/etcd:/etc/kubernetes/pki/etcd:ro \
  -e ETCDCTL_API=3 \
  quay.io/coreos/etcd:v3.5.5 \
  /usr/local/bin/etcdctl \
  --endpoints=https://192.168.1.100:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \
  member list
```

### 验证 Kubernetes 集群

```shell
# 检查节点状态
kubectl get nodes

# 检查系统 Pod
kubectl get pods -n kube-system

# 验证应用状态
kubectl get pods --all-namespaces

# 测试创建资源
kubectl create deployment test-nginx --image=nginx
kubectl get deployments
kubectl delete deployment test-nginx
```

## 最佳实践

### 备份策略
1. **定期备份**：建议每日至少备份一次
2. **多地存储**：将备份文件存储在多个位置
3. **版本管理**：保留多个版本的备份文件
4. **加密存储**：对备份文件进行加密保护

### 监控和告警
1. **备份监控**：监控备份任务的执行状态
2. **磁盘空间**：监控备份存储空间使用情况
3. **备份验证**：定期验证备份文件的完整性

### 安全考虑
1. **权限控制**：限制对备份文件的访问权限
2. **网络安全**：使用 TLS 加密 ETCD 通信
3. **证书管理**：定期更新 ETCD 证书

## 常见问题和解决方案

### 备份失败
- 检查证书文件路径和权限
- 验证 ETCD 端点是否可访问
- 确认 ETCD 集群状态健康

### 恢复失败
- 确保所有节点的数据目录已清空
- 检查集群配置参数是否正确
- 验证网络连通性和端口开放

### 性能影响
- 在业务低峰期执行备份操作
- 考虑使用快照功能减少影响
- 监控备份过程中的资源使用

## 总结

ETCD 数据备份与恢复是 Kubernetes 集群管理中的关键操作。通过使用容器化的方式，我们可以简化备份和恢复流程，确保操作的一致性和可靠性。定期的备份和完善的恢复流程是保障 Kubernetes 集群稳定运行的重要基础。

建议在生产环境中建立完善的备份策略，包括自动化备份、监控告警和定期的恢复演练，以确保在发生故障时能够快速恢复集群服务。
