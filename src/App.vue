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
