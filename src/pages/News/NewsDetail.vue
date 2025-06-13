<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div class="loading-spinner w-12 h-12"></div>
    </div>

    <!-- 文章内容 -->
    <div v-else-if="article" class="max-w-4xl mx-auto">
      <!-- 面包屑导航 -->
      <nav class="bg-white border-b border-neutral-200 py-4">
        <div class="container-custom">
          <ol class="flex items-center space-x-2 text-sm text-neutral-500">
            <li>
              <router-link to="/" class="hover:text-primary-600 transition-colors">首页</router-link>
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <router-link to="/news" class="hover:text-primary-600 transition-colors">资讯</router-link>
            </li>
            <li v-if="article.category" class="flex items-center">
              <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <router-link 
                :to="`/news/category/${article.category.slug}`" 
                class="hover:text-primary-600 transition-colors"
              >
                {{ article.category.name }}
              </router-link>
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-neutral-900 font-medium">{{ article.title }}</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- 文章头部 -->
      <article class="bg-white">
        <header class="container-custom py-12">
          <!-- 分类标签 -->
          <div v-if="article.category" class="mb-6">
            <span class="tag tag-primary">{{ article.category.name }}</span>
          </div>

          <!-- 标题 -->
          <h1 class="text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-6">
            {{ article.title }}
          </h1>

          <!-- 摘要 -->
          <p v-if="article.excerpt" class="text-xl text-neutral-600 leading-relaxed mb-8">
            {{ article.excerpt }}
          </p>

          <!-- 文章元信息 -->
          <div class="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-neutral-200">
            <div class="flex items-center space-x-6 text-sm text-neutral-500">
              <div v-if="article.author" class="flex items-center">
                <img 
                  v-if="article.author.avatar"
                  :src="article.author.avatar" 
                  :alt="article.author.name"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p class="font-medium text-neutral-900">{{ article.author.name }}</p>
                  <p class="text-xs">{{ article.author.title || '编辑' }}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(article.publishedAt) }}
              </div>

              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ getReadingTime(article.content) }}分钟阅读
              </div>

              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ article.views || 0 }} 次浏览
              </div>
            </div>

            <!-- 社交分享 -->
            <SocialShare :article="article" />
          </div>
        </header>

        <!-- 特色图片 -->
        <div v-if="article.featuredImage" class="container-custom mb-12">
          <img
            :src="article.featuredImage.url"
            :alt="article.featuredImage.alt || article.title"
            class="w-full h-auto rounded-xl shadow-lg"
            loading="eager"
          />
          <p v-if="article.featuredImage.caption" class="text-sm text-neutral-500 text-center mt-4">
            {{ article.featuredImage.caption }}
          </p>
        </div>

        <!-- 文章内容 -->
        <div class="container-custom">
          <div class="prose prose-lg max-w-none mb-12" v-html="article.content"></div>

          <!-- 标签 -->
          <div v-if="article.tags && article.tags.length > 0" class="mb-8">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">相关标签</h3>
            <div class="flex flex-wrap gap-2">
              <router-link
                v-for="tag in article.tags"
                :key="tag.id"
                :to="`/tag/${tag.slug}`"
                class="tag tag-outline hover:tag-primary transition-colors"
              >
                #{{ tag.name }}
              </router-link>
            </div>
          </div>

          <!-- 文章操作 -->
          <div class="flex items-center justify-between py-8 border-t border-neutral-200">
            <div class="flex items-center space-x-4">
              <button
                @click="toggleLike"
                :class="[
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                  article.isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                ]"
              >
                <svg class="w-5 h-5" :fill="article.isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ article.likes || 0 }}</span>
              </button>

              <button
                @click="shareArticle"
                class="flex items-center space-x-2 px-4 py-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>分享</span>
              </button>
            </div>

            <div class="text-sm text-neutral-500">
              最后更新：{{ formatDate(article.updatedAt) }}
            </div>
          </div>
        </div>
      </article>

      <!-- 相关文章 -->
      <RelatedArticles 
        v-if="relatedArticles.length > 0"
        :articles="relatedArticles"
        :current-article="article"
      />

      <!-- 评论区 -->
      <CommentSection :article-id="article.id" />
    </div>

    <!-- 404错误 -->
    <div v-else class="flex flex-col items-center justify-center min-h-screen text-center">
      <svg class="w-24 h-24 text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h1 class="text-3xl font-bold text-neutral-900 mb-4">文章未找到</h1>
      <p class="text-neutral-600 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
      <router-link to="/news" class="btn-primary">
        返回资讯列表
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'
import { useUIStore } from '../../stores/ui'
import { formatDate, formatRelativeTime } from '../../utils/helpers'
import SocialShare from '../../components/content/SocialShare.vue'
import RelatedArticles from '../../components/content/RelatedArticles.vue'
import CommentSection from '../../components/content/CommentSection.vue'

