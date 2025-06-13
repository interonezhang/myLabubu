<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer',
      'hover:shadow-xl hover:-translate-y-1',
      {
        'shadow-lg': !featured,
        'shadow-xl border-2 border-violet-200': featured
      }
    ]"
    @click="$router.push(`/community/events/${event.id}`)"
  >
    <!-- 图片区域 -->
    <div class="relative overflow-hidden">
      <img
        :src="event.coverImage || '/placeholder-event.jpg'"
        :alt="event.title"
        :class="[
          'w-full object-cover transition-transform duration-500 group-hover:scale-105',
          featured ? 'h-64' : 'h-48'
        ]"
        loading="lazy"
      />
      
      <!-- 状态标识 -->
      <div class="absolute top-3 left-3">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1',
            getStatusClass(event.status)
          ]"
        >
          <div
            :class="[
              'w-2 h-2 rounded-full',
              getStatusDotClass(event.status)
            ]"
          ></div>
          <span>{{ getStatusLabel(event.status) }}</span>
        </span>
      </div>

      <!-- 活动类型 -->
      <div class="absolute top-3 right-3">
        <span
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            getTypeClass(event.type)
          ]"
        >
          {{ getTypeIcon(event.type) }} {{ getTypeLabel(event.type) }}
        </span>
      </div>

      <!-- 精选标识 -->
      <div
        v-if="featured"
        class="absolute bottom-3 left-3 bg-gradient-to-r from-violet-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
      >
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        热门
      </div>

      <!-- 参与人数 -->
      <div class="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        {{ event.participants }}/{{ event.maxParticipants }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div :class="['p-6', { 'p-8': featured }]">
      <!-- 主办方信息 -->
      <div class="flex items-center space-x-3 mb-4">
        <img
          :src="event.organizer.avatar || '/default-avatar.jpg'"
          :alt="event.organizer.name"
          class="w-8 h-8 rounded-full"
        />
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-neutral-900 text-sm">{{ event.organizer.name }}</span>
            <span
              v-if="event.organizer.verified"
              class="text-blue-500"
              title="认证主办方"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
          </div>
        </div>
        <span class="text-xs text-neutral-400">
          {{ formatRelativeTime(event.createdAt) }}
        </span>
      </div>

      <!-- 标题和描述 -->
      <h3
        :class="[
          'font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors',
          featured ? 'text-xl' : 'text-lg'
        ]"
      >
        {{ event.title }}
      </h3>
      
      <p
        :class="[
          'text-neutral-600 mb-4 leading-relaxed',
          featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
        ]"
      >
        {{ event.description }}
      </p>

      <!-- 活动信息 -->
      <div class="space-y-3 mb-4">
        <!-- 时间信息 -->
        <div class="flex items-center text-sm text-neutral-600">
          <svg class="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatEventTime(event.startDate, event.endDate) }}</span>
        </div>

        <!-- 地点信息 -->
        <div class="flex items-center text-sm text-neutral-600">
          <svg class="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ event.location }}</span>
        </div>

        <!-- 奖品信息 -->
        <div
          v-if="event.prizes && event.prizes.length > 0"
          class="flex items-start text-sm text-neutral-600"
        >
          <svg class="w-4 h-4 mr-2 mt-0.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <div>
            <span class="font-medium">奖品：</span>
            <span>{{ event.prizes.slice(0, 2).join('、') }}</span>
            <span v-if="event.prizes.length > 2" class="text-neutral-400">等{{ event.prizes.length }}项</span>
          </div>
        </div>
      </div>

      <!-- 标签 -->
      <div
        v-if="event.tags && event.tags.length > 0"
        class="flex flex-wrap gap-2 mb-4"
      >
        <span
          v-for="tag in event.tags.slice(0, 3)"
          :key="tag"
          class="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 底部操作 -->
      <div class="flex items-center justify-between">
        <!-- 参与进度 -->
        <div class="flex-1 mr-4">
          <div class="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>参与进度</span>
            <span>{{ Math.round((event.participants / event.maxParticipants) * 100) }}%</span>
          </div>
          <div class="w-full bg-neutral-200 rounded-full h-2">
            <div
              :class="[
                'h-2 rounded-full transition-all duration-300',
                getProgressBarClass(event.participants / event.maxParticipants)
              ]"
              :style="{ width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%` }"
            ></div>
          </div>
        </div>

        <!-- 参与按钮 -->
        <button
          @click.stop="joinEvent"
          :disabled="!canJoin"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
            canJoin
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          ]"
        >
          {{ getJoinButtonText() }}
        </button>
      </div>

      <!-- 操作按钮 -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
        <div class="flex items-center space-x-3">
          <button
            @click.stop="toggleInterest"
            :class="[
              'p-2 rounded-lg transition-colors duration-200',
              isInterested
                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            ]"
            :title="isInterested ? '取消关注' : '关注活动'"
          >
            <svg class="w-4 h-4" :fill="isInterested ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          <button
            @click.stop="shareEvent"
            class="p-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
            title="分享活动"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>

        <span class="text-xs text-neutral-400">
          ID: {{ event.id }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useUIStore } from '../../stores/ui'
