// 搜索
// src/request/search.js
import apiClient from '../index'

//歌单分类
export function getSearchResult(keywords) {
  return apiClient.get('/cloudsearch', {
    params: {
        keywords
    }
  })
}