// src/request/index.js
import axios from 'axios'

// 判断环境：开发环境用本地，生产环境用 Vercel
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://neteasecloudmusicapi-main.vercel.app'

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
})

// 请求拦截器：自动加 realIP 参数
apiClient.interceptors.request.use(config => {
  // 如果已经带了 realIP，就不重复加
  if (!config.url.includes('realIP')) {
    const connector = config.url.includes('?') ? '&' : '?'
    config.url += `${connector}realIP=116.25.146.177`
  }
  return config
})

export default apiClient
