<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/channel-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            购买
            <span class="text-gradient-channel">渠道指南</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            发现最可靠的Labubu购买渠道，确保正品，享受优质服务
          </p>
          
          <!-- 快速筛选 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              @click="filterChannels('all')"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                selectedFilter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
              ]"
            >
              全部渠道
            </button>
            <button
              @click="filterChannels('official')"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                selectedFilter === 'official' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
              ]"
            >
              官方渠道
            </button>
            <button
              @click="filterChannels('authorized')"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                selectedFilter === 'authorized' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
              ]"
            >
              授权经销
            </button>
            <button
              @click="filterChannels('secondhand')"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                selectedFilter === 'secondhand' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
              ]"
            >
              二手市场
            </button>
          </div>

          <!-- 渠道统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-green-600">{{ channelStats.total }}</div>
              <div class="text-sm text-neutral-500 mt-1">推荐渠道</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-green-600">{{ channelStats.official }}</div>
              <div class="text-sm text-neutral-500 mt-1">官方渠道</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-green-600">{{ channelStats.verified }}</div>
              <div class="text-sm text-neutral-500 mt-1">认证商家</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-green-600">{{ channelStats.satisfaction }}</div>
              <div class="text-sm text-neutral-500 mt-1">满意度</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 渠道列表 -->
    <section class="py-16">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="channel in filteredChannels"
            :key="channel.id"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <!-- 渠道头部 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img
                  :src="channel.logo"
                  :alt="channel.name"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {{ channel.name }}
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span
                      :class="[
                        'text-xs px-2 py-1 rounded-full font-medium',
                        getChannelTypeClass(channel.type)
                      ]"
                    >
                      {{ getChannelTypeLabel(channel.type) }}
                    </span>
                    <span
                      v-if="channel.verified"
                      class="text-blue-500"
                      title="官方认证"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                  </div>
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

            <!-- 渠道描述 -->
            <p class="text-neutral-600 text-sm mb-4 leading-relaxed">
              {{ channel.description }}
            </p>

            <!-- 渠道特点 -->
            <div class="space-y-2 mb-4">
              <div
                v-for="feature in channel.features.slice(0, 3)"
                :key="feature"
                class="flex items-center text-sm"
              >
                <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-600">{{ feature }}</span>
              </div>
            </div>

            <!-- 价格和配送信息 -->
            <div class="bg-neutral-50 rounded-lg p-3 mb-4 space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500">价格范围</span>
                <span class="font-medium text-neutral-900">{{ channel.priceRange }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500">配送时间</span>
                <span class="font-medium text-neutral-900">{{ channel.shipping }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500">支付方式</span>
                <span class="font-medium text-neutral-900">{{ channel.payment }}</span>
              </div>
            </div>

            <!-- 用户评价 -->
            <div v-if="channel.review" class="bg-blue-50 rounded-lg p-3 mb-4">
              <div class="flex items-start space-x-2">
                <svg class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
                <div>
                  <p class="text-sm text-neutral-700 mb-1">{{ channel.review.content }}</p>
                  <span class="text-xs text-neutral-500">- {{ channel.review.author }}</span>
                </div>
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
              <button
                @click="toggleFavorite(channel)"
                :class="[
                  'p-2 rounded-lg transition-colors duration-200',
                  channel.isFavorited
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                ]"
                :title="channel.isFavorited ? '取消收藏' : '收藏渠道'"
              >
                <svg class="w-4 h-4" :fill="channel.isFavorited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 购买建议 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              购买建议与注意事项
            </h2>
            <p class="text-lg text-neutral-600">
              选择购买渠道时的重要考虑因素
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="advice in buyingAdvice"
              :key="advice.id"
              class="bg-gradient-to-br from-neutral-50 to-white rounded-xl p-6 border border-neutral-200"
            >
              <div class="flex items-start space-x-4">
                <div
                  :class="[
                    'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                    advice.iconBg
                  ]"
                >
                  <span class="text-2xl">{{ advice.icon }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-2">{{ advice.title }}</h3>
                  <p class="text-neutral-600 text-sm leading-relaxed mb-3">{{ advice.description }}</p>
                  <ul class="space-y-1">
                    <li
                      v-for="tip in advice.tips"
                      :key="tip"
                      class="text-sm text-neutral-600 flex items-start"
                    >
                      <span class="text-primary-600 mr-2">•</span>
                      <span>{{ tip }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 价格对比工具 -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              价格对比工具
            </h2>
            <p class="text-lg text-neutral-600">
              比较不同渠道的价格，找到最优惠的购买选择
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                选择要对比的商品
              </label>
              <select
                v-model="selectedProduct"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">请选择商品</option>
                <option
                  v-for="product in products"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
            </div>

            <div v-if="selectedProduct" class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-neutral-200">
                    <th class="text-left py-3 px-4 font-medium text-neutral-900">渠道</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-900">价格</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-900">配送</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-900">评分</th>
                    <th class="text-left py-3 px-4 font-medium text-neutral-900">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="comparison in priceComparisons"
                    :key="comparison.channelId"
                    class="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-2">
                        <img :src="comparison.logo" :alt="comparison.name" class="w-6 h-6 rounded" />
                        <span class="font-medium">{{ comparison.name }}</span>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="font-semibold text-neutral-900">¥{{ comparison.price }}</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-neutral-600">{{ comparison.shipping }}</td>
                    <td class="py-3 px-4">
                      <div class="flex items-center">
                        <span class="text-sm">{{ comparison.rating }}</span>
                        <svg class="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <a
                        :href="comparison.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        前往购买
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="py-16 bg-gradient-primary text-white">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          开始您的安全购买之旅
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          选择可靠的购买渠道，享受安心的收藏体验
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/guide/authentic-vs-fake" class="btn-secondary">
            学习真假辨别
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
import { ref, computed, onMounted } from 'vue'
import { useUIStore } from '../../stores/ui'

export default {
  name: 'WhereToBuy',
  setup() {
    const uiStore = useUIStore()

    // 响应式数据
    const selectedFilter = ref('all')
    const selectedProduct = ref('')

    // 统计数据
    const channelStats = ref({
      total: '50+',
      official: '12',
      verified: '38',
      satisfaction: '96%'
    })

    // 购买渠道数据
    const channels = ref([
      {
        id: 1,
        name: '泡泡玛特官方商城',
        type: 'official',
        logo: '/channel-popmart.jpg',
        rating: 5,
        verified: true,
        description: '泡泡玛特官方直营商城，100%正品保证，最新款式第一时间上架。',
        features: ['100%正品保证', '官方售后服务', '新品首发', '会员积分'],
        priceRange: '¥59-299',
        shipping: '1-3天',
        payment: '支付宝/微信',
        url: 'https://www.popmart.com',
        review: {
          content: '官方渠道最放心，客服态度也很好，发货很快。',
          author: '收藏达人小李'
        },
        isFavorited: false
      },
      {
        id: 2,
        name: '天猫泡泡玛特旗舰店',
        type: 'authorized',
        logo: '/channel-tmall.jpg',
        rating: 5,
        verified: true,
        description: '天猫官方授权旗舰店，享受天猫购物保障和快速配送服务。',
        features: ['正品保障', '天猫保障', '快速配送', '7天无理由退换'],
        priceRange: '¥59-299',
        shipping: '次日达',
        payment: '支付宝/花呗',
        url: 'https://popmart.tmall.com',
        review: {
          content: '天猫购物很方便，物流很快，包装也很好。',
          author: '天猫用户'
        },
        isFavorited: false
      },
      {
        id: 3,
        name: '京东自营',
        type: 'authorized',
        logo: '/channel-jd.jpg',
        rating: 4,
        verified: true,
        description: '京东自营商品，品质保证，享受京东优质的物流和售后服务。',
        features: ['品质保证', '京东物流', '售后无忧', '白条分期'],
        priceRange: '¥65-320',
        shipping: '当日达/次日达',
        payment: '京东支付/白条',
        url: 'https://www.jd.com',
        review: {
          content: '京东物流真的很快，商品质量也有保障。',
          author: 'JD用户'
        },
        isFavorited: false
      },
      {
        id: 4,
        name: '闲鱼二手市场',
        type: 'secondhand',
        logo: '/channel-xianyu.jpg',
        rating: 3,
        verified: false,
        description: '阿里巴巴旗下二手交易平台，可以找到绝版或稀有款式。',
        features: ['价格优惠', '款式丰富', '支付宝担保', '芝麻信用'],
        priceRange: '¥30-500',
        shipping: '2-5天',
        payment: '支付宝担保',
        url: 'https://www.xianyu.com',
        review: {
          content: '能淘到一些绝版款，但要仔细辨别真假。',
          author: '二手买家'
        },
        isFavorited: false
      },
      {
        id: 5,
        name: '微信小程序商城',
        type: 'official',
        logo: '/channel-wechat.jpg',
        rating: 4,
        verified: true,
        description: '泡泡玛特官方微信小程序，便捷购物，支持微信支付。',
        features: ['微信便捷支付', '小程序专享', '社群分享', '积分兑换'],
        priceRange: '¥59-299',
        shipping: '2-4天',
        payment: '微信支付',
        url: 'https://mp.weixin.qq.com',
        review: {
          content: '小程序很方便，经常有一些专享活动。',
          author: '微信用户'
        },
        isFavorited: false
      },
      {
        id: 6,
        name: '得物App',
        type: 'secondhand',
        logo: '/channel-dewu.jpg',
        rating: 4,
        verified: false,
        description: '专业的潮流商品交易平台，有专业鉴定服务。',
        features: ['专业鉴定', '正品保障', '潮流社区', '分期付款'],
        priceRange: '¥80-800',
        shipping: '3-7天',
        payment: '支付宝/微信',
        url: 'https://www.dewu.com',
        review: {
          content: '鉴定服务很专业，买二手比较放心。',
          author: '潮玩爱好者'
        },
        isFavorited: false
      }
    ])

    // 产品列表
    const products = ref([
      { id: 1, name: 'Labubu 基础款' },
      { id: 2, name: 'The Monsters 盲盒' },
      { id: 3, name: 'Zimomo 联名款' },
      { id: 4, name: 'Skull Panda 系列' }
    ])

    // 价格对比数据
    const priceComparisons = ref([
      {
        channelId: 1,
        name: '泡泡玛特官方',
        logo: '/channel-popmart.jpg',
        price: 59,
        shipping: '1-3天',
        rating: 5.0,
        url: 'https://www.popmart.com'
      },
      {
        channelId: 2,
        name: '天猫旗舰店',
        logo: '/channel-tmall.jpg',
        price: 59,
        shipping: '次日达',
        rating: 5.0,
        url: 'https://popmart.tmall.com'
      },
      {
        channelId: 3,
        name: '京东自营',
        logo: '/channel-jd.jpg',
        price: 65,
        shipping: '当日达',
        rating: 4.8,
        url: 'https://www.jd.com'
      }
    ])

    // 购买建议
    const buyingAdvice = ref([
      {
        id: 1,
        title: '优先选择官方渠道',
        description: '官方渠道是最可靠的选择，确保正品和完善的售后服务',
        icon: '🏪',
        iconBg: 'bg-blue-100',
        tips: [
          '泡泡玛特官方商城是首选',
          '官方授权的天猫、京东店铺',
          '关注官方微信小程序',
          '避免非授权第三方卖家'
        ]
      },
      {
        id: 2,
        title: '比较价格和服务',
        description: '不同渠道的价格和服务可能有差异，选择最适合的',
        icon: '💰',
        iconBg: 'bg-green-100',
        tips: [
          '对比多个平台的价格',
          '考虑配送时间和费用',
          '了解退换货政策',
          '关注促销活动和优惠'
        ]
      },
      {
        id: 3,
        title: '注意二手市场风险',
        description: '二手市场价格优惠，但需要特别注意真伪辨别',
        icon: '⚠️',
        iconBg: 'bg-orange-100',
        tips: [
          '选择信誉良好的卖家',
          '要求提供购买凭证',
          '仔细检查商品图片',
          '使用平台担保交易'
        ]
      },
      {
        id: 4,
        title: '保护个人权益',
        description: '购买时要注意保护自己的权益，保留相关证据',
        icon: '🛡️',
        iconBg: 'bg-purple-100',
        tips: [
          '保存购买记录和凭证',
          '了解平台保障政策',
          '及时联系客服解决问题',
          '必要时申请平台介入'
        ]
      }
    ])

    // 筛选后的渠道
    const filteredChannels = computed(() => {
      if (selectedFilter.value === 'all') {
        return channels.value
      }
      return channels.value.filter(channel => channel.type === selectedFilter.value)
    })

    // 筛选渠道
    const filterChannels = (type) => {
      selectedFilter.value = type
    }

const getChannelTypeClass = (type) => {
      const classes = {
        official: 'bg-blue-100 text-blue-800',
        authorized: 'bg-green-100 text-green-800',
        secondhand: 'bg-orange-100 text-orange-800'
      }
      return classes[type] || 'bg-neutral-100 text-neutral-800'
    }

    // 获取渠道类型标签
    const getChannelTypeLabel = (type) => {
      const labels = {
        official: '官方渠道',
        authorized: '授权经销',
        secondhand: '二手市场'
      }
      return labels[type] || '其他'
    }

    // 查看渠道详情
    const viewChannelDetails = (channel) => {
      // 这里可以打开模态框显示详细信息
      console.log('查看渠道详情:', channel)
    }

    // 切换收藏状态
    const toggleFavorite = (channel) => {
      channel.isFavorited = !channel.isFavorited
      // 这里可以调用API保存收藏状态
    }

    // 页面加载时的操作
    onMounted(() => {
      // 设置页面标题和meta信息
      document.title = '购买渠道指南 - Labubu收藏门户'
      
      // 设置meta描述
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', '发现最可靠的Labubu购买渠道，包括官方商城、授权经销商和二手市场。比较价格、服务和用户评价，确保安全购买正品收藏品。')
      }

      // 设置结构化数据
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Labubu购买渠道指南",
        "description": "最全面的Labubu购买渠道指南，帮助收藏者找到可靠的购买渠道",
        "url": window.location.href,
        "mainEntity": {
          "@type": "ItemList",
          "name": "推荐购买渠道",
          "numberOfItems": channels.value.length,
          "itemListElement": channels.value.map((channel, index) => ({
            "@type": "Organization",
            "position": index + 1,
            "name": channel.name,
            "description": channel.description,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": channel.rating,
              "bestRating": 5
            }
          }))
        }
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    })

    return {
      selectedFilter,
      selectedProduct,
      channelStats,
      channels,
      products,
      priceComparisons,
      buyingAdvice,
      filteredChannels,
      filterChannels,
      getChannelTypeClass,
      getChannelTypeLabel,
      viewChannelDetails,
      toggleFavorite
    }
  }
}
</script>

<style scoped>
.text-gradient-channel {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    padding: 0 2rem;
  }
}

.btn-secondary {
  @apply bg-white bg-opacity-20 text-white border border-white border-opacity-30 hover:bg-opacity-30 px-6 py-3 rounded-lg font-medium transition-all duration-200;
}

/* 动画效果 */
.group:hover .group-hover\:text-primary-600 {
  transition: color 0.2s ease-in-out;
}

/* 响应式表格 */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding: 0.5rem;
  }
}

/* 卡片悬停效果 */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 自定义滚动条 */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
    // 获取渠道类型样式