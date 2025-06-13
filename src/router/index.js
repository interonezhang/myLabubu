import { createRouter, createWebHistory } from 'vue-router'

// 页面组件懒加载
const Home = () => import('../pages/Home.vue')
const NewsIndex = () => import('../pages/News/NewsIndex.vue')
const NewsDetail = () => import('../pages/News/NewsDetail.vue')
const CollectionIndex = () => import('../pages/Collection/CollectionIndex.vue')
const CollectionGuide = () => import('../pages/Collection/CollectionGuide.vue')
const RareFigures = () => import('../pages/Collection/RareFigures.vue')
const CommunityIndex = () => import('../pages/Community/CommunityIndex.vue')
const Discussions = () => import('../pages/Community/Discussions.vue')
const Showcase = () => import('../pages/Community/Showcase.vue')
const Events = () => import('../pages/Community/Events.vue')
const GuideIndex = () => import('../pages/Guide/GuideIndex.vue')
const AuthenticVsFake = () => import('../pages/Guide/AuthenticVsFake.vue')
const WhereToBuy = () => import('../pages/Guide/WhereToBuy.vue')
const About = () => import('../pages/About.vue')
const NotFound = () => import('../pages/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      description: 'Labubu Portal首页 - 获取最新Labubu资讯、收藏指南和社区讨论',
      keywords: ['Labubu', '首页', '最新资讯', '收藏指南', '社区'],
      priority: 1.0
    }
  },
  {
    path: '/news',
    name: 'News',
    component: NewsIndex,
    meta: {
      title: '最新资讯',
      description: '获取最新的Labubu资讯、发布信息和行业动态',
      keywords: ['Labubu资讯', '最新消息', '发布信息', '行业动态'],
      priority: 0.9
    }
  },
  {
    path: '/news/:slug',
    name: 'NewsDetail',
    component: NewsDetail,
    meta: {
      title: '资讯详情',
      description: '阅读详细的Labubu资讯内容',
      keywords: ['Labubu', '资讯详情', '新闻内容'],
      priority: 0.7
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: CollectionIndex,
    meta: {
      title: '收藏品展示',
      description: '浏览精美的Labubu收藏品图片和详细信息',
      keywords: ['Labubu收藏品', '艺术玩具', '收藏展示'],
      priority: 0.9
    }
  },
  {
    path: '/collection/guide',
    name: 'CollectionGuide',
    component: CollectionGuide,
    meta: {
      title: '收藏指南',
      description: '学习如何收藏Labubu，包括鉴别真伪、保养技巧等',
      keywords: ['Labubu收藏', '收藏指南', '鉴别真伪', '保养技巧'],
      priority: 0.8
    }
  },
  {
    path: '/collection/rare',
    name: 'RareFigures',
    component: RareFigures,
    meta: {
      title: '稀有收藏品',
      description: '探索稀有的Labubu收藏品，了解其价值和收藏意义',
      keywords: ['Labubu稀有品', '限量版', '收藏价值'],
      priority: 0.7
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityIndex,
    meta: {
      title: '社区',
      description: 'Labubu爱好者社区 - 分享收藏、交流心得',
      keywords: ['Labubu社区', '收藏交流', '爱好者'],
      priority: 0.8
    }
  },
  {
    path: '/community/discussions',
    name: 'Discussions',
    component: Discussions,
    meta: {
      title: '社区讨论',
      description: '参与Labubu社区讨论，分享收藏心得和经验',
      keywords: ['Labubu讨论', '社区交流', '收藏心得'],
      priority: 0.7
    }
  },
  {
    path: '/community/showcase',
    name: 'Showcase',
    component: Showcase,
    meta: {
      title: '收藏展示',
      description: '展示您的Labubu收藏品，与其他收藏家分享',
      keywords: ['Labubu展示', '收藏分享', '收藏家'],
      priority: 0.7
    }
  },
  {
    path: '/community/events',
    name: 'Events',
    component: Events,
    meta: {
      title: '社区活动',
      description: '参与Labubu社区活动，与其他爱好者线上线下交流',
      keywords: ['Labubu活动', '社区聚会', '线下活动'],
      priority: 0.7
    }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuideIndex,
    meta: {
      title: '购买指南',
      description: 'Labubu购买指南 - 新手入门、购买渠道、价格参考',
      keywords: ['Labubu购买', '购买指南', '新手入门', '价格参考'],
      priority: 0.8
    }
  },
  {
    path: '/guide/authentic-vs-fake',
    name: 'AuthenticVsFake',
    component: AuthenticVsFake,
    meta: {
      title: '真假辨别指南',
      description: '学习如何鉴别Labubu的真伪，掌握专业的辨别技巧',
      keywords: ['Labubu真伪鉴别', '防伪指南', '正品识别'],
      priority: 0.7
    }
  },
  {
    path: '/guide/where-to-buy',
    name: 'WhereToBuy',
    component: WhereToBuy,
    meta: {
      title: '购买渠道指南',
      description: '发现最可靠的Labubu购买渠道，确保正品，享受优质服务',
      keywords: ['Labubu购买渠道', '官方商城', '授权经销商'],
      priority: 0.7
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们',
      description: '了解Labubu Portal - 您的Labubu资讯和收藏指南平台',
      keywords: ['关于我们', 'Labubu Portal', '平台介绍'],
      priority: 0.6
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到',
      description: '抱歉，您访问的页面不存在',
      keywords: ['404', '页面未找到'],
      priority: 0.1
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退）
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 默认滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 页面访问统计
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: to.meta.title,
      page_location: window.location.origin + to.fullPath
    })
  }

  // 设置页面加载状态
  const loadingElement = document.querySelector('.page-loading')
  if (loadingElement) {
    loadingElement.style.display = 'block'
  }

  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 隐藏页面加载状态
  const loadingElement = document.querySelector('.page-loading')
  if (loadingElement) {
    loadingElement.style.display = 'none'
  }

  // 更新页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} | Labubu Portal`
  }

  // 发送页面浏览事件到Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: to.meta.title,
      page_location: window.location.href,
      page_path: to.path
    })
  }
})

export default router