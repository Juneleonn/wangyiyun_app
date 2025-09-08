export default {
  namespaced: true,
  state: () => ({
    dailySongsData: [],//每日推荐歌曲列表
    musicID:'',//正在播放的音乐的id
    musicUrl:'',//正在播放的音乐url
    PlayStatus:false,//播放状态，true是播放中，false是暂停
    playList:[],//播放列表
    MusicDetail: null,//正在播放的音乐的详情
    duration:0,//歌曲的时长
    currentTime:0,//音乐的当前时间
    seekTime: null,//快进的时间
    // MusicListDetai:null,//正在浏览的歌单的
  }),

  mutations: {
    // 更新每日推荐歌曲列表
    setdailySongsData(state, list) {
      state.dailySongsData = list
    },
    // 更新音乐url
    setmusicUrl(state,url){
      state.musicUrl=url
    },
    // 更新音乐id
    setmusicID(state,ID){
      state.musicID=ID
    },
    //更新播放状态
    setPlayStatus(state,status){
      state.PlayStatus=status
    },
    // 更新歌曲详情
    setMusicDetail(state,detail){
      state.MusicDetail=detail
    },
    //更新当前时间
    setcurrentTime(state,time){
      state.currentTime=time
    },
    // 设置歌曲时长
    setduration(state,duration){
      state.duration=duration
    },
    // 更新快进时间
    setseekTime(state,seekTime){
      state.seekTime=seekTime
    },
    // 更新播放列表
    setplayList(state,playList){
      state.playList=playList
      console.log('播放列表id',playList)
    },
  },
  actions: {
    // 动态更新每日推荐歌曲
    updatedailySongsData({ commit }, list) {
      commit('setdailySongsData', list)
    },
    // 动态更新musicUrl
    updatemusicUrl({commit},url){
      commit('setmusicUrl',url)
    },
    // 动态更新music ID
    updatemusicID({commit},ID){
      commit('setmusicID',ID)
    },
    // 动态更新播放状态
    updatePlayStatus({commit},status){
      commit('setPlayStatus',status)
    },
    // 动态更新正在播放的歌曲详情
    updateMusicDetail({commit},detail){
      commit('setMusicDetail',detail)
    },
    // 动态更新当前时间
    updatecurrentTime({commit},time){
      commit('setcurrentTime',time)
    },
    // 动态更新当前时间
    updateduration({commit},time){
      commit('setduration',time)
    },
    // 动态更新快进时间
    updateseekTime({commit},seekTime){
      commit('setseekTime',seekTime)
    },
    // 动态更新播放列表
    updateplayList({commit},playList){
      commit('setplayList',playList)
      
    },
    
  },
  getters: {
    // 获取每日推荐歌曲列表
    getdailySongsData: (state) => state.dailySongsData,
    // 获取url
    getmusicUrl:(state)=>state.musicUrl,
    // 获取music ID 
    getmusicID:(state)=>state.musicID,
    // 获取播放状态
    getPlayStatus:(state)=>state.PlayStatus,
    // 获取正在播放的音乐详情
    getMusicDetail:(state)=>state.MusicDetail,
    // 获取当前时间
    getcurrentTime:(state)=>state.currentTime,
    // 获取歌曲时长
    getduration:(state)=>state.duration,
    // 获取更快进时间
    getseekTime:(state)=>state.seekTime,
    // 获取播放列表
    getplayList:(state)=>state.playList,
    
  }
}
