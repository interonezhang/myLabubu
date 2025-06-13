<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/guide-pattern.svg')] opacity-5"></div>
      <div class="container-custom py-16 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            Labubu收藏
            <span class="text-gradient-primary">完整指南</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            从入门到精通，全面掌握Labubu收藏的方方面面，成为专业的收藏家
          </p>
          
          <!-- 快速导航 -->
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#getting-started" class="btn-primary">
              新手入门
            </a>
            <a href="#identification" class="btn-outline">
              真假辨别
            </a>
            <a href="#investment" class="btn-outline">
              投资价值
            </a>
            <a href="#maintenance" class="btn-outline">
              保养技巧
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 目录导航 -->
    <nav class="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div class="container-custom py-4">
        <div class="flex items-center space-x-6 overflow-x-auto">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            :class="[
              'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              activeSection === section.id
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
            ]"
            @click="scrollToSection(section.id)"
          >
            {{ section.title }}
          </a>
        </div>
      </div>
    </nav>

    <!-- 指南内容 -->
    <div class="container-custom py-12">
      <div class="max-w-4xl mx-auto">
        <!-- 新手入门 -->
        <section id="getting-started" class="guide-section">
          <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-12">
            <h2 class="text-3xl font-display font-bold text-neutral-900 mb-6 flex items-center">
              <span class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4 text-lg font-bold">1</span>
              新手入门指南
            </h2>
            
            <div class="prose prose-lg max-w-none">
              <h3>什么是Labubu？</h3>
              <p>Labubu是由香港艺术家Kasing Lung创作的经典IP形象，以其独特的精灵造型和丰富的表情变化深受全球收藏家喜爱。自2015年首次亮相以来，Labubu已经发展成为潮玩界的标志性角色。</p>
              
              <h3>为什么选择收藏Labubu？</h3>
              <ul>
                <li><strong>艺术价值</strong>：每款Labubu都体现了独特的艺术设计理念</li>
                <li><strong>收藏价值</strong>：限量发行，具有很好的保值增值潜力</li>
                <li><strong>情感价值</strong>：可爱的造型带来愉悦的收藏体验</li>
                <li><strong>社交价值</strong>：连接全球收藏家社区</li>
              </ul>

              <h3>收藏入门建议</h3>
              <div class="bg-primary-50 border-l-4 border-primary-500 p-6 my-6">
                <h4 class="text-primary-800 font-semibold mb-2">💡 新手建议</h4>
                <ul class="text-primary-700 space-y-2">
                  <li>从常规款开始，逐步了解市场</li>
                  <li>关注官方发布渠道，获取第一手信息</li>
                  <li>加入收藏家社群，学习经验</li>
                  <li>设定合理的收藏预算</li>
                </ul>
              </div>
            </div>

            <!-- 入门收藏品推荐 -->
            <div class="mt-8">
              <h3 class="text-xl font-semibold text-neutral-900 mb-4">入门推荐收藏品</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  v-for="item in beginnerRecommendations"
                  :key="item.id"
                  class="bg-neutral-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img :src="item.image" :alt="item.name" class="w-full h-32 object-cover rounded-lg mb-3" />
                  <h4 class="font-medium text-neutral-900 mb-1">{{ item.name }}</h4>
                  <p class="text-sm text-neutral-600 mb-2">{{ item.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-primary-600 font-semibold">¥{{ item.price }}</span>
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{{ item.difficulty }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 真假辨别 -->
        <section id="identification" class="guide-section">
          <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-12">
            <h2 class="text-3xl font-display font-bold text-neutral-900 mb-6 flex items-center">
              <span class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4 text-lg font-bold">2</span>
              真假辨别技巧
            </h2>

            <div class="prose prose-lg max-w-none">
              <p class="text-lg text-neutral-600 mb-6">掌握正确的辨别方法，避免购买到假货，保护您的收藏投资。</p>

              <!-- 辨别要点 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="space-y-6">
                  <h3 class="text-xl font-semibold text-neutral-900 mb-4">正品特征</h3>
                  
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">包装质量</h4>
                        <p class="text-sm text-neutral-600">正品包装印刷清晰，材质厚实，无明显瑕疵</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">材质手感</h4>
                        <p class="text-sm text-neutral-600">正品材质柔软有弹性，表面光滑无毛刺</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">细节工艺</h4>
                        <p class="text-sm text-neutral-600">五官精致，色彩饱满，接缝处理完美</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <h3 class="text-xl font-semibold text-neutral-900 mb-4">假货特征</h3>
                  
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">包装粗糙</h4>
                        <p class="text-sm text-neutral-600">印刷模糊，颜色偏差，材质薄弱</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">材质劣质</h4>
                        <p class="text-sm text-neutral-600">手感硬邦邦，表面有明显瑕疵</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <div class="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-medium text-neutral-900">工艺粗糙</h4>
                        <p class="text-sm text-neutral-600">五官不对称，颜色不均匀，接缝明显</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 对比图片 -->
              <div class="bg-neutral-50 rounded-lg p-6 mb-8">
                <h4 class="font-semibold text-neutral-900 mb-4">正品vs假货对比</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="text-center">
                    <img src="/authentic-comparison.jpg" alt="正品对比" class="w-full h-48 object-cover rounded-lg mb-3" />
                    <span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">正品</span>
                  </div>
                  <div class="text-center">
                    <img src="/fake-comparison.jpg" alt="假货对比" class="w-full h-48 object-cover rounded-lg mb-3" />
                    <span class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">假货</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 投资价值分析 -->
        <section id="investment" class="guide-section">
          <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-12">
            <h2 class="text-3xl font-display font-bold text-neutral-900 mb-6 flex items-center">
              <span class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4 text-lg font-bold">3</span>
              投资价值分析
            </h2>

            <div class="prose prose-lg max-w-none">
              <p class="text-lg text-neutral-600 mb-6">了解Labubu的投资潜力，做出明智的收藏决策。</p>

              <!-- 价值因素 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div class="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-2">稀有度</h3>
                  <p class="text-sm text-neutral-600">限量发行数量越少，升值潜力越大</p>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div class="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-2">受欢迎程度</h3>
                  <p class="text-sm text-neutral-600">社区热度和讨论度影响市场需求</p>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div class="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-neutral-900 mb-2">品相完整度</h3>
                  <p class="text-sm text-neutral-600">包装完整、无损坏的收藏品价值更高</p>
                </div>
              </div>

              <!-- 投资建议 -->
              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <h4 class="text-yellow-800 font-semibold mb-2">⚠️ 投资提醒</h4>
                <ul class="text-yellow-700 space-y-1">
                  <li>收藏品投资存在风险，价格可能波动</li>
                  <li>建议以兴趣为主，投资为辅</li>
                  <li>分散投资，不要把所有资金投入单一收藏品</li>
                  <li>关注市场趋势，理性判断</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 保养维护 -->
        <section id="maintenance" class="guide-section">
          <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 mb-12">
            <h2 class="text-3xl font-display font-bold text-neutral-900 mb-6 flex items-center">
              <span class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4 text-lg font-bold">4</span>
              保养维护技巧
            </h2>

            <div class="prose prose-lg max-w-none">
              <p class="text-lg text-neutral-600 mb-6">正确的保养方法能让您的收藏品保持最佳状态，延长使用寿命。</p>

              <!-- 保养步骤 -->
              <div class="space-y-8">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-2">清洁保养</h3>
                    <ul class="space-y-2 text-neutral-600">
                      <li>使用软毛刷轻轻清除表面灰尘</li>
                      <li>避免使用化学清洁剂</li>
                      <li>如有污渍，用湿布轻轻擦拭后立即晾干</li>
                      <li>定期清洁，保持收藏品整洁</li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-2">存储环境</h3>
                    <ul class="space-y-2 text-neutral-600">
                      <li>避免阳光直射，防止褪色</li>
                      <li>保持适宜的温湿度（温度18-24℃，湿度45-65%）</li>
                      <li>远离热源和潮湿环境</li>
                      <li>使用防尘罩或展示柜保护</li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-2">包装保存</h3>
                    <ul class="space-y-2 text-neutral-600">
                      <li>保留原包装盒和说明书</li>
                      <li>使用无酸纸包装材料</li>
                      <li>避免塑料袋长期包装（可能产生化学反应）</li>
                      <li>分类存放，避免相互挤压</li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                  <div>
                    <h3 class="text-xl font-semibold text-neutral-900 mb-2">定期检查</h3>
                    <ul class="space-y-2 text-neutral-600">
                      <li>每月检查一次收藏品状态</li>
                      <li>及时发现并处理问题</li>
                      <li>记录收藏品的变化情况</li>
                      <li>必要时寻求专业修复建议</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 相关资源 -->
        <section class="bg-gradient-primary text-white rounded-xl p-8 mb-12">
          <h2 class="text-2xl font-display font-bold mb-6">相关资源</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <router-link to="/collection/rare-figures" class="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors">
              <h3 class="font-semibold mb-2">稀有收藏品</h3>
              <p class="text-sm opacity-90">探索最珍贵的Labubu收藏品</p>
            </router-link>
            <router-link to="/guide/where-to-buy" class="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors">
              <h3 class="font-semibold mb-2">购买渠道</h3>
              <p class="text-sm opacity-90">了解可靠的购买渠道</p>
            </router-link>
            <router-link to="/community" class="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors">
              <h3 class="font-semibold mb-2">收藏家社区</h3>
              <p class="text-sm opacity-90">与其他收藏家交流经验</p>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CollectionGuide',
  setup() {
    const activeSection = ref('getting-started')
    
    // 导航章节
    const sections = [
      { id: 'getting-started', title: '新手入门' },
      { id: 'identification', title: '真假辨别' },
      { id: 'investment', title: '投资价值' },
      { id: 'maintenance', title: '保养技巧' }
    ]

    // 入门推荐收藏品
    const beginnerRecommendations = ref([
      {
        id: 1,
        name: 'Labubu 基础款',
        description: '经典造型，适合新手入门',
        price: '59',
        difficulty: '入门级',
        image: '/labubu-basic.jpg'
      },
      {
        id: 2,
        name: 'The Monsters 盲盒',
        description: '热门系列，收藏价值高',
        price: '69',
        difficulty: '进阶级',
        image: '/labubu-monsters.jpg'
      },
      {
        id: 3,
        name: 'Zimomo 联名款',
        description: '限量联名，升值潜力大',
        price: '89',
        difficulty: '专业级',
        image: '/labubu-zimomo.jpg'
      }
    ])

    // 滚动到指定章节
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80 // 导航栏高度
        const elementPosition = element.offsetTop - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }

    // 监听滚动事件，更新当前活跃章节
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          activeSection.value = sections[i].id
          break
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // 初始化当前章节
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      activeSection,
      sections,
      beginnerRecommendations,
      scrollToSection
    }
  },
  head() {
    return {
      title: '收藏指南',
      meta: [
        {
          name: 'description',
          content: '学习如何收藏Labubu，包括鉴别真伪、保养技巧、投资价值分析等专业收藏知识。'
        },
        {
          name: 'keywords',
          content: 'Labubu收藏,收藏指南,鉴别真伪,保养技巧,投资价值,收藏家'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 渐变文字效果 */
.text-gradient-primary {
  background: linear-gradient(135deg, theme('colors.primary.500'), theme('colors.primary.600'));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 指南章节样式 */
.guide-section {
  scroll-margin-top: 100px;
}

/* 文章内容样式 */
.prose {
  @apply text-neutral-700 leading-relaxed;
}

.prose h3 {
  @apply text-xl font-semibold text-neutral-900 mt-6 mb-3;
}

.prose h4 {
  @apply text-lg font-medium text-neutral-900 mt-4 mb-2;
}

.prose p {
  @apply mb-4;
}

.prose ul {
  @apply space-y-2 mb-4;
}

.prose li {
  @apply text-neutral-600;
}

.prose strong {
  @apply font-semibold text-neutral-900;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .guide-section {
    scroll-margin-top: 80px;
  }
}
</style>