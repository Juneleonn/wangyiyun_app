<!-- PlayControl.vue -->
<template>
    <div class="PlayControlContainer">
        <div class="PlayControl" >
            <!-- 左边头像和信息 -->
            <div class="left" v-if="MusicDetail.data.songs[0].al.picUrl" @click="gotoMusicDetail">
                <div class="IMG">
                    <img :src="MusicDetail.data.songs[0].al.picUrl" 
                    alt="" 
                    class="alImg"
                    :class="[PlayStatus ? 'rotate' : 'rotate paused']">
                    <img :src="cdImage" 
                    alt="" 
                    class="cd-ring"
                    :class="[PlayStatus ? 'rotate' : 'rotate paused']">

                </div>
                <div class="Info">
                    <div class="SongName" v-if="MusicDetail.data.songs[0].name">{{MusicDetail.data.songs[0].name}}</div>
                    <div class="Singer" v-if="MusicDetail.data.songs[0].ar[0].name">-{{MusicDetail.data.songs[0].ar[0].name}}</div>
                </div>
            </div>
            <!-- 右边按钮 -->
            <div class="right">
                <!-- <audio ref="audioPlay" :src="MusicUrl"></audio> -->
                <van-icon name="play-circle-o" class="play" v-if="PlayStatus===false" @click="play"/>
                <van-icon name="pause-circle-o" class="pause" v-if="PlayStatus===true" @click="pause"/>
                <van-icon name="stop-circle-o" class="stop" v-if="0"/>
                <i class="iconfont icon-zu" @click="ShowPlaylist"></i> 
            </div>
        </div>
    </div>
</template>

<script setup>
import cdImage from '@/assets/cd.png'
// import{getMusicDetail}from'@/request/api/musicplay.js'
import{onMounted,computed,watch}from'vue'
import{useStore}from'vuex'
const store=useStore()
import{useRouter}from'vue-router'
const router=useRouter()
// const MusicDetail=ref(null)//正在播放的音乐的详情
// const audioPlay=ref(null)//播放元素
// const PlayStatus=ref(1)//播放状态，0是播放中，1是暂停
import usePlayerController from '@/store/modules/usePlayerController'

const { play, pause} = usePlayerController()
//从vuex加载数据
const MusicID=computed(()=>
    store.getters['music/getmusicID']
)
const MusicUrl=computed(()=>
    store.getters['music/getmusicUrl']
)
const PlayStatus=computed(()=>
    store.getters['music/getPlayStatus']
)
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const PlayListPopup=computed(()=>
    store.getters['PlayListPopupControl/getPlayListPopup']
)

// 跳转到详情页
function gotoMusicDetail(){
    router.push('/detail')
}
function ShowPlaylist(){
    console.log('点击了歌单列表',!PlayListPopup.value)
    store.dispatch('PlayListPopupControl/updatePlayListPopup',!PlayListPopup.value)
}
onMounted(async()=>{
 console.log('MusicID',MusicID.value)
})
watch(
    [   ()=>MusicID.value,
        ()=>MusicUrl.value,
        ()=>PlayStatus.value
    ],
    async([newID,newUrl,newStatus])=>{
    console.log('Playid',newID)
    console.log('Playurl',newUrl)
    console.log('播放状态',newStatus)
}, { immediate: true }
)
</script>

<style lang="less" scoped>
.PlayControlContainer{
    padding: 0 2rem;
  .PlayControl{
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding-right: 2rem;
    width: 100%;
    height: 4rem;
    border-radius: 100px;
    background-color:#e7eaf1;
    /* line-height: 4rem; */
    display: flex;
    align-items:center;
    justify-content: space-between;
    .left{
    /* background-color: aqua; */
        /* float:left; */
        width: 40rem;
        display: flex;
        .IMG{
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            position: relative;
                .cd-ring {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  object-fit: cover;
                    z-index: 10;
                }

                .alImg {
                  position: absolute;
                  left: .5rem;
                  bottom: .5rem;
                  width: 3rem;
                  height: 3rem;
                  border-radius: 50%;
                  object-fit: cover;

                }
        }
        .Info{
        padding-left: 0.4rem;
        display: flex;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.5rem;
        .Singer{
            color:#8d8f9b ;
        }
        }
    }
    .right{
        font-size: 2rem;
        display: flex;
        align-items: center;

        .van-icon{
            padding-left: 1rem;
        }
        .iconfont{
            padding-left: 1rem;
        }
    
    }
  }  
}
@keyframes spin{
    from{
        transform: rotate(0deg);
    }
    to{
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