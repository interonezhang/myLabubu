<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/community-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            Labubu收藏家
            <span class="text-gradient-community">社区</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            与全球Labubu爱好者一起分享收藏心得、交流经验、展示珍藏
          </p>
          
          <!-- 快速导航 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <router-link to="/community/showcase" class="btn-primary">
              收藏展示
            </router-link>
            <router-link to="/community/discussions" class="btn-outline">
              社区讨论
            </router-link>
            <router-link to="/community/events" class="btn-outline">
              活动中心
            </router-link>
          </div>

          <!-- 社区统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-indigo-600">{{ communityStats.members }}</div>
              <div class="text-sm text-neutral-500 mt-1">社区成员</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-indigo-600">{{ communityStats.posts }}</div>
              <div class="text-sm text-neutral-500 mt-1">分享帖子</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-indigo-600">{{ communityStats.collections }}</div>
              <div class="text-sm text-neutral-500 mt-1">展示收藏</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-indigo-600">{{ communityStats.events }}</div>
              <div class="text-sm text-neutral-500 mt-1">活动举办</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门话题 -->
    <section class="bg-white py-12">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            热门话题
          </h2>
          <router-link 
            to="/community/discussions" 
            class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center group"
          >
            查看全部
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="topic in hotTopics"
            :key="topic.id"
            class="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            @click="$router.push(`/community/discussions/${topic.id}`)"
          >
            <!-- 话题头部 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img
                  :src="topic.author.avatar || '/default-avatar.jpg'"
                  :alt="topic.author.name"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 class="font-medium text-neutral-900">{{ topic.author.name }}</h4>
                  <p class="text-sm text-neutral-500">{{ formatRelativeTime(topic.createdAt) }}</p>
                </div>
              </div>
              
              <!-- 话题标签 -->
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getTopicCategoryClass(topic.category)
                ]"
              >
                {{ topic.category }}
              </span>
            </div>

            <!-- 话题内容 -->
            <h3 class="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
              {{ topic.title }}
            </h3>
            <p class="text-neutral-600 text-sm mb-4 line-clamp-3">
              {{ topic.excerpt }}
            </p>

            <!-- 话题统计 -->
            <div class="flex items-center justify-between text-sm text-neutral-500">
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {{ topic.replies }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ topic.likes }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ topic.views }}
                </span>
              </div>
              
              <span class="text-primary-600 font-medium">参与讨论</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选收藏展示 -->
    <section class="py-12 bg-neutral-50">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            精选收藏展示
          </h2>
          <router-link 
            to="/community/showcase" 
            class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center group"
          >
            查看更多
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="showcase in featuredShowcases"
            :key="showcase.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            @click="$router.push(`/community/showcase/${showcase.id}`)"
          >
            <!-- 展示图片 -->
            <div class="relative overflow-hidden">
              <img
                :src="showcase.coverImage"
                :alt="showcase.title"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <!-- 收藏数量标识 -->
              <div class="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
                {{ showcase.itemCount }} 件
              </div>
            </div>

            <!-- 展示信息 -->
            <div class="p-6">
              <div class="flex items-center space-x-3 mb-3">
                <img
                  :src="showcase.author.avatar || '/default-avatar.jpg'"
                  :alt="showcase.author.name"
                  class="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 class="font-medium text-neutral-900">{{ showcase.author.name }}</h4>
                  <p class="text-xs text-neutral-500">{{ showcase.author.level }} 收藏家</p>
                </div>
              </div>

              <h3 class="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ showcase.title }}
              </h3>
              <p class="text-neutral-600 text-sm mb-4 line-clamp-2">
                {{ showcase.description }}
              </p>

              <!-- 展示统计 -->
              <div class="flex items-center justify-between text-sm text-neutral-500">
                <div class="flex items-center space-x-3">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {{ showcase.likes }}
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ showcase.views }}
                  </span>
                </div>
                <span class="text-primary-600 font-medium">查看详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 社区指南 -->
    <section class="py-16 bg-gradient-primary text-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-6">
            加入我们的收藏家社区
          </h2>
          <p class="text-xl opacity-90 mb-8">
            与志同道合的朋友一起分享收藏乐趣，获取专业建议，参与精彩活动
          </p>
          
          <!-- 社区特色 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">专业交流</h3>
              <p class="text-sm opacity-90">与资深收藏家交流心得，获取专业建议</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">收藏展示</h3>
              <p class="text-sm opacity-90">展示您的珍贵收藏，获得社区认可</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">精彩活动</h3>
              <p class="text-sm opacity-90">参与线上线下活动，结识更多朋友</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-secondary">
              立即注册
            </button>
            <router-link to="/community/discussions" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              开始讨论
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUIStore } from '../../stores/ui'
import { formatDate, formatRelativeTime } from '../../utils/helpers'

