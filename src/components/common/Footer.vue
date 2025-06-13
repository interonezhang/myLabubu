<template>
  <footer class="bg-neutral-900 text-neutral-300">
    <!-- 主要内容区域 -->
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h3 class="text-xl font-display font-bold text-white">Labubu Portal</h3>
              <p class="text-sm text-neutral-400">最新资讯 · 收藏指南</p>
            </div>
          </div>
          <p class="text-neutral-400 mb-6 leading-relaxed">
            您获取最新Labubu资讯、收藏指南和社区讨论的终极目的地。与全球Labubu爱好者一起探索艺术玩具的精彩世界。
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">快速链接</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link
                :to="link.path"
                class="text-neutral-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
              >
                <span class="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 内容分类 -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">内容分类</h4>
          <ul class="space-y-3">
            <li v-for="category in contentCategories" :key="category.name">
              <router-link
                :to="category.path"
                class="text-neutral-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
              >
                <span class="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 联系信息和订阅 -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-6">保持联系</h4>
          <div class="space-y-4 mb-6">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-neutral-400">contact@labubu.news</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-neutral-400">全球服务</span>
            </div>
          </div>

          <!-- 邮件订阅 -->
          <div class="bg-neutral-800 rounded-lg p-4">
            <h5 class="text-white font-medium mb-3">订阅最新资讯</h5>
            <form @submit.prevent="handleSubscribe" class="space-y-3">
              <input
                v-model="subscribeEmail"
                type="email"
                placeholder="输入您的邮箱"
                class="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                :disabled="isSubscribing"
                class="w-full btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubscribing">订阅</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  订阅中...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="border-t border-neutral-800">
      <div class="container-custom py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p class="text-neutral-400 text-sm">
              © {{ currentYear }} Labubu Portal. 保留所有权利。
            </p>
            <div class="flex items-center space-x-4 text-sm">
              <router-link to="/privacy" class="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                隐私政策
              </router-link>
              <span class="text-neutral-600">|</span>
              <router-link to="/terms" class="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                使用条款
              </router-link>
              <span class="text-neutral-600">|</span>
              <router-link to="/sitemap" class="text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                网站地图
              </router-link>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-neutral-400">
            <span>Made with ❤️ for Labubu lovers</span>
            <div class="flex items-center space-x-2">
              <span>Powered by</span>
              <span class="text-primary-400 font-medium">Vue.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 group"
      aria-label="回到顶部"
    >
      <svg class="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </footer>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUIStore } from '../../stores/ui'

export default {
  name: 'Footer',
  setup() {
    const uiStore = useUIStore()
    const subscribeEmail = ref('')
    const isSubscribing = ref(false)
    const showBackToTop = ref(false)

    // 当前年份
    const currentYear = new Date().getFullYear()

    // 社交媒体链接
    const socialLinks = [
      {
        name: 'Instagram',
        url: 'https://instagram.com/labubu_portal',
        icon: 'IconInstagram'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/labubu_portal',
        icon: 'IconTwitter'
      },
      {
        name: 'Reddit',
        url: 'https://reddit.com/r/labubu',
        icon: 'IconReddit'
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/labubu',
        icon: 'IconDiscord'
      }
    ]

    // 快速链接
    const quickLinks = [
      { name: '首页', path: '/' },
      { name: '最新资讯', path: '/news' },
      { name: '收藏品展示', path: '/collection' },
      { name: '社区讨论', path: '/community' },
      { name: '购买指南', path: '/guide' },
      { name: '关于我们', path: '/about' }
    ]

    // 内容分类
    const contentCategories = [
      { name: '官方资讯', path: '/news/category/official' },
      { name: '新品发布', path: '/news/category/releases' },
      { name: '收藏技巧', path: '/collection/guide' },
      { name: '真伪鉴别', path: '/guide/authenticity' },
      { name: '价格趋势', path: '/news/category/market' },
      { name: '社区分享', path: '/community/showcase' }
    ]

    // 处理邮件订阅
    const handleSubscribe = async () => {
      if (!subscribeEmail.value) return

      try {
        isSubscribing.value = true
        
        // 这里应该调用API进行邮件订阅
        // await api.post('/newsletter/subscribe', { email: subscribeEmail.value })
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        uiStore.showSuccess('订阅成功！感谢您的关注。')
        subscribeEmail.value = ''
      } catch (error) {
        uiStore.showError('订阅失败，请稍后再试。')
      } finally {
        isSubscribing.value = false
      }
    }

    // 滚动到顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // 监听滚动事件
    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 300
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      currentYear,
      socialLinks,
      quickLinks,
      contentCategories,
      subscribeEmail,
      isSubscribing,
      showBackToTop,
      handleSubscribe,
      scrollToTop
    }
  }
}
</script>

<style scoped>
/* 社交媒体图标组件 */
.IconInstagram {
  /* Instagram图标SVG */
}

.IconTwitter {
  /* Twitter图标SVG */
}

.IconReddit {
  /* Reddit图标SVG */
}

.IconDiscord {
  /* Discord图标SVG */
}

/* 确保footer在移动端正确显示 */
@media (max-width: 768px) {
  .container-custom {
    @apply px-4;
  }
}

/* 回到顶部按钮动画 */
@keyframes bounce-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.group:hover {
  animation: bounce-gentle 0.6s ease-in-out;
}
</style>