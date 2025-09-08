<template>
    <div class="LyricPageContainer">
        <div class="LyricPage">
            <div class="top">
                <van-icon name="arrow-down" @click="goback"/>
                <van-icon name="share-o" />
            </div>
            <div class="background-blur"></div>
            <div class="SongInfo" v-if="MusicDetail">
                    <div class="SongName">{{MusicDetail.data.songs[0].name}}</div>
                    <div class="Singer">{{MusicDetail.data.songs[0].ar[0].name}}</div>
            </div>
            <div class="LyricDetail" v-if="Lyric" @click="gotoMusicDetailPage">

                <div 
                      v-for="(line, index) in Lyric" 
                      :key="index" 
                      :ref="setLyricLineRef"
                      :class="['lyric-line', { active: index === LyricIndex }]">
                      {{ line.text }}
                </div>
            </div>
            <div class="Info">
                <div class="InfoLeft">
                    <van-icon name="more" />
                </div>
                <div class="InfoRight">
                    <van-icon name="like-o" class="like"/>
                    <van-icon name="chat-o" badge="99+" class="comment1"/>
                </div>
            </div>

            <div class="timebar">
                <div class="progress-Bar" @click="handleSeek">
                    <div class="progress" :style="{width:progressPercent+'%'}"></div>
                </div>
                <div class="time">
                    <span>{{formatTime(currentTime)}}</span>
                    <span>{{formatTime(duration)}}</span>
                </div>
            </div>
            <div class="PlayButton">  
                <i class="iconfont icon-icon-test"></i>
                <i class="iconfont icon-shangyishoushangyige"></i>
                <van-icon name="play" class="play" v-if="PlayStatus===false" @click="play"/>
                <van-icon name="pause" class="pause" v-if="PlayStatus===true" @click="pause"/>
                <i class="iconfont icon-xiayigexiayishou"></i>
                <van-icon name="wap-nav" class="playlist" @click="ShowPlaylist"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import{ref,watch,computed}from'vue'
import{getLyric}from'@/request/api/musicplay.js'
import{useStore}from'vuex'
const store=useStore()
const LyricData=ref(null)//歌词
const Lyric=ref(null)
const LyricIndex=ref(0)//歌词对应的下标
import usePlayerController from '@/store/modules/usePlayerController'
import{useRouter}from'vue-router'
const router=useRouter()

const { play, pause, seek } = usePlayerController()

const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const PlayStatus=computed(()=>
    store.getters['music/getPlayStatus']
)
const currentTime=computed(()=>
    store.getters['music/getcurrentTime']
)
const duration = computed(() => store.getters['music/getduration'])
function handleSeek(event) {
  if (!duration.value) return
  const bar = event.currentTarget
  const clickX = event.offsetX
  const barWidth = bar.clientWidth
  const ratio = Math.min(Math.max(clickX / barWidth, 0), 1) // 保证比例在 0~1 范围内
  const newTime = ratio * duration.value
  seek(newTime)
}


const musicID=computed(()=>
    store.getters['music/getmusicID']
)

// 进度百分比
const progressPercent = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

const PlayListPopup=computed(()=>
    store.getters['PlayListPopupControl/getPlayListPopup']
)

function goback(){
    router.back()
}
function gotoMusicDetailPage(){
  router.back()
}
// 时间格式化（mm:ss）
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
// 解析歌词函数
function parseLyric(raw) {
  if (typeof raw !== 'string') return []

  const lines = raw.split('\n')
  const result = []
  const timeReg = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/

  for (let line of lines) {
    if (!line || typeof line !== 'string') continue

    const match = timeReg.exec(line)
    if (!match) continue

    const min = parseInt(match[1])
    const sec = parseInt(match[2])
    const ms = match[3] ? parseInt(match[3].padEnd(3, '0')) : 0
    const time = min * 60 + sec + ms / 1000
    const text = line.replace(timeReg, '').trim()

    if (text) result.push({ time, text })
  }

  return result
}
// 显示歌单列表
function ShowPlaylist(){
    console.log('点击了歌单列表',!PlayListPopup.value)
    store.dispatch('PlayListPopupControl/updatePlayListPopup',!PlayListPopup.value)
}

watch(()=>musicID.value,
async(newID)=>{
LyricData.value=await getLyric(newID)
console.log('歌词',LyricData.value)
const raw=LyricData.value.data.lrc.lyric
Lyric.value=parseLyric(raw)
console.log('lyric',Lyric.value)
}, { immediate: true })

// 每秒检查当前时间对应哪一句歌词
watch(currentTime, (time) => {
  if(Lyric.value.length){
  for (let i = 0; i < Lyric.value.length; i++) {
    if (time < Lyric.value[i].time) {
      LyricIndex.value = Math.max(0, i - 1)
      break
    }
  }
  }

})
const lyricLineRefs = ref([])

function setLyricLineRef(el) {
  if (el) lyricLineRefs.value.push(el)
}

watch(LyricIndex, (newIndex) => {
  const el = lyricLineRefs.value[newIndex]
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
})
</script>

<style lang="less" scoped>
.LyricPageContainer{
        z-index: -1;
.background-blur {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(100px);
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 0;
}
    width: 100%;
    height: 100%;
    /* background-color: #3c2821; */
    padding: 2rem;
    box-sizing: border-box;   
    .LyricPage{
        
        .top{
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 2rem;
            color: #6e6b6b;
        }
        .SongInfo{
                /* background-color: #f56c6c; */
                position: relative;
                height: 2rem;
                display: flex;
                flex-direction: column;
                color: #e5e1dc;
                text-align: center;
                font-size: 2rem;
              }
            .LyricDetail{
            position: relative;
            z-index: 10;
            width: 100%;
            height: 42rem;
            margin-top: 4rem;
              overflow-y: auto;
              padding: 1rem 0;
              text-align: center;
              font-size: 1.8rem;
              color: #81807f;

            .lyric-line {
              margin: 2rem 0;
              transition: color 0.3s ease;
            }
        
            .active {
              color: #fff;
              font-weight: bold;
              font-size: 2rem;
            }            
            }
        .Info{
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2rem;
            .InfoLeft{
                z-index: 10;
                display: flex;
                flex-direction: column;
                color: #b3a9a5;
                .van-icon{
                    font-size: 2rem;
                }
            }
            .InfoRight{
                z-index: 10;
                width: 8rem;
                display: flex;
                justify-content: space-between;
                font-size: 2rem;
                color: #6e6b6b;
                
            }
        }
        .timebar{
            z-index: 10;
            position: relative;
            margin-top: 4rem;
            .progress-Bar {
              z-index: 10;
              height: 6px;
              background: #ddd;
              border-radius: 3px;
              overflow: hidden;
              margin-top: 0.5rem;
            }

            .progress {
                z-index: 10;
              height: 100%;
              background: #f56c6c;
              transition: width 0.2s ease;
            }

            .time {
                z-index: 10;
              font-size: 0.8rem;
              color: #666;
              margin-top: 0.3rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
        }
        .PlayButton{
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 3rem;
            margin-top: 2rem;
            .iconfont{
                z-index: 10;
                font-size: 3rem;
            }
        }
    }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: spin 6s linear infinite;
  animation-play-state: running;
}

.paused {
  animation-play-state: paused;
} 
 
</style>