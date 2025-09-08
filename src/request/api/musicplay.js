// src/request/music.js
import apiClient from '../index'

// 获取音乐url
export function getMusicUrl(id) {
  return apiClient.get('/song/url/v1', {
  params: {
    id,             // 音乐 ID（可以是一个，也可以是多个用逗号分隔）
    level: 'exhigh' // 播放音质等级（standard / higher / exhigh / lossless / hires 等）
  }
})

}

// 获取歌曲详情
export function getMusicDetail(ids) {
  return apiClient.get('/song/detail', {
  params: {
    ids,             // 音乐 ID（可以是一个，也可以是多个用逗号分隔）
  }
})
}
// 获取歌词

export function getLyric(id) {
  return apiClient.get('/lyric', {
  params: {
    id,             // 音乐 ID（可以是一个，也可以是多个用逗号分隔）
  }
})
}