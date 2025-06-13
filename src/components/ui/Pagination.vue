<template>
  <nav class="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6" aria-label="分页导航">
    <!-- 移动端分页 -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPrevious"
        :disabled="currentPage <= 1"
        class="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        上一页
      </button>
      <button
        @click="goToNext"
        :disabled="currentPage >= totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        下一页
      </button>
    </div>

    <!-- 桌面端分页 -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <!-- 分页信息 -->
      <div>
        <p class="text-sm text-neutral-700">
          显示第
          <span class="font-medium">{{ startItem }}</span>
          到
          <span class="font-medium">{{ endItem }}</span>
          项，共
          <span class="font-medium">{{ totalItems }}</span>
          项结果
        </p>
      </div>

      <!-- 分页控件 -->
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="分页">
          <!-- 上一页按钮 -->
          <button
            @click="goToPrevious"
            :disabled="currentPage <= 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">上一页</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- 页码按钮 -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0',
                page === currentPage
                  ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  : 'text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:outline-offset-0'
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 ring-1 ring-inset ring-neutral-300 focus:outline-offset-0"
            >
              ...
            </span>
          </template>

          <!-- 下一页按钮 -->
          <button
            @click="goToNext"
            :disabled="currentPage >= totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">下一页</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- 每页显示数量选择器 -->
    <div v-if="showPageSizeSelector" class="mt-4 sm:mt-0 sm:ml-4">
      <label for="page-size" class="sr-only">每页显示数量</label>
      <select
        id="page-size"
        v-model="selectedPageSize"
        @change="handlePageSizeChange"
        class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-neutral-900 ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          每页 {{ size }} 项
        </option>
      </select>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 20
    },
    showPageSizeSelector: {
      type: Boolean,
      default: false
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    maxVisiblePages: {
      type: Number,
      default: 7
    }
  },
  emits: ['page-change', 'page-size-change'],
  setup(props, { emit }) {
    const selectedPageSize = ref(props.pageSize)

    // 计算当前页显示的项目范围
    const startItem = computed(() => {
      return (props.currentPage - 1) * props.pageSize + 1
    })

    const endItem = computed(() => {
      const end = props.currentPage * props.pageSize
      return Math.min(end, props.totalItems)
    })

    // 计算可见的页码
    const visiblePages = computed(() => {
      const pages = []
      const total = props.totalPages
      const current = props.currentPage
      const maxVisible = props.maxVisiblePages

      if (total <= maxVisible) {
        // 如果总页数小于等于最大可见页数，显示所有页码
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // 复杂的分页逻辑
        const halfVisible = Math.floor(maxVisible / 2)
        
        if (current <= halfVisible + 1) {
          // 当前页在前半部分
          for (let i = 1; i <= maxVisible - 2; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        } else if (current >= total - halfVisible) {
          // 当前页在后半部分
          pages.push(1)
          pages.push('...')
          for (let i = total - maxVisible + 3; i <= total; i++) {
            pages.push(i)
          }
        } else {
          // 当前页在中间部分
          pages.push(1)
          pages.push('...')
          for (let i = current - halfVisible + 1; i <= current + halfVisible - 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        }
      }

      return pages
    })

    // 页面跳转方法
    const goToPage = (page) => {
      if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
        emit('page-change', page)
      }
    }

    const goToPrevious = () => {
      if (props.currentPage > 1) {
        goToPage(props.currentPage - 1)
      }
    }

    const goToNext = () => {
      if (props.currentPage < props.totalPages) {
        goToPage(props.currentPage + 1)
      }
    }

    // 处理每页显示数量变化
    const handlePageSizeChange = () => {
      emit('page-size-change', selectedPageSize.value)
    }

    // 监听pageSize属性变化
    watch(() => props.pageSize, (newSize) => {
      selectedPageSize.value = newSize
    })

    return {
      selectedPageSize,
      startItem,
      endItem,
      visiblePages,
      goToPage,
      goToPrevious,
      goToNext,
      handlePageSizeChange
    }
  }
}
</script>

<style scoped>
/* 确保按钮在禁用状态下的样式 */
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:disabled:hover {
  background-color: inherit;
}

/* 页码按钮的过渡效果 */
button {
  transition: all 0.2s ease-in-out;
}

/* 当前页码的特殊样式 */
.z-10 {
  position: relative;
  z-index: 10;
}

/* 选择器样式 */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .hidden.sm\\:flex {
    display: none !important;
  }
  
  .flex.sm\\:hidden {
    display: flex !important;
  }
}
</style>