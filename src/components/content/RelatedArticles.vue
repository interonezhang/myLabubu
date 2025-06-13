<template>
  <section class="bg-white py-12 border-t border-neutral-200">
    <div class="container-custom">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
          相关文章
        </h2>
        <router-link 
          to="/news" 
          class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 flex items-center group"
        >
          查看更多
          <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- 相关文章列表 -->
      <div v-if="displayArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCard
          v-for="article in displayArticles"
          :key="article.id"
          :article="article"
          class="related-article-card"
        />
      </div>

      <!-- 无相关文章 -->
      <div v-else class="text-center py-12">
        <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无相关文章</h3>
        <p class="text-neutral-500 mb-6">我们正在为您寻找更多精彩内容</p>
        <router-link to="/news" class="btn-outline">
          浏览所有文章
        </router-link>
      </div>

      <!-- 推荐算法说明 -->
      <div v-if="displayArticles.length > 0" class="mt-8 p-4 bg-neutral-50 rounded-lg">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-neutral-900 mb-1">智能推荐</h4>
            <p class="text-xs text-neutral-600">
              基于文章分类、标签和用户阅读偏好为您推荐相关内容
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useContentStore } from '../../stores/content'
import ArticleCard from './ArticleCard.vue'

export default {
  name: 'RelatedArticles',
  components: {
    ArticleCard
  },
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    currentArticle: {
      type: Object,
      required: true
    },
    maxItems: {
      type: Number,
      default: 6
    },
    autoLoad: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const contentStore = useContentStore()
    const relatedArticles = ref([])
    const isLoading = ref(false)

    // 显示的文章列表
    const displayArticles = computed(() => {
      // 如果传入了文章列表，优先使用
      if (props.articles.length > 0) {
        return props.articles.slice(0, props.maxItems)
      }
      
      // 否则使用自动加载的相关文章
      return relatedArticles.value.slice(0, props.maxItems)
    })

    // 获取相关文章的策略
    const getRelatedArticles = async () => {
      if (!props.autoLoad || props.articles.length > 0) {
        return
      }

      try {
        isLoading.value = true
        const strategies = []

        // 策略1: 同分类文章
        if (props.currentArticle.category) {
          strategies.push({
            type: 'category',
            params: {
              category: props.currentArticle.category.slug,
              exclude: props.currentArticle.id,
              limit: 4
            }
          })
        }

        // 策略2: 相同标签文章
        if (props.currentArticle.tags && props.currentArticle.tags.length > 0) {
          const tagSlugs = props.currentArticle.tags.map(tag => tag.slug).slice(0, 3)
          strategies.push({
            type: 'tags',
            params: {
              tags: tagSlugs.join(','),
              exclude: props.currentArticle.id,
              limit: 3
            }
          })
        }

        // 策略3: 热门文章
        strategies.push({
          type: 'popular',
          params: {
            sortBy: 'views',
            exclude: props.currentArticle.id,
            limit: 3
          }
        })

        // 策略4: 最新文章
        strategies.push({
          type: 'latest',
          params: {
            sortBy: 'publishedAt',
            exclude: props.currentArticle.id,
            limit: 2
          }
        })

        // 并行执行所有策略
        const results = await Promise.allSettled(
          strategies.map(strategy => 
            contentStore.fetchArticles(strategy.params)
          )
        )

        // 合并结果并去重
        const allArticles = []
        const seenIds = new Set([props.currentArticle.id])

        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.data) {
            result.value.data.forEach(article => {
              if (!seenIds.has(article.id)) {
                seenIds.add(article.id)
                allArticles.push({
                  ...article,
                  _strategy: strategies[index].type,
                  _relevanceScore: calculateRelevanceScore(article, strategies[index].type)
                })
              }
            })
          }
        })

        // 按相关性排序
        allArticles.sort((a, b) => b._relevanceScore - a._relevanceScore)
        
        relatedArticles.value = allArticles

      } catch (error) {
        console.error('获取相关文章失败:', error)
      } finally {
        isLoading.value = false
      }
    }

    // 计算相关性分数
    const calculateRelevanceScore = (article, strategy) => {
      let score = 0

      // 基础分数
      switch (strategy) {
        case 'category':
          score += 100
          break
        case 'tags':
          score += 80
          break
        case 'popular':
          score += 60
          break
        case 'latest':
          score += 40
          break
      }

      // 分类匹配加分
      if (props.currentArticle.category && 
          article.category && 
          article.category.slug === props.currentArticle.category.slug) {
        score += 50
      }

      // 标签匹配加分
      if (props.currentArticle.tags && article.tags) {
        const currentTags = props.currentArticle.tags.map(tag => tag.slug)
        const articleTags = article.tags.map(tag => tag.slug)
        const commonTags = currentTags.filter(tag => articleTags.includes(tag))
        score += commonTags.length * 20
      }

      // 作者匹配加分
      if (props.currentArticle.author && 
          article.author && 
          article.author.id === props.currentArticle.author.id) {
        score += 30
      }

      // 发布时间加分（越新越好）
      const daysDiff = Math.abs(
        new Date(article.publishedAt) - new Date(props.currentArticle.publishedAt)
      ) / (1000 * 60 * 60 * 24)
      
      if (daysDiff <= 7) score += 20
      else if (daysDiff <= 30) score += 10

      // 热度加分
      const views = article.views || 0
      const likes = article.likes || 0
      score += Math.min(views / 100, 20) + Math.min(likes * 2, 20)

      return score
    }

    onMounted(() => {
      getRelatedArticles()
    })

    return {
      displayArticles,
      isLoading
    }
  }
}
</script>

<style scoped>
/* 相关文章卡片动画 */
.related-article-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.related-article-card:nth-child(1) {
  animation-delay: 0.1s;
}

.related-article-card:nth-child(2) {
  animation-delay: 0.2s;
}

.related-article-card:nth-child(3) {
  animation-delay: 0.3s;
}

.related-article-card:nth-child(4) {
  animation-delay: 0.4s;
}

.related-article-card:nth-child(5) {
  animation-delay: 0.5s;
}

.related-article-card:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>