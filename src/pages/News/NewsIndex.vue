<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-white border-b border-neutral-200">
      <div class="container-custom py-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            最新资讯
          </h1>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            第一时间了解Labubu的最新动态、新品发布和行业趋势
          </p>
        </div>
        
        <!-- 搜索和筛选 -->
        <div class="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div class="relative max-w-md w-full">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索资讯..."
              class="search-input pl-10"
              @input="handleSearch"
            />
          </div>
          
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">所有分类</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- 推荐文章 -->
    <section v-if="featuredArticles.length > 0" class="bg-white py-12">
      <div class="container-custom">
        <h2 class="text-2xl font-display font-bold text-neutral-900 mb-8">推荐阅读</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <ArticleCard
              :article="featuredArticles[0]"
              :featured="true"
            />
          </div>
          <div class="space-y-6">
            <ArticleCard
              v-for="article in featuredArticles.slice(1, 3)"
              :key="article.id"
              :article="article"
              :compact="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="py-12">
      <div class="container-custom">
        <!-- 分类标签 -->
        <div v-if="categories.length > 0" class="flex flex-wrap gap-2 mb-8">
          <button
            @click="selectCategory('')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              !selectedCategory 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
            ]"
          >
            全部
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.slug)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              selectedCategory === category.slug 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- 排序选项 -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-neutral-600">
            共找到 <span class="font-semibold text-neutral-900">{{ totalArticles }}</span> 篇文章
          </p>
          <select
            v-model="sortBy"
            @change="handleSortChange"
            class="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
          >
            <option value="publishedAt">最新发布</option>
            <option value="views">最多浏览</option>
            <option value="likes">最多点赞</option>
          </select>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">加载中...</p>
        </div>

        <!-- 文章网格 -->
        <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无文章</h3>
          <p class="text-neutral-500">{{ getEmptyMessage() }}</p>
        </div>

        <!-- 分页 -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalArticles"
          @page-change="handlePageChange"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'
import { debounce } from '../../utils/helpers'
import ArticleCard from '../../components/content/ArticleCard.vue'
import Pagination from '../../components/ui/Pagination.vue'

export default {
  name: 'NewsIndex',
  components: {
    ArticleCard,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contentStore = useContentStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('publishedAt')
    const currentPage = ref(1)
    const isLoading = ref(false)

    // 计算属性
    const articles = computed(() => contentStore.articles)
    const categories = computed(() => contentStore.categories)
    const featuredArticles = computed(() => contentStore.featuredArticles)
    const totalArticles = computed(() => contentStore.pagination.total)
    const totalPages = computed(() => contentStore.pagination.totalPages)

    // 获取空状态消息
    const getEmptyMessage = () => {
      if (searchQuery.value) {
        return `没有找到包含"${searchQuery.value}"的文章`
      }
      if (selectedCategory.value) {
        const category = categories.value.find(c => c.slug === selectedCategory.value)
        return `${category?.name || '该分类'}下暂无文章`
      }
      return '暂时没有发布任何文章'
    }

    // 加载文章数据
    const loadArticles = async (resetPage = false) => {
      try {
        isLoading.value = true
        
        if (resetPage) {
          currentPage.value = 1
        }

        const params = {
          page: currentPage.value,
          limit: 12,
          sortBy: sortBy.value,
          order: 'desc'
        }

        if (searchQuery.value) {
          params.search = searchQuery.value
        }

        if (selectedCategory.value) {
          params.category = selectedCategory.value
        }

        await contentStore.fetchArticles(params)
        
        // 更新URL参数
        updateUrlParams()
        
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        isLoading.value = false
      }
    }

    // 加载推荐文章
    const loadFeaturedArticles = async () => {
      try {
        await contentStore.fetchFeaturedArticles()
      } catch (error) {
        console.error('加载推荐文章失败:', error)
      }
    }

    // 加载分类
    const loadCategories = async () => {
      try {
        await contentStore.fetchCategories()
      } catch (error) {
        console.error('加载分类失败:', error)
      }
    }

    // 处理搜索（防抖）
    const handleSearch = debounce(() => {
      loadArticles(true)
    }, 500)

    // 处理分类变化
    const handleCategoryChange = () => {
      loadArticles(true)
    }

    // 选择分类
    const selectCategory = (categorySlug) => {
      selectedCategory.value = categorySlug
      loadArticles(true)
    }

    // 处理排序变化
    const handleSortChange = () => {
      loadArticles(true)
    }

    // 处理分页变化
    const handlePageChange = (page) => {
      currentPage.value = page
      loadArticles()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 更新URL参数
    const updateUrlParams = () => {
      const query = {}
      
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedCategory.value) query.category = selectedCategory.value
      if (sortBy.value !== 'publishedAt') query.sort = sortBy.value
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    }

    // 从URL参数初始化状态
    const initializeFromUrl = () => {
      const query = route.query
      
      if (query.search) searchQuery.value = query.search
      if (query.category) selectedCategory.value = query.category
      if (query.sort) sortBy.value = query.sort
      if (query.page) currentPage.value = parseInt(query.page) || 1
    }

    // 监听路由变化
    watch(() => route.query, () => {
      initializeFromUrl()
      loadArticles()
    })

    // 生命周期
    onMounted(async () => {
      initializeFromUrl()
      
      // 并行加载数据
      await Promise.all([
        loadCategories(),
        loadFeaturedArticles(),
        loadArticles()
      ])
    })

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      isLoading,
      articles,
      categories,
      featuredArticles,
      totalArticles,
      totalPages,
      getEmptyMessage,
      handleSearch,
      handleCategoryChange,
      selectCategory,
      handleSortChange,
      handlePageChange
    }
  },
  head() {
    return {
      title: '最新资讯',
      meta: [
        {
          name: 'description',
          content: '获取最新的Labubu资讯、发布信息和行业动态。第一时间了解Labubu的最新动态、新品发布和收藏趋势。'
        },
        {
          name: 'keywords',
          content: 'Labubu资讯,最新消息,发布信息,行业动态,新品发布,收藏趋势'
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

/* 加载动画 */
.loading-spinner {
  @apply animate-spin rounded-full border-4 border-neutral-200 border-t-primary-600;
}
</style>