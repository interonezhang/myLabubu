import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.labubu.news/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加请求ID用于追踪
    config.headers['X-Request-ID'] = generateRequestId()

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }

    console.log('API Request:', {
      method: config.method.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data
    })

    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    })

    // 检查响应格式
    if (response.data && typeof response.data === 'object') {
      // 标准化响应格式
      if (!response.data.success && response.data.data) {
        response.data.success = true
      }
    }

    return response
  },
  (error) => {
    console.error('Response Error:', error)

    // 处理网络错误
    if (!error.response) {
      return Promise.reject({
        message: '网络连接失败，请检查您的网络设置',
        code: 'NETWORK_ERROR',
        type: 'network'
      })
    }

    // 处理HTTP错误状态码
    const { status, data } = error.response

    switch (status) {
      case 400:
        return Promise.reject({
          message: data?.message || '请求参数错误',
          code: 'BAD_REQUEST',
          type: 'validation',
          details: data?.details
        })

      case 401:
        // 清除本地认证信息
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_info')
        
        // 重定向到登录页面（如果需要）
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        
        return Promise.reject({
          message: '认证失败，请重新登录',
          code: 'UNAUTHORIZED',
          type: 'auth'
        })

      case 403:
        return Promise.reject({
          message: '权限不足，无法访问该资源',
          code: 'FORBIDDEN',
          type: 'permission'
        })

      case 404:
        return Promise.reject({
          message: '请求的资源不存在',
          code: 'NOT_FOUND',
          type: 'resource'
        })

      case 429:
        return Promise.reject({
          message: '请求过于频繁，请稍后再试',
          code: 'RATE_LIMIT',
          type: 'rate_limit'
        })

      case 500:
        return Promise.reject({
          message: '服务器内部错误，请稍后再试',
          code: 'INTERNAL_ERROR',
          type: 'server'
        })

      case 502:
      case 503:
      case 504:
        return Promise.reject({
          message: '服务暂时不可用，请稍后再试',
          code: 'SERVICE_UNAVAILABLE',
          type: 'server'
        })

      default:
        return Promise.reject({
          message: data?.message || '请求失败，请稍后再试',
          code: 'UNKNOWN_ERROR',
          type: 'unknown'
        })
    }
  }
)

// 生成请求ID
function generateRequestId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// API方法封装
export const apiMethods = {
  // GET请求
  get: (url, config = {}) => api.get(url, config),
  
  // POST请求
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  
  // PUT请求
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  
  // PATCH请求
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  
  // DELETE请求
  delete: (url, config = {}) => api.delete(url, config),
  
  // 上传文件
  upload: (url, formData, config = {}) => {
    return api.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      }
    })
  },
  
  // 下载文件
  download: (url, config = {}) => {
    return api.get(url, {
      ...config,
      responseType: 'blob'
    })
  }
}

// 缓存管理
class ApiCache {
  constructor() {
    this.cache = new Map()
    this.maxSize = 100
    this.defaultTTL = 5 * 60 * 1000 // 5分钟
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  set(key, data, ttl = this.defaultTTL) {
    // 如果缓存已满，删除最旧的项
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    })
  }

  clear() {
    this.cache.clear()
  }

  delete(key) {
    this.cache.delete(key)
  }
}

const apiCache = new ApiCache()

// 带缓存的GET请求
export const getCached = async (url, config = {}, ttl) => {
  const cacheKey = `${url}?${JSON.stringify(config.params || {})}`
  
  // 尝试从缓存获取
  const cached = apiCache.get(cacheKey)
  if (cached) {
    console.log('Cache Hit:', cacheKey)
    return cached
  }

  // 发起请求
  try {
    const response = await api.get(url, config)
    
    // 存入缓存
    apiCache.set(cacheKey, response, ttl)
    console.log('Cache Set:', cacheKey)
    
    return response
  } catch (error) {
    throw error
  }
}

// 清除特定URL的缓存
export const clearCache = (urlPattern) => {
  if (urlPattern) {
    // 清除匹配的缓存
    for (const key of apiCache.cache.keys()) {
      if (key.includes(urlPattern)) {
        apiCache.delete(key)
      }
    }
  } else {
    // 清除所有缓存
    apiCache.clear()
  }
}

// 批量请求
export const batchRequest = async (requests) => {
  try {
    const promises = requests.map(request => {
      const { method, url, data, config } = request
      return api[method](url, data, config)
    })
    
    const responses = await Promise.allSettled(promises)
    
    return responses.map((response, index) => ({
      index,
      success: response.status === 'fulfilled',
      data: response.status === 'fulfilled' ? response.value.data : null,
      error: response.status === 'rejected' ? response.reason : null
    }))
  } catch (error) {
    console.error('Batch Request Error:', error)
    throw error
  }
}

// 重试机制
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error
      
      if (i === maxRetries) {
        break
      }
      
      // 指数退避
      const waitTime = delay * Math.pow(2, i)
      console.log(`Request failed, retrying in ${waitTime}ms... (${i + 1}/${maxRetries})`)
      
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
  
  throw lastError
}

export { api }
export default apiMethods