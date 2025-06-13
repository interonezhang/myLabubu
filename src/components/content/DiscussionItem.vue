<template>
  <div
    :class="[
      'bg-white rounded-xl p-6 transition-all duration-300 cursor-pointer group',
      'hover:shadow-lg hover:border-primary-200',
      {
        'border-2 border-amber-200 bg-amber-50': pinned,
        'border border-neutral-200': !pinned,
        'border-l-4 border-l-green-500': topic.solved
      }
    ]"
    @click="$router.push(`/community/discussions/${topic.id}`)"
  >
    <div class="flex items-start space-x-4">
      <!-- 作者头像 -->
      <div class="flex-shrink-0">
        <img
          :src="topic.author.avatar || '/default-avatar.jpg'"
          :alt="topic.author.name"
          class="w-12 h-12 rounded-full"
        />
      </div>

      <!-- 主要内容 -->
      <div class="flex-1 min-w-0">
        <!-- 头部信息 -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3 flex-wrap">
            <!-- 置顶标识 -->
            <span
              v-if="pinned"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
            >
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 12V4a1 1 0 00-1-1h-1V2a1 1 0 00-2 0v1h-4V2a1 1 0 00-2 0v1H5a1 1 0 00-1 1v8H3a1 1 0 000 2h1v8a1 1 0 001 1h1v1a1 1 0 002 0v-1h4v1a1 1 0 002 0v-1h1a1 1 0 001-1v-8h1a1 1 0 000-2h-1z"/>
              </svg>
              置顶
            </span>

            <!-- 已解决标识 -->
            <span
              v-if="topic.solved"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              已解决
            </span>

            <!-- 分类标签 -->
            <span
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                getCategoryClass(topic.category)
              ]"
            >
              {{ getCategoryIcon(topic.category) }} {{ getCategoryLabel(topic.category) }}
            </span>
          </div>

          <!-- 时间信息 -->
          <div class="text-sm text-neutral-500 text-right flex-shrink-0">
            <div>{{ formatRelativeTime(topic.createdAt) }}</div>
            <div v-if="topic.lastReplyAt && topic.lastReplyAt !== topic.createdAt" class="text-xs">
              最后回复 {{ formatRelativeTime(topic.lastReplyAt) }}
            </div>
          </div>
        </div>

        <!-- 标题 -->
        <h3 class="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ topic.title }}
        </h3>

        <!-- 内容预览 -->
        <p class="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {{ topic.content }}
        </p>

        <!-- 标签 -->
        <div
          v-if="topic.tags && topic.tags.length > 0"
          class="flex flex-wrap gap-2 mb-4"
        >
          <span
            v-for="tag in topic.tags.slice(0, 3)"
            :key="tag"
            class="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- 底部信息 -->
        <div class="flex items-center justify-between">
          <!-- 作者信息 -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
              <span class="font-medium text-neutral-900">{{ topic.author.name }}</span>
              <span
                v-if="topic.author.verified"
                class="text-blue-500"
                title="认证用户"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
            </div>
            <span class="text-xs text-neutral-500">{{ topic.author.level }}</span>
          </div>

          <!-- 统计信息 -->
          <div class="flex items-center space-x-4 text-sm text-neutral-500">
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
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div class="flex flex-col space-y-2">
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
            @click.stop="shareDiscussion"
            class="p-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
            title="分享"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>

          <button
            @click.stop="addToBookmarks"
            :class="[
              'p-2 rounded-lg transition-colors duration-200',
              isBookmarked
                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
            :title="isBookmarked ? '取消收藏' : '收藏'"
          >
            <svg class="w-4 h-4" :fill="isBookmarked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 最新回复预览 -->
    <div
      v-if="topic.latestReply && !pinned"
      class="mt-4 pt-4 border-t border-neutral-100"
    >
      <div class="flex items-start space-x-3">
        <img
          :src="topic.latestReply.author.avatar || '/default-avatar.jpg'"
          :alt="topic.latestReply.author.name"
          class="w-6 h-6 rounded-full"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <span class="text-sm font-medium text-neutral-900">{{ topic.latestReply.author.name }}</span>
            <span class="text-xs text-neutral-500">{{ formatRelativeTime(topic.latestReply.createdAt) }}</span>
          </div>
          <p class="text-sm text-neutral-600 line-clamp-1">{{ topic.latestReply.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useUIStore } from '../../stores/ui'
import { formatRelativeTime, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'DiscussionItem',
  props: {
    topic: {
      type: Object,
      required: true
    },
    pinned: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const uiStore = useUIStore()

    const isLiked = ref(false) // 这里应该从用户状态获取
    const isBookmarked = ref(false) // 这里应该从用户状态获取

    // 获取分类样式
    const getCategoryClass = (category) => {
      const classes = {
        collection: 'bg-blue-100 text-blue-700',
        newbie: 'bg-green-100 text-green-700',
        trading: 'bg-orange-100 text-orange-700',
        news: 'bg-purple-100 text-purple-700',
        diy: 'bg-pink-100 text-pink-700',
        events: 'bg-indigo-100 text-indigo-700'
      }
      return classes[category] || 'bg-neutral-100 text-neutral-700'
    }

    // 获取分类标签
    const getCategoryLabel = (category) => {
      const labels = {
        collection: '收藏心得',
        newbie: '新手问题',
        trading: '交易信息',
        news: '新品讨论',
        diy: 'DIY创作',
        events: '活动相关'
      }
      return labels[category] || '其他'
    }

    // 获取分类图标
    const getCategoryIcon = (category) => {
      const icons = {
        collection: '💎',
        newbie: '🔰',
        trading: '💰',
        news: '🆕',
        diy: '🎨',
        events: '🎉'
      }
      return icons[category] || '💬'
    }

    // 切换点赞
    const toggleLike = async () => {
      try {
        isLiked.value = !isLiked.value
        
        if (isLiked.value) {
          props.topic.likes++
          uiStore.showSuccess('点赞成功')
        } else {
          props.topic.likes--
          uiStore.showSuccess('取消点赞')
        }

        // 这里应该调用API更新点赞状态
      } catch (error) {
        console.error('点赞操作失败:', error)
        uiStore.showError('操作失败')
      }
    }

    // 分享讨论
    const shareDiscussion = async () => {
      const url = `${window.location.origin}/community/discussions/${props.topic.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.topic.title,
            text: props.topic.content,
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

    // 添加到书签
    const addToBookmarks = () => {
      isBookmarked.value = !isBookmarked.value
      
      if (isBookmarked.value) {
        uiStore.showSuccess('已添加到书签')
      } else {
        uiStore.showSuccess('已从书签移除')
      }

      // 这里应该调用API更新书签状态
    }

    return {
      isLiked,
      isBookmarked,
      getCategoryClass,
      getCategoryLabel,
      getCategoryIcon,
      toggleLike,
      shareDiscussion,
      addToBookmarks,
      formatRelativeTime
    }
  }
}
</script>

<style scoped>
/* 文本截断 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 卡片悬停效果 */
.group:hover {
  transform: translateY(-1px);
}

/* 置顶卡片特殊效果 */
.border-amber-200 {
  position: relative;
}

.border-amber-200::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, theme('colors.amber.200'), theme('colors.yellow.200'));
  border-radius: inherit;
  z-index: -1;
  opacity: 0.5;
}

/* 已解决话题左边框 */
.border-l-green-500 {
  border-left-width: 4px;
  border-left-color: theme('colors.green.500');
}

/* 响应式调整 */
@media (max-width: 640px) {
  .flex-col {
    flex-direction: row;
    space-y: 0;
    gap: 0.5rem;
  }
  
  .opacity-0 {
    opacity: 1;
  }
}
</style>