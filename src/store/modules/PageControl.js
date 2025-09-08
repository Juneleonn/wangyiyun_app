// 推荐页头部导航控制
export default {
  namespaced: true,
  state: () => ({
    SelectIndex: 0,//Homepage控制select
  }),

  mutations: {
    // 更新select
    setSelectIndex(state, data) {
      state.SelectIndex = data
      // console.log('设置飙升榜',data)
    },

  },
  actions: {
    // 动态更新select
    updateSelectIndex({ commit }, data) {
      commit('setSelectIndex', data)
      // console.log('设置飙升榜',data)
    },

  },
  getters: {
    // 获取select
    getSelectIndex: (state) => state.SelectIndex,

  }
}
