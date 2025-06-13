<template>
  <div class="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
    <div class="text-center">
      <!-- 加载动画 -->
      <div class="relative">
        <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-secondary-400 rounded-full animate-spin mx-auto" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
      </div>
      
      <!-- 加载文本 -->
      <p class="text-neutral-600 font-medium">加载中...</p>
      <p class="text-sm text-neutral-400 mt-1">请稍候</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalLoading'
}
</script>