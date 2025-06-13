<template>
  <!-- 模态框遮罩 -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 px-4"
    @click="handleBackdropClick"
  >
    <!-- 搜索框容器 -->
    <div
      ref="modalRef"
      class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-96 overflow-hidden animate-slide-up"
      @click.stop
    >
      <!-- 搜索输入区域 -->
      <div class="p-6 border-b border-neutral-200">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="搜索Labubu资讯、收藏品、指南..."
            class="w-full pl-12 pr-12 py-4 text-lg border-0 focus:outline-none focus:ring-0 bg-neutral-50 rounded-lg"
            @input="handleSearch"
            @keydown.escape="$emit('close')"
            @keydown.enter="handleEnterKey"
            @keydown.up="navigateResults(-1)"
            @keydown.down="navigateResults(1)"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 搜索结果区域 -->
      <div class="max-h-80 overflow-y-auto scrollbar-thin">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="p-6 text-center">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">搜索中...</p>
        </div>

        <!-- 搜索建议 -->
        <div v-else-if="!searchQuery && suggestions.length > 0" class="p-6">
          <h3 class="text-sm font-medium text-neutral-500 mb-4">热门搜索</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="selectSuggestion(suggestion)"
              class="px-3 py-1 bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-700 rounded-full text-sm transition-colors duration-200"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- 搜索结果 -->
        <div v-else-if="searchQuery && searchResults.length > 0" class="py-2">
          <div
            v-for="(result, index) in searchResults"
            :key="result.id"
            :class="[
              'px-6 py-4 hover:bg-neutral-50 cursor-pointer transition-colors duration-200 border-l-4 border-transparent',
              { 'bg-primary-50 border-primary-500': index === selectedIndex }
            ]"
            @click="selectResult(result)"
            @mouseenter="selectedIndex = index"
          >
            <div class="flex items-start space-x-4">
              <!-- 结果图标 -->
              <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg v-if="result.type === 'article'" class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else-if="result.type === 'collection'" class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <svg v-else class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <!-- 结果内容 -->
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-neutral-900 truncate">
                  {{ result.title }}
                </h4>
                <p class="text-sm text-neutral-500 mt-1 line-clamp-2">
                  {{ result.description }}
                </p>
                <div class="flex items-center mt-2 space-x-4 text-xs text-neutral-400">
                  <span class="capitalize">{{ getTypeLabel(result.type) }}</span>
                  <span v-if="result.category">{{ result.category }}</span>
                  <span v-if="result.publishedAt">{{ formatDate(result.publishedAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else-if="searchQuery && !isLoading" class="p-6 text-center">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-neutral-500 mb-2">未找到相关内容</p>
          <p class="text-sm text-neutral-400">尝试使用不同的关键词或浏览我们的分类</p>
        </div>

        <!-- 快捷操作提示 -->
        <div v-if="searchResults.length > 0" class="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
          <div class="flex items-center justify-between text-xs text-neutral-500">
            <div class="flex items-center space-x-4">
              <span class="flex items-center">
                <kbd class="px-2 py-1 bg-white border border-neutral-300 rounded text-xs">↑↓</kbd>
                <span class="ml-2">导航</span>
              </span>
              <span class="flex items-center">
                <kbd class="px-2 py-1 bg-white border border-neutral-300 rounded text-xs">Enter</kbd>
                <span class="ml-2">选择</span>
              </span>
              <span class="flex items-center">
                <kbd class="px-2 py-1 bg-white border border-neutral-300 rounded text-xs">Esc</kbd>
                <span class="ml-2">关闭</span>
              </span>
            </div>
            <span>{{ searchResults.length }} 个结果</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'
import { debounce } from '../../utils/helpers'

export default {
  name: 'SearchModal',
  emits: ['close'],
  setup(props, { emit }) {
    const router = useRouter()
    const contentStore = useContentStore()
    
    const modalRef = ref(null)
    const searchInputRef = ref(null)
    const searchQuery = ref('')
    const searchResults = ref([])
    const suggestions = ref(['Labubu新品', '收藏指南', '真伪鉴别', '价格趋势', '社区分享'])
    const isLoading = ref(false)
    const selectedIndex = ref(-1)

    // 搜索处理函数（防抖）
    const handleSearch = debounce(async (event) => {
      const query = event.target.value.trim()
      
      if (!query) {
        searchResults.value = []
        selectedIndex.value = -1
        return
      }

      try {
        isLoading.value = true
        const response = await contentStore.searchContent(query, { limit: 10 })
        searchResults.value = response.data || []
        selectedIndex.value = -1
      } catch (error) {
        console.error('Search error:', error)
        searchResults.value = []
      } finally {
        isLoading.value = false
      }
    }, 300)

    // 清除搜索
    const clearSearch = () => {
      searchQuery.value = ''
      searchResults.value = []
      selectedIndex.value = -1
      searchInputRef.value?.focus()
    }

    // 选择搜索建议
    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion
      handleSearch({ target: { value: suggestion } })
    }

    // 选择搜索结果
    const selectResult = (result) => {
      const path = getResultPath(result)
      router.push(path)
      emit('close')
    }

    // 获取结果路径
    const getResultPath = (result) => {
      switch (result.type) {
        case 'article':
          return `/news/${result.slug}`
        case 'collection':
          return `/collection/${result.slug}`
        case 'guide':
          return `/guide/${result.slug}`
        default:
          return '/'
      }
    }

    // 键盘导航
    const navigateResults = (direction) => {
      if (searchResults.value.length === 0) return

      const newIndex = selectedIndex.value + direction
      
      if (newIndex >= 0 && newIndex < searchResults.value.length) {
        selectedIndex.value = newIndex
      } else if (newIndex < 0) {
        selectedIndex.value = searchResults.value.length - 1
      } else {
        selectedIndex.value = 0
      }
    }

    // 处理回车键
    const handleEnterKey = () => {
      if (selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
        selectResult(searchResults.value[selectedIndex.value])
      } else if (searchQuery.value.trim()) {
        // 跳转到搜索结果页面
        router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
        emit('close')
      }
    }

    // 处理背景点击
    const handleBackdropClick = (event) => {
      if (event.target === event.currentTarget) {
        emit('close')
      }
    }

    // 处理ESC键
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        emit('close')
      }
    }

    // 获取类型标签
    const getTypeLabel = (type) => {
      const labels = {
        article: '资讯',
        collection: '收藏品',
        guide: '指南',
        community: '社区'
      }
      return labels[type] || type
    }

    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return '昨天'
      if (diffDays < 7) return `${diffDays}天前`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)}周前`
      return date.toLocaleDateString('zh-CN')
    }

    // 生命周期
    onMounted(async () => {
      await nextTick()
      searchInputRef.value?.focus()
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = ''
    })

    return {
      modalRef,
      searchInputRef,
      searchQuery,
      searchResults,
      suggestions,
      isLoading,
      selectedIndex,
      handleSearch,
      clearSearch,
      selectSuggestion,
      selectResult,
      navigateResults,
      handleEnterKey,
      handleBackdropClick,
      getTypeLabel,
      formatDate
    }
  }
}
</script>

<style scoped>
/* 行截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 键盘快捷键样式 */
kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

/* 滚动条样式 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>