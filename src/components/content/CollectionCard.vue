<template>
  <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group card-hover">
    <!-- 图片区域 -->
    <div class="relative aspect-w-1 aspect-h-1 overflow-hidden">
      <img
        :src="collection.images?.[0]?.url || '/placeholder-collection.jpg'"
        :alt="collection.images?.[0]?.alt || collection.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- 稀有度标签 -->
      <div
        v-if="collection.details?.rarity"
        class="absolute top-4 left-4"
      >
        <span :class="getRarityClasses(collection.details.rarity)">
          {{ getRarityLabel(collection.details.rarity) }}
        </span>
      </div>
      
      <!-- 价格范围 -->
      <div
        v-if="collection.details?.estimatedPrice"
        class="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-lg"
      >
        {{ formatPriceRange(collection.details.estimatedPrice) }}
      </div>
      
      <!-- 收藏按钮 -->
      <button
        @click="toggleFavorite"
        class="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 group/fav"
        :class="{ 'text-red-500': isFavorited, 'text-neutral-400 hover:text-red-500': !isFavorited }"
        aria-label="收藏"
      >
        <svg class="w-5 h-5 group-hover/fav:scale-110 transition-transform duration-200" :fill="isFavorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="p-6">
      <!-- 标题和系列 -->
      <div class="mb-3">
        <h3 class="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
          <router-link :to="`/collection/${collection.slug}`" class="hover:underline">
            {{ collection.name }}
          </router-link>
        </h3>
        <p v-if="collection.details?.series" class="text-sm text-neutral-500">
          {{ collection.details.series }}
        </p>
      </div>

      <!-- 描述 -->
      <p v-if="collection.description" class="text-neutral-600 text-sm mb-4 line-clamp-2">
        {{ collection.description }}
      </p>

      <!-- 详细信息 -->
      <div v-if="collection.details" class="space-y-2 mb-4">
        <div v-if="collection.details.releaseDate" class="flex items-center text-xs text-neutral-500">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          发布时间：{{ formatDate(collection.details.releaseDate) }}
        </div>
        
        <div v-if="collection.details.manufacturer" class="flex items-center text-xs text-neutral-500">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          制造商：{{ collection.details.manufacturer }}
        </div>
        
        <div v-if="collection.details.size" class="flex items-center text-xs text-neutral-500">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
          </svg>
          尺寸：{{ collection.details.size }}
        </div>
      </div>

      <!-- 标签 -->
      <div v-if="collection.tags && collection.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in collection.tags.slice(0, 3)"
          :key="tag.id"
          class="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
          @click="$router.push(`/collection?tag=${tag.slug}`)"
        >
          #{{ tag.name }}
        </span>
      </div>

      <!-- 底部操作区域 -->
      <div class="flex items-center justify-between">
        <router-link
          :to="`/collection/${collection.slug}`"
          class="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 flex items-center group/link"
        >
          查看详情
          <svg class="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- 分享按钮 -->
        <div class="flex items-center space-x-1">
          <button
            @click="shareCollection('twitter')"
            class="p-2 text-neutral-400 hover:text-blue-500 transition-colors duration-200"
            aria-label="分享到Twitter"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          
          <button
            @click="copyCollectionLink"
            class="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            aria-label="复制链接"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import { formatDate, copyToClipboard } from '../../utils/helpers'

export default {
  name: 'CollectionCard',
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const uiStore = useUIStore()
    const isFavorited = ref(false)

    // 获取稀有度样式类
    const getRarityClasses = (rarity) => {
      const classes = {
        common: 'bg-neutral-100 text-neutral-700',
        rare: 'bg-blue-100 text-blue-700',
        'ultra-rare': 'bg-purple-100 text-purple-700',
        legendary: 'bg-yellow-100 text-yellow-700'
      }
      return `tag ${classes[rarity] || classes.common}`
    }

    // 获取稀有度标签
    const getRarityLabel = (rarity) => {
      const labels = {
        common: '普通',
        rare: '稀有',
        'ultra-rare': '超稀有',
        legendary: '传说'
      }
      return labels[rarity] || '普通'
    }

    // 格式化价格范围
    const formatPriceRange = (priceInfo) => {
      if (!priceInfo) return ''
      
      const { min, max, currency = '¥' } = priceInfo
      
      if (min && max) {
        return `${currency}${min} - ${currency}${max}`
      } else if (min) {
        return `${currency}${min}+`
      } else if (max) {
        return `≤${currency}${max}`
      }
      
      return ''
    }

    // 切换收藏状态
    const toggleFavorite = () => {
      isFavorited.value = !isFavorited.value
      
      if (isFavorited.value) {
        uiStore.showSuccess('已添加到收藏')
      } else {
        uiStore.showInfo('已从收藏中移除')
      }
    }

    // 分享收藏品
    const shareCollection = (platform) => {
      const url = `${window.location.origin}/collection/${props.collection.slug}`
      const title = `${props.collection.name} - Labubu收藏品`
      const text = props.collection.description || title

      let shareUrl = ''
      
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
          break
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
      }
    }

    // 复制收藏品链接
    const copyCollectionLink = async () => {
      const url = `${window.location.origin}/collection/${props.collection.slug}`
      const success = await copyToClipboard(url)
      
      if (success) {
        uiStore.showSuccess('链接已复制到剪贴板')
      } else {
        uiStore.showError('复制失败，请手动复制链接')
      }
    }

    return {
      isFavorited,
      getRarityClasses,
      getRarityLabel,
      formatPriceRange,
      toggleFavorite,
      shareCollection,
      copyCollectionLink,
      formatDate
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

/* 宽高比样式 */
.aspect-w-1 {
  position: relative;
  padding-bottom: 100%; /* 1:1 */
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
.card-hover:hover {
  transform: translateY(-4px);
}

/* 标签样式 */
.tag {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium;
}
</style>