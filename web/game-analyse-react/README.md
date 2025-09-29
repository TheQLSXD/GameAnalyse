# GameReview Analytics - 游戏评论分析平台

一个基于React和TypeScript构建的游戏评论分析网站，能够帮助用户深入分析游戏评论，洞察玩家真实反馈。

## ✨ 功能特点

- 用户注册与登录系统
- 游戏搜索功能
- 多维度游戏评论分析报告
- 数据可视化展示
- 响应式设计，适配各种设备

## 🚀 本地运行指南

### 环境要求

- Node.js v14.0.0 或更高版本
- pnpm 包管理器

### 安装步骤

1. **克隆或下载项目**

   将项目文件下载到本地，并进入项目目录：
   ```bash
   cd game-review-analytics
   ```

2. **安装依赖**

   使用pnpm安装项目所需的所有依赖：
   ```bash
   pnpm install
   ```

### 运行开发服务器

安装完成后，启动本地开发服务器：
```bash
pnpm dev
```

服务器启动后，会自动在浏览器中打开应用，默认地址为：`http://localhost:3000`

### 构建生产版本

如果需要构建生产环境版本，可以运行：
```bash
pnpm build
```

构建完成的文件会输出到`dist`目录中。

## 🔑 测试账号

为了方便测试，您可以使用以下测试账号登录：
- 用户名: `test`
- 密码: `123456`

## 📁 项目结构

- `src/pages` - 包含应用的主要页面组件
- `src/components` - 可复用的UI组件
- `src/contexts` - React上下文，用于状态管理
- `src/hooks` - 自定义React钩子
- `src/lib` - 工具函数和辅助代码

## ⚠️ 常见问题解决

### 依赖安装失败

如果遇到依赖安装问题，可以尝试清除pnpm缓存：
```bash
pnpm cache clean
pnpm install
```

### 端口被占用

如果3000端口被占用，可以修改`package.json`中的dev脚本，指定其他端口：
```json
"dev:client": "vite --host --port 3001",
```

## 📄 许可证

本项目仅供学习和演示使用。
