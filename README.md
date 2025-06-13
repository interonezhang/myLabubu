# Labubu Portal - 最新资讯、收藏指南和社区讨论

![Labubu Portal](./public/og-image.jpg)

## 项目简介

Labubu Portal是一个专为Labubu爱好者打造的综合性平台，提供最新资讯、收藏指南、社区讨论等功能。我们致力于为全球Labubu收藏家和爱好者提供最全面、最及时的信息和服务。

## 主要功能

### 🔥 最新资讯
- 第一时间获取Labubu最新发布信息
- 行业动态和收藏趋势分析
- 官方资讯和社区热点

### 📚 收藏指南
- 新手入门指南
- 真伪鉴别技巧
- 收藏保养方法
- 投资价值分析

### 👥 社区讨论
- 收藏经验分享
- 交易信息交流
- 专家问答互动
- 收藏品展示

### 🛒 购买指南
- 官方渠道推荐
- 价格趋势分析
- 购买注意事项
- 防骗指南

## 技术栈

### 前端
- **Vue.js 3** - 渐进式JavaScript框架
- **Vue Router 4** - 官方路由管理器
- **Pinia** - 状态管理库
- **Vite** - 现代化构建工具
- **Tailwind CSS** - 原子化CSS框架

### 开发工具
- **TypeScript** - 类型安全
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Husky** - Git钩子管理

### 部署和监控
- **Vercel** - 前端部署平台
- **Google Analytics** - 网站分析
- **Sentry** - 错误监控

## 项目结构

```
labubu-portal/
├── public/                 # 静态资源
│   ├── robots.txt         # 搜索引擎爬虫规则
│   ├── manifest.json      # PWA配置文件
│   └── favicon.ico        # 网站图标
├── src/
│   ├── assets/            # 资源文件
│   │   └── styles/        # 样式文件
│   ├── components/        # 组件
│   │   ├── common/        # 公共组件
│   │   ├── content/       # 内容组件
│   │   └── ui/           # UI组件
│   ├── pages/            # 页面组件
│   │   ├── News/         # 资讯页面
│   │   ├── Collection/   # 收藏品页面
│   │   ├── Community/    # 社区页面
│   │   └── Guide/        # 指南页面
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具函数
│   ├── router/           # 路由配置
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── package.json          # 项目配置
├── vite.config.js        # Vite配置
├── tailwind.config.js    # Tailwind配置
└── README.md            # 项目说明
```

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发环境
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 环境变量

创建 `.env` 文件并配置以下变量：

```env
# API配置
VITE_API_BASE_URL=https://api.labubu.news/api

# Google Analytics
VITE_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID

# Sentry配置
VITE_SENTRY_DSN=your_sentry_dsn

# 其他配置
VITE_APP_NAME=Labubu Portal
VITE_APP_VERSION=1.0.0
```

## SEO优化

### 技术SEO
- ✅ 语义化HTML标签
- ✅ 结构化数据（JSON-LD）
- ✅ Open Graph标签
- ✅ Twitter Card标签
- ✅ 响应式设计
- ✅ 页面加载性能优化
- ✅ 图片懒加载
- ✅ 代码分割

### 内容SEO
- ✅ 优化的页面标题和描述
- ✅ 关键词策略
- ✅ 内部链接建设
- ✅ 面包屑导航
- ✅ 站点地图
- ✅ Robots.txt配置

## 性能优化

### 前端优化
- **代码分割**: 路由级别和组件级别的代码分割
- **图片优化**: WebP格式支持，响应式图片
- **缓存策略**: 静态资源长期缓存，API响应短期缓存
- **懒加载**: 图片和组件懒加载
- **预加载**: 关键资源预加载

### 构建优化
- **Tree Shaking**: 移除未使用的代码
- **压缩**: JavaScript、CSS和HTML压缩
- **Bundle分析**: 包大小分析和优化
- **CDN**: 静态资源CDN加速

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 贡献指南

我们欢迎社区贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解如何参与项目开发。

### 开发流程
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范
- 使用 ESLint 和 Prettier 保持代码风格一致
- 编写有意义的提交信息
- 为新功能添加测试
- 更新相关文档

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- **官网**: [https://labubu.news](https://labubu.news)
- **邮箱**: contact@labubu.news
- **GitHub**: [https://github.com/labubu-portal/website](https://github.com/labubu-portal/website)
- **Discord**: [https://discord.gg/labubu](https://discord.gg/labubu)

## 致谢

感谢所有为项目做出贡献的开发者和社区成员！

特别感谢：
- [Vue.js](https://vuejs.org/) 团队提供优秀的框架
- [Tailwind CSS](https://tailwindcss.com/) 团队提供强大的CSS框架
- [Vite](https://vitejs.dev/) 团队提供快速的构建工具
- 所有Labubu爱好者的支持和反馈

---

**Labubu Portal** - 探索Labubu的精彩世界 🎨✨