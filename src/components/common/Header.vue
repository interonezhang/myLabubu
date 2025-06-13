<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo和品牌名 -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span class="text-white font-bold text-lg md:text-xl">L</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl md:text-2xl font-display font-bold text-gradient-primary">
                Labubu Portal
              </h1>
              <p class="text-xs text-neutral-500 -mt-1">最新资讯 · 收藏指南</p>
            </div>
          </router-link>
        </div>

        <!-- 桌面端导航菜单 -->
        <nav class="hidden lg:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link-active': isActiveRoute(item.path) }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- 搜索框和操作按钮 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <button
            @click="toggleSearchModal"
            class="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            aria-label="搜索"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- 主题切换按钮 -->
          <button
            @click="toggleTheme"
            class="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            aria-label="切换主题"
          >
            <svg v-if="!isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            aria-label="菜单"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden py-4 border-t border-neutral-200">
          <nav class="flex flex-col space-y-2">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.path"
              @click="closeMobileMenu"
              class="px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
              :class="{ 'text-primary-600 bg-primary-50': isActiveRoute(item.path) }"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </transition>
    </div>

    <!-- 搜索模态框 -->
    <SearchModal v-if="isSearchModalOpen" @close="closeSearchModal" />
  </header>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUIStore } from '../../stores/ui'
import SearchModal from '../ui/SearchModal.vue'

export default {
  name: 'Header',
  components: {
    SearchModal
  },
  setup() {
    const route = useRoute()
    const uiStore = useUIStore()

    // 导航菜单项
    const navigationItems = [
      { name: '首页', path: '/' },
      { name: '最新资讯', path: '/news' },
      { name: '收藏品', path: '/collection' },
      { name: '社区', path: '/community' },
      { name: '购买指南', path: '/guide' },
      { name: '关于', path: '/about' }
    ]

    // 计算属性
    const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen)
    const isSearchModalOpen = computed(() => uiStore.isSearchModalOpen)
    const isDarkMode = computed(() => uiStore.isDarkMode)

    // 方法
    const isActiveRoute = (path) => {
      if (path === '/') {
        return route.path === '/'
      }
      return route.path.startsWith(path)
    }

    const toggleMobileMenu = () => {
      uiStore.toggleMobileMenu()
    }

    const closeMobileMenu = () => {
      uiStore.closeMobileMenu()
    }

    const toggleSearchModal = () => {
      uiStore.toggleSearchModal()
    }

    const closeSearchModal = () => {
      uiStore.closeSearchModal()
    }

    const toggleTheme = () => {
      uiStore.toggleTheme()
    }

    return {
      navigationItems,
      isMobileMenuOpen,
      isSearchModalOpen,
      isDarkMode,
      isActiveRoute,
      toggleMobileMenu,
      closeMobileMenu,
      toggleSearchModal,
      closeSearchModal,
      toggleTheme
    }
  }
}
</script>

<style scoped>
/* 确保header在移动端正确显示 */
@media (max-width: 1024px) {
  .container-custom {
    @apply px-4;
  }
}

/* 导航链接悬停效果 */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, theme('colors.primary.500'), theme('colors.primary.600'));
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  width: 100%;
}

/* Logo悬停效果 */
.group:hover .text-gradient-primary {
  background: linear-gradient(45deg, theme('colors.primary.400'), theme('colors.primary.700'));
  background-clip: text;
  -webkit-background-clip: text;
}
</style>