<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <transition-group
      name="notification"
      tag="div"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          getNotificationClasses(notification.type)
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <!-- 图标 -->
            <div class="flex-shrink-0">
              <component :is="getNotificationIcon(notification.type)" :class="getIconClasses(notification.type)" />
            </div>
            
            <!-- 内容 -->
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p v-if="notification.title" class="text-sm font-medium text-neutral-900">
                {{ notification.title }}
              </p>
              <p class="text-sm text-neutral-500" :class="{ 'mt-1': notification.title }">
                {{ notification.message }}
              </p>
            </div>
            
            <!-- 关闭按钮 -->
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                class="bg-white rounded-md inline-flex text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span class="sr-only">关闭</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 进度条 -->
        <div
          v-if="notification.duration > 0"
          class="h-1 bg-neutral-200"
        >
          <div
            :class="getProgressBarClasses(notification.type)"
            class="h-full transition-all ease-linear"
            :style="{ 
              width: `${getProgress(notification)}%`,
              animationDuration: `${notification.duration}ms`
            }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useUIStore } from '../../stores/ui'

export default {
  name: 'GlobalNotification',
  setup() {
    const uiStore = useUIStore()
    const progressTimers = ref(new Map())

    const notifications = computed(() => uiStore.notifications)

    // 获取通知样式类
    const getNotificationClasses = (type) => {
      const classes = {
        success: 'border-l-4 border-green-400',
        error: 'border-l-4 border-red-400',
        warning: 'border-l-4 border-yellow-400',
        info: 'border-l-4 border-blue-400'
      }
      return classes[type] || classes.info
    }

    // 获取图标组件
    const getNotificationIcon = (type) => {
      const icons = {
        success: 'IconSuccess',
        error: 'IconError',
        warning: 'IconWarning',
        info: 'IconInfo'
      }
      return icons[type] || icons.info
    }

    // 获取图标样式类
    const getIconClasses = (type) => {
      const classes = {
        success: 'h-6 w-6 text-green-400',
        error: 'h-6 w-6 text-red-400',
        warning: 'h-6 w-6 text-yellow-400',
        info: 'h-6 w-6 text-blue-400'
      }
      return classes[type] || classes.info
    }

    // 获取进度条样式类
    const getProgressBarClasses = (type) => {
      const classes = {
        success: 'bg-green-400',
        error: 'bg-red-400',
        warning: 'bg-yellow-400',
        info: 'bg-blue-400'
      }
      return classes[type] || classes.info
    }

    // 获取进度百分比
    const getProgress = (notification) => {
      if (!notification.duration || notification.duration <= 0) return 100
      
      const elapsed = Date.now() - notification.createdAt
      const progress = Math.max(0, 100 - (elapsed / notification.duration) * 100)
      return progress
    }

    // 移除通知
    const removeNotification = (id) => {
      uiStore.removeNotification(id)
      if (progressTimers.value.has(id)) {
        clearInterval(progressTimers.value.get(id))
        progressTimers.value.delete(id)
      }
    }

    onMounted(() => {
      // 监听新通知的添加
      const unwatch = uiStore.$subscribe((mutation, state) => {
        if (mutation.type === 'direct' && mutation.events.some(e => e.key === 'notifications')) {
          // 为新通知设置进度条更新
          state.notifications.forEach(notification => {
            if (!progressTimers.value.has(notification.id) && notification.duration > 0) {
              const timer = setInterval(() => {
                // 触发响应式更新
                notification.progress = getProgress(notification)
                
                if (notification.progress <= 0) {
                  removeNotification(notification.id)
                }
              }, 100)
              
              progressTimers.value.set(notification.id, timer)
            }
          })
        }
      })

      return unwatch
    })

    onUnmounted(() => {
      // 清理所有定时器
      progressTimers.value.forEach(timer => clearInterval(timer))
      progressTimers.value.clear()
    })

    return {
      notifications,
      getNotificationClasses,
      getNotificationIcon,
      getIconClasses,
      getProgressBarClasses,
      getProgress,
      removeNotification
    }
  }
}
</script>

<style scoped>
/* 图标组件 */
.IconSuccess {
  /* 成功图标 */
}

.IconError {
  /* 错误图标 */
}

.IconWarning {
  /* 警告图标 */
}

.IconInfo {
  /* 信息图标 */
}

/* 进度条动画 */
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.progress-bar {
  animation: progress linear;
}
</style>