import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../utils/api'

export const useContentStore = defineStore('content', () => {
  // 状态
  const articles = ref([])
  const categories = ref([])
  const tags = ref([])
  const collections = ref([])
  const featuredArticles = ref([])
  const trendingTopics = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // 分页状态
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })

  // 搜索状态
  const searchQuery = ref('')
  const searchResults = ref([])
  const searchLoading = ref(false)

  // 计算属性
  const hasArticles = computed(() => articles.value.length > 0)
  const hasCollections = computed(() => collections.value.length > 0)
  const hasFeaturedArticles = computed(() => featuredArticles.value.length > 0)
  const hasSearchResults = computed(() => searchResults.value.length > 0)

  // 按分类分组的文章
  const articlesByCategory = computed(() => {
    const grouped = {}
    articles.value.forEach(article => {
      const categoryName = article.category?.name || '未分类'
      if (!grouped[categoryName]) {
        grouped[categoryName] = []
      }
      grouped[categoryName].push(article)
    })
    return grouped
  })

  // 最新文章
  const latestArticles = computed(() => {
    return articles.value
      .filter(article => article.status === 'published')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 10)
  })

  // 热门文章
  const popularArticles = computed(() => {
    return articles.value
      .filter(article => article.status === 'published')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 10)
  })

  // 方法
  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  // 获取文章列表
  const fetchArticles = async (params = {}) => {
    try {
      setLoading(true)
      clearError()
      
      const response = await api.get('/articles', { params })
      
      if (params.page === 1) {
        articles.value = response.data.data
      } else {
        articles.value.push(...response.data.data)
      }
      
      pagination.value = response.data.meta.pagination
      
      return response.data
    } catch (err) {
      setError('获取文章列表失败')
      console.error('Error fetching articles:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 获取单篇文章
  const fetchArticle = async (slug) => {
    try {
      setLoading(true)
      clearError()
      
      const response = await api.get(`/articles/${slug}`)
      return response.data.data
    } catch (err) {
      setError('获取文章详情失败')
      console.error('Error fetching article:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      categories.value = response.data.data
      return response.data
    } catch (err) {
      setError('获取分类列表失败')
      console.error('Error fetching categories:', err)
      throw err
    }
  }

  // 获取标签列表
  const fetchTags = async () => {
    try {
      const response = await api.get('/tags')
      tags.value = response.data.data
      return response.data
    } catch (err) {
      setError('获取标签列表失败')
      console.error('Error fetching tags:', err)
      throw err
    }
  }

  // 获取收藏品列表
  const fetchCollections = async (params = {}) => {
    try {
      setLoading(true)
      clearError()
      
      const response = await api.get('/collections', { params })
      collections.value = response.data.data
      
      return response.data
    } catch (err) {
      setError('获取收藏品列表失败')
      console.error('Error fetching collections:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 获取单个收藏品
  const fetchCollection = async (slug) => {
    try {
      setLoading(true)
      clearError()
      
      const response = await api.get(`/collections/${slug}`)
      return response.data.data
    } catch (err) {
      setError('获取收藏品详情失败')
      console.error('Error fetching collection:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 获取推荐文章
  const fetchFeaturedArticles = async () => {
    try {
      const response = await api.get('/articles', {
        params: { featured: true, limit: 6 }
      })
      featuredArticles.value = response.data.data
      return response.data
    } catch (err) {
      setError('获取推荐文章失败')
      console.error('Error fetching featured articles:', err)
      throw err
    }
  }

  // 获取热门话题
  const fetchTrendingTopics = async () => {
    try {
      const response = await api.get('/trending-topics')
      trendingTopics.value = response.data.data
      return response.data
    } catch (err) {
      setError('获取热门话题失败')
      console.error('Error fetching trending topics:', err)
      throw err
    }
  }

  // 搜索内容
  const searchContent = async (query, filters = {}) => {
    try {
      searchLoading.value = true
      searchQuery.value = query
      
      const response = await api.get('/search', {
        params: { q: query, ...filters }
      })
      
      searchResults.value = response.data.data
      return response.data
    } catch (err) {
      setError('搜索失败')
      console.error('Error searching content:', err)
      throw err
    } finally {
      searchLoading.value = false
    }
  }

  // 获取搜索建议
  const getSearchSuggestions = async (query) => {
    try {
      const response = await api.get('/search/suggestions', {
        params: { q: query }
      })
      return response.data.data
    } catch (err) {
      console.error('Error fetching search suggestions:', err)
      return []
    }
  }

  // 增加文章浏览量
  const incrementArticleViews = async (articleId) => {
    try {
      await api.post(`/articles/${articleId}/view`)
      
      // 更新本地状态
      const article = articles.value.find(a => a._id === articleId)
      if (article) {
        article.views = (article.views || 0) + 1
      }
    } catch (err) {
      console.error('Error incrementing article views:', err)
    }
  }

  // 点赞文章
  const likeArticle = async (articleId) => {
    try {
      const response = await api.post(`/articles/${articleId}/like`)
      
      // 更新本地状态
      const article = articles.value.find(a => a._id === articleId)
      if (article) {
        article.likes = response.data.likes
        article.isLiked = true
      }
      
      return response.data
    } catch (err) {
      setError('点赞失败')
      console.error('Error liking article:', err)
      throw err
    }
  }

  // 取消点赞文章
  const unlikeArticle = async (articleId) => {
    try {
      const response = await api.delete(`/articles/${articleId}/like`)
      
      // 更新本地状态
      const article = articles.value.find(a => a._id === articleId)
      if (article) {
        article.likes = response.data.likes
        article.isLiked = false
      }
      
      return response.data
    } catch (err) {
      setError('取消点赞失败')
      console.error('Error unliking article:', err)
      throw err
    }
  }

  // 分享文章
  const shareArticle = async (articleId, platform) => {
    try {
      await api.post(`/articles/${articleId}/share`, { platform })
      
      // 更新本地状态
      const article = articles.value.find(a => a._id === articleId)
      if (article) {
        article.shares = (article.shares || 0) + 1
      }
    } catch (err) {
      console.error('Error sharing article:', err)
    }
  }

  // 重置状态
  const resetState = () => {
    articles.value = []
    collections.value = []
    featuredArticles.value = []
    trendingTopics.value = []
    searchResults.value = []
    searchQuery.value = ''
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    }
    clearError()
  }

  return {
    // 状态
    articles,
    categories,
    tags,
    collections,
    featuredArticles,
    trendingTopics,
    isLoading,
    error,
    pagination,
    searchQuery,
    searchResults,
    searchLoading,
    
    // 计算属性
    hasArticles,
    hasCollections,
    hasFeaturedArticles,
    hasSearchResults,
    articlesByCategory,
    latestArticles,
    popularArticles,
    
    // 方法
    setLoading,
    setError,
    clearError,
    fetchArticles,
    fetchArticle,
    fetchCategories,
    fetchTags,
    fetchCollections,
    fetchCollection,
    fetchFeaturedArticles,
    fetchTrendingTopics,
    searchContent,
    getSearchSuggestions,
    incrementArticleViews,
    likeArticle,
    unlikeArticle,
    shareArticle,
    resetState
  }
})