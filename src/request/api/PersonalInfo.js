// src/request/PersonalInfo.js
import apiClient from '../index'

// 获取账号信息
export function getAccountInfo() {
    const cookie = localStorage.getItem('LoginCookie') || ''
  return apiClient.get('/user/account', {
    params: {
        cookie
    }
  })
}
// 用户详情

export function getUserDetail(uid) {
    const cookie = localStorage.getItem('LoginCookie') || ''
  return apiClient.get('/user/detail', {
    params: {
        uid:uid,
        cookie
    }
  })
}
//获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount() {
  return apiClient.get('/user/subcount', {
    params: {
    }
  })
}
//获取用户等级信息
export function getUserLevel() {
  return apiClient.get('/user/level', {
    params: {
    }
  })
}

// 获取用户的喜欢音乐列表
export function getLikeList(uid) {
  return apiClient.get('/likelist', {
    params: {
      uid
    }
  })
}

// 获取用户歌单
export function getUserPlaylist(uid) {
  return apiClient.get('/user/playlist', {
    params: {
      uid
    }
  })
}