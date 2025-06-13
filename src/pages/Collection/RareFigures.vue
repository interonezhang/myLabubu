<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/rare-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            稀有收藏品
            <span class="text-gradient-rare">殿堂</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            探索最珍贵、最稀有的Labubu收藏品，了解它们的独特价值和收藏意义
          </p>
          
          <!-- 稀有度说明 -->
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <div class="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span class="text-sm text-neutral-600">普通</span>
            </div>
            <div class="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div class="w-3 h-3 bg-green-400 rounded-full"></div>
              <span class="text-sm text-neutral-600">不常见</span>
            </div>
            <div class="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span class="text-sm text-neutral-600">稀有</span>
            </div>
            <div class="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span class="text-sm text-neutral-600">史诗</span>
            </div>
            <div class="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <div class="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span class="text-sm text-neutral-600">传说</span>
            </div>
          </div>

          <!-- 统计数据 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-amber-600">{{ rareStats.legendary }}</div>
              <div class="text-sm text-neutral-500 mt-1">传说级</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-purple-600">{{ rareStats.epic }}</div>
              <div class="text-sm text-neutral-500 mt-1">史诗级</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-blue-600">{{ rareStats.rare }}</div>
              <div class="text-sm text-neutral-500 mt-1">稀有级</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-primary-600">{{ rareStats.total }}</div>
              <div class="text-sm text-neutral-500 mt-1">总计</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 筛选和排序 -->
    <section class="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div class="container-custom py-6">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- 稀有度筛选 -->
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedRarity = ''"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                !selectedRarity 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 border border-neutral-300'
              ]"
            >
              全部
            </button>
            <button
              v-for="rarity in rarityLevels"
              :key="rarity.value"
              @click="selectedRarity = rarity.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-2',
                selectedRarity === rarity.value 
                  ? `bg-${rarity.color}-600 text-white` 
                  : `bg-white text-neutral-600 hover:bg-${rarity.color}-50 hover:text-${rarity.color}-600 border border-neutral-300`
              ]"
            >
              <div :class="`w-3 h-3 bg-${rarity.color}-400 rounded-full`"></div>
              <span>{{ rarity.label }}</span>
            </button>
          </div>

          <!-- 排序选项 -->
          <div class="flex items-center space-x-4">
            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
            >
              <option value="rarity">稀有度排序</option>
              <option value="price_desc">价格从高到低</option>
              <option value="price_asc">价格从低到高</option>
              <option value="release_date">发布时间</option>
              <option value="popularity">热门程度</option>
            </select>

            <!-- 视图切换 -->
            <div class="flex items-center space-x-2">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 传说级收藏品 -->
    <section v-if="legendaryItems.length > 0" class="py-12 bg-gradient-to-br from-amber-50 to-orange-50">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900 flex items-center">
            <div class="w-6 h-6 bg-amber-400 rounded-full mr-3"></div>
            传说级收藏品
          </h2>
          <span class="text-sm text-neutral-500">{{ legendaryItems.length }} 件</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RareCollectionCard
            v-for="item in legendaryItems"
            :key="item.id"
            :collection="item"
            :rarity="'legendary'"
          />
        </div>
      </div>
    </section>

    <!-- 史诗级收藏品 -->
    <section v-if="epicItems.length > 0" class="py-12 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900 flex items-center">
            <div class="w-6 h-6 bg-purple-400 rounded-full mr-3"></div>
            史诗级收藏品
          </h2>
          <span class="text-sm text-neutral-500">{{ epicItems.length }} 件</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RareCollectionCard
            v-for="item in epicItems"
            :key="item.id"
            :collection="item"
            :rarity="'epic'"
          />
        </div>
      </div>
    </section>

    <!-- 稀有级收藏品 -->
    <section v-if="rareItems.length > 0" class="py-12 bg-white">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-neutral-900 flex items-center">
            <div class="w-6 h-6 bg-blue-400 rounded-full mr-3"></div>
            稀有级收藏品
          </h2>
          <span class="text-sm text-neutral-500">{{ rareItems.length }} 件</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RareCollectionCard
            v-for="item in rareItems"
            :key="item.id"
            :collection="item"
            :rarity="'rare'"
          />
        </div>

        <!-- 加载更多 -->
        <div v-if="hasMoreRare" class="text-center mt-8">
          <button
            @click="loadMoreRare"
            :disabled="isLoadingMore"
            class="btn-outline"
          >
            {{ isLoadingMore ? '加载中...' : '查看更多稀有收藏品' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 收藏价值分析 -->
    <section class="py-16 bg-neutral-100">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-display font-bold text-neutral-900 text-center mb-12">
            稀有收藏品价值分析
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 市场趋势 -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-3">市场趋势</h3>
              <p class="text-neutral-600 text-sm mb-4">稀有收藏品在过去一年中平均升值35%，传说级收藏品升值幅度更大。</p>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-500">传说级</span>
                  <span class="text-green-600 font-medium">+58%</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-500">史诗级</span>
                  <span class="text-green-600 font-medium">+42%</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-500">稀有级</span>
                  <span class="text-green-600 font-medium">+28%</span>
                </div>
              </div>
            </div>

            <!-- 投资建议 -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-3">投资建议</h3>
              <ul class="text-neutral-600 text-sm space-y-2">
                <li>• 关注限量发行数量</li>
                <li>• 保持包装完整性</li>
                <li>• 选择热门系列</li>
                <li>• 长期持有策略</li>
                <li>• 分散投资风险</li>
              </ul>
            </div>

            <!-- 收藏技巧 -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-3">收藏技巧</h3>
              <ul class="text-neutral-600 text-sm space-y-2">
                <li>• 研究发行背景</li>
                <li>• 了解设计师故事</li>
                <li>• 关注社区热度</li>
                <li>• 记录收藏历程</li>
                <li>• 参与收藏家交流</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="bg-gradient-primary text-white py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
          开始您的稀有收藏之旅
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          加入我们的收藏家社区，获取最新的稀有收藏品信息和专业建议
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/guide/where-to-buy" class="btn-secondary">
            购买渠道指南
          </router-link>
          <router-link to="/community" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            加入收藏家社区
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '../../stores/content'
import RareCollectionCard from '../../components/content/RareCollectionCard.vue'

export default {
  name: 'RareFigures',
  components: {
    RareCollectionCard
  },
  setup() {
    const contentStore = useContentStore()

    // 响应式数据
    const selectedRarity = ref('')
    const sortBy = ref('rarity')
    const viewMode = ref('grid')
    const isLoadingMore = ref(false)
    const hasMoreRare = ref(true)

    // 稀有度级别
    const rarityLevels = [
      { value: 'rare', label: '稀有', color: 'blue' },
      { value: 'epic', label: '史诗', color: 'purple' },
      { value: 'legendary', label: '传说', color: 'amber' }
    ]

    // 模拟数据
    const allRareItems = ref([])
    const rareStats = ref({
      legendary: 12,
      epic: 28,
      rare: 156,
      total: 196
    })

    // 计算属性
    const legendaryItems = computed(() => 
      allRareItems.value.filter(item => item.rarity === 'legendary')
    )

    const epicItems = computed(() => 
      allRareItems.value.filter(item => item.rarity === 'epic')
    )

    const rareItems = computed(() => 
      allRareItems.value.filter(item => item.rarity === 'rare').slice(0, 12)
    )

    // 加载稀有收藏品数据
    const loadRareItems = async () => {
      try {
        // 这里应该调用API获取稀有收藏品数据
        // 暂时使用模拟数据
        allRareItems.value = [
          // 传说级
          {
            id: 1,
            name: 'Labubu 金色限定版',
            rarity: 'legendary',
            price: 2999,
            originalPrice: 299,
            image: '/rare-labubu-gold.jpg',
            description: '全球限量100个的金色特别版',
            releaseDate: '2023-12-01',
            quantity: 100,
            currentValue: 2999
          },
          {
            id: 2,
            name: 'Labubu x 艺术家联名',
            rarity: 'legendary',
            price: 3999,
            originalPrice: 399,
            image: '/rare-labubu-artist.jpg',
            description: '与知名艺术家联名的独特设计',
            releaseDate: '2023-10-15',
            quantity: 50,
            currentValue: 3999
          },
          // 史诗级
          {
            id: 3,
            name: 'Labubu 水晶版',
            rarity: 'epic',
            price: 899,
            originalPrice: 199,
            image: '/rare-labubu-crystal.jpg',
            description: '透明水晶材质制作',
            releaseDate: '2023-11-20',
            quantity: 500,
            currentValue: 899
          },
          // 更多数据...
        ]
      } catch (error) {
        console.error('加载稀有收藏品失败:', error)
      }
    }

    // 处理排序变化
    const handleSortChange = () => {
      // 实现排序逻辑
      console.log('排序变化:', sortBy.value)
    }

    // 加载更多稀有收藏品
    const loadMoreRare = async () => {
      try {
        isLoadingMore.value = true
        // 加载更多数据的逻辑
        await new Promise(resolve => setTimeout(resolve, 1000))
        hasMoreRare.value = false
      } catch (error) {
        console.error('加载更多失败:', error)
      } finally {
        isLoadingMore.value = false
      }
    }

    onMounted(() => {
      loadRareItems()
    })

    return {
      selectedRarity,
      sortBy,
      viewMode,
      isLoadingMore,
      hasMoreRare,
      rarityLevels,
      rareStats,
      legendaryItems,
      epicItems,
      rareItems,
      handleSortChange,
      loadMoreRare
    }
  },
  head() {
    return {
      title: '稀有收藏品',
      meta: [
        {
          name: 'description',
          content: '探索最珍贵、最稀有的Labubu收藏品，了解它们的独特价值和收藏意义。'
        },
        {
          name: 'keywords',
          content: 'Labubu稀有收藏品,限量版,传说级,史诗级,收藏价值,投资潜力'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 稀有渐变文字效果 */
.text-gradient-rare {
  background: linear-gradient(135deg, theme('colors.amber.500'), theme('colors.orange.500'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 稀有度颜色 */
.bg-gray-400 { background-color: #9ca3af; }
.bg-green-400 { background-color: #4ade80; }
.bg-blue-400 { background-color: #60a5fa; }
.bg-purple-400 { background-color: #a78bfa; }
.bg-amber-400 { background-color: #fbbf24; }

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>