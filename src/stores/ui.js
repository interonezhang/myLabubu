import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // 状态
  const isLoading = ref(false)
  const isMobileMenuOpen = ref(false)
  const isSearchModalOpen = ref(false)
  const notifications = ref([])
  const theme = ref('light')
  const sidebarCollapsed = ref(false)

  // 计算属性
  const hasNotifications = computed(() => notifications.value.length > 0)
  const isDarkMode = computed(() => theme.value === 'dark')

  // 方法
  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const toggleSearchModal = () => {
    isSearchModalOpen.value = !isSearchModalOpen.value
  }

  const closeSearchModal = () => {
    isSearchModalOpen.value = false
  }

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }
    notifications.value.push(newNotification)

    // 自动移除通知
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    
    // 更新HTML类名
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value)
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const initializeSidebar = () => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      sidebarCollapsed.value = JSON.parse(savedState)
    }
  }

  // 通知类型快捷方法
  const showSuccess = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    })
  }

  const showError = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 8000, // 错误消息显示更长时间
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    })
  }

  return {
    // 状态
    isLoading,
    isMobileMenuOpen,
    isSearchModalOpen,
    notifications,
    theme,
    sidebarCollapsed,
    
    // 计算属性
    hasNotifications,
    isDarkMode,
    
    // 方法
    setLoading,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearchModal,
    closeSearchModal,
    addNotification,
    removeNotification,
    clearNotifications,
    setTheme,
    toggleTheme,
    toggleSidebar,
    initializeTheme,
    initializeSidebar,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
})