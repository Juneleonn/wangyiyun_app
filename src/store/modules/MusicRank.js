export default {
  namespaced: true,
  state: () => ({
    SoaringList: null,//飙升榜
    NewSongList:null,//新歌榜
    OriginalList:null,//原创榜
    HotSongList:null,//热歌榜
  }),

  mutations: {
    // 更新飙升榜
    setSoaringList(state, data) {
      state.SoaringList = data
      // console.log('设置飙升榜',data)
    },
        // 更新新歌榜
    setNewSongList(state, data) {
      state.NewSongList = data
    },
        // 更新原创榜
    setOriginalList(state, data) {
      state.OriginalList = data
    },
        // 更新热歌榜
    setHotSongList(state, data) {
      state.HotSongList = data
    },
  },
  actions: {
    // 动态更新飙升榜
    updateSoaringList({ commit }, data) {
      commit('setSoaringList', data)
      // console.log('设置飙升榜',data)
    },
        // 动态更新新歌榜
    updateNewSongList({ commit }, data) {
      commit('setNewSongList', data)
    },
        // 动态更新原创榜
    updateOriginalList({ commit }, data) {
      commit('setOriginalList', data)
    },
        // 动态更新热歌榜
    updateHotSongList({ commit }, data) {
      commit('setHotSongList', data)
    },
  },
  getters: {
    // 获取飙升榜
    getSoaringList: (state) => state.SoaringList,
    // 获取新歌榜
    getNewSongList: (state) => state.NewSongList,
    // 获取原创榜
    getOriginalList: (state) => state.OriginalList,
    // 获取热歌榜
    getHotSongList: (state) => state.HotSongList,
  }
}
