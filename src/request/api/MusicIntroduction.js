// src/request/music.js
import apiClient from '../index'

// 获取每日推荐歌曲
export function getDailyRecommendSongs() {
  const cookie = localStorage.getItem('LoginCookie') || ''
  return apiClient.get('/recommend/songs', {
    params: {
      cookie
    }
  })
}
// 获取每日推荐歌单
export function getDailyRecommendList() {
  return apiClient.get('/recommend/resource', {
    params: {
      
    }
  })
}

// 获取推荐歌单
export function getPersonalized(limit = 30) {
  return apiClient.get('/personalized', {
    params: { limit }
  })
}
// 获取歌单的所有歌曲
export function getListAllSongs(id) {
  return apiClient.get('/playlist/track/all', {
    params: {
      id,
      limit: 30,
      offset: 1
    }
  })
}
// 获取歌单详情
export function getMusicListDetail(id) {
  return apiClient.get('/playlist/detail', {
    params: {
      id,
    }
  })
}
// 所有榜单内容摘要
export function getRankDetail() {
  return apiClient.get('/toplist/detail', {
    params: {
    }
  })
}



// 获取心动模式
export function getHeartbeat(id) {
  return apiClient.get('/playmode/intelligence/list', {
    params: {id}
  })
}

// 获取推荐新音乐
export function getNewSong() {
  return apiClient.get('/personalized/newsong', {
  })
}
