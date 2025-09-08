export default {
  namespaced: true,
  state: () => ({
    UserID: null,//Homepage控制select
    LikeList:[],//喜欢的音乐的id列表
    userinfo:null//个人信息
  }),

  mutations: {
    // 更新select
    setUserID(state, data) {
      state.UserID = data
      console.log('设置uid',data)
    },
    setLikeList(state, data) {
      state.LikeList = data
      // console.log('设置uid',data)
    },
    setuserinfo(state, data) {
      state.userinfo = data
      console.log('设置个人信息',data)
    },

  },
  actions: {
    // 动态更新select
    updateUserID({ commit }, data) {
      commit('setUserID', data)
      // console.log('设置飙升榜',data)
    },
    updateLikeList({ commit }, data) {
      commit('setLikeList', data)
      // console.log('设置飙升榜',data)
    },
    updateuserinfo({ commit }, data) {
      commit('setuserinfo', data)
      // console.log('设置个人信息',data)
    },
  },
  getters: {
    // 获取select
    getUserID: (state) => state.UserID,
    getLikeList: (state) => state.UserID,
    getuserinfo: (state) => state.userinfo,
  }
}
