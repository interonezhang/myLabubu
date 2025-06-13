<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/discussion-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            社区
            <span class="text-gradient-discussion">讨论</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            与全球Labubu爱好者交流心得、分享经验、解答疑问
          </p>
          
          <!-- 快速操作 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button @click="showNewTopicModal = true" class="btn-primary">
              发起新话题
            </button>
            <router-link to="/community/showcase" class="btn-outline">
              收藏展示
            </router-link>
          </div>

          <!-- 讨论统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-emerald-600">{{ discussionStats.topics }}</div>
              <div class="text-sm text-neutral-500 mt-1">讨论话题</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-emerald-600">{{ discussionStats.replies }}</div>
              <div class="text-sm text-neutral-500 mt-1">回复数</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-emerald-600">{{ discussionStats.participants }}</div>
              <div class="text-sm text-neutral-500 mt-1">参与者</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-emerald-600">{{ discussionStats.online }}</div>
              <div class="text-sm text-neutral-500 mt-1">在线用户</div>
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
              placeholder="搜索讨论话题..."
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
              <option value="collection">收藏心得</option>
              <option value="newbie">新手问题</option>
              <option value="trading">交易信息</option>
              <option value="news">新品讨论</option>
              <option value="diy">DIY创作</option>
              <option value="events">活动相关</option>
            </select>

            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="filter-select"
            >
              <option value="latest">最新回复</option>
              <option value="newest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="most_replies">最多回复</option>
            </select>

            <!-- 状态筛选 -->
            <div class="flex items-center space-x-2">
              <label class="flex items-center text-sm">
                <input
                  v-model="showSolved"
                  type="checkbox"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                />
                已解决
              </label>
              <label class="flex items-center text-sm">
                <input
                  v-model="showPinned"
                  type="checkbox"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                />
                置顶
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类标签 -->
    <section class="bg-white py-4 border-b border-neutral-200">
      <div class="container-custom">
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectCategory('')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              !selectedCategory 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
            ]"
          >
            全部
          </button>
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectCategory(category.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-2',
              selectedCategory === category.value 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
            ]"
          >
            <span :class="category.icon"></span>
            <span>{{ category.label }}</span>
            <span class="text-xs opacity-75">({{ category.count }})</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 置顶话题 -->
    <section v-if="pinnedTopics.length > 0" class="bg-amber-50 py-6">
      <div class="container-custom">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
          <svg class="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 12V4a1 1 0 00-1-1h-1V2a1 1 0 00-2 0v1h-4V2a1 1 0 00-2 0v1H5a1 1 0 00-1 1v8H3a1 1 0 000 2h1v8a1 1 0 001 1h1v1a1 1 0 002 0v-1h4v1a1 1 0 002 0v-1h1a1 1 0 001-1v-8h1a1 1 0 000-2h-1z"/>
          </svg>
          置顶话题
        </h2>
        <div class="space-y-3">
          <DiscussionItem
            v-for="topic in pinnedTopics"
            :key="topic.id"
            :topic="topic"
            :pinned="true"
          />
        </div>
      </div>
    </section>

    <!-- 讨论列表 -->
    <section class="py-12">
      <div class="container-custom">
        <!-- 结果统计 -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-neutral-600">
            共找到 <span class="font-semibold text-neutral-900">{{ totalTopics }}</span> 个话题
          </p>
          
          <!-- 在线用户 -->
          <div class="flex items-center space-x-2 text-sm text-neutral-500">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{{ onlineUsers }} 人在线</span>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">加载中...</p>
        </div>

        <!-- 话题列表 -->
        <div v-else-if="topics.length > 0" class="space-y-4 mb-12">
          <DiscussionItem
            v-for="topic in topics"
            :key="topic.id"
            :topic="topic"
          />
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无讨论话题</h3>
          <p class="text-neutral-500">{{ getEmptyMessage() }}</p>
        </div>

        <!-- 分页 -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalTopics"
          @page-change="handlePageChange"
        />
      </div>
    </section>

    <!-- 发起新话题模态框 -->
    <NewTopicModal
      v-if="showNewTopicModal"
      @close="showNewTopicModal = false"
      @created="handleTopicCreated"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import { debounce } from '../../utils/helpers'
