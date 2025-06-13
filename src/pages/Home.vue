<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
      <div class="container-custom section-padding relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 左侧内容 -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
              探索
              <span class="text-gradient-primary">Labubu</span>
              的精彩世界
            </h1>
            <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
              获取最新资讯、收藏指南和社区讨论。与全球Labubu爱好者一起分享艺术玩具的无限魅力。
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <router-link to="/news" class="btn-primary">
                浏览最新资讯
              </router-link>
              <router-link to="/collection" class="btn-outline">
                查看收藏品
              </router-link>
            </div>
            
            <!-- 统计数据 -->
            <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200">
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-primary-600">1000+</div>
                <div class="text-sm text-neutral-500 mt-1">最新资讯</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-primary-600">500+</div>
                <div class="text-sm text-neutral-500 mt-1">收藏品</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-primary-600">10K+</div>
                <div class="text-sm text-neutral-500 mt-1">社区成员</div>
              </div>
            </div>
          </div>
          
          <!-- 右侧图片 -->
          <div class="relative">
            <div class="relative z-10">
              <div class="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl shadow-2xl flex items-center justify-center">
                <div class="text-center">
                  <div class="text-6xl mb-4">🎨</div>
                  <p class="text-lg font-medium text-neutral-700">Labubu收藏品展示</p>
                  <p class="text-sm text-neutral-500 mt-2">精美的艺术玩具世界</p>
                </div>
              </div>
            </div>
            <!-- 装饰元素 -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-60 animate-bounce-gentle"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-200 rounded-full opacity-40 animate-bounce-gentle" style="animation-delay: 0.5s;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新资讯 -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            最新资讯
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            第一时间了解Labubu的最新动态、新品发布和行业趋势
          </p>
        </div>

        <!-- 推荐文章 -->
        <div v-if="featuredArticles.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- 主要文章 -->
          <div class="lg:col-span-2">
            <ArticleCard
              :article="featuredArticles[0]"
              :featured="true"
              class="h-full"
            />
          </div>
          
          <!-- 次要文章 -->
          <div class="space-y-6">
            <ArticleCard
              v-for="article in featuredArticles.slice(1, 3)"
              :key="article.id"
              :article="article"
              :compact="true"
            />
          </div>
        </div>

        <!-- 更多文章 -->
        <div v-if="latestArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ArticleCard
            v-for="article in latestArticles.slice(0, 6)"
            :key="article.id"
            :article="article"
          />
        </div>

        <div class="text-center">
          <router-link to="/news" class="btn-outline">
            查看更多资讯
          </router-link>
        </div>
      </div>
    </section>

    <!-- 收藏品推荐 -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            精选收藏品
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            发现最受欢迎的Labubu收藏品，了解收藏价值和投资潜力
          </p>
        </div>

        <div v-if="featuredCollections.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <CollectionCard
            v-for="collection in featuredCollections"
            :key="collection.id"
            :collection="collection"
          />
        </div>

        <div class="text-center">
          <router-link to="/collection" class="btn-outline">
            浏览所有收藏品
          </router-link>
        </div>
      </div>
    </section>

    <!-- 热门话题 -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            热门话题
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            参与社区讨论，分享收藏心得和经验
          </p>
        </div>

        <div v-if="trendingTopics.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            v-for="topic in trendingTopics.slice(0, 4)"
            :key="topic.id"
            class="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-neutral-900 mb-2">{{ topic.title }}</h3>
                <p class="text-neutral-600 text-sm mb-3">{{ topic.description }}</p>
                <div class="flex items-center justify-between text-xs text-neutral-500">
                  <span>{{ topic.replies }} 回复</span>
                  <span>{{ formatRelativeTime(topic.lastActivity) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/community" class="btn-outline">
            加入社区讨论
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-primary text-white">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          开始您的Labubu收藏之旅
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          无论您是新手还是资深收藏家，我们都有适合您的指南和资源
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/guide" class="btn-secondary">
            新手指南
          </router-link>
          <router-link to="/guide/where-to-buy" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            购买渠道
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useContentStore } from '../stores/content'
import { formatRelativeTime } from '../utils/helpers'
import ArticleCard from '../components/content/ArticleCard.vue'
import CollectionCard from '../components/content/CollectionCard.vue'

export default {
  name: 'Home',
  components: {
    ArticleCard,
    CollectionCard
  },
  setup() {
    const contentStore = useContentStore()
    
    const featuredArticles = ref([])
    const latestArticles = ref([])
    const featuredCollections = ref([])
    const trendingTopics = ref([])
    const isLoading = ref(true)

    // 加载首页数据
    const loadHomeData = async () => {
      try {
        isLoading.value = true
        
        // 并行加载数据
        const [
          featuredResponse,
          latestResponse,
          collectionsResponse,
          topicsResponse
        ] = await Promise.allSettled([
          contentStore.fetchFeaturedArticles(),
          contentStore.fetchArticles({ limit: 6 }),
          contentStore.fetchCollections({ featured: true, limit: 4 }),
          contentStore.fetchTrendingTopics()
        ])

        // 处理推荐文章
        if (featuredResponse.status === 'fulfilled') {
          featuredArticles.value = featuredResponse.value.data || []
        }

        // 处理最新文章
        if (latestResponse.status === 'fulfilled') {
          latestArticles.value = latestResponse.value.data || []
        }

        // 处理推荐收藏品
        if (collectionsResponse.status === 'fulfilled') {
          featuredCollections.value = collectionsResponse.value.data || []
        }

        // 处理热门话题
        if (topicsResponse.status === 'fulfilled') {
          trendingTopics.value = topicsResponse.value.data || []
        }

      } catch (error) {
        console.error('加载首页数据失败:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadHomeData()
    })

    return {
      featuredArticles,
      latestArticles,
      featuredCollections,
      trendingTopics,
      isLoading,
      formatRelativeTime
    }
  },
  head() {
    return {
      title: '首页',
      meta: [
        {
          name: 'description',
          content: 'Labubu Portal首页 - 获取最新Labubu资讯、收藏指南和社区讨论，与全球Labubu爱好者一起探索艺术玩具的精彩世界。'
        },
        {
          name: 'keywords',
          content: 'Labubu,首页,最新资讯,收藏指南,社区讨论,艺术玩具,泡泡玛特'
        },
        {
          property: 'og:title',
          content: 'Labubu Portal - 探索Labubu的精彩世界'
        },
        {
          property: 'og:description',
          content: '获取最新Labubu资讯、收藏指南和社区讨论，与全球Labubu爱好者一起探索艺术玩具的精彩世界。'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Hero section背景动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 渐变文字效果 */
.text-gradient-primary {
  background: linear-gradient(135deg, theme('colors.primary.500'), theme('colors.primary.600'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 卡片悬停效果 */
.card-hover:hover {
  transform: translateY(-4px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section-padding {
    @apply py-12;
  }
}
</style>