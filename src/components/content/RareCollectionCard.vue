<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer',
      'hover:shadow-xl hover:-translate-y-2',
      {
        'border-2 border-amber-200 shadow-amber-100': rarity === 'legendary',
        'border-2 border-purple-200 shadow-purple-100': rarity === 'epic',
        'border-2 border-blue-200 shadow-blue-100': rarity === 'rare',
        'shadow-lg': rarity !== 'legendary' && rarity !== 'epic' && rarity !== 'rare'
      }
    ]"
    @click="$router.push(`/collection/${collection.slug || collection.id}`)"
  >
    <!-- 稀有度标识 -->
    <div class="relative">
      <div
        :class="[
          'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center space-x-1',
          {
            'bg-amber-500 text-white': rarity === 'legendary',
            'bg-purple-500 text-white': rarity === 'epic',
            'bg-blue-500 text-white': rarity === 'rare'
          }
        ]"
      >
        <div
          :class="[
            'w-2 h-2 rounded-full',
            {
              'bg-amber-200': rarity === 'legendary',
              'bg-purple-200': rarity === 'epic',
              'bg-blue-200': rarity === 'rare'
            }
          ]"
        ></div>
        <span>{{ getRarityLabel(rarity) }}</span>
      </div>

      <!-- 限量标识 -->
      <div
        v-if="collection.quantity && collection.quantity <= 1000"
        class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10"
      >
        限量{{ collection.quantity }}
      </div>

      <!-- 图片 -->
      <div class="relative overflow-hidden aspect-w-1 aspect-h-1">
        <img
          :src="collection.image || '/placeholder-rare.jpg'"
          :alt="collection.name"
          class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        <!-- 渐变遮罩 -->
        <div
          :class="[
            'absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          ]"
        ></div>

        <!-- 悬停信息 -->
        <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p class="text-sm font-medium mb-1">发行时间</p>
          <p class="text-xs opacity-90">{{ formatDate(collection.releaseDate) }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="p-6">
      <!-- 标题和价格 -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
          {{ collection.name }}
        </h3>
        <p class="text-sm text-neutral-600 line-clamp-2 mb-3">
          {{ collection.description }}
        </p>
        
        <!-- 价格信息 -->
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl font-bold text-neutral-900">
                ¥{{ formatPrice(collection.currentValue || collection.price) }}
              </span>
              <span
                v-if="collection.originalPrice && collection.originalPrice !== collection.price"
                class="text-sm text-neutral-400 line-through"
              >
                ¥{{ formatPrice(collection.originalPrice) }}
              </span>
            </div>
            
            <!-- 升值幅度 -->
            <div
              v-if="collection.originalPrice && collection.currentValue"
              class="flex items-center mt-1"
            >
              <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span class="text-sm font-medium text-green-600">
                +{{ calculateAppreciation(collection.originalPrice, collection.currentValue) }}%
              </span>
            </div>
          </div>

          <!-- 稀有度图标 -->
          <div
            :class="[
              'w-12 h-12 rounded-full flex items-center justify-center',
              {
                'bg-amber-100': rarity === 'legendary',
                'bg-purple-100': rarity === 'epic',
                'bg-blue-100': rarity === 'rare'
              }
            ]"
          >
            <svg
              v-if="rarity === 'legendary'"
              class="w-6 h-6 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <svg
              v-else-if="rarity === 'epic'"
              class="w-6 h-6 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="space-y-3 mb-4">
        <!-- 发行信息 -->
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500">发行数量</span>
          <span class="font-medium text-neutral-900">
            {{ collection.quantity ? `${collection.quantity} 个` : '未知' }}
          </span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500">发行时间</span>
          <span class="font-medium text-neutral-900">
            {{ formatDate(collection.releaseDate) }}
          </span>
        </div>

        <!-- 市场热度 -->
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500">市场热度</span>
          <div class="flex items-center space-x-1">
            <div
              v-for="i in 5"
              :key="i"
              :class="[
                'w-2 h-2 rounded-full',
                i <= getPopularityLevel(collection.popularity || 3)
                  ? 'bg-orange-400'
                  : 'bg-neutral-200'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex items-center space-x-3">
        <button
          @click.stop="viewDetails"
          class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
        >
          查看详情
        </button>
        
        <button
          @click.stop="addToWishlist"
          :class="[
            'p-2 rounded-lg transition-colors duration-200',
            isInWishlist
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          ]"
          :title="isInWishlist ? '从心愿单移除' : '添加到心愿单'"
        >
          <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <button
          @click.stop="shareCollection"
          class="p-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
          title="分享"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 特殊效果 -->
    <div
      v-if="rarity === 'legendary'"
      class="absolute inset-0 pointer-events-none"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 animate-pulse"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import { formatDate, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'RareCollectionCard',
  props: {
    collection: {
      type: Object,
      required: true
    },
    rarity: {
      type: String,
      default: 'rare',
      validator: value => ['rare', 'epic', 'legendary'].includes(value)
    }
  },
  setup(props) {
    const router = useRouter()
    const uiStore = useUIStore()

    const isInWishlist = ref(false) // 这里应该从用户状态获取

    // 获取稀有度标签
    const getRarityLabel = (rarity) => {
      const labels = {
        rare: '稀有',
        epic: '史诗',
        legendary: '传说'
      }
      return labels[rarity] || '稀有'
    }

    // 格式化价格
    const formatPrice = (price) => {
      return new Intl.NumberFormat('zh-CN').format(price)
    }

    // 计算升值幅度
    const calculateAppreciation = (originalPrice, currentValue) => {
      if (!originalPrice || !currentValue) return 0
      return Math.round(((currentValue - originalPrice) / originalPrice) * 100)
    }

    // 获取热度等级
    const getPopularityLevel = (popularity) => {
      return Math.min(Math.max(Math.round(popularity), 1), 5)
    }

    // 查看详情
    const viewDetails = () => {
      router.push(`/collection/${props.collection.slug || props.collection.id}`)
    }

    // 添加到心愿单
    const addToWishlist = () => {
      isInWishlist.value = !isInWishlist.value
      
      if (isInWishlist.value) {
        uiStore.showSuccess('已添加到心愿单')
      } else {
        uiStore.showSuccess('已从心愿单移除')
      }
    }

    // 分享收藏品
    const shareCollection = async () => {
      const url = `${window.location.origin}/collection/${props.collection.slug || props.collection.id}`
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.collection.name,
            text: props.collection.description,
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
      isInWishlist,
      getRarityLabel,
      formatPrice,
      calculateAppreciation,
      getPopularityLevel,
      viewDetails,
      addToWishlist,
      shareCollection,
      formatDate
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

/* 宽高比 */
.aspect-w-1 {
  position: relative;
  padding-bottom: 100%;
}

.aspect-w-1 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* 卡片悬停效果 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* 特殊动画效果 */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* 传说级特殊效果 */
@keyframes legendary-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
  }
}

.border-amber-200 {
  animation: legendary-glow 3s ease-in-out infinite;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .aspect-w-1 {
    padding-bottom: 75%;
  }
}
</style>