import DiscussionItem from '../../components/content/DiscussionItem.vue'
import NewTopicModal from '../../components/modals/NewTopicModal.vue'
import Pagination from '../../components/ui/Pagination.vue'

export default {
  name: 'Discussions',
  components: {
    DiscussionItem,
    NewTopicModal,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const uiStore = useUIStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('latest')
    const showSolved = ref(false)
    const showPinned = ref(true)
    const currentPage = ref(1)
    const isLoading = ref(false)
    const showNewTopicModal = ref(false)

    // 讨论数据
    const topics = ref([])
    const pinnedTopics = ref([])
    const totalTopics = ref(0)
    const totalPages = ref(0)
    const onlineUsers = ref(0)

    // 统计数据
    const discussionStats = ref({
      topics: '3.2K',
      replies: '18.5K',
      participants: '2.1K',
      online: '156'
    })

    // 分类数据
    const categories = ref([
      { value: 'collection', label: '收藏心得', icon: '💎', count: 245 },
      { value: 'newbie', label: '新手问题', icon: '🔰', count: 189 },
      { value: 'trading', label: '交易信息', icon: '💰', count: 156 },
      { value: 'news', label: '新品讨论', icon: '🆕', count: 134 },
      { value: 'diy', label: 'DIY创作', icon: '🎨', count: 98 },
      { value: 'events', label: '活动相关', icon: '🎉', count: 67 }
    ])

    // 获取空状态消息
    const getEmptyMessage = () => {
      if (searchQuery.value) {
        return `没有找到包含"${searchQuery.value}"的话题`
      }
      if (selectedCategory.value) {
        const category = categories.value.find(c => c.value === selectedCategory.value)
        return `${category?.label || '该分类'}下暂无话题`
      }
      return '暂时没有讨论话题'
    }

    // 加载讨论数据
    const loadTopics = async (resetPage = false) => {
      try {
        isLoading.value = true
        
        if (resetPage) {
          currentPage.value = 1
        }

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))

        // 模拟数据
        const mockTopics = [
          {
            id: 1,
            title: '新手收藏Labubu需要注意什么？',
            content: '刚入坑Labubu，想请教一下各位前辈，新手收藏需要注意哪些问题？有什么推荐的入门款吗？',
            category: 'newbie',
            author: {
              id: 1,
              name: '新手小白',
              avatar: '/avatar1.jpg',
              level: '新手收藏家',
              verified: false
            },
            createdAt: '2024-01-15T10:30:00Z',
            lastReplyAt: '2024-01-15T14:20:00Z',
            replies: 23,
            likes: 45,
            views: 156,
            solved: false,
            pinned: false,
            tags: ['新手', '入门', '建议']
          },
          {
            id: 2,
            title: '分享我的Labubu收藏展示柜布置心得',
            content: '经过半年的收集，终于把我的展示柜装满了！来分享一下我的收藏心得和展示技巧。',
            category: 'collection',
            author: {
              id: 2,
              name: '收藏达人',
              avatar: '/avatar2.jpg',
              level: '资深收藏家',
              verified: true
            },
            createdAt: '2024-01-14T15:20:00Z',
            lastReplyAt: '2024-01-15T12:45:00Z',
            replies: 67,
            likes: 128,
            views: 342,
            solved: false,
            pinned: false,
            tags: ['展示', '心得', '技巧']
          }
        ]

        topics.value = mockTopics
        totalTopics.value = mockTopics.length
        totalPages.value = Math.ceil(totalTopics.value / 20)
        onlineUsers.value = Math.floor(Math.random() * 200) + 100
        
        // 更新URL参数
        updateUrlParams()
        
      } catch (error) {
        console.error('加载讨论失败:', error)
        uiStore.showError('加载讨论失败')
      } finally {
        isLoading.value = false
      }
    }

    // 加载置顶话题
    const loadPinnedTopics = async () => {
      try {
        // 模拟置顶话题数据
        pinnedTopics.value = [
          {
            id: 1001,
            title: '【公告】社区规则和发帖指南',
            content: '欢迎来到Labubu收藏家社区！请仔细阅读社区规则，共同维护良好的讨论环境。',
            category: 'events',
            author: {
              id: 999,
              name: '管理员',
              avatar: '/admin-avatar.jpg',
              level: '管理员',
              verified: true
            },
            createdAt: '2024-01-01T00:00:00Z',
            lastReplyAt: '2024-01-15T10:00:00Z',
            replies: 156,
            likes: 234,
            views: 2345,
            solved: false,
            pinned: true,
            tags: ['公告', '规则', '指南']
          }
        ]
      } catch (error) {
        console.error('加载置顶话题失败:', error)
      }
    }

    // 处理搜索（防抖）
    const handleSearch = debounce(() => {
      loadTopics(true)
    }, 500)

    // 处理筛选变化
    const handleFilterChange = () => {
      loadTopics(true)
    }

    // 处理排序变化
    const handleSortChange = () => {
      loadTopics(true)
    }

    // 选择分类
    const selectCategory = (categoryValue) => {
      selectedCategory.value = categoryValue
      loadTopics(true)
    }

    // 处理分页变化
    const handlePageChange = (page) => {
      currentPage.value = page
      loadTopics()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 处理话题创建完成
    const handleTopicCreated = (newTopic) => {
      topics.value.unshift(newTopic)
      totalTopics.value++
      uiStore.showSuccess('话题发布成功！')
    }

    // 更新URL参数
    const updateUrlParams = () => {
      const query = {}
      
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedCategory.value) query.category = selectedCategory.value
      if (sortBy.value !== 'latest') query.sort = sortBy.value
      if (showSolved.value) query.solved = 'true'
      if (!showPinned.value) query.pinned = 'false'
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    }

    // 从URL参数初始化状态
    const initializeFromUrl = () => {
      const query = route.query
      
      if (query.search) searchQuery.value = query.search
      if (query.category) selectedCategory.value = query.category
      if (query.sort) sortBy.value = query.sort
      if (query.solved) showSolved.value = query.solved === 'true'
      if (query.pinned) showPinned.value = query.pinned !== 'false'
      if (query.page) currentPage.value = parseInt(query.page) || 1
    }

    // 监听路由变化
    watch(() => route.query, () => {
      initializeFromUrl()
      loadTopics()
    })

    // 生命周期
    onMounted(async () => {
      initializeFromUrl()
      
      // 并行加载数据
      await Promise.all([
        loadPinnedTopics(),
        loadTopics()
      ])
    })

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      showSolved,
      showPinned,
      currentPage,
      isLoading,
      showNewTopicModal,
      topics,
      pinnedTopics,
      totalTopics,
      totalPages,
      onlineUsers,
      discussionStats,
      categories,
      getEmptyMessage,
      handleSearch,
      handleFilterChange,
      handleSortChange,
      selectCategory,
      handlePageChange,
      handleTopicCreated
    }
  },
  head() {
    return {
      title: '社区讨论',
      meta: [
        {
          name: 'description',
          content: '参与Labubu社区讨论，分享收藏心得和经验，与全球收藏家交流互动。'
        },
        {
          name: 'keywords',
          content: 'Labubu讨论,社区交流,收藏心得,经验分享,问题解答'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 讨论渐变文字效果 */
.text-gradient-discussion {
  background: linear-gradient(135deg, theme('colors.emerald.500'), theme('colors.teal.500'));
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

/* 响应式调整 */
@media (max-width: 768px) {
  .flex-wrap {
    gap: 0.5rem;
  }
}
</style>