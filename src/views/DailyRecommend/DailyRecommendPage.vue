<template>
    <div
        class="DailyRecommendPageContainer"
        v-if="dailySongsData.length"
        :style="{
        backgroundImage: `url(${dailySongsData[0].al.picUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height:'20rem'
          }"
        >
          <!-- 模糊遮罩层 -->
        <div class="background-blur"></div>
        <!-- 顶部返回 -->
        <div class="top">
            <van-icon name="arrow-left" class="arrow-left" @click="gotoHome
            " style="cursor: pointer"/>
            <van-icon name="ellipsis" class="ellipsis"/>
        </div>
        <!-- 日期部分 -->
        <div class="date">
            <div class="Day" v-if="day">{{day}}</div>
            <div class="Month" v-if="month">/{{month}}</div>
        </div>
        <!-- 播放全部按钮 -->
         <div class="SetPlay">
            <div class="left">
                <van-icon name="play-circle"/>
                <span class="playAll" @click="playall">播放全部</span>
            </div>
            <div class="right">
                <van-icon name="certificate" />
                <i class="iconfont icon-zu"></i>
            </div>
         </div>
         <div class="musiclist">
            <ul>
                <li v-for="(item,index) in dailySongsData" :key="index" @click="playSong(item.id)">
                    <div class="left">
                        <div class="leftImg">
                            <img :src="item.al.picUrl" alt="">
                        </div>
                        <div class="rightInfo">
                            <div class="topname">{{item.name}}</div>
                            <div class="bottom">
                                <div class="reason">{{item.reason}}</div>
                                <div class="Singer">{{item.ar[0].name}}</div>
                            </div>
                        </div>

                    </div>
                    <div class="rightIcon">
                        <div class="mv" v-show="item.mv">
                            <i class="iconfont icon-shipin" ></i>
                            
                        </div>
                        <div class="select">
                            <i class="iconfont icon-sandian-down-copy"></i>
                        </div>
                    </div>
                </li>
            </ul>
         </div>
        <div class="PlayControl" v-if="MusicDetail">
            <PlayControl/>
        </div>
    </div>
</template>

<script setup>
import PlayControl from '@/components/Public/PlayControl.vue'
import{computed,ref,onMounted,watch}from'vue'
import{useRouter}from'vue-router'
import{useStore}from'vuex'
import{getMusicUrl,getMusicDetail}from'@/request/api/musicplay.js'

const store=useStore()
const router=useRouter()

// 变量
const date=ref(null)//日期
const day=ref(null)//日
const month=ref(null)//月
const musicID=ref(null)//正在播放的音乐的id
const musicUrlData=ref(null)//正在播放的音乐的urlObject
const musicUrl=ref(null)//正在播放的音乐的url
const musicDetail=ref(null)//正在播放的音乐的详情

//从vuex加载数据
const dailySongsData=computed(()=>
    store.getters['music/getdailySongsData']
)
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const playList=computed(()=>
    store.getters['music/getplayList']
)
function gotoHome(){
    router.push('/')
}
function playall(){
     // 把当前歌单的歌曲 id 列成数组
  const ids = dailySongsData.value.map(item => item.id) // 你说的 al.id

  // 追加到 Vuex 里的播放列表
   // 避免重复歌曲
  const newPlayList = Array.from(new Set([ ...ids,...playList.value]))

  // 提交到 store（假设 mutation 名叫 updatePlayList）
  store.commit('music/setplayList', newPlayList) 
  // 同时可以把第一首歌设为当前播放
  if (dailySongsData.value.length > 0) {
    const firstId = dailySongsData.value[0].id
    musicID.value = firstId
  }
}
//播放点击的音乐
function playSong(id){
    // 拷贝一份数组
    const list=[...playList.value]
    // 列表里没有这个id就添加进去
    if(!list.includes(id)){
        list.unshift(id)
        store.commit('music/setplayList', list)
    }
    musicID.value=id
}
onMounted(async()=>{
    console.log('dailySongsData',dailySongsData.value)
    // 获取日期
    date.value=new Date()
    day.value=String(date.value.getDate()).padStart(2, '0')
    month.value=String(date.value.getMonth()+1).padStart(2,'0')
})

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
    // 动态更新id
    store.dispatch('music/updatemusicID',newvalue)
    // 动态更新musicUrl
    store.dispatch('music/updatemusicUrl',musicUrl.value)
    // 动态更新歌曲详情
    store.dispatch('music/updateMusicDetail',musicDetail.value)
    // 更新播放状态
    store.dispatch('music/updatePlayStatus',true)
    console.log('已更新')
})
</script>

<style lang="less" scoped>
.DailyRecommendPageContainer{
    padding: 2rem;
    
    .background-blur {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);

    /* 渐变底部过渡到白色 */
    background: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 1) 100%),
    rgba(255, 255, 255, 0.2);

  /* z-index: 1; */
}

    .top{
        height: 2rem;
        font-size: 2rem;
        color: #8590ab;
        .arrow-left{
            float: left;
        }
        .ellipsis{
            float: right;
            transform: rotate(90deg);
        }
    }
    .date{
        height: 20rem;
        /* background-color: aqua; */
        display: flex;
        position: relative;
        .Day{
            position: absolute;
            bottom: 0;
            font-size: 5rem;
            color: #fff;
        }
        .Month{
            position: absolute;
            bottom: 1rem;
            left: 6rem;
            font-size: 2rem;
            color: #fff;
        }

    }
    .SetPlay{
        position: relative;
        height: 4rem;
        line-height: 4rem;
        /* background-color: aquamarine; */
        margin-top: 1rem;
        .left{
            float:left;
            display: flex;
            align-items: center;
            .playAll{
                color: #343544;
                font-size: 1.5rem;
                font-weight: 600;
                padding-left: 1rem;
            }
            .van-icon{
                
                font-size: 2.5rem;
                color: red;
                background-color: #fff;
                border-radius: 50%;
                border: 0px solid transparent; /* 使边框完全透明 */
            }

        }
        .right{
            float: right;
            display: flex;
            align-items: center;
            .van-icon{
                font-size: 2rem;
                font-weight: 600;
            }
            .iconfont{
                font-size: 2rem;
                 padding-left: 1rem;
            }
        }
    }
    .musiclist{
        position: relative;
        margin-top: 1rem;
        padding-bottom: 2.5rem;
        /* background-color: aqua; */
        ul{
            li{
                width: 100%;
                height: 5rem;
                line-height: 5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left{
                    display: flex;
                    .leftImg{
                        width: 4rem;
                        
                    img{
                        width: 3.5rem;
                        height: 3.5rem;
                        overflow: hidden;
                        border-radius: 5px;
                    }
                    }
                    .rightInfo{
                        /* height: 0rem; */
                        line-height: 2rem;
                        display: flex;
                        flex-direction: column;
                        /*align-items: center;
                        justify-content: space-between; */
                        .topname{
                            /* background-color: yellow; */
                            width: 25rem;
                            font-size: 1.5rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .bottom{
                            display: flex;
                            .reason{
                                color: red;
                                background-color: #f9e7e3;
                                border-radius: 5px;
                            }
                            .Singer{
                                color: #949496;
                                padding-left: 0.5rem;
                            }
                        }
                    }

                }
                .rightIcon{
                    display: flex;
                    color: #bbbbbb;
                    font-size: 1.5rem;

                }
            }
        }
    }
    .PlayControl{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
    }
}

</style>