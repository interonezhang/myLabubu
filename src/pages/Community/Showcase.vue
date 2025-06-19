<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-pink-50 via-white to-rose-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/showcase-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            收藏
            <span class="text-gradient-showcase">展示</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            展示您的珍贵收藏，与其他收藏家分享收藏心得和展示技巧
          </p>
          
          <!-- 快速操作 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button @click="showUploadModal = true" class="btn-primary">
              分享我的收藏
            </button>
            <router-link to="/collection/guide" class="btn-outline">
              收藏指南
            </router-link>
          </div>

          <!-- 展示统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-pink-600">{{ showcaseStats.total }}</div>
              <div class="text-sm text-neutral-500 mt-1">展示作品</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-pink-600">{{ showcaseStats.collectors }}</div>
              <div class="text-sm text-neutral-500 mt-1">收藏家</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-pink-600">{{ showcaseStats.items }}</div>
              <div class="text-sm text-neutral-500 mt-1">收藏品</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-pink-600">{{ showcaseStats.likes }}</div>
              <div class="text-sm text-neutral-500 mt-1">获赞数</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 筛选和排序 -->
    <section class="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div class="container-custom py-6">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- 搜索框 -->
          <div class="relative flex-1 max-w-md">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索收藏展示..."
              class="search-input pl-10"
              @input="handleSearch"
            />
          </div>

          <!-- 筛选选项 -->
          <div class="flex flex-wrap gap-3">
            <select
              v-model="selectedCategory"
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="">所有分类</option>
              <option value="complete">完整系列</option>
              <option value="rare">稀有收藏</option>
              <option value="theme">主题展示</option>
              <option value="diy">DIY创作</option>
            </select>

            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="filter-select"
            >
              <option value="newest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="most_liked">最多点赞</option>
              <option value="most_viewed">最多浏览</option>
            </select>

            <!-- 视图切换 -->
            <div class="flex items-center space-x-2">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                @click="viewMode = 'masonry'"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'masonry' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5m14 14H5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选展示 -->
    <section v-if="featuredShowcases.length > 0" class="bg-white py-12">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            精选展示
          </h2>
          <button
            @click="refreshFeatured"
            class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center group"
          >
            <svg class="w-4 h-4 mr-1 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            换一批
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShowcaseCard
            v-for="showcase in featuredShowcases"
            :key="showcase.id"
            :showcase="showcase"
            :featured="true"
          />
        </div>
      </div>
    </section>

    <!-- 展示列表 -->
    <section class="py-12">
      <div class="container-custom">
        <!-- 结果统计 -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-neutral-600">
            共找到 <span class="font-semibold text-neutral-900">{{ totalShowcases }}</span> 个展示
          </p>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">加载中...</p>
        </div>

        <!-- 展示网格 -->
        <div v-else-if="showcases.length > 0">
          <!-- 网格视图 -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            <ShowcaseCard
              v-for="showcase in showcases"
              :key="showcase.id"
              :showcase="showcase"
            />
          </div>

          <!-- 瀑布流视图 -->
          <div
            v-else
            class="masonry-grid mb-12"
          >
            <ShowcaseCard
              v-for="showcase in showcases"
              :key="showcase.id"
              :showcase="showcase"
              :masonry="true"
            />
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无展示</h3>
          <p class="text-neutral-500">{{ getEmptyMessage() }}</p>
        </div>

        <!-- 分页 -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalShowcases"
          @page-change="handlePageChange"
        />
      </div>
    </section>

    <!-- 上传展示模态框 -->
    <UploadShowcaseModal
      v-if="showUploadModal"
      @close="showUploadModal = false"
      @uploaded="handleShowcaseUploaded"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import { debounce } from '../../utils/helpers'
import ShowcaseCard from '../../components/content/ShowcaseCard.vue'
import Pagination from '../../components/ui/Pagination.vue'

