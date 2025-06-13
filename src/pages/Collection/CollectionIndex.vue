<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/collection-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            Labubu收藏品
            <span class="text-gradient-primary">精品展示</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            探索精美的Labubu收藏品世界，了解每一款的独特魅力、收藏价值和投资潜力
          </p>
          
          <!-- 快速导航 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <router-link to="/collection/guide" class="btn-primary">
              收藏指南
            </router-link>
            <router-link to="/collection/rare-figures" class="btn-outline">
              稀有收藏品
            </router-link>
            <router-link to="/guide/authentic-vs-fake" class="btn-outline">
              真假辨别
            </router-link>
          </div>

          <!-- 统计数据 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-primary-600">500+</div>
              <div class="text-sm text-neutral-500 mt-1">收藏品</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-primary-600">50+</div>
              <div class="text-sm text-neutral-500 mt-1">系列</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-primary-600">100+</div>
              <div class="text-sm text-neutral-500 mt-1">稀有款</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-primary-600">10K+</div>
              <div class="text-sm text-neutral-500 mt-1">收藏家</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选 -->
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
              placeholder="搜索收藏品..."
              class="search-input pl-10"
              @input="handleSearch"
            />
          </div>

          <!-- 筛选选项 -->
          <div class="flex flex-wrap gap-3">
            <select
              v-model="selectedSeries"
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="">所有系列</option>
              <option
                v-for="series in seriesList"
                :key="series.id"
                :value="series.slug"
              >
                {{ series.name }}
              </option>
            </select>

            <select
              v-model="selectedRarity"
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="">所有稀有度</option>
              <option value="common">普通</option>
              <option value="uncommon">不常见</option>
              <option value="rare">稀有</option>
              <option value="epic">史诗</option>
              <option value="legendary">传说</option>
            </select>

            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="filter-select"
            >
              <option value="newest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="price_asc">价格从低到高</option>
              <option value="price_desc">价格从高到低</option>
              <option value="rarity">稀有度</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- 推荐收藏品 -->
    <section v-if="featuredCollections.length > 0" class="bg-white py-12">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            精选推荐
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CollectionCard
            v-for="collection in featuredCollections"
            :key="collection.id"
            :collection="collection"
            :featured="true"
          />
        </div>
      </div>
    </section>

    <!-- 收藏品网格 -->
    <section class="py-12">
      <div class="container-custom">
        <!-- 结果统计 -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-neutral-600">
            共找到 <span class="font-semibold text-neutral-900">{{ totalCollections }}</span> 个收藏品
          </p>
          
          <!-- 视图切换 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-neutral-500 mr-2">视图：</span>
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              ]"
              aria-label="网格视图"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              ]"
              aria-label="列表视图"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">加载中...</p>
        </div>

        <!-- 收藏品列表 -->
        <div v-else-if="collections.length > 0">
          <!-- 网格视图 -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
          >
            <CollectionCard
              v-for="collection in collections"
              :key="collection.id"
              :collection="collection"
            />
          </div>

          <!-- 列表视图 -->
          <div
            v-else
            class="space-y-6 mb-12"
          >
            <CollectionCard
              v-for="collection in collections"
              :key="collection.id"
              :collection="collection"
              :list-view="true"
            />
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无收藏品</h3>
          <p class="text-neutral-500">{{ getEmptyMessage() }}</p>
        </div>

        <!-- 分页 -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalCollections"
          @page-change="handlePageChange"
        />
      </div>
    </section>

    <!-- 收藏指南CTA -->
    <section class="bg-gradient-primary text-white py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          开始您的收藏之旅
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          从新手到专家，我们为您提供全面的收藏指南和专业建议
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/collection/guide" class="btn-secondary">
            完整收藏指南
          </router-link>
          <router-link to="/guide/where-to-buy" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            购买渠道指南
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'
import { debounce } from '../../utils/helpers'
import CollectionCard from '../../components/content/CollectionCard.vue'
import Pagination from '../../components/ui/Pagination.vue'

