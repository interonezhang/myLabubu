<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
    <!-- 评论头部 -->
    <div class="flex items-start space-x-4">
      <!-- 头像 -->
      <div class="flex-shrink-0">
        <img
          v-if="comment.author?.avatar"
          :src="comment.author.avatar"
          :alt="comment.author.name"
          class="w-10 h-10 rounded-full"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"
        >
          <span class="text-primary-600 font-medium text-sm">
            {{ getInitials(comment.author?.name || comment.name || '匿名') }}
          </span>
        </div>
      </div>

      <!-- 评论内容 -->
      <div class="flex-1 min-w-0">
        <!-- 用户信息和时间 -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <h4 class="font-medium text-neutral-900">
              {{ comment.author?.name || comment.name || '匿名用户' }}
            </h4>
            <span v-if="comment.author?.verified" class="text-primary-600" title="认证用户">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
            <span v-if="comment.isAuthor" class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              作者
            </span>
          </div>
          
          <div class="flex items-center space-x-2 text-sm text-neutral-500">
            <time :datetime="comment.createdAt" :title="formatFullDate(comment.createdAt)">
              {{ formatRelativeTime(comment.createdAt) }}
            </time>
            
            <!-- 更多操作 -->
            <div class="relative">
              <button
                @click="showMenu = !showMenu"
                class="p-1 text-neutral-400 hover:text-neutral-600 rounded"
                aria-label="更多操作"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              <!-- 下拉菜单 -->
              <div
                v-if="showMenu"
                v-click-outside="() => showMenu = false"
                class="absolute right-0 top-full mt-1 w-32 bg-white border border-neutral-200 rounded-lg shadow-lg z-10"
              >
                <button
                  @click="copyCommentLink"
                  class="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 rounded-t-lg"
                >
                  复制链接
                </button>
                <button
                  @click="$emit('report', comment)"
                  class="w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 rounded-b-lg"
                >
                  举报
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 评论内容 -->
        <div class="prose prose-sm max-w-none mb-4" v-html="renderedContent"></div>

        <!-- 评论操作 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- 点赞 -->
            <button
              @click="toggleLike"
              :class="[
                'flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors',
                comment.isLiked
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
              ]"
            >
              <svg class="w-4 h-4" :fill="comment.isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{{ comment.likes || 0 }}</span>
            </button>

            <!-- 回复 -->
            <button
              @click="toggleReply"
              class="flex items-center space-x-1 px-3 py-1 rounded-full text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span>回复</span>
            </button>

            <!-- 分享 -->
            <button
              @click="shareComment"
              class="flex items-center space-x-1 px-3 py-1 rounded-full text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>分享</span>
            </button>
          </div>

          <!-- 楼层号 -->
          <span v-if="comment.floor" class="text-xs text-neutral-400">
            #{{ comment.floor }}
          </span>
        </div>

        <!-- 回复表单 -->
        <div v-if="showReplyForm" class="mt-4 p-4 bg-neutral-50 rounded-lg">
          <form @submit.prevent="submitReply" class="space-y-3">
            <textarea
              v-model="replyContent"
              placeholder="写下你的回复..."
              rows="3"
              class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
              @input="updateReplyCharCount"
            ></textarea>
            
            <div class="flex items-center justify-between">
              <span class="text-xs text-neutral-500">
                {{ replyContent.length }}/300 字符
              </span>
              
              <div class="flex items-center space-x-2">
                <button
                  type="button"
                  @click="cancelReply"
                  class="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  :disabled="!replyContent.trim() || isSubmittingReply"
                  :class="[
                    'px-4 py-1 text-sm rounded-lg transition-colors',
                    replyContent.trim() && !isSubmittingReply
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  ]"
                >
                  {{ isSubmittingReply ? '发布中...' : '发布' }}
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- 子评论 -->
        <div v-if="comment.replies && comment.replies.length > 0" class="mt-6 space-y-4">
          <div class="border-l-2 border-neutral-200 pl-4">
            <CommentItem
              v-for="reply in comment.replies"
              :key="reply.id"
              :comment="reply"
              :article-id="articleId"
              :is-reply="true"
              @reply="$emit('reply', $event)"
              @like="$emit('like', $event)"
              @report="$emit('report', $event)"
            />
          </div>
          
          <!-- 加载更多回复 -->
          <button
            v-if="comment.hasMoreReplies"
            @click="loadMoreReplies"
            class="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            查看更多回复 ({{ comment.totalReplies - comment.replies.length }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useUIStore } from '../../stores/ui'
