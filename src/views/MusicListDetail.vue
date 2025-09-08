<!-- 歌单详情页 -->
 <template>
    <div class="MusicListDetailContainer">
        <div class="topDetail"
                :style="{
      backgroundImage: MusicListDetail ? `url(${MusicListDetail.playlist.coverImgUrl})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }">
        <div class="background-blur"></div>
        <div class="top">
            <div class="left">
                <van-icon name="arrow-left" class="arrow-left" @click="goback" style="cursor: pointer"/>
            </div>
            
            <div class="right">
                <van-icon name="search" class="search"/>
                <van-icon name="ellipsis" class="ellipsis"/>
            </div>
            
        </div>
        <div class="MusicListDetail">
            <div class="top" v-if="MusicListDetail">
                <div class="leftImg">
                    <img :src="MusicListDetail.playlist.coverImgUrl" alt="">
                </div>
                <div class="rightInfo">
                    <div class="topListName">{{MusicListDetail.playlist.name}}</div>
                    <div class="creator">
                        <img :src="MusicListDetail.playlist.creator.avatarUrl" alt="" class="avatar">
                        <div class="nickname">{{MusicListDetail.playlist.creator.nickname}}</div>
                        <div class="type">
                          <span v-for="(tag, index) in MusicListDetail.playlist.algTags" :key="index">
                            {{ tag }}
                          </span>
                        </div>

                        <div class="score" v-if="MusicListDetail.playlist.score">{{MusicListDetail.playlist.score}}</div>
                    </div>
                    <div class="desc">{{MusicListDetail.playlist.description}}</div>
                </div>
            </div>
        </div>
        <div class="Button" v-if="MusicListDetail">
            <van-button round type="success" class="share">
                <van-icon name="share" />
                {{formatCount(MusicListDetail.playlist.shareCount)}}
            </van-button>
            <van-button round type="success" class="comment">
                <van-icon name="comment" />
                {{formatCount(MusicListDetail.playlist.commentCount)}}
            </van-button>
            <van-button round type="success" class="subscribed">
                <van-icon name="add-square" />
                {{formatCount(MusicListDetail.playlist.subscribedCount)}}
            </van-button>
        </div>
        </div>
        <div class="PlayListShow">
        <!-- 播放全部按钮 -->
         <div class="SetPlay">
            <div class="left" @click="playall">
                <van-icon name="play-circle"/>
                <span class="playAll">播放全部</span>
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
import{watch,ref,computed}from'vue'
import { useRoute,useRouter } from 'vue-router'
import{getListAllSongs,getMusicListDetail}from'@/request/api/MusicIntroduction.js'
import{getMusicUrl,getMusicDetail}from'@/request/api/musicplay.js'
const Data=ref(null)
const route = useRoute()
const router = useRouter()
const musicListId = route.query.id
const MusicListDetailData=ref(null)
const MusicListDetail=ref(null)
const musicList=ref(null)//歌曲列表
const musicID=ref(null)//点击要播放的音乐的id
const musicUrlData=ref(null)//正在播放的音乐的urlObject
const musicUrl=ref(null)//正在播放的音乐的url
const musicDetail=ref(null)//正在播放的音乐的详情
import{useStore}from'vuex'
const store=useStore()
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const playList=computed(()=>
    store.getters['music/getplayList']
)

watch(()=>musicListId,
async(newval)=>{
    Data.value=await getListAllSongs(newval)
    console.log('歌单列表详情',Data.value)
    musicList.value=Data.value.data.songs
    MusicListDetailData.value=await getMusicListDetail(newval)
    MusicListDetail.value=MusicListDetailData.value.data
    console.log('歌单详情',MusicListDetail.value)
}, { immediate: true })

// 播放音乐
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

function formatCount(count) {
  if (count >= 10000) {
    return (count / 10000).toFixed(2).replace(/\.?0+$/, '') + '万'
  }
  return count
}
function goback(){
    router.back()
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
</script>


<style lang="less" scoped>

    .MusicListDetailContainer{
        
        .topDetail{
            padding: 2rem;
           height: 25rem; 
        .background-blur{
            height: 30rem;
            position: absolute;
            inset: 0;
            backdrop-filter: blur(100px);
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 0;
    }   
        .top{
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 2rem;
        font-size: 2rem;
        color: #8590ab;
        .arrow-left{
            float: left;
        }
        .search{
            padding-right: 2rem;
        }
        .ellipsis{
            float: right;
            transform: rotate(90deg);
        }
    }
    .MusicListDetail{
    .top{
        margin-top: 2rem;
        display: flex;
        height: 12rem;
        /* background-color: yellow; */
        .leftImg{
        
        img{
            border-radius: 5px;
            height: 11rem;
            width: 11rem;
        }

    }        .rightInfo{
            padding-left: 2rem;
            /* background-color: yellow; */
            display: flex;
            flex-direction: column;
            .topListName{
                color: #fff;
            }
            .creator{
                display: flex;
                font-size: 1.5rem;
                color: #d4d0d7;
                
                img{
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                }
                .nickname{
                    padding-left: 1rem;
                }
                .type{
                    padding-left: 1rem;
                }
                .score{
                    padding-left: 1rem;
                }
            }
            .desc{
                font-size: 1.5rem;
                color: #99969b;
                line-height: 1.5;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2; /* 最多显示2行 */
                word-break: break-all;
            }
        }
    }

    }
    .Button{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;
        .van-button{
            width: 30%;
            background-color: rgba(255, 255, 255, 0.1);
            border: transparent;
        }
    }
        }
        /* 歌单列表 */
        .PlayListShow{
            padding:0 2rem;
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
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
        }


    }
     .PlayControl{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
    }   
</style>