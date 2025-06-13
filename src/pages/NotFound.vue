<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <!-- 404图标 -->
      <div class="mb-8">
        <div class="relative inline-block">
          <div class="text-8xl md:text-9xl font-bold text-primary-200 select-none">404</div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center animate-bounce-gentle">
              <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4">
          页面未找到
        </h1>
        <p class="text-lg text-neutral-600 mb-2">
          抱歉，您访问的页面不存在或已被移动
        </p>
        <p class="text-neutral-500">
          请检查URL是否正确，或返回首页继续浏览
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          @click="goBack"
          class="btn-outline flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回上页
        </button>
        <router-link to="/" class="btn-primary">
          回到首页
        </router-link>
      </div>

      <!-- 快速链接 -->
      <div class="border-t border-neutral-200 pt-8">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">您可能在寻找</h2>
        <div class="grid grid-cols-2 gap-4">
          <router-link
            v-for="link in quickLinks"
            :key="link.name"
            :to="link.path"
            class="p-4 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                <component :is="link.icon" class="w-5 h-5 text-primary-600" />
              </div>
              <div class="text-left">
                <div class="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                  {{ link.name }}
                </div>
                <div class="text-sm text-neutral-500">{{ link.description }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 搜索建议 -->
      <div class="mt-8 p-6 bg-white rounded-xl border border-neutral-200">
        <h3 class="font-semibold text-neutral-900 mb-3">尝试搜索</h3>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索Labubu资讯、收藏品..."
            class="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            @keydown.enter="handleSearch"
          />
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            @click="searchQuery = suggestion; handleSearch()"
            class="px-3 py-1 bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-700 rounded-full text-sm transition-colors duration-200"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <!-- 联系支持 -->
      <div class="mt-8 text-center">
        <p class="text-neutral-500 mb-4">
          如果问题持续存在，请联系我们的支持团队
        </p>
        <a
          href="mailto:support@labubu.news"
          class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          support@labubu.news
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')

    // 快速链接
    const quickLinks = [
      {
        name: '最新资讯',
        path: '/news',
        description: '浏览最新动态',
        icon: 'IconNews'
      },
      {
        name: '收藏品',
        path: '/collection',
        description: '查看收藏品',
        icon: 'IconCollection'
      },
      {
        name: '社区',
        path: '/community',
        description: '加入讨论',
        icon: 'IconCommunity'
      },
      {
        name: '购买指南',
        path: '/guide',
        description: '新手指南',
        icon: 'IconGuide'
      }
    ]

    // 搜索建议
    const searchSuggestions = [
      'Labubu新品',
      '收藏指南',
      '真伪鉴别',
      '价格趋势',
      '社区分享'
    ]

    // 返回上一页
    const goBack = () => {
      if (window.history.length > 1) {
        router.go(-1)
      } else {
        router.push('/')
      }
    }

    // 处理搜索
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
      }
    }

    return {
      searchQuery,
      quickLinks,
      searchSuggestions,
      goBack,
      handleSearch
    }
  },
  head() {
    return {
      title: '页面未找到 - 404',
      meta: [
        {
          name: 'description',
          content: '抱歉，您访问的页面不存在。请返回首页或使用搜索功能查找您需要的内容。'
        },
        {
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 弹跳动画 */
@keyframes bounce-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s ease-in-out infinite;
}

/* 图标组件占位符 */
.IconNews,
.IconCollection,
.IconCommunity,
.IconGuide {
  /* 这里应该是实际的图标组件 */
}

/* 响应式调整 */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>