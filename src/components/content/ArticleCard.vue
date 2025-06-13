<template>
  <article
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300 group',
      {
        'shadow-lg hover:shadow-xl card-hover': !compact,
        'shadow-md hover:shadow-lg': compact,
        'lg:flex lg:h-full': featured,
        'border border-neutral-200': compact
      }
    ]"
  >
    <!-- 图片区域 -->
    <div
      :class="[
        'relative overflow-hidden',
        {
          'aspect-w-16 aspect-h-9': !featured && !compact,
          'lg:w-1/2 lg:aspect-none lg:h-full': featured,
          'w-24 h-24 flex-shrink-0': compact
        }
      ]"
    >
      <img
        :src="article.featuredImage?.url || '/placeholder-article.jpg'"
        :alt="article.featuredImage?.alt || article.title"
        :class="[
          'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
          {
            'lg:h-full': featured,
            'rounded-lg': compact
          }
        ]"
        loading="lazy"
      />
      
      <!-- 分类标签 -->
      <div
        v-if="article.category && !compact"
        class="absolute top-4 left-4"
      >
        <span class="tag tag-primary">
          {{ article.category.name }}
        </span>
      </div>
      
      <!-- 阅读时间 -->
      <div
        v-if="!compact"
        class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
      >
        {{ getReadingTime(article.content) }}分钟阅读
      </div>
    </div>

    <!-- 内容区域 -->
    <div
      :class="[
        'p-6',
        {
          'lg:w-1/2 lg:flex lg:flex-col lg:justify-between': featured,
          'p-4 flex-1': compact
        }
      ]"
    >
      <!-- 元信息 -->
      <div
        v-if="!compact"
        class="flex items-center justify-between text-sm text-neutral-500 mb-3"
      >
        <div class="flex items-center space-x-4">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article.publishedAt) }}
          </span>
          <span v-if="article.author" class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ article.author.name }}
          </span>
        </div>
        <div class="flex items-center space-x-3 text-neutral-400">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ article.views || 0 }}
          </span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {{ article.likes || 0 }}
          </span>
        </div>
      </div>

      <!-- 标题 -->
      <h3
        :class="[
          'font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200',
          {
            'text-2xl md:text-3xl leading-tight': featured,
            'text-lg': !featured && !compact,
            'text-base line-clamp-2': compact
          }
        ]"
      >
        <router-link :to="`/news/${article.slug}`" class="hover:underline">
          {{ article.title }}
        </router-link>
      </h3>

      <!-- 摘要 -->
      <p
        v-if="article.excerpt && !compact"
        :class="[
          'text-neutral-600 mb-4 leading-relaxed',
          {
            'text-lg': featured,
            'text-sm line-clamp-3': !featured
          }
        ]"
      >
        {{ article.excerpt }}
      </p>

      <!-- 标签 -->
      <div
        v-if="article.tags && article.tags.length > 0 && !compact"
        class="flex flex-wrap gap-2 mb-4"
      >
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag.id"
          class="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
          @click="$router.push(`/tag/${tag.slug}`)"
        >
          #{{ tag.name }}
        </span>
      </div>

      <!-- 底部操作区域 -->
      <div
        :class="[
          'flex items-center justify-between',
          {
            'mt-auto': featured,
            'mt-4': !compact,
            'mt-2': compact
          }
        ]"
      >
        <router-link
          :to="`/news/${article.slug}`"
          :class="[
            'font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center group/link',
            {
              'text-lg': featured,
              'text-sm': compact
            }
          ]"
        >
          {{ compact ? '阅读' : '阅读全文' }}
          <svg class="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- 分享按钮 -->
        <div v-if="!compact" class="flex items-center space-x-2">
          <button
            @click="shareArticle('twitter')"
            class="p-2 text-neutral-400 hover:text-blue-500 transition-colors duration-200"
            aria-label="分享到Twitter"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button
            @click="shareArticle('facebook')"
            class="p-2 text-neutral-400 hover:text-blue-600 transition-colors duration-200"
            aria-label="分享到Facebook"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button
            @click="copyArticleLink"
            class="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            aria-label="复制链接"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        <!-- 紧凑模式的时间显示 -->
        <span v-if="compact" class="text-xs text-neutral-500">
          {{ formatRelativeTime(article.publishedAt) }}
        </span>
      </div>
    </div>
  </article>
</template>

<script>
import { useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'
import { useUIStore } from '../../stores/ui'
import { formatDate, formatRelativeTime, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    const contentStore = useContentStore()
    const uiStore = useUIStore()

    // 计算阅读时间
    const getReadingTime = (content) => {
      if (!content) return 1
      const wordsPerMinute = 200
      const wordCount = content.length / 5 // 中文字符估算
      return Math.ceil(wordCount / wordsPerMinute) || 1
    }

    // 分享文章
    const shareArticle = async (platform) => {
      const url = `${window.location.origin}/news/${props.article.slug}`
      const title = props.article.title
      const text = props.article.excerpt || title

      let shareUrl = ''
      
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
          break
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          break
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
        
        // 记录分享事件
        try {
          await contentStore.shareArticle(props.article.id, platform)
        } catch (error) {
          console.error('记录分享失败:', error)
        }
      }
    }

    // 复制文章链接
    const copyArticleLink = async () => {
      const url = `${window.location.origin}/news/${props.article.slug}`
      const success = await copyToClipboard(url)
      
      if (success) {
        uiStore.showSuccess('链接已复制到剪贴板')
      } else {
        uiStore.showError('复制失败，请手动复制链接')
      }
    }

    return {
      getReadingTime,
      shareArticle,
      copyArticleLink,
      formatDate,
      formatRelativeTime
    }
  }
}
</script>

<style scoped>
/* 文本截断样式 */
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

/* 宽高比样式 */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* 卡片悬停效果 */
.card-hover:hover {
  transform: translateY(-2px);
}

/* 标签悬停效果 */
.tag:hover {
  transform: scale(1.05);
}
</style>