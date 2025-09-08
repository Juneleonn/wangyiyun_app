//PlayListPopupControl.js
// 个人设置页面
export default {
  namespaced: true,
  state: () => ({
    PlayListPopup: false,//Homepage控制PlayListPopup
  }),

  mutations: {
    // 更新PlayListPopup
    setPlayListPopup(state, data) {
      state.PlayListPopup = data
      // console.log('设置飙升榜',data)
    },

  },
  actions: {
    // 动态更新PlayListPopup
    updatePlayListPopup({ commit }, data) {
      commit('setPlayListPopup', data)
      console.log('设置PlayListPopup',data)
    },

  },
  getters: {
    // 获取PlayListPopup
    getPlayListPopup: (state) => state.PlayListPopup,

  }
}
