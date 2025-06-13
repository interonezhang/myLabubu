<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer',
      'hover:shadow-xl hover:-translate-y-1',
      {
        'shadow-lg': !featured,
        'shadow-xl border-2 border-primary-200': featured
      }
    ]"
    @click="$router.push(`/community/showcase/${showcase.id}`)"
  >
    <!-- 图片区域 -->
    <div class="relative overflow-hidden">
      <img
        :src="showcase.coverImage || '/placeholder-showcase.jpg'"
        :alt="showcase.title"
        :class="[
          'w-full object-cover transition-transform duration-500 group-hover:scale-105',
          featured ? 'h-64' : 'h-48'
        ]"
        loading="lazy"
      />
      
      <!-- 收藏数量标识 -->
      <div class="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
        {{ showcase.itemCount }} 件
      </div>

      <!-- 分类标签 -->
      <div
        v-if="showcase.category"
        class="absolute top-3 left-3"
      >
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            getCategoryClass(showcase.category)
          ]"
        >
          {{ getCategoryLabel(showcase.category) }}
        </span>
      </div>

      <!-- 精选标识 -->
      <div
        v-if="featured"
        class="absolute bottom-3 left-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
      >
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        精选
      </div>

      <!-- 图片数量指示器 -->
      <div
        v-if="showcase.images && showcase.images.length > 1"
        class="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center"
      >
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ showcase.images.length }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div :class="['p-6', { 'p-8': featured }]">
      <!-- 作者信息 -->
      <div class="flex items-center space-x-3 mb-4">
        <img
          :src="showcase.author.avatar || '/default-avatar.jpg'"
          :alt="showcase.author.name"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <h4 class="font-medium text-neutral-900">{{ showcase.author.name }}</h4>
            <span
              v-if="showcase.author.verified"
              class="text-blue-500"
              title="认证收藏家"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
          </div>
          <p class="text-sm text-neutral-500">{{ showcase.author.level }}</p>
        </div>
        <span class="text-xs text-neutral-400">
          {{ formatRelativeTime(showcase.createdAt) }}
        </span>
      </div>

      <!-- 标题和描述 -->
      <h3
        :class="[
          'font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors',
          featured ? 'text-xl' : 'text-lg'
        ]"
      >
        {{ showcase.title }}
      </h3>
      
      <p
        :class="[
          'text-neutral-600 mb-4 leading-relaxed',
          featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
        ]"
      >
        {{ showcase.description }}
      </p>

      <!-- 标签 -->
      <div
        v-if="showcase.tags && showcase.tags.length > 0"
        class="flex flex-wrap gap-2 mb-4"
      >
        <span
          v-for="tag in showcase.tags.slice(0, 3)"
          :key="tag"
          class="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 统计信息 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-neutral-500">
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
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {{ showcase.comments }}
          </span>
        </div>

        <!-- 操作按钮 -->
        <div class="flex items-center space-x-2">
          <button
            @click.stop="toggleLike"
            :class="[
              'p-2 rounded-lg transition-colors duration-200',
              isLiked
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
            :title="isLiked ? '取消点赞' : '点赞'"
          >
            <svg class="w-4 h-4" :fill="isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <button
            @click.stop="shareShowcase"
            class="p-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
            title="分享"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>

          <button
            @click.stop="addToFavorites"
            :class="[
              'p-2 rounded-lg transition-colors duration-200',
              isFavorited
                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
            :title="isFavorited ? '取消收藏' : '收藏'"
          >
            <svg class="w-4 h-4" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 悬停效果 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useUIStore } from '../../stores/ui'
import { formatRelativeTime, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'ShowcaseCard',
  props: {
    showcase: {
      type: Object,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    masonry: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const uiStore = useUIStore()

    const isLiked = ref(false) // 这里应该从用户状态获取
    const isFavorited = ref(false) // 这里应该从用户状态获取

    // 获取分类样式
    const getCategoryClass = (category) => {
      const classes = {
        complete: 'bg-blue-500 text-white',
        rare: 'bg-purple-500 text-white',
        theme: 'bg-green-500 text-white',
        diy: 'bg-orange-500 text-white'
      }
      return classes[category] || 'bg-neutral-500 text-white'
    }

    // 获取分类标签
    const getCategoryLabel = (category) => {
      const labels = {
        complete: '完整系列',
        rare: '稀有收藏',
        theme: '主题展示',
        diy: 'DIY创作'
      }
      return labels[category] || '其他'
    }

    // 切换点赞
    const toggleLike = async () => {
      try {
        isLiked.value = !isLiked.value
        
        if (isLiked.value) {
          props.showcase.likes++
          uiStore.showSuccess('点赞成功')
        } else {
          props.showcase.likes--
          uiStore.showSuccess('取消点赞')
        }

        // 这里应该调用API更新点赞状态
      } catch (error) {
        console.error('点赞操作失败:', error)
        uiStore.showError('操作失败')
      }
    }

    // 分享展示
    const shareShowcase = async () => {
      const url = `${window.location.origin}/community/showcase/${props.showcase.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.showcase.title,
            text: props.showcase.description,
            url: url
          })
        } catch (error) {
          if (error.name !== 'AbortError') {
            copyLink(url)
          }
        }
      } else {
        copyLink(url)
      }
    }

    // 复制链接
    const copyLink = async (url) => {
      const success = await copyToClipboard(url)
      
      if (success) {
        uiStore.showSuccess('链接已复制到剪贴板')
      } else {
        uiStore.showError('复制失败')
      }
    }

    // 添加到收藏
    const addToFavorites = () => {
      isFavorited.value = !isFavorited.value
      
      if (isFavorited.value) {
        uiStore.showSuccess('已添加到收藏')
      } else {
        uiStore.showSuccess('已从收藏移除')
      }

      // 这里应该调用API更新收藏状态
    }

    return {
      isLiked,
      isFavorited,
      getCategoryClass,
      getCategoryLabel,
      toggleLike,
      shareShowcase,
      addToFavorites,
      formatRelativeTime
    }
  }
}
</script>

<style scoped>
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

/* 卡片悬停效果 */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* 精选卡片特殊效果 */
.border-primary-200 {
  position: relative;
}

.border-primary-200::before {
  content: '';
  position: absolute;
  inset: -2px;
  padding: 2px;
  background: linear-gradient(45deg, theme('colors.primary.400'), theme('colors.secondary.400'));
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .p-6 {
    @apply p-4;
  }
  
  .p-8 {
    @apply p-6;
  }
}
</style>