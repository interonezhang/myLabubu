<template>
  <section class="bg-neutral-50 py-12">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <!-- 评论标题 -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            评论 <span class="text-lg text-neutral-500">({{ totalComments }})</span>
          </h2>
          
          <!-- 排序选项 -->
          <select
            v-model="sortBy"
            @change="loadComments"
            class="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
          >
            <option value="newest">最新</option>
            <option value="oldest">最早</option>
            <option value="likes">最多点赞</option>
          </select>
        </div>

        <!-- 发表评论 -->
        <div class="bg-white rounded-xl p-6 mb-8 shadow-sm border border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">发表评论</h3>
          
          <form @submit.prevent="submitComment" class="space-y-4">
            <!-- 用户信息 -->
            <div v-if="!isLoggedIn" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-neutral-700 mb-2">
                  昵称 <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="commentForm.name"
                  type="text"
                  required
                  placeholder="请输入您的昵称"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
                  邮箱 <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="commentForm.email"
                  type="email"
                  required
                  placeholder="请输入您的邮箱"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- 评论内容 -->
            <div>
              <label for="content" class="block text-sm font-medium text-neutral-700 mb-2">
                评论内容 <span class="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                v-model="commentForm.content"
                required
                rows="4"
                placeholder="请输入您的评论..."
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                @input="updateCharCount"
              ></textarea>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-neutral-500">
                  {{ commentForm.content.length }}/500 字符
                </span>
                <div class="flex items-center space-x-4 text-xs text-neutral-500">
                  <span>支持 Markdown 语法</span>
                  <button
                    type="button"
                    @click="showMarkdownHelp = !showMarkdownHelp"
                    class="text-primary-600 hover:text-primary-700"
                  >
                    语法帮助
                  </button>
                </div>
              </div>
            </div>

            <!-- Markdown 帮助 -->
            <div v-if="showMarkdownHelp" class="bg-neutral-50 rounded-lg p-4 text-sm">
              <h4 class="font-medium text-neutral-900 mb-2">Markdown 语法帮助</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-600">
                <div>
                  <p><code>**粗体**</code> → <strong>粗体</strong></p>
                  <p><code>*斜体*</code> → <em>斜体</em></p>
                  <p><code>`代码`</code> → <code>代码</code></p>
                </div>
                <div>
                  <p><code>[链接](URL)</code> → 链接</p>
                  <p><code>> 引用</code> → 引用块</p>
                  <p><code>- 列表</code> → 无序列表</p>
                </div>
              </div>
            </div>

            <!-- 提交按钮 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="commentForm.anonymous"
                    type="checkbox"
                    class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-neutral-600">匿名评论</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="commentForm.subscribe"
                    type="checkbox"
                    class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-neutral-600">订阅回复通知</span>
                </label>
              </div>
              
              <button
                type="submit"
                :disabled="isSubmitting || !isFormValid"
                :class="[
                  'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                  isFormValid && !isSubmitting
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                ]"
              >
                {{ isSubmitting ? '发布中...' : '发布评论' }}
              </button>
            </div>
          </form>
        </div>

        <!-- 评论列表 -->
        <div class="space-y-6">
          <!-- 加载状态 -->
          <div v-if="isLoading" class="text-center py-8">
            <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
            <p class="text-neutral-500">加载评论中...</p>
          </div>

          <!-- 评论项 -->
          <div v-else-if="comments.length > 0">
            <CommentItem
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              :article-id="articleId"
              @reply="handleReply"
              @like="handleLike"
              @report="handleReport"
            />
          </div>

          <!-- 无评论 -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 class="text-lg font-medium text-neutral-900 mb-2">暂无评论</h3>
            <p class="text-neutral-500">成为第一个评论的人吧！</p>
          </div>
        </div>

        <!-- 加载更多 -->
        <div v-if="hasMore && comments.length > 0" class="text-center mt-8">
          <button
            @click="loadMoreComments"
            :disabled="isLoadingMore"
            class="btn-outline"
          >
            {{ isLoadingMore ? '加载中...' : '加载更多评论' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useUIStore } from '../../stores/ui'
import CommentItem from './CommentItem.vue'
import { api } from '../../utils/api'

export default {
  name: 'CommentSection',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const uiStore = useUIStore()

    // 状态
    const comments = ref([])
    const totalComments = ref(0)
    const isLoading = ref(false)
    const isLoadingMore = ref(false)
    const isSubmitting = ref(false)
    const hasMore = ref(false)
    const currentPage = ref(1)
    const sortBy = ref('newest')
    const showMarkdownHelp = ref(false)

    // 用户状态
    const isLoggedIn = ref(false) // 这里应该从用户状态管理获取

    // 评论表单
    const commentForm = ref({
      name: '',
      email: '',
      content: '',
      anonymous: false,
      subscribe: false
    })

    // 表单验证
    const isFormValid = computed(() => {
      const hasContent = commentForm.value.content.trim().length > 0
      const hasUserInfo = isLoggedIn.value || 
        (commentForm.value.name.trim().length > 0 && commentForm.value.email.trim().length > 0)
      return hasContent && hasUserInfo && commentForm.value.content.length <= 500
    })

    // 更新字符计数
    const updateCharCount = () => {
      if (commentForm.value.content.length > 500) {
        commentForm.value.content = commentForm.value.content.substring(0, 500)
      }
    }

    // 加载评论
    const loadComments = async (reset = true) => {
      try {
        if (reset) {
          isLoading.value = true
          currentPage.value = 1
        } else {
          isLoadingMore.value = true
        }

        const response = await api.get(`/articles/${props.articleId}/comments`, {
          params: {
            page: currentPage.value,
            limit: 10,
            sort: sortBy.value
          }
        })

        const data = response.data

        if (reset) {
          comments.value = data.data
        } else {
          comments.value.push(...data.data)
        }

        totalComments.value = data.meta.total
        hasMore.value = data.meta.hasMore

      } catch (error) {
        console.error('加载评论失败:', error)
        uiStore.showError('加载评论失败')
      } finally {
        isLoading.value = false
        isLoadingMore.value = false
      }
    }

    // 加载更多评论
    const loadMoreComments = () => {
      currentPage.value++
      loadComments(false)
    }

    // 提交评论
    const submitComment = async () => {
      if (!isFormValid.value) return

      try {
        isSubmitting.value = true

        const commentData = {
          content: commentForm.value.content,
          anonymous: commentForm.value.anonymous,
          subscribe: commentForm.value.subscribe
        }

        if (!isLoggedIn.value) {
          commentData.name = commentForm.value.name
          commentData.email = commentForm.value.email
        }

        const response = await api.post(`/articles/${props.articleId}/comments`, commentData)

        // 重置表单
        commentForm.value = {
          name: '',
          email: '',
          content: '',
          anonymous: false,
          subscribe: false
        }

        // 重新加载评论
        await loadComments()

        uiStore.showSuccess('评论发布成功！')

      } catch (error) {
        console.error('发布评论失败:', error)
        uiStore.showError('发布评论失败，请稍后重试')
      } finally {
        isSubmitting.value = false
      }
    }

    // 处理回复
    const handleReply = (comment) => {
      // 实现回复逻辑
      console.log('回复评论:', comment)
    }

    // 处理点赞
    const handleLike = async (commentId) => {
      try {
        await api.post(`/comments/${commentId}/like`)
        
        // 更新本地状态
        const comment = comments.value.find(c => c.id === commentId)
        if (comment) {
          comment.likes = (comment.likes || 0) + 1
          comment.isLiked = true
        }

      } catch (error) {
        console.error('点赞失败:', error)
        uiStore.showError('点赞失败')
      }
    }

    // 处理举报
    const handleReport = (comment) => {
      // 实现举报逻辑
      console.log('举报评论:', comment)
      uiStore.showInfo('举报已提交，我们会尽快处理')
    }

    onMounted(() => {
      loadComments()
    })

    return {
      comments,
      totalComments,
      isLoading,
      isLoadingMore,
      isSubmitting,
      hasMore,
      sortBy,
      showMarkdownHelp,
      isLoggedIn,
      commentForm,
      isFormValid,
      updateCharCount,
      loadComments,
      loadMoreComments,
      submitComment,
      handleReply,
      handleLike,
      handleReport
    }
  }
}
</script>

<style scoped>
/* 加载动画 */
.loading-spinner {
  @apply animate-spin rounded-full border-4 border-neutral-200 border-t-primary-600;
}

/* 表单样式 */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 代码样式 */
code {
  @apply bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-sm;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>