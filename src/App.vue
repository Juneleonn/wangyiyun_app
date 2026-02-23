<template>
  <div class="appContainer">
    <router-view />
    <AudioPlayer />
    <PopupPage/>
    <PlayListPopup/>
        <!-- 全局播放器，始终存在 -->
    <!-- <GlobalAudioPlayer /> -->
  </div>
</template>
<script setup>

import AudioPlayer from '@/components/Public/AudioPlay.vue'
import PopupPage from '@/components/Public/PopupPage.vue'
import PlayListPopup from '@/components/Public/PlayListPopup.vue'

import{getRankDetail}from'@/request/api/MusicIntroduction.js'
import{onMounted,ref,watch}from'vue'
const RankDetailData=ref(null)
const RankDetail=ref(null)
import{useStore}from'vuex'
const store=useStore()

// const  PopupShow=computed(()=>
//     store.getters['PopupShow/getPopupShow']
// )

onMounted(async()=>{
  // 从 localStorage 恢复登录状态，避免刷新后误判为未登录
  try {
    const saved = localStorage.getItem('UserID')
    if (saved) {
      const uid = JSON.parse(saved)
      store.commit('UserInfo/setUserID', uid)
    }
  } catch (_) {
    // 解析失败时忽略，保持未登录状态
  }
  RankDetailData.value=await getRankDetail()
})
  
watch(()=>RankDetailData.value,
async(newval)=>{
  
  if(newval && newval.data){
    console.log(newval.data)
    RankDetail.value=newval.data
     console.log('RankDeatil.value',RankDetail.value)
     const SoaringList=RankDetail.value.list[0]//飙升榜
     const NewSongList=RankDetail.value.list[1]//新歌榜
     const OriginalList=RankDetail.value.list[2]//原创榜
     const HotSongList=RankDetail.value.list[3]//热歌榜
     store.dispatch('MusicRank/updateSoaringList', SoaringList) // 把飙升榜赋值给store
     store.dispatch('MusicRank/updateNewSongList', NewSongList) //新歌榜赋值给store
     store.dispatch('MusicRank/updateOriginalList',OriginalList) //原创榜赋值给store
     store.dispatch('MusicRank/updateHotSongList', HotSongList) //热歌榜赋值给store
     console.log('SoaringList',SoaringList)
  }

 
}, { immediate: true })


</script>

<style lang="less">
/* 全局：防止大屏横向滚动 */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* 响应式布局：手机全宽，平板/电脑居中并限制最大宽度 */
.appContainer {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

/* 平板：最大宽度 600px 居中 */
@media (min-width: 768px) {
  .appContainer {
    max-width: 600px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
  }
}

/* 电脑：保持单栏阅读宽度 */
@media (min-width: 1024px) {
  .appContainer {
    max-width: 480px;
  }
}
</style>
