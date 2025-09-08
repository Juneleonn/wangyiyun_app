<!-- 飙升榜页面 -->
<template>
    <div class="SoaringListPage">
        <div class="SoaringList" v-if="playlistDetail"
        :style="{
        backgroundImage: `url(${playlistDetail.coverImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height:'20rem'
          }">
            <!-- 顶部返回 -->
            <div class="top">
                <van-icon name="arrow-left" class="arrow-left" @click="goback
                " style="cursor: pointer"/>
                <van-icon name="ellipsis" class="ellipsis"/>
            </div>
            <div class="CenterButton" v-if="playlistDetail">
                <div class="Button">
                    <div round type="success" class="subscribed">
                        <van-icon name="add-square" />
                        {{formatCount(playlistDetail.subscribedCount)}}
                    </div>
                    <div round type="success" class="comment">
                        <van-icon name="comment" />
                        {{formatCount(playlistDetail.commentCount)}}
                    </div>
                    <div round type="success" class="share">
                        <van-icon name="share" />
                        {{formatCount(playlistDetail.shareCount)}}
                    </div>
                </div>
            </div>
                    <!-- 播放全部按钮 -->
         <div class="SetPlay">
            <div class="left" @click="playall">
                <van-icon name="play-circle"/>
                <span class="playAll" >播放全部</span>
            </div>
            <div class="right">
                <van-icon name="certificate" />
                <i class="iconfont icon-zu"></i>
            </div>
         </div>
         <div class="musiclist">
            <ul>
                <li v-for="(item,index) in musicList" :key="index" @click="playSong(item.id)">
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

        </div>
                <div class="PlayControl" v-if="MusicDetail">
            <PlayControl/>
        </div>
    </div>
</template>
<script setup>
import PlayControl from '@/components/Public/PlayControl.vue'
import{computed,watch,ref}from'vue'
import{useStore}from'vuex'
const store=useStore()
import{useRouter}from'vue-router'
const router=useRouter()
import{getMusicListDetail,getListAllSongs}from'@/request/api/MusicIntroduction.js'
const id=ref(null)
const playlistDetail=ref(null)
const musicList=ref(null)
const musicID=ref(null)//点击要播放的音乐的id
//从vuex加载数据
const SoaringList=computed(()=>
    store.getters['MusicRank/getSoaringList']
)
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const playList=computed(()=>
    store.getters['music/getplayList']
)
//返回上一级路由
function goback(){
    router.back()
}
function formatCount(count) {
  if (count >= 10000) {
    return (count / 10000).toFixed(2).replace(/\.?0+$/, '') + '万'
  }
  return count
}
function playall(){
     // 把当前歌单的歌曲 id 列成数组
  const ids = musicList.value.map(item => item.id) // 你说的 al.id

  // 追加到 Vuex 里的播放列表
 // 避免重复歌曲
  const newPlayList = Array.from(new Set([ ...ids,...playList.value]))


  // 提交到 store（假设 mutation 名叫 updatePlayList）
  store.commit('music/setplayList', newPlayList) 
  // 同时可以把第一首歌设为当前播放
  if (musicList.value.length > 0) {
    const firstId = musicList.value[0].id
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
watch(()=>SoaringList.value,
async(newval)=>{
    id.value=newval.id
    playlistDetail.value
    const res=await getMusicListDetail(id.value)    
    playlistDetail.value=res.data.playlist
    const allsongs=await getListAllSongs(id.value)
    musicList.value=allsongs.data.songs
}, { immediate: true })
watch(()=>musicID.value,
async(newval)=>{
// 动态更新id
store.dispatch('music/updatemusicID',newval)
console.log('飙升榜播放的音乐id',newval)

})
watch(()=>MusicDetail.value,
async(newval)=>{
console.log('监听到MusicDetail',newval)
}, { immediate: true })
</script>
<style lang="less" scoped>
.SoaringListPage{
    .SoaringList{
        padding: 2rem;
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
    .CenterButton{
        .Button{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 18rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 3rem;
            line-height: 3rem;
            width: 80%;
            background-color:#fef8f8;
            border-radius: 40px;
            div:nth-child(-n+2){
                border-right:1px solid #8590ab;
                padding-right: 2rem;
            }
            box-shadow: 0 2px 30px 1px rgba(0, 0, 0, 0.2);
        }
    }
    .SetPlay{
        position: relative;
        height: 4rem;
        line-height: 4rem;
        /* background-color: aquamarine; */
        margin-top: 23rem;
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
    }
}
     .PlayControl{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
    } 
</style>