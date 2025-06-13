// 防抖函数
export function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 格式化日期
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  const formats = {
    'YYYY-MM-DD': `${year}-${month}-${day}`,
    'YYYY/MM/DD': `${year}/${month}/${day}`,
    'MM-DD': `${month}-${day}`,
    'YYYY-MM-DD HH:mm': `${year}-${month}-${day} ${hours}:${minutes}`,
    'YYYY-MM-DD HH:mm:ss': `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    'HH:mm': `${hours}:${minutes}`
  }

  return formats[format] || formats['YYYY-MM-DD']
}

// 相对时间格式化
export function formatRelativeTime(date) {
  const now = new Date()
  const target = new Date(date)
  const diffTime = Math.abs(now - target)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.ceil(diffTime / (1000 * 60))

  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`
  } else if (diffHours < 24) {
    return `${diffHours}小时前`
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else if (diffDays < 30) {
    return `${Math.ceil(diffDays / 7)}周前`
  } else if (diffDays < 365) {
    return `${Math.ceil(diffDays / 30)}个月前`
  } else {
    return `${Math.ceil(diffDays / 365)}年前`
  }
}

// 截断文本
export function truncateText(text, length = 100, suffix = '...') {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + suffix
}

// 生成随机ID
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substr(2, 5)
  return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`
}

// 深拷贝
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

// 检查是否为空值
export function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// 格式化文件大小
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 验证邮箱
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 验证URL
export function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 获取URL参数
export function getUrlParams(url = window.location.href) {
  const params = {}
  const urlObj = new URL(url)
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

// 设置URL参数
export function setUrlParams(params, url = window.location.href) {
  const urlObj = new URL(url)
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      urlObj.searchParams.set(key, params[key])
    } else {
      urlObj.searchParams.delete(key)
    }
  })
  return urlObj.toString()
}

// 滚动到元素
export function scrollToElement(element, offset = 0, behavior = 'smooth') {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior
  })
}

// 复制到剪贴板
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand('copy')
      textArea.remove()
      return result
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

// 检测设备类型
export function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent)
  
  if (isMobile && !isTablet) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

// 检测浏览器
export function getBrowserInfo() {
  const userAgent = navigator.userAgent
  let browser = 'Unknown'
  let version = 'Unknown'

  if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome'
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox'
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari'
    version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown'
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge'
    version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown'
  }

  return { browser, version }
}

// 本地存储封装
export const storage = {
  set(key, value, expiry = null) {
    const item = {
      value,
      expiry: expiry ? Date.now() + expiry : null
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  get(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    try {
      const item = JSON.parse(itemStr)
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return item.value
    } catch {
      return null
    }
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  }
}

// 会话存储封装
export const sessionStorage = {
  set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },

  get(key) {
    const itemStr = window.sessionStorage.getItem(key)
    if (!itemStr) return null

    try {
      return JSON.parse(itemStr)
    } catch {
      return null
    }
  },

  remove(key) {
    window.sessionStorage.removeItem(key)
  },

  clear() {
    window.sessionStorage.clear()
  }
}

// 图片懒加载
export function lazyLoadImage(img, src, placeholder = '') {
  if (!img) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target
        image.src = src
        image.classList.remove('lazy')
        observer.unobserve(image)
      }
    })
  })

  img.src = placeholder
  img.classList.add('lazy')
  observer.observe(img)
}

// 颜色工具
export const colorUtils = {
  // 十六进制转RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  // RGB转十六进制
  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },

  // 获取对比色
  getContrastColor(hex) {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return '#000000'
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }
}

// 数组工具
export const arrayUtils = {
  // 数组去重
  unique(arr, key = null) {
    if (key) {
      const seen = new Set()
      return arr.filter(item => {
        const value = item[key]
        if (seen.has(value)) {
          return false
        }
        seen.add(value)
        return true
      })
    }
    return [...new Set(arr)]
  },

  // 数组分组
  groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const group = item[key]
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {})
  },

  // 数组排序
  sortBy(arr, key, order = 'asc') {
    return arr.sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      
      if (order === 'desc') {
        return bVal > aVal ? 1 : -1
      }
      return aVal > bVal ? 1 : -1
    })
  },

  // 数组分页
  paginate(arr, page, limit) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return arr.slice(startIndex, endIndex)
  }
}

// 字符串工具
export const stringUtils = {
  // 首字母大写
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  // 驼峰转短横线
  kebabCase(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  },

  // 短横线转驼峰
  camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  },

  // 生成slug
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}