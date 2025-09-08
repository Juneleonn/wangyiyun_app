// src/request/privatecontent.js
import apiClient from '../index'

// 获取推荐 mv
export function getRecommendMV() {
  return apiClient.get('/personalized/mv', {
    params: {
    }
  })
}

// 获取mv数据
export function getMVDetail(mvid) {
  return apiClient.get('/mv/detail', {
    params: {
        mvid
    }
  })
}
// 获取mv播放地址
export function getMVAddress(id) {
  return apiClient.get('/mv/url', {
    params: {
        id
    }
  })
}

// 获取mv评论
export function getMVcomment(id) {
  return apiClient.get('/comment/mv', {
    params: {
        id
    }
  })
}
