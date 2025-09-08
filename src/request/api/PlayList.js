// 歌单
// src/request/PlayList.js
import apiClient from '../index'

//歌单分类
export function getCatlist() {
  return apiClient.get('/playlist/catlist', {
    params: {
    }
  })
}

// 获取热门歌单分类
export function getHotPlayList() {
  return apiClient.get('/playlist/hot', {
    params: {
    }
  })
}
// 获取相关歌单
export function getTopPlayList(cat) {
  return apiClient.get('/top/playlist', {
    params: {
      cat,
      limit:30
    }
  })
}
//新歌速递
export function getTopSong(type) {
  return apiClient.get('/top/song', {
    params: {
      type
    }
  })
}