export default {
  name: 'NewsDetail',
  components: {
    SocialShare,
    RelatedArticles,
    CommentSection
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contentStore = useContentStore()
    const uiStore = useUIStore()

    const article = ref(null)
    const relatedArticles = ref([])
    const isLoading = ref(true)

    // 计算阅读时间
    const getReadingTime = (content) => {
      if (!content) return 1
      const wordsPerMinute = 200
      const wordCount = content.length / 5 // 中文字符估算
      return Math.ceil(wordCount / wordsPerMinute) || 1
    }

    // 加载文章详情
    const loadArticle = async () => {
      try {
        isLoading.value = true
        const slug = route.params.slug
        
        // 获取文章详情
        const articleData = await contentStore.fetchArticle(slug)
        article.value = articleData

        // 增加浏览量
        await contentStore.incrementArticleViews(articleData.id)

        // 获取相关文章
        await loadRelatedArticles(articleData)

        // 更新页面SEO信息
        updatePageMeta(articleData)

      } catch (error) {
        console.error('加载文章失败:', error)
        uiStore.showError('文章加载失败')
      } finally {
        isLoading.value = false
      }
    }

    // 加载相关文章
    const loadRelatedArticles = async (currentArticle) => {
      try {
        const params = {
          category: currentArticle.category?.slug,
          exclude: currentArticle.id,
          limit: 4
        }
        
        const response = await contentStore.fetchArticles(params)
        relatedArticles.value = response.data || []
      } catch (error) {
        console.error('加载相关文章失败:', error)
      }
    }

    // 更新页面元信息
    const updatePageMeta = (articleData) => {
      document.title = `${articleData.title} | Labubu Portal`
      
      // 更新meta标签
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.content = articleData.excerpt || articleData.title
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords && articleData.tags) {
        const keywords = articleData.tags.map(tag => tag.name).join(',')
        metaKeywords.content = `${keywords},Labubu,资讯`
      }

      // 添加结构化数据
      addStructuredData(articleData)
    }

    // 添加结构化数据
    const addStructuredData = (articleData) => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.excerpt,
        "image": articleData.featuredImage?.url,
        "author": {
          "@type": "Person",
          "name": articleData.author?.name || "Labubu Portal"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Labubu Portal",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`
          }
        },
        "datePublished": articleData.publishedAt,
        "dateModified": articleData.updatedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      }

      // 移除现有的结构化数据
      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        existingScript.remove()
      }

      // 添加新的结构化数据
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    // 切换点赞状态
    const toggleLike = async () => {
      try {
        if (article.value.isLiked) {
          await contentStore.unlikeArticle(article.value.id)
        } else {
          await contentStore.likeArticle(article.value.id)
        }
      } catch (error) {
        uiStore.showError('操作失败，请稍后重试')
      }
    }

    // 分享文章
    const shareArticle = () => {
      if (navigator.share) {
        navigator.share({
          title: article.value.title,
          text: article.value.excerpt,
          url: window.location.href
        })
      } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(() => {
          uiStore.showSuccess('链接已复制到剪贴板')
        })
      }
    }

    onMounted(() => {
      loadArticle()
    })

    return {
      article,
      relatedArticles,
      isLoading,
      getReadingTime,
      toggleLike,
      shareArticle,
      formatDate,
      formatRelativeTime
    }
  },
  head() {
    if (this.article) {
      return {
        title: this.article.title,
        meta: [
          {
            name: 'description',
            content: this.article.excerpt || this.article.title
          },
          {
            name: 'keywords',
            content: this.article.tags ? this.article.tags.map(tag => tag.name).join(',') + ',Labubu,资讯' : 'Labubu,资讯'
          },
          {
            property: 'og:title',
            content: this.article.title
          },
          {
            property: 'og:description',
            content: this.article.excerpt || this.article.title
          },
          {
            property: 'og:image',
            content: this.article.featuredImage?.url
          },
          {
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'article:published_time',
            content: this.article.publishedAt
          },
          {
            property: 'article:modified_time',
            content: this.article.updatedAt
          }
        ]
      }
    }
    return {}
  }
}
</script>

<style scoped>
/* 加载动画 */
.loading-spinner {
  @apply animate-spin rounded-full border-4 border-neutral-200 border-t-primary-600;
}

/* 文章内容样式 */
.prose {
  @apply text-neutral-700 leading-relaxed;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-neutral-900 font-semibold mt-8 mb-4;
}

.prose h2 {
  @apply text-2xl;
}

.prose h3 {
  @apply text-xl;
}

.prose p {
  @apply mb-6;
}

.prose img {
  @apply rounded-lg shadow-md my-8;
}

.prose blockquote {
  @apply border-l-4 border-primary-500 pl-6 italic text-neutral-600 my-6;
}

.prose ul,
.prose ol {
  @apply my-6 pl-6;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-primary-600 hover:text-primary-700 underline;
}

.prose code {
  @apply bg-neutral-100 text-neutral-800 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto my-6;
}

.prose pre code {
  @apply bg-transparent text-inherit p-0;
}
</style>