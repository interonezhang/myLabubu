<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/authentic-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            真假
            <span class="text-gradient-authentic">辨别指南</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            学习专业的真假辨别技巧，避免购买到假货，保护您的收藏投资
          </p>
          
          <!-- 快速导航 -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#identification-points" class="btn-primary">
              辨别要点
            </a>
            <a href="#comparison-guide" class="btn-outline">
              对比指南
            </a>
            <a href="#common-fakes" class="btn-outline">
              常见假货
            </a>
          </div>

          <!-- 警示统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-red-600">{{ fakeStats.reported }}</div>
              <div class="text-sm text-neutral-500 mt-1">假货举报</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-red-600">{{ fakeStats.identified }}</div>
              <div class="text-sm text-neutral-500 mt-1">成功识别</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-red-600">{{ fakeStats.saved }}</div>
              <div class="text-sm text-neutral-500 mt-1">避免损失</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-red-600">{{ fakeStats.accuracy }}</div>
              <div class="text-sm text-neutral-500 mt-1">识别准确率</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速检测工具 -->
    <section class="bg-white py-12 border-b border-neutral-200">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-2xl font-display font-bold text-neutral-900 mb-4">
            快速检测工具
          </h2>
          <p class="text-neutral-600 mb-8">
            上传您的Labubu照片，我们的AI将帮助您初步判断真伪
          </p>
          
          <div class="bg-neutral-50 rounded-xl p-8 border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors duration-200">
            <div class="text-center">
              <svg class="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-neutral-600 mb-4">点击上传或拖拽图片到此处</p>
              <button class="btn-primary">
                选择图片
              </button>
              <p class="text-xs text-neutral-500 mt-2">
                支持 JPG、PNG 格式，最大 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 辨别要点 -->
    <section id="identification-points" class="py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            关键辨别要点
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            掌握这些关键要点，让您快速准确地识别Labubu的真伪
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="point in identificationPoints"
            :key="point.id"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="flex items-center mb-4">
              <div
                :class="[
                  'w-12 h-12 rounded-lg flex items-center justify-center mr-4',
                  point.iconBg
                ]"
              >
                <span class="text-2xl">{{ point.icon }}</span>
              </div>
              <h3 class="text-lg font-semibold text-neutral-900">{{ point.title }}</h3>
            </div>
            
            <p class="text-neutral-600 text-sm mb-4">{{ point.description }}</p>
            
            <!-- 正品特征 -->
            <div class="mb-4">
              <h4 class="text-sm font-medium text-green-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                正品特征
              </h4>
              <ul class="space-y-1">
                <li
                  v-for="feature in point.authentic"
                  :key="feature"
                  class="text-xs text-neutral-600 flex items-start"
                >
                  <span class="text-green-500 mr-2">•</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- 假货特征 -->
            <div>
              <h4 class="text-sm font-medium text-red-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                假货特征
              </h4>
              <ul class="space-y-1">
                <li
                  v-for="feature in point.fake"
                  :key="feature"
                  class="text-xs text-neutral-600 flex items-start"
                >
                  <span class="text-red-500 mr-2">•</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 对比指南 -->
    <section id="comparison-guide" class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            正品vs假货对比
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            通过直观的对比图片，快速掌握真假差异
          </p>
        </div>

        <div class="space-y-12">
          <div
            v-for="comparison in comparisonGuides"
            :key="comparison.id"
            class="bg-neutral-50 rounded-xl p-8"
          >
            <h3 class="text-xl font-semibold text-neutral-900 mb-6 text-center">
              {{ comparison.title }}
            </h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- 正品 -->
              <div class="bg-white rounded-lg p-6 border-2 border-green-200">
                <div class="flex items-center justify-center mb-4">
                  <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ 正品
                  </span>
                </div>
                <img
                  :src="comparison.authentic.image"
                  :alt="`正品${comparison.title}`"
                  class="w-full h-48 object-cover rounded-lg mb-4"
                />
                <ul class="space-y-2">
                  <li
                    v-for="feature in comparison.authentic.features"
                    :key="feature"
                    class="text-sm text-neutral-600 flex items-start"
                  >
                    <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- 假货 -->
              <div class="bg-white rounded-lg p-6 border-2 border-red-200">
                <div class="flex items-center justify-center mb-4">
                  <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✗ 假货
                  </span>
                </div>
                <img
                  :src="comparison.fake.image"
                  :alt="`假货${comparison.title}`"
                  class="w-full h-48 object-cover rounded-lg mb-4"
                />
                <ul class="space-y-2">
                  <li
                    v-for="feature in comparison.fake.features"
                    :key="feature"
                    class="text-sm text-neutral-600 flex items-start"
                  >
                    <svg class="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见假货类型 -->
    <section id="common-fakes" class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            常见假货类型
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            了解市面上常见的假货类型，提高警惕性
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="fakeType in commonFakeTypes"
            :key="fakeType.id"
            class="bg-white rounded-xl p-6 shadow-lg"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">{{ fakeType.title }}</h3>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    getRiskLevelClass(fakeType.riskLevel)
                  ]"
                >
                  {{ getRiskLevelText(fakeType.riskLevel) }}
                </span>
              </div>
            </div>

            <p class="text-neutral-600 text-sm mb-4">{{ fakeType.description }}</p>

            <div class="space-y-3">
              <div>
                <h4 class="text-sm font-medium text-neutral-900 mb-2">识别特征：</h4>
                <ul class="space-y-1">
                  <li
                    v-for="feature in fakeType.features"
                    :key="feature"
                    class="text-xs text-neutral-600 flex items-start"
                  >
                    <span class="text-red-500 mr-2">•</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-sm font-medium text-neutral-900 mb-2">防范建议：</h4>
                <ul class="space-y-1">
                  <li
                    v-for="tip in fakeType.tips"
                    :key="tip"
                    class="text-xs text-neutral-600 flex items-start"
                  >
                    <span class="text-blue-500 mr-2">•</span>
                    <span>{{ tip }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 专家建议 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              专家建议
            </h2>
            <p class="text-lg text-neutral-600">
              资深收藏家和鉴定专家的专业建议
            </p>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <div class="flex items-start space-x-4">
              <img
                src="/expert-avatar.jpg"
                alt="鉴定专家"
                class="w-16 h-16 rounded-full"
              />
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <h3 class="font-semibold text-neutral-900">李明华</h3>
                  <span class="text-blue-600" title="认证专家">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </span>
                  <span class="text-sm text-neutral-500">资深收藏鉴定专家</span>
                </div>
                
                <blockquote class="text-neutral-700 leading-relaxed mb-4">
                  "在我多年的鉴定经验中，发现很多收藏者容易忽视细节。真正的鉴定不仅要看外观，更要从材质、工艺、包装等多个维度综合判断。建议新手收藏者多学习、多对比，培养敏锐的观察力。"
                </blockquote>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-white rounded-lg p-4">
                    <h4 class="font-medium text-neutral-900 mb-2">核心建议</h4>
                    <p class="text-sm text-neutral-600">从可靠渠道购买，保留所有购买凭证</p>
                  </div>
                  <div class="bg-white rounded-lg p-4">
                    <h4 class="font-medium text-neutral-900 mb-2">鉴定重点</h4>
                    <p class="text-sm text-neutral-600">重点关注材质手感和工艺细节</p>
                  </div>
                  <div class="bg-white rounded-lg p-4">
                    <h4 class="font-medium text-neutral-900 mb-2">学习方法</h4>
                    <p class="text-sm text-neutral-600">多看正品实物，培养鉴别能力</p>
                  </div>
                </div>
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
          保护您的收藏投资
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          掌握了辨别技巧，现在就去安全地购买您心仪的Labubu收藏品吧
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/guide/where-to-buy" class="btn-secondary">
            查看可靠渠道
          </router-link>
          <router-link to="/collection/guide" class="bg-white text-primary-600 hover:bg-neutral-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            学习收藏知识
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AuthenticVsFake',
  setup() {
    // 响应式数据
    const fakeStats = ref({
      reported: '2.3K',
      identified: '95%',
      saved: '¥180K',
      accuracy: '98.5%'
    })

    // 辨别要点
    const identificationPoints = ref([
      {
        id: 1,
        title: '包装检查',
        description: '正品包装印刷清晰，材质厚实，无明显瑕疵',
        icon: '📦',
        iconBg: 'bg-blue-100',
        authentic: [
          '包装盒印刷清晰，颜色饱满',
          '材质厚实，手感良好',
          '封口胶带平整，无气泡',
          '防伪标识清晰可见'
        ],
        fake: [
          '印刷模糊，颜色偏差',
          '材质薄弱，容易变形',
          '封口粗糙，有明显瑕疵',
          '缺少或伪造防伪标识'
        ]
      },
      {
        id: 2,
        title: '材质手感',
        description: '正品材质柔软有弹性，表面光滑无毛刺',
        icon: '🤲',
        iconBg: 'bg-green-100',
        authentic: [
          '材质柔软，有良好弹性',
          '表面光滑，无毛刺',
          '重量适中，手感舒适',
          '无异味或刺激性气味'
        ],
        fake: [
          '材质硬邦邦，缺乏弹性',
          '表面粗糙，有明显瑕疵',
          '重量偏轻或偏重',
          '有刺鼻的化学气味'
        ]
      },
      {
        id: 3,
        title: '工艺细节',
        description: '正品工艺精致，五官对称，色彩均匀',
        icon: '🎨',
        iconBg: 'bg-purple-100',
        authentic: [
          '五官精致，比例协调',
          '色彩饱满，过渡自然',
          '接缝处理完美',
          '细节丰富，层次分明'
        ],
        fake: [
          '五官不对称，比例失调',
          '色彩不均匀，有色差',
          '接缝明显，处理粗糙',
          '细节缺失，做工粗糙'
        ]
      },
      {
        id: 4,
        title: '标识验证',
        description: '正品有完整的品牌标识和防伪码',
        icon: '🏷️',
        iconBg: 'bg-orange-100',
        authentic: [
          '品牌标识清晰完整',
          '防伪码可正常验证',
          '序列号格式正确',
          '官方授权标识齐全'
        ],
        fake: [
          '标识模糊或缺失',
          '防伪码无法验证',
          '序列号格式错误',
          '缺少官方授权标识'
        ]
      }
    ])

    // 对比指南
    const comparisonGuides = ref([
      {
        id: 1,
        title: '包装对比',
        authentic: {
          image: '/authentic-package.jpg',
          features: [
            '印刷清晰，色彩饱满',
            '材质厚实，质感良好',
            '防伪标识完整清晰',
            '封装工艺精良'
          ]
        },
        fake: {
          image: '/fake-package.jpg',
          features: [
            '印刷模糊，色彩偏差',
            '材质薄弱，容易变形',
            '防伪标识缺失或模糊',
            '封装工艺粗糙'
          ]
        }
      },
      {
        id: 2,
        title: '产品细节对比',
        authentic: {
          image: '/authentic-detail.jpg',
          features: [
            '五官精致，比例完美',
            '色彩均匀，过渡自然',
            '材质柔软，手感舒适',
            '工艺精良，无瑕疵'
          ]
        },
        fake: {
          image: '/fake-detail.jpg',
          features: [
            '五官粗糙，比例失调',
            '色彩不均，有明显色差',
            '材质硬邦，手感差',
            '工艺粗糙，有明显瑕疵'
          ]
        }
      }
    ])

    // 常见假货类型
    const commonFakeTypes = ref([
      {
        id: 1,
        title: '高仿假货',
        description: '外观相似度较高，但细节和材质存在明显差异',
        riskLevel: 'high',
        features: [
          '外观相似度高，容易混淆',
          '材质和手感与正品有差异',
          '工艺细节处理不够精细',
          '包装可能高度仿制'
        ],
        tips: [
          '仔细检查材质和手感',
          '对比官方图片细节',
          '验证防伪码真伪',
          '选择可靠购买渠道'
        ]
      },
      {
        id: 2,
        title: '劣质仿品',
        description: '制作粗糙，容易识别，但价格诱人',
        riskLevel: 'medium',
        features: [
          '制作工艺明显粗糙',
          '材质质量很差',
          '色彩和形状差异明显',
          '包装简陋或缺失'
        ],
        tips: [
          '警惕异常低价',
          '注意卖家信誉',
          '要求提供清晰图片',
          '了解正品特征'
        ]
      },
      {
        id: 3,
        title: '二手假货',
        description: '以二手名义出售的假货，价格相对合理',
        riskLevel: 'high',
        features: [
          '以二手名义降低怀疑',
          '价格设置相对合理',
          '可能有人为做旧痕迹',
          '缺少原包装或凭证'
        ],
        tips: [
          '要求提供购买凭证',
          '仔细检查磨损痕迹',
          '对比新品特征',
          '选择可靠二手平台'
        ]
      }
    ])

    // 获取风险等级样式
    const getRiskLevelClass = (level) => {
      const classes = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-orange-100 text-orange-700',
        low: 'bg-yellow-100 text-yellow-700'
      }
      return classes[level] || 'bg-neutral-100 text-neutral-700'
    }

    // 获取风险等级文本
    const getRiskLevelText = (level) => {
      const texts = {
        high: '高风险',
        medium: '中风险',
        low: '低风险'
      }
      return texts[level] || '未知'
    }

    onMounted(() => {
      // 初始化数据
    })

    return {
      fakeStats,
      identificationPoints,
      comparisonGuides,
      commonFakeTypes,
      getRiskLevelClass,
      getRiskLevelText
    }
  },
  head() {
    return {
      title: '真假辨别指南',
      meta: [
        {
          name: 'description',
          content: '学习如何鉴别Labubu的真伪，避免购买假货。专业的辨别技巧和对比指南。'
        },
        {
          name: 'keywords',
          content: 'Labubu真伪鉴别,防伪指南,正品识别,假货辨别,收藏鉴定'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 真伪辨别渐变文字效果 */
.text-gradient-authentic {
  background: linear-gradient(135deg, theme('colors.red.500'), theme('colors.orange.500'));
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