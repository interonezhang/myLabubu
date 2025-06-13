<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/guide-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            Labubu
            <span class="text-gradient-guide">购买指南</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            从新手入门到专业收藏，全面的购买指南助您明智选择，避免踩坑
          </p>
          
          <!-- 快速导航 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <router-link to="/guide/where-to-buy" class="btn-primary">
              购买渠道
            </router-link>
            <router-link to="/guide/authentic-vs-fake" class="btn-outline">
              真假辨别
            </router-link>
            <router-link to="/collection/guide" class="btn-outline">
              收藏指南
            </router-link>
          </div>

          <!-- 指南统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-cyan-600">{{ guideStats.channels }}</div>
              <div class="text-sm text-neutral-500 mt-1">购买渠道</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-cyan-600">{{ guideStats.tips }}</div>
              <div class="text-sm text-neutral-500 mt-1">购买技巧</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-cyan-600">{{ guideStats.reviews }}</div>
              <div class="text-sm text-neutral-500 mt-1">商家评价</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-cyan-600">{{ guideStats.users }}</div>
              <div class="text-sm text-neutral-500 mt-1">受益用户</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 购买流程 -->
    <section class="bg-white py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            购买流程指南
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            按照我们的专业指南，轻松完成您的第一次Labubu购买
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in buyingSteps"
            :key="step.id"
            class="text-center group"
          >
            <!-- 步骤图标 -->
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span class="text-2xl font-bold text-white">{{ index + 1 }}</span>
              </div>
              
              <!-- 连接线 -->
              <div
                v-if="index < buyingSteps.length - 1"
                class="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 transform -translate-y-1/2"
              ></div>
            </div>

            <!-- 步骤内容 -->
            <h3 class="text-lg font-semibold text-neutral-900 mb-3">{{ step.title }}</h3>
            <p class="text-neutral-600 text-sm leading-relaxed mb-4">{{ step.description }}</p>
            
            <!-- 相关链接 -->
            <router-link
              v-if="step.link"
              :to="step.link"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              {{ step.linkText }} →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 推荐购买渠道 -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            推荐购买渠道
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            经过我们严格筛选的可靠购买渠道，保证正品，价格合理
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="channel in recommendedChannels"
            :key="channel.id"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <!-- 渠道头部 -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img
                  :src="channel.logo"
                  :alt="channel.name"
                  class="w-12 h-12 rounded-lg"
                />
                <div>
                  <h3 class="font-semibold text-neutral-900">{{ channel.name }}</h3>
                  <p class="text-sm text-neutral-500">{{ channel.type }}</p>
                </div>
              </div>
              
              <!-- 评分 -->
              <div class="text-right">
                <div class="flex items-center space-x-1 mb-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= channel.rating ? 'text-yellow-400' : 'text-neutral-300'
                    ]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span class="text-xs text-neutral-500">{{ channel.rating }}/5</span>
              </div>
            </div>

            <!-- 渠道特点 -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-600">{{ channel.pros[0] }}</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-600">{{ channel.pros[1] }}</span>
              </div>
            </div>

            <!-- 价格范围 -->
            <div class="bg-neutral-50 rounded-lg p-3 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500">价格范围</span>
                <span class="font-medium text-neutral-900">{{ channel.priceRange }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center space-x-3">
              <a
                :href="channel.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                前往购买
              </a>
              <button
                @click="viewChannelDetails(channel)"
                class="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                详情
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/guide/where-to-buy" class="btn-outline">
            查看所有购买渠道
          </router-link>
        </div>
      </div>
    </section>

    <!-- 购买技巧 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            购买技巧与建议
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            资深收藏家分享的实用购买技巧，帮您买到心仪的收藏品
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="tip in buyingTips"
            :key="tip.id"
            class="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start space-x-4">
              <div
                :class="[
                  'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                  tip.iconBg
                ]"
              >
                <span class="text-2xl">{{ tip.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-neutral-900 mb-2">{{ tip.title }}</h3>
                <p class="text-neutral-600 text-sm leading-relaxed mb-3">{{ tip.description }}</p>
                <ul class="space-y-1">
                  <li
                    v-for="point in tip.points"
                    :key="point"
                    class="text-sm text-neutral-600 flex items-start"
                  >
                    <span class="text-primary-600 mr-2">•</span>
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              常见问题解答
            </h2>
            <p class="text-lg text-neutral-600">
              新手购买Labubu时最常遇到的问题和解答
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="faq in faqs"
              :key="faq.id"
              class="bg-white rounded-xl border border-neutral-200 overflow-hidden"
            >
              <button
                @click="toggleFaq(faq.id)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200"
              >
                <span class="font-medium text-neutral-900">{{ faq.question }}</span>
                <svg
                  :class="[
                    'w-5 h-5 text-neutral-400 transition-transform duration-200',
                    openFaqs.includes(faq.id) ? 'rotate-180' : ''
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                v-if="openFaqs.includes(faq.id)"
                class="px-6 pb-4 text-neutral-600 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="py-16 bg-gradient-primary text-white">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          开始您的Labubu收藏之旅
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          掌握了购买技巧，现在就去挑选您心仪的Labubu收藏品吧
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/guide/where-to-buy" class="btn-secondary">
            查看购买渠道
          </router-link>
          <router-link to="/collection" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            浏览收藏品
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUIStore } from '../../stores/ui'

export default {
  name: 'GuideIndex',
  setup() {
    const uiStore = useUIStore()

    // 响应式数据
    const openFaqs = ref([])

    // 统计数据
    const guideStats = ref({
      channels: '50+',
      tips: '100+',
      reviews: '500+',
      users: '10K+'
    })

    // 购买步骤
    const buyingSteps = ref([
      {
        id: 1,
        title: '了解产品',
        description: '学习Labubu的基础知识，了解不同系列和稀有度',
        link: '/collection/guide',
        linkText: '查看收藏指南'
      },
      {
        id: 2,
        title: '选择渠道',
        description: '从可靠的官方或授权渠道购买，确保正品',
        link: '/guide/where-to-buy',
        linkText: '查看购买渠道'
      },
      {
        id: 3,
        title: '辨别真伪',
        description: '掌握真假辨别技巧，避免购买到假货',
        link: '/guide/authentic-vs-fake',
        linkText: '学习辨别方法'
      },
      {
        id: 4,
        title: '完成购买',
        description: '确认商品信息，选择合适的支付和配送方式',
        link: null,
        linkText: null
      }
    ])

    // 推荐购买渠道
    const recommendedChannels = ref([
      {
        id: 1,
        name: '泡泡玛特官方商城',
        type: '官方渠道',
        logo: '/channel-popmart.jpg',
        rating: 5,
        pros: ['100%正品保证', '官方售后服务'],
        priceRange: '¥59-299',
        url: 'https://www.popmart.com'
      },
      {
        id: 2,
        name: '天猫泡泡玛特旗舰店',
        type: '官方授权',
        logo: '/channel-tmall.jpg',
        rating: 5,
        pros: ['正品保障', '快速配送'],
        priceRange: '¥59-299',
        url: 'https://popmart.tmall.com'
      },
      {
        id: 3,
        name: '京东自营',
        type: '平台自营',
        logo: '/channel-jd.jpg',
        rating: 4,
        pros: ['品质保证', '次日达配送'],
        priceRange: '¥65-320',
        url: 'https://www.jd.com'
      }
    ])

    // 购买技巧
    const buyingTips = ref([
      {
        id: 1,
        title: '选择合适的购买时机',
        description: '掌握发售时间和促销活动，获得更好的价格和选择',
        icon: '⏰',
        iconBg: 'bg-blue-100',
        points: [
          '关注官方发售公告',
          '参与预售活动获得优惠',
          '避开热门时段减少竞争'
        ]
      },
      {
        id: 2,
        title: '了解市场价格',
        description: '比较不同渠道的价格，避免被高价收割',
        icon: '💰',
        iconBg: 'bg-green-100',
        points: [
          '对比多个平台价格',
          '关注二手市场行情',
          '警惕异常低价商品'
        ]
      },
      {
        id: 3,
        title: '验证商品真伪',
        description: '购买前后都要仔细检查，确保收到正品',
        icon: '🔍',
        iconBg: 'bg-orange-100',
        points: [
          '检查包装和标签',
          '验证防伪码',
          '对比官方图片'
        ]
      },
      {
        id: 4,
        title: '保护个人权益',
        description: '了解退换货政策，保留购买凭证',
        icon: '🛡️',
        iconBg: 'bg-purple-100',
        points: [
          '保存购买记录',
          '了解售后政策',
          '及时联系客服'
        ]
      }
    ])

    // 常见问题
    const faqs = ref([
      {
        id: 1,
        question: '在哪里可以买到正品Labubu？',
        answer: '建议从泡泡玛特官方商城、官方授权的天猫旗舰店、京东自营等可靠渠道购买。避免从不明来源的第三方卖家购买，以免买到假货。'
      },
      {
        id: 2,
        question: '如何辨别Labubu的真假？',
        answer: '主要从包装质量、材质手感、工艺细节、防伪标识等方面进行判断。正品包装印刷清晰，材质柔软有弹性，工艺精致无瑕疵。详细的辨别方法可以查看我们的真假辨别指南。'
      },
      {
        id: 3,
        question: 'Labubu的价格一般是多少？',
        answer: '常规款Labubu的官方售价通常在59-99元之间，限定款和稀有款价格会更高。二手市场价格会根据稀有度和市场需求波动，建议参考多个平台的价格进行比较。'
      },
      {
        id: 4,
        question: '购买时需要注意什么？',
        answer: '购买时要注意选择可靠渠道、验证商品真伪、了解退换货政策、保留购买凭证。对于限定款，建议提前关注发售信息，及时参与预售或抢购。'
      },
      {
        id: 5,
        question: '如果买到假货怎么办？',
        answer: '如果确认买到假货，应立即联系卖家要求退款。如果是在正规平台购买，可以申请平台介入处理。同时保留所有购买记录和商品照片作为证据。'
      }
    ])

    // 切换FAQ展开状态
    const toggleFaq = (faqId) => {
      const index = openFaqs.value.indexOf(faqId)
      if (index > -1) {
        openFaqs.value.splice(index, 1)
      } else {
        openFaqs.value.push(faqId)
      }
    }

    // 查看渠道详情
    const viewChannelDetails = (channel) => {
      uiStore.showInfo(`${channel.name} 详细信息功能开发中`)
    }

    onMounted(() => {
      // 初始化数据
    })

    return {
      openFaqs,
      guideStats,
      buyingSteps,
      recommendedChannels,
      buyingTips,
      faqs,
      toggleFaq,
      viewChannelDetails
    }
  },
  head() {
    return {
      title: '购买指南',
      meta: [
        {
          name: 'description',
          content: 'Labubu购买指南 - 新手入门、购买渠道、价格参考，全面的购买建议助您明智选择。'
        },
        {
          name: 'keywords',
          content: 'Labubu购买,购买指南,新手入门,价格参考,购买渠道,真假辨别'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 指南渐变文字效果 */
.text-gradient-guide {
  background: linear-gradient(135deg, theme('colors.cyan.500'), theme('colors.blue.500'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>