//第一部分CategoryShow

<template>
    <div class="CategoryShow">
          <div class="top">
            <h2>热门分类</h2>
            <van-icon name="arrow" />
          </div>
        <div class="Container">
            <ul >
                <li v-for="(item,index) in categoryTag" :key="index"  @click="gotoListPage(item)">
                    <div>{{item.name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import{getHotPlayList}from'@/request/api/PlayList.js'
// import{getMusicListDetail,getListAllSongs}from'@/request/api/MusicIntroduction.js'
import{useRouter}from'vue-router'
const router=useRouter()  
import{onMounted,ref}from'vue'
const categoryTag=ref(null)//歌单分类标签

function gotoListPage(item) {
  router.push({
    path: '/PlayListShowPage',
    query: {
      id: item.id,
      name:item.name,
    }
  });
}

 onMounted(async()=>{
    const res=await getHotPlayList()
    console.log('歌单分类',res)
    categoryTag.value=res.data.tags
    console.log('tag',categoryTag.value)
 })
</script>

<style lang="less" scoped>
    .CategoryShow{
        /* margin-top: 2rem; */
    .top{
      display: flex;
      align-items: center;
      /* justify-content: center; */
      .van-icon{
        font-size: 1.5rem;
      }
    }
        .Container{
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 17%;
                    padding-right: 1rem;
                    padding-top: 1rem;
                    div{
                        width: 100%;
                        height: 3rem;
                        line-height: 3rem;
                        background-color: #f3f7fa;
                        text-align: center;
                        color: black;
                    }
                }
            }
        }
    }
</style>