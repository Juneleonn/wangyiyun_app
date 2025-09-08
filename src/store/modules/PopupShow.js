// 个人设置页面
export default {
  namespaced: true,
  state: () => ({
    PopupShow: false,//Homepage控制PopupShow
  }),

  mutations: {
    // 更新PopupShow
    setPopupShow(state, data) {
      state.PopupShow = data
      // console.log('设置飙升榜',data)
    },

  },
  actions: {
    // 动态更新PopupShow
    updatePopupShow({ commit }, data) {
      commit('setPopupShow', data)
      console.log('设置popup',data)
    },

  },
  getters: {
    // 获取PopupShow
    getPopupShow: (state) => state.PopupShow,

  }
}
