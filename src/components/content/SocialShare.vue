<template>
  <div class="flex items-center space-x-3">
    <span class="text-sm text-neutral-500 mr-2">分享：</span>
    
    <!-- 微信分享 -->
    <button
      @click="shareToWeChat"
      class="p-2 text-neutral-400 hover:text-green-500 transition-colors duration-200 rounded-lg hover:bg-green-50"
      aria-label="分享到微信"
      title="分享到微信"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.657 7.102-.394.045-.93-.185-1.821-.647-2.65C18.967 3.752 14.479 2.188 8.691 2.188z"/>
      </svg>
    </button>

    <!-- 微博分享 -->
    <button
      @click="shareToWeibo"
      class="p-2 text-neutral-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
      aria-label="分享到微博"
      title="分享到微博"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.586 21.5c-4.036 0-7.293-2.484-7.293-5.566 0-1.68 1.008-3.449 2.76-4.848.336-.268.504-.268.672 0 .168.268.168.536-.168.804-1.344 1.072-2.016 2.216-2.016 3.36 0 2.216 2.352 4.032 5.293 4.032 3.277 0 5.965-2.216 5.965-4.968 0-1.344-.672-2.552-1.848-3.36-.168-.134-.168-.402 0-.536.168-.134.504-.134.672 0 1.512 1.072 2.352 2.552 2.352 4.2 0 3.36-3.277 6.048-7.293 6.048z"/>
        <path d="M14.879 14.5c0-1.68-1.512-3.024-3.36-3.024s-3.36 1.344-3.36 3.024c0 1.68 1.512 3.024 3.36 3.024s3.36-1.344 3.36-3.024z"/>
      </svg>
    </button>

    <!-- QQ分享 -->
    <button
      @click="shareToQQ"
      class="p-2 text-neutral-400 hover:text-blue-500 transition-colors duration-200 rounded-lg hover:bg-blue-50"
      aria-label="分享到QQ"
      title="分享到QQ"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.5c-4.142 0-7.5 3.358-7.5 7.5 0 1.462.42 2.822 1.145 3.971-.397 1.005-.145 1.814.145 2.029.29.215.725-.145 1.16-.725.58.29 1.305.435 2.05.435 4.142 0 7.5-3.358 7.5-7.5S16.142 2.5 12 2.5z"/>
      </svg>
    </button>

    <!-- Twitter分享 -->
    <button
      @click="shareToTwitter"
      class="p-2 text-neutral-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-blue-50"
      aria-label="分享到Twitter"
      title="分享到Twitter"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    </button>

    <!-- Facebook分享 -->
    <button
      @click="shareToFacebook"
      class="p-2 text-neutral-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
      aria-label="分享到Facebook"
      title="分享到Facebook"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </button>

    <!-- 复制链接 -->
    <button
      @click="copyLink"
      class="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 rounded-lg hover:bg-neutral-100"
      aria-label="复制链接"
      title="复制链接"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>

    <!-- 原生分享API -->
    <button
      v-if="canUseNativeShare"
      @click="nativeShare"
      class="p-2 text-neutral-400 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-primary-50"
      aria-label="更多分享选项"
      title="更多分享选项"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useContentStore } from '../../stores/content'
import { useUIStore } from '../../stores/ui'
import { copyToClipboard } from '../../utils/helpers'

export default {
  name: 'SocialShare',
  props: {
    article: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      default: () => window.location.href
    }
  },
  setup(props) {
    const contentStore = useContentStore()
    const uiStore = useUIStore()

    // 检查是否支持原生分享API
    const canUseNativeShare = computed(() => {
      return navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    })

    // 获取分享数据
    const getShareData = () => {
      return {
        title: props.article.title,
        text: props.article.excerpt || props.article.title,
        url: props.url,
        image: props.article.featuredImage?.url
      }
    }

    // 记录分享事件
    const trackShare = async (platform) => {
      try {
        await contentStore.shareArticle(props.article.id, platform)
      } catch (error) {
        console.error('记录分享事件失败:', error)
      }
    }

    // 微信分享
    const shareToWeChat = () => {
      const shareData = getShareData()
      
      // 检查是否在微信环境
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 在微信中，显示分享提示
        uiStore.showInfo('请点击右上角菜单进行分享')
      } else {
        // 生成二维码或复制链接
        copyLink()
        uiStore.showInfo('链接已复制，请在微信中粘贴分享')
      }
      
      trackShare('wechat')
    }

    // 微博分享
    const shareToWeibo = () => {
      const shareData = getShareData()
      const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&pic=${encodeURIComponent(shareData.image || '')}`
      
      window.open(weiboUrl, '_blank', 'width=600,height=400')
      trackShare('weibo')
    }

    // QQ分享
    const shareToQQ = () => {
      const shareData = getShareData()
      const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&summary=${encodeURIComponent(shareData.text)}&pics=${encodeURIComponent(shareData.image || '')}`
      
      window.open(qqUrl, '_blank', 'width=600,height=400')
      trackShare('qq')
    }

    // Twitter分享
    const shareToTwitter = () => {
      const shareData = getShareData()
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`
      
      window.open(twitterUrl, '_blank', 'width=600,height=400')
      trackShare('twitter')
    }

    // Facebook分享
    const shareToFacebook = () => {
      const shareData = getShareData()
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
      
      window.open(facebookUrl, '_blank', 'width=600,height=400')
      trackShare('facebook')
    }

    // 复制链接
    const copyLink = async () => {
      const success = await copyToClipboard(props.url)
      
      if (success) {
        uiStore.showSuccess('链接已复制到剪贴板')
      } else {
        uiStore.showError('复制失败，请手动复制链接')
      }
      
      trackShare('copy')
    }

    // 原生分享
    const nativeShare = async () => {
      try {
        const shareData = getShareData()
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url
        })
        
        trackShare('native')
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('原生分享失败:', error)
          uiStore.showError('分享失败')
        }
      }
    }

    return {
      canUseNativeShare,
      shareToWeChat,
      shareToWeibo,
      shareToQQ,
      shareToTwitter,
      shareToFacebook,
      copyLink,
      nativeShare
    }
  }
}
</script>

<style scoped>
/* 分享按钮动画效果 */
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .flex {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  button {
    padding: 0.5rem;
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>