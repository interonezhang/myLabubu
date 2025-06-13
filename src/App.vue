<template>
  <div id="app" class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <Header />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <!-- 页面底部 -->
    <Footer />
    
    <!-- 回到顶部按钮 -->
    <BackToTop />
    
    <!-- 全局加载指示器 -->
    <GlobalLoading v-if="isLoading" />
    
    <!-- 全局通知 -->
    <GlobalNotification />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
import BackToTop from './components/ui/BackToTop.vue'
import GlobalLoading from './components/ui/GlobalLoading.vue'
import GlobalNotification from './components/ui/GlobalNotification.vue'
import { useUIStore } from './stores/ui'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    BackToTop,
    GlobalLoading,
    GlobalNotification
  },
  setup() {
    const router = useRouter()
    const uiStore = useUIStore()
    const isLoading = ref(false)

    // 路由加载状态管理
    const handleRouteStart = () => {
      isLoading.value = true
    }

    const handleRouteEnd = () => {
      isLoading.value = false
    }

    // 页面标题和元数据更新
    const updatePageMeta = (to) => {
      // 更新页面标题
      if (to.meta.title) {
        document.title = `${to.meta.title} | Labubu Portal`
      } else {
        document.title = 'Labubu Portal - 最新资讯、收藏指南和社区讨论'
      }

      // 更新meta描述
      if (to.meta.description) {
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', to.meta.description)
        }
      }

      // 更新关键词
      if (to.meta.keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]')
        if (metaKeywords) {
          metaKeywords.setAttribute('content', to.meta.keywords.join(','))
        }
      }

      // 更新canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://labubu.news${to.path}`)
      }
    }

    // 监听路由变化
    router.beforeEach((to, from, next) => {
      handleRouteStart()
      updatePageMeta(to)
      next()
    })

    router.afterEach(() => {
      handleRouteEnd()
      // 滚动到顶部
      window.scrollTo(0, 0)
    })

    // 生命周期
    onMounted(() => {
      // 初始化Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        })
      }

      // 初始化性能监控
      if ('performance' in window) {
        window.addEventListener('load', () => {
          const perfData = performance.getEntriesByType('navigation')[0]
          console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart)
        })
      }

      // 初始化错误监控
      window.addEventListener('error', (event) => {
        console.error('Global Error:', event.error)
        // 发送到错误监控服务
      })

      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason)
        // 发送到错误监控服务
      })
    })

    return {
      isLoading
    }
  }
}
</script>

<style scoped>
/* 页面切换动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 应用容器样式 */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 确保主内容区域占据剩余空间 */
main {
  flex: 1;
}
</style>