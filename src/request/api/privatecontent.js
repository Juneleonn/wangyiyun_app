// src/request/privatecontent.js
import apiClient from '../index'

// 获取独家放送(入口列表)
export function getPrivateContent() {
  return apiClient.get('/personalized/privatecontent', {
    params: {
    }
  })
}
// 获取独家放送列表
export function getPrivateContentList() {
  return apiClient.get('/personalized/privatecontent/list', {
    params: {
        limit:10
    }
  })
}