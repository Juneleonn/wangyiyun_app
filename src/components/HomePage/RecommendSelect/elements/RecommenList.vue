<!-- 第二部分 推荐歌单 -->
<template>
    <div class="RecommenList">
        <div class="List">
          <div class="top">
            <h2>推荐歌单</h2>
            <van-icon name="arrow" />
          </div>
          <van-swipe :loop="false" :width="162" :show-indicators="false">
            <van-swipe-item
              v-for="(item, index) in RecommendList"
              :key="index"
              @click="gotoMusicListDeyailPage(item)"
            >
              <img :src="item.picUrl" alt="封面图" class="cover-img" />
              <div class="name">{{ item.name }}</div>
              <van-icon name="play" class="playIcon" />
            </van-swipe-item>
            <!-- 占位滑块，解决最后一个显示不全 -->
            <van-swipe-item style="width: 1rem; background: transparent;" />
          </van-swipe>

        </div>
    </div>
</template>

<script setup>
import{getDailyRecommendList}from'@/request/api/MusicIntroduction.js'
import{onMounted,ref}from'vue'
import{useRouter}from'vue-router'
const router=useRouter()   
const RecommendListData=ref(null)//每日推荐歌单Data
const RecommendList=ref(null)
onMounted(async()=>{
RecommendListData.value=await getDailyRecommendList()
RecommendList.value=RecommendListData.value.data.recommend

console.log('RecommendList.value',RecommendList.value)
})
function gotoMusicListDeyailPage(item) {
  router.push({
    path: '/MusicListDetail',
    query: {
      id: item.id
    }
  });
}
</script>

<style lang="less" scoped>
.RecommenList{
  margin-top: 2rem;
  .List{
    .top{
      display: flex;
      align-items: center;
      /* justify-content: center; */
      .van-icon{
        font-size: 1.5rem;
      }
    }
        .van-swipe{
        
        .van-swipe-item {
          height: 20rem; 
          width: 15rem !important; 
          position: relative;
          /* border-radius: 8px; */
          overflow: hidden;
          margin-right: 1rem;
          box-sizing: border-box;
          font-size: 1.5rem;
          img{
            width: 15rem;
            height: 15rem;
            border-radius: 8px;
          }
          .name{
            color: #333;
            line-height: 1.4; /* 行高可按需要调整 */
            display: -webkit-box;
            -webkit-line-clamp: 2;        /* 限制最多两行 */
            -webkit-box-orient: vertical; /* 垂直排列 */
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;       /* 单词过长也换行 */
            max-width: 100%;
          }
          .playIcon {
              position: absolute;
              bottom: 5rem;
              right: 5px;
              font-size: 2.5rem;
              color: white;
              /* background: rgba(0, 0, 0, 0.4); */
              border-radius: 50%;
              padding: 6px;
            }
            }}
  }
}
</style>

