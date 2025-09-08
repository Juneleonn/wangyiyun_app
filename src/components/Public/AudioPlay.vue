<template>
  <audio
    ref="audioRef"
    :src="musicUrl"
    @loadedmetadata="getDuration"
    @timeupdate="getCurrentTime"
     @ended="playNext"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const audioRef = ref(null)
const musicUrl=ref(null)

// const musicUrl = computed(() => store.getters['music/getmusicUrl'])
const playStatus = computed(() => store.getters['music/getPlayStatus'])
// vuex 中的 currentTime
const seekTime = computed(() => store.getters['music/getcurrentTime'])

const currentTime = ref(0)
const duration = ref(0)

const playList=computed(()=>
    store.getters['music/getplayList']
)

function getDuration() {
  duration.value = audioRef.value?.duration || 0
  store.commit('music/setduration', duration.value) // 你可选地同步当前进度
}

function getCurrentTime() {
  currentTime.value = audioRef.value?.currentTime || 0
  store.commit('music/setcurrentTime', currentTime.value) // 你可选地同步当前进度
}

// 播放下一首
function playNext() {
  console.log('playList',playList.value)
  console.log('musicID.value',musicID.value)
  const index = playList.value.findIndex(id => id === musicID.value)
  console.log('index',index)
  if (index !== -1 && index < playList.value.length - 1) {
    const nextSong = playList.value[index + 1]
    console.log('下一首歌曲id',nextSong)
    store.dispatch('music/updatemusicID', nextSong) // 触发上面的 watch 自动播放
  } else {
    console.log('已经是最后一首')
    store.dispatch('music/updatePlayStatus', false) // 停止播放
  }
}
// 监听播放状态
watch(playStatus, (val) => {
  if (!audioRef.value) return
  if (val) {
    audioRef.value.play().catch(err => console.warn('播放被拦截:', err))
  } else {
    audioRef.value.pause()
  }
})

// 自动播放新歌曲
watch(musicUrl, async (url) => {
  if (url && playStatus.value) {
    await audioRef.value?.load()
    audioRef.value?.play()
  }
})
// 快进的时间
watch(seekTime, (val) => {
  if (audioRef.value && Math.abs(audioRef.value.currentTime - val) > 1) {
    // 避免频繁微小调整，只有偏差较大时才 seek
    audioRef.value.currentTime = val
  }
})

// 播放音乐
// 播放音乐
import{getMusicUrl,getMusicDetail}from'@/request/api/musicplay.js'
const musicUrlData=ref(null)//正在播放的音乐的urlObject
// const musicUrl=ref(null)//正在播放的音乐的url
const musicDetail=ref(null)//正在播放的音乐的详情
//从vuex加载数据
const musicID=computed(()=>
    store.getters['music/getmusicID']
)
watch(()=>musicID.value,
async(newvalue)=>{
    // 根据id改变,获取url
    musicUrlData.value=await getMusicUrl(newvalue)
    console.log('musicUrlData.value',musicUrlData.value)
    musicUrl.value=musicUrlData.value.data.data[0].url
    // await nextTick()
    // await audioPlay.value.play()
    musicDetail.value=await getMusicDetail(newvalue)
    console.log('歌曲详情以获得',musicDetail.value)

    // 动态更新musicUrl
    store.dispatch('music/updatemusicUrl',musicUrl.value)
    // 动态更新歌曲详情
    store.dispatch('music/updateMusicDetail',musicDetail.value)
    // 更新播放状态
    store.dispatch('music/updatePlayStatus',true)
    console.log('已更新')
})
</script>
