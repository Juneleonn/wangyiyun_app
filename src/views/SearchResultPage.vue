<template>
    <div class="SearchResultPage">
        <div class="SearchResultPageContainer">
            <div class="topSearch">
                <div class="Left">
                    <van-icon name="arrow-left" class="arrow-left" @click="goback" style="cursor: pointer"/>
                </div>
                <div class="Right">
                    <van-search
                        v-model="route.query.keyword"
                        shape="round"
                        placeholder=""
                        style="width: 30rem;"
                        @search="onSearch" 
                        autofocus
                    />

                </div>
            </div>  
            <div class="searchListContainer">
                <div class="searchList">
                    <ul>
                        <li v-for="(item,index) in SearchResult" :key="index" @click="musicID=item.id">
                            <div class="leftInfo">
                                <div class="TopSong">{{item.al.name}}</div>
                                <div class="BottomSinger">{{item.ar[0].name}}</div>
                            </div>
                            <div class="RightButton">
                                <van-icon name="like-o" class="like"/>
                                <van-icon name="plus" class="Add"/>
                                <van-icon name="ellipsis"  class="More"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="PlayControl" v-if="MusicDetail">
            <PlayControl/>
        </div>
    </div>
</template>

<script setup>
import PlayControl from '@/components/Public/PlayControl.vue'
import{getSearchResult}from'@/request/api/search.js'
import{watch,ref,computed}from'vue'
import{useRoute,useRouter}from'vue-router'
const route=useRoute() 
const router=useRouter()
import{useStore}from'vuex'
const store=useStore()
// const Result=ref(null)
const SearchResult=ref(null)
const musicID=ref(null)//点击要播放的音乐的id
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
// 监听关键词
watch(()=>route.query.keyword,
async(newval)=>{
    console.log('new',newval)
    const res=await getSearchResult(newval)
    SearchResult.value=res.data.result.songs
    console.log('搜索结果',SearchResult.value)
},{immediate:true})
watch(()=>musicID.value,
async(newval)=>{
// 动态更新id
store.dispatch('music/updatemusicID',newval)
})
watch(()=>MusicDetail.value,
async(newval)=>{
console.log('监听到MusicDetail',newval)
}, { immediate: true })

function goback(){
    router.back()
}
</script>

<style lang="less" scoped>
.SearchResultPage{
    padding: 2rem;
    .SearchResultPageContainer{
        .topSearch{
    display: flex;
    align-items: center;
    justify-content: left;
    .Left{
        /* width: 10%; */
        .van-icon{
            font-size: 2rem;
            font-weight: 800;
        }
        .Right{
            /* width: 90%; */

        }
    }
}        
.searchListContainer{
    .searchList{
        margin-top: 1rem;
        ul{
            li{
                padding-top: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 4rem;
                .leftInfo{
                    width: 70%;

                    .TopSong{
                        font-size: 1.5rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .ButtomSinger{
                        font-size: 1rem;
                        color: #b7b6bc;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                    .RightButton{
                        display: flex;
                        .van-icon{
                            padding-left: 1rem;
                        }
                        .More{
                            rotate: 90deg;
                        }
                        font-size: 1.8rem;
                         color: #b7b6bc;
                        /* float: right; */
                    }
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