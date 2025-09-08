<template>
    <div class="MusicDetailPageContainer"
        :style="{
      backgroundImage: MusicDetail ? `url(${MusicDetail.data.songs[0].al.picUrl})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }">
        <div class="MusicDetailPage">
            <div class="top">
                <van-icon name="arrow-down" @click="goback"/>
                <van-icon name="share-o" />
            </div>
            <div class="centerPic" v-if="MusicDetail" @click="gotoLyric">
                <img :src="needle" alt="指针" class="needle" 
                :class="{ 'needle-play': PlayStatus, 'needle-pause': !PlayStatus }">
                <img :src="cdImage" alt="cd圆环" class="cd-ring"
                :class="['rotate', { paused: !PlayStatus }]">
                <img :src="MusicDetail.data.songs[0].al.picUrl" alt="" class="alImg"
                :class="['rotate', { paused: !PlayStatus }]">
            </div>
            <div class="background-blur"></div>
            <div class="Info" v-if="MusicDetail">
                <div class="InfoLeft">
                    <div class="SongName">{{MusicDetail.data.songs[0].name}}</div>
                    <div class="Singer">{{MusicDetail.data.songs[0].ar[0].name}}</div>
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
                <i class="iconfont icon-xiayigexiayishou" @click="playNext"></i>
                <van-icon name="wap-nav" class="playlist" @click="ShowPlaylist"/>
            </div>
        </div>
        <div class="LyricPage">

        </div>
    </div>
</template>

<script setup>
import{computed}from'vue'
import cdImage from '@/assets/cd.png'
import needle from '@/assets/needle-ab.png'
import{useStore}from'vuex'
const store=useStore()
import{useRouter}from'vue-router'
const router=useRouter()
import usePlayerController from '@/store/modules/usePlayerController'


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
const musicID=computed(()=>
store.getters['music/getmusicID'])
const playList=computed(()=>
    store.getters['music/getplayList']
)

const PlayListPopup=computed(()=>
    store.getters['PlayListPopupControl/getPlayListPopup']
)

function handleSeek(event) {
  if (!duration.value) return
  const bar = event.currentTarget
  const clickX = event.offsetX
  const barWidth = bar.clientWidth
  const ratio = Math.min(Math.max(clickX / barWidth, 0), 1) // 保证比例在 0~1 范围内
  const newTime = ratio * duration.value
  seek(newTime)
}


// 返回上一级
function goback(){
    router.back()
}
function gotoLyric(){
    router.push('/lyric')
}

function playNext(){
  console.log('播放下一首playList',playList.value)
  console.log('播放下一首musicID.value',musicID.value)
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
// 显示歌单列表
function ShowPlaylist(){
    console.log('点击了歌单列表',!PlayListPopup.value)
    store.dispatch('PlayListPopupControl/updatePlayListPopup',!PlayListPopup.value)
}

// 进度百分比
const progressPercent = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})
// 时间格式化（mm:ss）
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

</script>

<style lang="less" scoped>
.MusicDetailPageContainer{
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
    .MusicDetailPage{
        .top{
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 2rem;
            color: #6e6b6b;
        }
        .centerPic{
            z-index: 10;
            width: 100%;
            height: 20rem;
            /* background-color: yellow; */
            .needle{
                z-index: 10;
                width: 10rem;
                height: 15rem;
                position: absolute;
                left: 5rem;
                right: 0;
                top: 10rem;
                margin: auto;
                 /* 设置旋转中心为唱针的顶点 */
                transform-origin: 50% 0%; /* 水平中心、垂直顶部 */

                transition: transform 0.5s ease;
            }
            .needle-play {
              transform: rotate(0deg);
            }

            .needle-pause {
              transform: rotate(-30deg); 
            }
            .cd-ring{
                z-index: 9;
                width: 30rem;
                height: 30rem;
                position: absolute;
                left: 0;
                right: 0;
                top: 20rem;
                margin: auto;

            } 
            .alImg{
                z-index: 8;
                width: 25rem;
                height: 25rem;
                border-radius: 50%;
                position: absolute;
                left: 0;
                right: 0;
                top: 22rem;
                margin: auto;
            }
        }
        .Info{
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 30rem;
            .InfoLeft{
                z-index: 10;
                display: flex;
                flex-direction: column;
                color: #b3a9a5;
                .SongName{
                    z-index: 10;
                    font-size: 1.5rem;
                }
                .Singer{
                    z-index: 10;
                    font-size: 1.2rem;
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