import { formatRelativeTime, formatDate, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const uiStore = useUIStore()

    const isInterested = ref(false) // 这里应该从用户状态获取

    // 是否可以参与
    const canJoin = computed(() => {
      return props.event.status === 'upcoming' || 
             (props.event.status === 'ongoing' && props.event.participants < props.event.maxParticipants)
    })

    // 获取状态样式
    const getStatusClass = (status) => {
      const classes = {
        upcoming: 'bg-blue-500 text-white',
        ongoing: 'bg-green-500 text-white',
        ended: 'bg-neutral-500 text-white'
      }
      return classes[status] || 'bg-neutral-500 text-white'
    }

    // 获取状态点样式
    const getStatusDotClass = (status) => {
      const classes = {
        upcoming: 'bg-blue-200',
        ongoing: 'bg-green-200 animate-pulse',
        ended: 'bg-neutral-200'
      }
      return classes[status] || 'bg-neutral-200'
    }

    // 获取状态标签
    const getStatusLabel = (status) => {
      const labels = {
        upcoming: '即将开始',
        ongoing: '进行中',
        ended: '已结束'
      }
      return labels[status] || '未知'
    }

    // 获取类型样式
    const getTypeClass = (type) => {
      const classes = {
        contest: 'bg-red-100 text-red-700',
        exhibition: 'bg-blue-100 text-blue-700',
        meetup: 'bg-green-100 text-green-700',
        workshop: 'bg-purple-100 text-purple-700',
        giveaway: 'bg-orange-100 text-orange-700'
      }
      return classes[type] || 'bg-neutral-100 text-neutral-700'
    }

    // 获取类型标签
    const getTypeLabel = (type) => {
      const labels = {
        contest: '比赛活动',
        exhibition: '展览活动',
        meetup: '线下聚会',
        workshop: '工作坊',
        giveaway: '抽奖活动'
      }
      return labels[type] || '活动'
    }

    // 获取类型图标
    const getTypeIcon = (type) => {
      const icons = {
        contest: '🏆',
        exhibition: '🎨',
        meetup: '👥',
        workshop: '🛠️',
        giveaway: '🎁'
      }
      return icons[type] || '📅'
    }

    // 获取进度条样式
    const getProgressBarClass = (progress) => {
      if (progress >= 0.9) return 'bg-red-500'
      if (progress >= 0.7) return 'bg-orange-500'
      if (progress >= 0.5) return 'bg-yellow-500'
      return 'bg-green-500'
    }

    // 格式化活动时间
    const formatEventTime = (startDate, endDate) => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      if (start.toDateString() === end.toDateString()) {
        return `${formatDate(start, 'MM月DD日')} ${formatDate(start, 'HH:mm')}-${formatDate(end, 'HH:mm')}`
      } else {
        return `${formatDate(start, 'MM月DD日')} - ${formatDate(end, 'MM月DD日')}`
      }
    }

    // 获取参与按钮文本
    const getJoinButtonText = () => {
      if (props.event.status === 'ended') return '已结束'
      if (props.event.participants >= props.event.maxParticipants) return '已满员'
      if (props.event.status === 'ongoing') return '立即参与'
      return '报名参与'
    }

    // 参与活动
    const joinEvent = () => {
      if (!canJoin.value) return
      
      // 这里应该调用API参与活动
      props.event.participants++
      uiStore.showSuccess('成功参与活动！')
    }

    // 切换关注状态
    const toggleInterest = () => {
      isInterested.value = !isInterested.value
      
      if (isInterested.value) {
        uiStore.showSuccess('已关注活动')
      } else {
        uiStore.showSuccess('已取消关注')
      }

      // 这里应该调用API更新关注状态
    }

    // 分享活动
    const shareEvent = async () => {
      const url = `${window.location.origin}/community/events/${props.event.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.event.title,
            text: props.event.description,
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

    return {
      isInterested,
      canJoin,
      getStatusClass,
      getStatusDotClass,
      getStatusLabel,
      getTypeClass,
      getTypeLabel,
      getTypeIcon,
      getProgressBarClass,
      formatEventTime,
      getJoinButtonText,
      joinEvent,
      toggleInterest,
      shareEvent,
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
.border-violet-200 {
  position: relative;
}

.border-violet-200::before {
  content: '';
  position: absolute;
  inset: -2px;
  padding: 2px;
  background: linear-gradient(45deg, theme('colors.violet.400'), theme('colors.purple.400'));
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