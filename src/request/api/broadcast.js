
// 播客
// src/request/PlayList.js
import apiClient from '../index'

//播客列表
export function getVoicelist(params = {}) {
  return apiClient.get('/voicelist/search', {
    params: {
      limit: 30,        // 取30条播客
      offset: 0,        // 从第一页开始
      ...params         // 允许传入podcastName等其他参数
    }
  })
}


// 博客声音排序

export function getVoiceRank() {
  return apiClient.get('/voicelist/trans', {

  })
}
// 电台排行榜
export function getRadioRank() {
  return apiClient.get('/djRadio/top', {

  })
}

// 最近播放播客

export function getRecordDJ() {
  return apiClient.get('/record/recent/dj', {

  })
}

// 博客声音搜索
export function getVoicelistSearch() {
  return apiClient.get('/voicelist/list/search', {

  })
}
