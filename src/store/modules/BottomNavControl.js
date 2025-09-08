// 底部控制推荐，漫游，笔记，我的
export default {
  namespaced: true,
  state: () => ({
    PageIndex: 0,//控制Page
  }),

  mutations: {
    // 更新Page
    setPageIndex(state, data) {
      state.PageIndex = data
      // console.log('设置飙升榜',data)
    },

  },
  actions: {
    // 动态更新Page
    updatePageIndex({ commit }, data) {
      commit('setPageIndex', data)
      // console.log('设置飙升榜',data)
    },

  },
  getters: {
    // 获取Page
    getPageIndex: (state) => state.PageIndex,

  }
}