export default {
  name: 'CollectionIndex',
  components: {
    CollectionCard,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contentStore = useContentStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedSeries = ref('')
    const selectedRarity = ref('')
    const sortBy = ref('newest')
    const viewMode = ref('grid')
    const currentPage = ref(1)
    const isLoading = ref(false)

    // 计算属性
    const collections = computed(() => contentStore.collections)
    const featuredCollections = ref([])
    const seriesList = ref([])
    const totalCollections = computed(() => contentStore.pagination.total)
    const totalPages = computed(() => contentStore.pagination.totalPages)

    // 获取空状态消息
    const getEmptyMessage = () => {
      if (searchQuery.value) {
        return `没有找到包含"${searchQuery.value}"的收藏品`
      }
      if (selectedSeries.value || selectedRarity.value) {
        return '当前筛选条件下暂无收藏品'
      }
      return '暂时没有收藏品'
    }

    // 加载收藏品数据
    const loadCollections = async (resetPage = false) => {
      try {
        isLoading.value = true
        
        if (resetPage) {
          currentPage.value = 1
        }

        const params = {
          page: currentPage.value,
          limit: 16,
          sortBy: sortBy.value,
          order: 'desc'
        }

        if (searchQuery.value) {
          params.search = searchQuery.value
        }

        if (selectedSeries.value) {
          params.series = selectedSeries.value
        }

        if (selectedRarity.value) {
          params.rarity = selectedRarity.value
        }

        await contentStore.fetchCollections(params)
        
        // 更新URL参数
        updateUrlParams()
        
      } catch (error) {
        console.error('加载收藏品失败:', error)
      } finally {
        isLoading.value = false
      }
    }

    // 加载推荐收藏品
    const loadFeaturedCollections = async () => {
      try {
        const response = await contentStore.fetchCollections({ 
          featured: true, 
          limit: 8,
          random: true 
        })
        featuredCollections.value = response.data || []
      } catch (error) {
        console.error('加载推荐收藏品失败:', error)
      }
    }

    // 加载系列列表
    const loadSeriesList = async () => {
      try {
        // 这里应该有一个专门的API获取系列列表
        // 暂时使用模拟数据
        seriesList.value = [
          { id: 1, name: 'The Monsters', slug: 'the-monsters' },
          { id: 2, name: 'Zimomo', slug: 'zimomo' },
          { id: 3, name: 'Skull Panda', slug: 'skull-panda' },
          { id: 4, name: 'Hirono', slug: 'hirono' },
          { id: 5, name: 'Crybaby', slug: 'crybaby' }
        ]
      } catch (error) {
        console.error('加载系列列表失败:', error)
      }
    }

    // 处理搜索（防抖）
    const handleSearch = debounce(() => {
      loadCollections(true)
    }, 500)

    // 处理筛选变化
    const handleFilterChange = () => {
      loadCollections(true)
    }

    // 处理排序变化
    const handleSortChange = () => {
      loadCollections(true)
    }

    // 处理分页变化
    const handlePageChange = (page) => {
      currentPage.value = page
      loadCollections()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 刷新推荐
    const refreshFeatured = () => {
      loadFeaturedCollections()
    }

    // 更新URL参数
    const updateUrlParams = () => {
      const query = {}
      
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedSeries.value) query.series = selectedSeries.value
      if (selectedRarity.value) query.rarity = selectedRarity.value
      if (sortBy.value !== 'newest') query.sort = sortBy.value
      if (viewMode.value !== 'grid') query.view = viewMode.value
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    }

    // 从URL参数初始化状态
    const initializeFromUrl = () => {
      const query = route.query
      
      if (query.search) searchQuery.value = query.search
      if (query.series) selectedSeries.value = query.series
      if (query.rarity) selectedRarity.value = query.rarity
      if (query.sort) sortBy.value = query.sort
      if (query.view) viewMode.value = query.view
      if (query.page) currentPage.value = parseInt(query.page) || 1
    }

    // 监听路由变化
    watch(() => route.query, () => {
      initializeFromUrl()
      loadCollections()
    })

    // 生命周期
    onMounted(async () => {
      initializeFromUrl()
      
      // 并行加载数据
      await Promise.all([
        loadSeriesList(),
        loadFeaturedCollections(),
        loadCollections()
      ])
    })

    return {
      searchQuery,
      selectedSeries,
      selectedRarity,
      sortBy,
      viewMode,
      currentPage,
      isLoading,
      collections,
      featuredCollections,
      seriesList,
      totalCollections,
      totalPages,
      getEmptyMessage,
      handleSearch,
      handleFilterChange,
      handleSortChange,
      handlePageChange,
      refreshFeatured
    }
  },
  head() {
    return {
      title: '收藏品展示',
      meta: [
        {
          name: 'description',
          content: '浏览精美的Labubu收藏品图片和详细信息，了解每一款的独特魅力、收藏价值和投资潜力。'
        },
        {
          name: 'keywords',
          content: 'Labubu收藏品,艺术玩具,收藏展示,泡泡玛特,手办,潮玩'
        }
      ]
    }
  }
}
</script>

<style scoped>
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

/* 渐变文字效果 */
.text-gradient-primary {
  background: linear-gradient(135deg, theme('colors.primary.500'), theme('colors.primary.600'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>