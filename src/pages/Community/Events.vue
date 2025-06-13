<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-violet-50 via-white to-purple-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/events-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            社区
            <span class="text-gradient-events">活动</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            参与精彩的社区活动，与收藏家们一起分享乐趣，赢取丰厚奖品
          </p>
          
          <!-- 快速操作 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button @click="showCreateEventModal = true" class="btn-primary">
              创建活动
            </button>
            <router-link to="/community/discussions" class="btn-outline">
              社区讨论
            </router-link>
          </div>

          <!-- 活动统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-violet-600">{{ eventStats.total }}</div>
              <div class="text-sm text-neutral-500 mt-1">总活动数</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-violet-600">{{ eventStats.ongoing }}</div>
              <div class="text-sm text-neutral-500 mt-1">进行中</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-violet-600">{{ eventStats.participants }}</div>
              <div class="text-sm text-neutral-500 mt-1">参与人数</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-violet-600">{{ eventStats.prizes }}</div>
              <div class="text-sm text-neutral-500 mt-1">奖品总值</div>
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
              placeholder="搜索活动..."
              class="search-input pl-10"
              @input="handleSearch"
            />
          </div>

          <!-- 筛选选项 -->
          <div class="flex flex-wrap gap-3">
            <select
              v-model="selectedStatus"
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="">所有状态</option>
              <option value="upcoming">即将开始</option>
              <option value="ongoing">进行中</option>
              <option value="ended">已结束</option>
            </select>

            <select
              v-model="selectedType"
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="">所有类型</option>
              <option value="contest">比赛活动</option>
              <option value="exhibition">展览活动</option>
              <option value="meetup">线下聚会</option>
              <option value="workshop">工作坊</option>
              <option value="giveaway">抽奖活动</option>
            </select>

            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="filter-select"
            >
              <option value="start_date">开始时间</option>
              <option value="newest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="participants">参与人数</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门活动 -->
    <section v-if="featuredEvents.length > 0" class="bg-white py-12">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            热门活动
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
          <EventCard
            v-for="event in featuredEvents"
            :key="event.id"
            :event="event"
            :featured="true"
          />
        </div>
      </div>
    </section>

    <!-- 活动列表 -->
    <section class="py-12">
      <div class="container-custom">
        <!-- 结果统计 -->
        <div class="flex justify-between items-center mb-8">
          <p class="text-neutral-600">
            共找到 <span class="font-semibold text-neutral-900">{{ totalEvents }}</span> 个活动
          </p>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p class="text-neutral-500">加载中...</p>
        </div>

        <!-- 活动网格 -->
        <div v-else-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>

        <!-- 无结果 -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无活动</h3>
          <p class="text-neutral-500">{{ getEmptyMessage() }}</p>
        </div>

        <!-- 分页 -->
        <Pagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="totalEvents"
          @page-change="handlePageChange"
        />
      </div>
    </section>

    <!-- 活动日历 -->
    <section class="py-16 bg-gradient-to-br from-violet-100 to-purple-100">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
            活动日历
          </h2>
          <p class="text-xl text-neutral-600 mb-8">
            查看即将到来的精彩活动，不错过任何收藏机会
          </p>
          
          <!-- 简化的日历视图 -->
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="upcomingEvent in upcomingEvents"
                :key="upcomingEvent.id"
                class="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200"
              >
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-violet-600">
                    {{ formatDate(upcomingEvent.startDate, 'MM月DD日') }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getEventTypeClass(upcomingEvent.type)
                    ]"
                  >
                    {{ getEventTypeLabel(upcomingEvent.type) }}
                  </span>
                </div>
                <h3 class="font-semibold text-neutral-900 mb-2">{{ upcomingEvent.title }}</h3>
                <p class="text-sm text-neutral-600 mb-3">{{ upcomingEvent.location }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-neutral-500">
                    {{ upcomingEvent.participants }}/{{ upcomingEvent.maxParticipants }} 人
                  </span>
                  <button
                    @click="joinEvent(upcomingEvent)"
                    :disabled="upcomingEvent.participants >= upcomingEvent.maxParticipants"
                    :class="[
                      'px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200',
                      upcomingEvent.participants >= upcomingEvent.maxParticipants
                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                        : 'bg-violet-600 text-white hover:bg-violet-700'
                    ]"
                  >
                    {{ upcomingEvent.participants >= upcomingEvent.maxParticipants ? '已满员' : '参与' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 创建活动模态框 -->
    <CreateEventModal
      v-if="showCreateEventModal"
      @close="showCreateEventModal = false"
      @created="handleEventCreated"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import { debounce, formatDate } from '../../utils/helpers'
import EventCard from '../../components/content/EventCard.vue'
import CreateEventModal from '../../components/modals/CreateEventModal.vue'
import Pagination from '../../components/ui/Pagination.vue'

export default {
  name: 'Events',
  components: {
    EventCard,
    CreateEventModal,
    Pagination
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const uiStore = useUIStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const selectedType = ref('')
    const sortBy = ref('start_date')
    const currentPage = ref(1)
    const isLoading = ref(false)
    const showCreateEventModal = ref(false)

    // 活动数据
    const events = ref([])
    const featuredEvents = ref([])
    const upcomingEvents = ref([])
    const totalEvents = ref(0)
    const totalPages = ref(0)

    // 统计数据
    const eventStats = ref({
      total: '156',
      ongoing: '23',
      participants: '3.2K',
      prizes: '¥50K'
    })

    // 获取空状态消息
    const getEmptyMessage = () => {
      if (searchQuery.value) {
        return `没有找到包含"${searchQuery.value}"的活动`
      }
      if (selectedStatus.value || selectedType.value) {
        return '当前筛选条件下暂无活动'
      }
      return '暂时没有活动'
    }

    // 获取活动类型样式
    const getEventTypeClass = (type) => {
      const classes = {
        contest: 'bg-red-100 text-red-700',
        exhibition: 'bg-blue-100 text-blue-700',
        meetup: 'bg-green-100 text-green-700',
        workshop: 'bg-purple-100 text-purple-700',
        giveaway: 'bg-orange-100 text-orange-700'
      }
      return classes[type] || 'bg-neutral-100 text-neutral-700'
    }

    // 获取活动类型标签
    const getEventTypeLabel = (type) => {
      const labels = {
        contest: '比赛',
        exhibition: '展览',
        meetup: '聚会',
        workshop: '工作坊',
        giveaway: '抽奖'
      }
      return labels[type] || '活动'
    }

    // 加载活动数据
    const loadEvents = async (resetPage = false) => {
      try {
        isLoading.value = true
        
        if (resetPage) {
          currentPage.value = 1
        }

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))

        // 模拟数据
        const mockEvents = [
          {
            id: 1,
            title: 'Labubu收藏品摄影大赛',
            description: '展示您最美的Labubu收藏品照片，赢取丰厚奖品！专业摄影师将为获奖作品提供点评。',
            type: 'contest',
            status: 'ongoing',
            coverImage: '/event1.jpg',
            startDate: '2024-01-20T10:00:00Z',
            endDate: '2024-02-20T23:59:59Z',
            location: '线上活动',
            organizer: {
              id: 1,
              name: 'Labubu官方',
              avatar: '/organizer1.jpg',
              verified: true
            },
            participants: 234,
            maxParticipants: 500,
            prizes: ['限定版Labubu', '专业摄影器材', '现金奖励'],
            tags: ['摄影', '比赛', '奖品'],
            featured: true
          },
          {
            id: 2,
            title: '北京Labubu收藏家线下聚会',
            description: '北京地区的收藏家们聚在一起，分享收藏心得，交流收藏经验，还有神秘嘉宾到场！',
            type: 'meetup',
            status: 'upcoming',
            coverImage: '/event2.jpg',
            startDate: '2024-01-25T14:00:00Z',
            endDate: '2024-01-25T18:00:00Z',
            location: '北京市朝阳区某咖啡厅',
            organizer: {
              id: 2,
              name: '北京收藏家协会',
              avatar: '/organizer2.jpg',
              verified: false
            },
            participants: 45,
            maxParticipants: 80,
            prizes: [],
            tags: ['线下', '聚会', '北京'],
            featured: false
          }
        ]

        events.value = mockEvents
        totalEvents.value = mockEvents.length
        totalPages.value = Math.ceil(totalEvents.value / 12)
        
        // 更新URL参数
        updateUrlParams()
        
      } catch (error) {
        console.error('加载活动失败:', error)
        uiStore.showError('加载活动失败')
      } finally {
        isLoading.value = false
      }
    }

    // 加载精选活动
    const loadFeaturedEvents = async () => {
      try {
        featuredEvents.value = events.value.filter(event => event.featured)
      } catch (error) {
        console.error('加载精选活动失败:', error)
      }
    }

    // 加载即将到来的活动
    const loadUpcomingEvents = async () => {
      try {
        upcomingEvents.value = [
          {
            id: 101,
            title: 'Labubu新品发布会',
            type: 'exhibition',
            startDate: '2024-01-28T10:00:00Z',
            location: '上海展览中心',
            participants: 156,
            maxParticipants: 200
          },
          {
            id: 102,
            title: 'DIY工作坊',
            type: 'workshop',
            startDate: '2024-02-01T14:00:00Z',
            location: '线上直播',
            participants: 89,
            maxParticipants: 100
          },
          {
            id: 103,
            title: '限定款抽奖活动',
            type: 'giveaway',
            startDate: '2024-02-05T12:00:00Z',
            location: '社区平台',
            participants: 567,
            maxParticipants: 1000
          }
        ]
      } catch (error) {
        console.error('加载即将到来的活动失败:', error)
      }
    }

    // 处理搜索（防抖）
    const handleSearch = debounce(() => {
      loadEvents(true)
    }, 500)

    // 处理筛选变化
    const handleFilterChange = () => {
      loadEvents(true)
    }

    // 处理排序变化
    const handleSortChange = () => {
      loadEvents(true)
    }

    // 处理分页变化
    const handlePageChange = (page) => {
      currentPage.value = page
      loadEvents()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 刷新精选
    const refreshFeatured = () => {
      loadFeaturedEvents()
    }

    // 参与活动
    const joinEvent = (event) => {
      if (event.participants >= event.maxParticipants) {
        uiStore.showError('活动已满员')
        return
      }
      
      // 这里应该调用API参与活动
      event.participants++
      uiStore.showSuccess('成功参与活动！')
    }

    // 处理活动创建完成
    const handleEventCreated = (newEvent) => {
      events.value.unshift(newEvent)
      totalEvents.value++
      uiStore.showSuccess('活动创建成功！')
    }

    // 更新URL参数
    const updateUrlParams = () => {
      const query = {}
      
      if (searchQuery.value) query.search = searchQuery.value
      if (selectedStatus.value) query.status = selectedStatus.value
      if (selectedType.value) query.type = selectedType.value
      if (sortBy.value !== 'start_date') query.sort = sortBy.value
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    }

    // 从URL参数初始化状态
    const initializeFromUrl = () => {
      const query = route.query
      
      if (query.search) searchQuery.value = query.search
      if (query.status) selectedStatus.value = query.status
      if (query.type) selectedType.value = query.type
      if (query.sort) sortBy.value = query.sort
      if (query.page) currentPage.value = parseInt(query.page) || 1
    }

    // 监听路由变化
    watch(() => route.query, () => {
      initializeFromUrl()
      loadEvents()
    })

    // 生命周期
    onMounted(async () => {
      initializeFromUrl()
      
      // 并行加载数据
      await Promise.all([
        loadEvents(),
        loadUpcomingEvents()
      ])
      
      loadFeaturedEvents()
    })

    return {
      searchQuery,
      selectedStatus,
      selectedType,
      sortBy,
      currentPage,
      isLoading,
      showCreateEventModal,
      events,
      featuredEvents,
      upcomingEvents,
      totalEvents,
      totalPages,
      eventStats,
      getEmptyMessage,
      getEventTypeClass,
      getEventTypeLabel,
      handleSearch,
      handleFilterChange,
      handleSortChange,
      handlePageChange,
      refreshFeatured,
      joinEvent,
      handleEventCreated,
      formatDate
    }
  },
  head() {
    return {
      title: '活动中心',
      meta: [
        {
          name: 'description',
          content: '参与精彩的Labubu社区活动，与收藏家们一起分享乐趣，赢取丰厚奖品。'
        },
        {
          name: 'keywords',
          content: 'Labubu活动,社区活动,收藏家聚会,比赛,展览,工作坊'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 活动渐变文字效果 */
.text-gradient-events {
  background: linear-gradient(135deg, theme('colors.violet.500'), theme('colors.purple.500'));
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
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>