import { formatRelativeTime, formatDate, copyToClipboard } from '../../utils/helpers'
import { api } from '../../utils/api'

export default {
  name: 'CommentItem',
  emits: ['reply', 'like', 'report'],
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number],
      required: true
    },
    isReply: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const uiStore = useUIStore()

    // 状态
    const showMenu = ref(false)
    const showReplyForm = ref(false)
    const replyContent = ref('')
    const isSubmittingReply = ref(false)

    // 获取用户名首字母
    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    // 格式化完整日期
    const formatFullDate = (date) => {
      return formatDate(date, 'YYYY-MM-DD HH:mm:ss')
    }

    // 渲染评论内容（支持简单的Markdown）
    const renderedContent = computed(() => {
      let content = props.comment.content || ''
      
      // 简单的Markdown渲染
      content = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">$1</a>')
      
      return content
    })

    // 更新回复字符计数
    const updateReplyCharCount = () => {
      if (replyContent.value.length > 300) {
        replyContent.value = replyContent.value.substring(0, 300)
      }
    }

    // 切换点赞
    const toggleLike = () => {
      emit('like', props.comment.id)
    }

    // 切换回复表单
    const toggleReply = () => {
      showReplyForm.value = !showReplyForm.value
      if (showReplyForm.value) {
        replyContent.value = ''
      }
    }

    // 取消回复
    const cancelReply = () => {
      showReplyForm.value = false
      replyContent.value = ''
    }

    // 提交回复
    const submitReply = async () => {
      if (!replyContent.value.trim()) return

      try {
        isSubmittingReply.value = true

        const replyData = {
          content: replyContent.value,
          parentId: props.comment.id
        }

        await api.post(`/articles/${props.articleId}/comments`, replyData)

        // 重置表单
        replyContent.value = ''
        showReplyForm.value = false

        // 触发父组件重新加载评论
        emit('reply', props.comment)

        uiStore.showSuccess('回复发布成功！')

      } catch (error) {
        console.error('发布回复失败:', error)
        uiStore.showError('发布回复失败，请稍后重试')
      } finally {
        isSubmittingReply.value = false
      }
    }

    // 复制评论链接
    const copyCommentLink = async () => {
      const url = `${window.location.href}#comment-${props.comment.id}`
      const success = await copyToClipboard(url)
      
      if (success) {
        uiStore.showSuccess('评论链接已复制到剪贴板')
      } else {
        uiStore.showError('复制失败')
      }
      
      showMenu.value = false
    }

    // 分享评论
    const shareComment = async () => {
      const url = `${window.location.href}#comment-${props.comment.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: '分享评论',
            text: props.comment.content.substring(0, 100) + '...',
            url: url
          })
        } catch (error) {
          if (error.name !== 'AbortError') {
            copyCommentLink()
          }
        }
      } else {
        copyCommentLink()
      }
    }

    // 加载更多回复
    const loadMoreReplies = async () => {
      try {
        const response = await api.get(`/comments/${props.comment.id}/replies`, {
          params: {
            page: Math.ceil(props.comment.replies.length / 10) + 1,
            limit: 10
          }
        })

        props.comment.replies.push(...response.data.data)
        props.comment.hasMoreReplies = response.data.meta.hasMore

      } catch (error) {
        console.error('加载更多回复失败:', error)
        uiStore.showError('加载失败')
      }
    }

    return {
      showMenu,
      showReplyForm,
      replyContent,
      isSubmittingReply,
      renderedContent,
      getInitials,
      formatFullDate,
      formatRelativeTime,
      updateReplyCharCount,
      toggleLike,
      toggleReply,
      cancelReply,
      submitReply,
      copyCommentLink,
      shareComment,
      loadMoreReplies
    }
  }
}
</script>

<style scoped>
/* 评论内容样式 */
.prose {
  @apply text-neutral-700 leading-relaxed;
}

.prose code {
  @apply bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-sm;
}

.prose strong {
  @apply font-semibold text-neutral-900;
}

.prose em {
  @apply italic;
}

/* 点击外部关闭菜单指令 */
.v-click-outside {
  position: relative;
}

/* 动画效果 */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* 回复表单动画 */
.reply-form-enter-active,
.reply-form-leave-active {
  transition: all 0.3s ease;
}

.reply-form-enter-from,
.reply-form-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>