export default {
  name: 'CommunityIndex',
  setup() {
    const uiStore = useUIStore()

    // 响应式数据
    const communityStats = ref({
      members: '12.5K',
      posts: '8.9K',
      collections: '15.2K',
      events: '156'
    })

    const hotTopics = ref([])
    const featuredShowcases = ref([])

    // 获取话题分类样式
    const getTopicCategoryClass = (category) => {
      const classes = {
        '收藏心得': 'bg-blue-100 text-blue-700',
        '新品讨论': 'bg-green-100 text-green-700',
        '交易信息': 'bg-orange-100 text-orange-700',
        '活动公告': 'bg-purple-100 text-purple-700',
        '问题求助': 'bg-red-100 text-red-700'
      }
      return classes[category] || 'bg-neutral-100 text-neutral-700'
    }

    // 加载社区数据
    const loadCommunityData = async () => {
      try {
        // 模拟数据加载
        hotTopics.value = [
          {
            id: 1,
            title: '新手收藏Labubu需要注意什么？',
            excerpt: '刚入坑Labubu，想请教一下各位前辈，新手收藏需要注意哪些问题？有什么推荐的入门款吗？',
            category: '问题求助',
            author: {
              name: '新手小白',
              avatar: '/avatar1.jpg'
            },
            createdAt: '2024-01-15T10:30:00Z',
            replies: 23,
            likes: 45,
            views: 156
          },
          {
            id: 2,
            title: '分享我的Labubu收藏展示柜',
            excerpt: '经过半年的收集，终于把我的展示柜装满了！来分享一下我的收藏心得和展示技巧。',
            category: '收藏心得',
            author: {
              name: '收藏达人',
              avatar: '/avatar2.jpg'
            },
            createdAt: '2024-01-14T15:20:00Z',
            replies: 67,
            likes: 128,
            views: 342
          },
          {
            id: 3,
            title: '最新限定款Labubu开箱体验',
            excerpt: '今天收到了最新的限定款Labubu，迫不及待要和大家分享开箱体验！',
            category: '新品讨论',
            author: {
              name: '开箱专家',
              avatar: '/avatar3.jpg'
            },
            createdAt: '2024-01-13T09:15:00Z',
            replies: 34,
            likes: 89,
            views: 234
          }
        ]

        featuredShowcases.value = [
          {
            id: 1,
            title: '我的完整Labubu系列收藏',
            description: '历时两年收集的完整系列，包含所有常规款和限定款',
            coverImage: '/showcase1.jpg',
            itemCount: 45,
            author: {
              name: '收藏大师',
              avatar: '/avatar4.jpg',
              level: '资深'
            },
            likes: 234,
            views: 1256
          },
          {
            id: 2,
            title: 'Labubu主题房间布置',
            description: '把整个房间都布置成Labubu主题，每个角落都有惊喜',
            coverImage: '/showcase2.jpg',
            itemCount: 78,
            author: {
              name: '主题达人',
              avatar: '/avatar5.jpg',
              level: '专家'
            },
            likes: 189,
            views: 892
          },
          {
            id: 3,
            title: '稀有限定款收藏展示',
            description: '展示我收藏的各种稀有限定款Labubu，每一个都有故事',
            coverImage: '/showcase3.jpg',
            itemCount: 23,
            author: {
              name: '稀有猎手',
              avatar: '/avatar6.jpg',
              level: '传奇'
            },
            likes: 345,
            views: 1567
          }
        ]
      } catch (error) {
        console.error('加载社区数据失败:', error)
      }
    }

    onMounted(() => {
      loadCommunityData()
    })

    return {
      communityStats,
      hotTopics,
      featuredShowcases,
      getTopicCategoryClass,
      formatDate,
      formatRelativeTime
    }
  },
  head() {
    return {
      title: '社区',
      meta: [
        {
          name: 'description',
          content: 'Labubu爱好者社区 - 分享收藏、交流心得，与全球收藏家一起探索Labubu的精彩世界。'
        },
        {
          name: 'keywords',
          content: 'Labubu社区,收藏交流,爱好者,收藏展示,讨论,活动'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 社区渐变文字效果 */
.text-gradient-community {
  background: linear-gradient(135deg, theme('colors.indigo.500'), theme('colors.purple.500'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>