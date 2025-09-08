<template>
    <div class="PersonalInfoPage"  v-if="Info"
                :style="{
        backgroundImage: `url(${Info.backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height:'30rem'
          }">
        <div class="PersonalInfo">
            <div class="top">
                <div class="left">
                    <van-icon name="wap-nav" />
                </div>
                
                <div class="right">
                    <van-icon name="search" class="search"/>
                    <van-icon name="ellipsis" class="ellipsis"/>
                </div>
                
            </div>
            <div class="CenterInfo" v-if="Info">
                <div class="oneAvartar">
                    <img :src="Info.avatarUrl" alt="">
                </div>
                <div class="twoNickname">
                    {{Info.nickname}}
                </div>
                <div class="ThreeAward">
                    <van-icon name="award" />
                    {{}}枚徽章
                </div>
                <div class="Data">
                    <span class="follow">{{Info.follows}}关注</span>
                    <span class="fans">{{Info.followeds}}粉丝</span>
                    <span class="level">Lv{{level}}</span>
                </div>
            </div>
        </div>
        <div class="ListShow">
            <div class="Container">
                <div class="topNav">
                    <span class="music">音乐</span>
                    <span class="broadcast">播客</span>
                    <span class="Note">笔记</span>
                </div>
                <div class="playlist">
                    <ul>
                        <li v-for="(item,index) in UserPlaylist" :key="index" @click="gotoMusicListDetail(item)">
                            <div class="left">
                                <div class="pic">
                                    <img :src="item.coverImgUrl" alt="">
                                </div>
                                <div class="info">
                                    <div class="topListName">
                                        {{item.name}}
                                    </div>
                                    <div class="bottom">
                                        <div class="Count">
                                            歌单·{{item.trackCount}}首
                                        </div>
                                        <div class="creator">
                                            {{item.creator.nickname}}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="right">
                                <van-icon name="ellipsis" class="ellipsis"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <BottomNav/>
    </div>
</template>

<script setup>
// 导入页面
import BottomNav from '@/components/HomePage/elements/BottomNav.vue'   
import{onMounted,ref}from'vue'
import{getUserPlaylist,getUserDetail}from'@/request/api/PersonalInfo.js'
// import{getMusicDetail}from'@/request/api/musicplay.js'
import{useStore}from'vuex'
const store=useStore()
const UID=JSON.parse(localStorage.getItem('UserID'))
console.log('UID',UID)
// computed(()=> store.getters['UserInfo/getUserID'])
const Info=ref(null)
const level=ref(null)
const UserPlaylist=ref(null)//用户歌单
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(async()=>{
    if(UID){
console.log('UID.value',UID)
const temp=await getUserPlaylist(UID)
UserPlaylist.value=temp.data.playlist 
console.log('UserPlaylist.value',UserPlaylist.value)
    const res=await getUserDetail(UID)
    Info.value=res.data.profile
    store.commit('UserInfo/setuserinfo', Info.value)
    console.log('userinfo',Info.value)
    level.value=res.data.level
    }else{
        router.push('/login')
    }
})

function gotoMusicListDetail(item){
    router.push(
        {
            path:'/MusicListDetail',
            query:{
                id:item.id
            }
            
        }
    )
}
</script>

<style lang="less" scoped>
.PersonalInfoPage{
    
    .PersonalInfo{
    padding: 2rem;
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
    .CenterInfo{
        /* position: relative; */
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
       .oneAvartar{ 
        margin-top: 4rem;
        width: 7rem;
        height: 7rem;
        img{
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            border: 2px solid #fff;
        }
       } 
       .twoNickname{
        margin-top: 2rem;
        font-size: 2rem;
        font-weight: 600;
        color: #fff;
        /* background-color: aqua; */
       }
       .ThreeAward{
        color: #8590ab;
        margin-top: 1rem;
       }
       .Data{
        font-size: 1.5rem;
        color: #fff;
        /* background-color: aqua; */
        margin-top: 2rem;
        span{
            padding-right: 1rem;
        }
       }
    }

    }
    .ListShow{
        border-radius: 10%;
        background-color: #fff;
        .Container{

            padding: 2rem;
            box-sizing: border-box;
        /* background-color: aqua; */
        width: 100%;
        .topNav{
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 2rem;
            color: #cbccd0;
            font-weight: 600;
            /* background-color: yellow; */
        }
        .playlist{
            ul{
                li{
                    height: 4rem;
                    padding:1rem 0;
                    .left{
                        width: 80%;
                        float: left;
                        display: flex;
                        .pic{
                            width: 4rem;
                            height: 4rem;
                            img{
                                width: 4rem;
                                height: 4rem;
                                border-radius: 5px;
                            }
                        }
                        .info{
                            padding-left: 1rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            .topListName{
                                font-size: 1.5rem;
                                white-space: nowrap;        /* 不换行 */
  overflow: hidden;           /* 超出隐藏 */
  text-overflow: ellipsis;    /* 超出部分显示省略号 */
                            }
                            .bottom{
                                color: #8590ab;
                                display: flex;
                                .creator{
                                    padding-left: 1rem;
                                }
                            }
                        }

                    }
                    .right{
                        float:right;
                                    transform: rotate(90deg);
                    }
                }
            }
        }
        }

    }
}
</style>