export default {
  name: 'Showcase',
  components: {
    ShowcaseCard,
    UploadShowcaseModal,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const uiStore = useUIStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('newest')
    const viewMode = ref('grid')
    const currentPage = ref(1)
    const isLoading = ref(false)
    const showUploadModal = ref(false)

    // 展示数据
    const showcases = ref([])
    const featuredShowcases = ref([])
    const totalShowcases = ref(0)
    const totalPages = ref(0)

    // 统计数据
    const showcaseStats = ref({
      total: '2.3K',
      collectors: '856',
      items: '12.5K',
      likes: '45.6K'
    })

    // 获取空状态消息
    const getEmptyMessage = () => {
      if (searchQuery.value) {
        return `没有找到包含"${searchQuery.value}"的展示`
      }
      if (selectedCategory.value) {
        return '当前分类下暂无展示'
      }
      return '暂时没有展示'
    }

    // 加载展示数据
    const loadShowcases = async (resetPage = false) => {
      try {
        isLoading.value = true
        
        if (resetPage) {
          currentPage.value = 1
        }

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))

        // 模拟数据
        const mockShowcases = [
          {
            id: 1,
            title: '我的完整Labubu系列收藏',
            description: '历时两年收集的完整系列，包含所有常规款和限定款，每一个都有特殊的意义。',
            category: 'complete',
            coverImage: '/showcase1.jpg',
            images: ['/showcase1-1.jpg', '/showcase1-2.jpg', '/showcase1-3.jpg'],
            itemCount: 45,
            author: {
              id: 1,
              name: '收藏大师',
              avatar: '/avatar1.jpg',
              level: '资深收藏家',
              verified: true
            },
            createdAt: '2024-01-15T10:30:00Z',
            likes: 234,
            views: 1256,
            comments: 45,
            tags: ['完整系列', '限定款', '收藏心得']
          },
          {
            id: 2,
            title: 'Labubu主题房间布置',
            description: '把整个房间都布置成Labubu主题，每个角落都有惊喜，营造出梦幻的收藏空间。',
            category: 'theme',
            coverImage: '/showcase2.jpg',
            images: ['/showcase2-1.jpg', '/showcase2-2.jpg'],
            itemCount: 78,
            author: {
              id: 2,
              name: '主题达人',
              avatar: '/avatar2.jpg',
              level: '专家收藏家',
              verified: false
            },
            createdAt: '2024-01-14T15:20:00Z',
            likes: 189,
            views: 892,
            comments: 32,
            tags: ['主题布置', '房间装饰', '创意展示']
          }
        ]

        showcases.value = mockShowcases
        totalShowcases.value = mockShowcases.length
        totalPages.value = Math.ceil(totalShowcases.value / 12)
        
        // 更新URL参数
        updateUrlParams()
        
      } catch (error) {
        console.error('加载展示失败:', error)
        uiStore.showError('加载展示失败')
      } finally {
        isLoading.value = false
      }
    }

    // 加载精选展示
    const loadFeaturedShowcases = async () => {
      try {
        // 模拟精选展示数据
        featuredShowcases.value = [
          {
            id: 101,
            title: '稀有限定款收藏展示',
            description: '展示我收藏的各种稀有限定款Labubu，每一个都有独特的故事和收藏价值。',
            category: 'rare',
            coverImage: '/featured1.jpg',
            images: ['/featured1-1.jpg', '/featured1-2.jpg', '/featured1-3.jpg', '/featured1-4.jpg'],
            itemCount: 23,
            author: {
              id: 3,
              name: '稀有猎手',
              avatar: '/avatar3.jpg',
              level: '传奇收藏家',
              verified: true
            },
            createdAt: '2024-01-13T09:15:00Z',
            likes: 345,
            views: 1567,
            comments: 67,
            tags: ['稀有收藏', '限定款', '投资价值']
          },
          {
            id: 102,
            title: 'DIY改造Labubu创意展示',
            description: '用创意和巧思改造普通的Labubu，打造独一无二的个性收藏品。',
            category: 'diy',
            coverImage: '/featured2.jpg',
            images: ['/featured2-1.jpg', '/featured2-2.jpg'],
            itemCount: 12,
            author: {
              id: 4,
              name: 'DIY达人',
              avatar: '/avatar4.jpg',
              level: '创意收藏家',
              verified: false
            },
            createdAt: '2024-01-12T14:45:00Z',
            likes: 278,
            views: 934,
            comments: 89,
            tags: ['DIY改造', '创意设计', '个性定制']
          }
        ]
      } catch (error) {
        console.error('加载精选展示失败:', error)
      }
    }

    // 处理搜索（防抖）
    const handleSearch = debounce(() => {
      loadShowcases(true)
    }, 500)

    // 处理筛选变化
    const handleFilterChange = () => {
      loadShowcases(true)
    }

    // 处理排序变化
    const handleSortChange = () => {
      loadShowcases(true)
    }

    // 处理分页变化
    const handlePageChange = (page) => {
      currentPage.value = page
      loadShowcases()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 刷新精选
    const refreshFeatured = () => {
      loadFeaturedShowcases()
    }

    // 处理展示上传完成
    const handleShowcaseUploaded = (newShowcase) => {
      showcases.value.unshift(newShowcase)
      totalShowcases.value++
      uiStore.showSuccess('展示发布成功！')
    }

    // 更新URL参数
    const updateUrlParams = () => {
      const query = {}
      
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedCategory.value) query.category = selectedCategory.value
      if (sortBy.value !== 'newest') query.sort = sortBy.value
      if (viewMode.value !== 'grid') query.view = viewMode.value
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    }

    // 从URL参数初始化状态
    const initializeFromUrl = () => {
      const query = route.query
      
      if (query.search) searchQuery.value = query.search
      if (query.category) selectedCategory.value = query.category
      if (query.sort) sortBy.value = query.sort
      if (query.view) viewMode.value = query.view
      if (query.page) currentPage.value = parseInt(query.page) || 1
    }

    // 监听路由变化
    watch(() => route.query, () => {
      initializeFromUrl()
      loadShowcases()
    })

    // 生命周期
    onMounted(async () => {
      initializeFromUrl()
      
      // 并行加载数据
      await Promise.all([
        loadFeaturedShowcases(),
        loadShowcases()
      ])
    })

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      viewMode,
      currentPage,
      isLoading,
      showUploadModal,
      showcases,
      featuredShowcases,
      totalShowcases,
      totalPages,
      showcaseStats,
      getEmptyMessage,
      handleSearch,
      handleFilterChange,
      handleSortChange,
      handlePageChange,
      refreshFeatured,
      handleShowcaseUploaded
    }
  },
  head() {
    return {
      title: '收藏展示',
      meta: [
        {
          name: 'description',
          content: '展示您的Labubu收藏品，与其他收藏家分享收藏心得和展示技巧。'
        },
        {
          name: 'keywords',
          content: 'Labubu展示,收藏分享,收藏家,展示技巧,收藏心得'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 展示渐变文字效果 */
.text-gradient-showcase {
  background: linear-gradient(135deg, theme('colors.pink.500'), theme('colors.rose.500'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 搜索输入框样式 */
.search-input {
  @apply w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm;
}

/* 筛选选择框样式 */
.filter-select {
  @apply px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm text-sm;
}

/* 加载动画 */
.loading-spinner {
  @apply animate-spin rounded-full border-4 border-neutral-200 border-t-primary-600;
}

/* 瀑布流布局 */
.masonry-grid {
  columns: 1;
  column-gap: 2rem;
}

@media (min-width: 768px) {
  .masonry-grid {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    columns: 3;
  }
}

.masonry-grid > * {
  break-inside: avoid;
  margin-bottom: 2rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>