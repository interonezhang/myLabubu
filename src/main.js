import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 导入样式
import './assets/styles/main.css'

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(createPinia())
app.use(router)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
  
  // 在生产环境中，可以发送错误到监控服务
  if (import.meta.env.PROD) {
    // 发送到错误监控服务（如Sentry）
    // sendErrorToMonitoring(err, vm, info)
  }
}

// 全局属性
app.config.globalProperties.$siteInfo = {
  name: 'Labubu Portal',
  description: '最新资讯、收藏指南和社区讨论',
  url: 'https://labubu.news',
  version: '1.0.0'
}

// 挂载应用
app.mount('#app')