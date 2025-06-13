<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/about-pattern.svg')] opacity-5"></div>
      <div class="container-custom section-padding relative">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
            关于
            <span class="text-gradient-primary">Labubu Portal</span>
          </h1>
          <p class="text-xl text-neutral-600 mb-8 leading-relaxed">
            您获取最新Labubu资讯、收藏指南和社区讨论的终极目的地
          </p>
          <div class="flex justify-center">
            <div class="rounded-2xl shadow-2xl max-w-2xl w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-4">🏢</div>
                <p class="text-lg font-medium text-neutral-700">Labubu Portal团队</p>
                <p class="text-sm text-neutral-500 mt-2">专业的Labubu资讯平台</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们的使命 -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
              我们的使命
            </h2>
            <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
              Labubu Portal致力于为全球Labubu爱好者提供最全面、最及时的资讯和指南。我们相信，每一个Labubu都有其独特的魅力和故事，而我们的使命就是帮助收藏家们发现、了解和分享这些精彩的艺术作品。
            </p>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              通过专业的内容团队和活跃的社区，我们为用户提供从新手入门到资深收藏的全方位支持，让每个人都能在Labubu的世界中找到属于自己的乐趣。
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/news" class="btn-primary">
                浏览最新资讯
              </router-link>
              <router-link to="/community" class="btn-outline">
                加入社区
              </router-link>
            </div>
          </div>
          <div class="relative">
            <div class="rounded-xl shadow-lg w-full h-80 bg-gradient-to-br from-secondary-100 to-primary-100 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-4">🎯</div>
                <p class="text-lg font-medium text-neutral-700">我们的使命</p>
                <p class="text-sm text-neutral-500 mt-2">为Labubu爱好者服务</p>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们的特色 -->
    <section class="section-padding bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            为什么选择我们
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            我们提供独特的价值和服务，让您的Labubu收藏之旅更加精彩
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <component :is="feature.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-4">{{ feature.title }}</h3>
            <p class="text-neutral-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队介绍 -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            我们的团队
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            由热爱Labubu的专业人士组成的团队，为您提供最优质的服务
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="text-center group"
          >
            <div class="relative mb-6">
              <div class="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                <div class="text-4xl">👤</div>
              </div>
              <div class="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
            <p class="text-neutral-600 text-sm leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="section-padding bg-gradient-primary text-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
            我们的成就
          </h2>
          <p class="text-xl opacity-90">
            用数字说话，见证我们的成长
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-lg opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="section-padding bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              联系我们
            </h2>
            <p class="text-lg text-neutral-600">
              有任何问题或建议？我们很乐意听到您的声音
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- 联系信息 -->
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-6">联系方式</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">邮箱</p>
                    <p class="text-neutral-600">contact@labubu.news</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">地址</p>
                    <p class="text-neutral-600">全球在线服务</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">服务时间</p>
                    <p class="text-neutral-600">24/7 在线服务</p>
                  </div>
                </div>
              </div>

              <!-- 社交媒体 -->
              <div class="mt-8">
                <h4 class="font-medium text-neutral-900 mb-4">关注我们</h4>
                <div class="flex space-x-4">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    :aria-label="social.name"
                    class="w-10 h-10 bg-neutral-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <component :is="social.icon" class="w-5 h-5 text-neutral-600 group-hover:text-primary-600" />
                  </a>
                </div>
              </div>
            </div>

            <!-- 联系表单 -->
            <div>
              <h3 class="text-xl font-semibold text-neutral-900 mb-6">发送消息</h3>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-neutral-700 mb-2">姓名</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">邮箱</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入您的邮箱"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-neutral-700 mb-2">主题</label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入消息主题"
                  />
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-neutral-700 mb-2">消息</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    required
                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="请输入您的消息内容"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">发送消息</span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    发送中...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useUIStore } from '../stores/ui'

export default {
  name: 'About',
  setup() {
    const uiStore = useUIStore()
    
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    const isSubmitting = ref(false)

    // 特色功能
    const features = [
      {
        title: '最新资讯',
        description: '第一时间获取Labubu的最新发布信息、行业动态和收藏趋势，让您不错过任何重要消息。',
        icon: 'IconNews'
      },
      {
        title: '专业指南',
        description: '从新手入门到高级收藏技巧，我们提供全面的指南帮助您成为Labubu收藏专家。',
        icon: 'IconGuide'
      },
      {
        title: '活跃社区',
        description: '与全球Labubu爱好者交流心得，分享收藏经验，建立深厚的收藏友谊。',
        icon: 'IconCommunity'
      },
      {
        title: '真伪鉴别',
        description: '专业的真伪鉴别指南和技巧，帮助您避免购买假货，保护您的投资。',
        icon: 'IconAuthenticity'
      },
      {
        title: '价格追踪',
        description: '实时追踪Labubu收藏品的市场价格变化，为您的收藏决策提供数据支持。',
        icon: 'IconPrice'
      },
      {
        title: '收藏管理',
        description: '强大的收藏管理工具，帮助您记录、整理和展示您的Labubu收藏品。',
        icon: 'IconCollection'
      }
    ]

    // 团队成员
    const teamMembers = [
      {
        name: '张小明',
        role: '创始人 & CEO',
        bio: '资深Labubu收藏家，拥有10年收藏经验，致力于为全球收藏家提供最优质的服务。'
      },
      {
        name: '李小红',
        role: '内容总监',
        bio: '专业的内容创作者，负责平台的资讯内容和收藏指南的编写与审核。'
      },
      {
        name: '王小强',
        role: '技术总监',
        bio: '全栈开发工程师，负责平台的技术架构设计和功能开发。'
      }
    ]

    // 统计数据
    const stats = [
      { value: '10K+', label: '注册用户' },
      { value: '1000+', label: '资讯文章' },
      { value: '500+', label: '收藏品' },
      { value: '50K+', label: '社区互动' }
    ]

    // 社交媒体链接
    const socialLinks = [
      { name: 'Instagram', url: 'https://instagram.com/labubu_portal', icon: 'IconInstagram' },
      { name: 'Twitter', url: 'https://twitter.com/labubu_portal', icon: 'IconTwitter' },
      { name: 'Discord', url: 'https://discord.gg/labubu', icon: 'IconDiscord' },
      { name: 'Reddit', url: 'https://reddit.com/r/labubu', icon: 'IconReddit' }
    ]

    // 处理表单提交
    const handleSubmit = async () => {
      try {
        isSubmitting.value = true
        
        // 这里应该调用API发送邮件
        // await api.post('/contact', form.value)
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        uiStore.showSuccess('消息发送成功！我们会尽快回复您。')
        
        // 重置表单
        form.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
        
      } catch (error) {
        uiStore.showError('发送失败，请稍后再试。')
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      isSubmitting,
      features,
      teamMembers,
      stats,
      socialLinks,
      handleSubmit
    }
  },
  head() {
    return {
      title: '关于我们',
      meta: [
        {
          name: 'description',
          content: '了解Labubu Portal - 您的Labubu资讯和收藏指南平台。我们致力于为全球Labubu爱好者提供最全面、最及时的资讯和专业指南。'
        },
        {
          name: 'keywords',
          content: '关于我们,Labubu Portal,平台介绍,团队介绍,联系我们'
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

/* 图标组件占位符 */
.IconNews,
.IconGuide,
.IconCommunity,
.IconAuthenticity,
.IconPrice,
.IconCollection,
.IconInstagram,
.IconTwitter,
.IconDiscord,
.IconReddit {
  /* 这里应该是实际的图标组件 */
}
</style>