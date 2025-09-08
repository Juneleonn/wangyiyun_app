<!-- 第二部分 推荐歌单 -->
<template>
    <div class="RecommenList">
        <div class="List">
          <div class="top">
            <h2>推荐mv</h2>
            <van-icon name="arrow" />
          </div>
          <van-swipe :loop="false" :width="150" :show-indicators="false">
            <van-swipe-item
              v-for="(item, index) in RecommendMV"
              :key="index"
              @click="gotoMVPage(item)"
            >
              <img :src="item.picUrl" alt="封面图" class="cover-img" />
              <div class="name">{{ item.name }}</div>
              <div class="artistName">{{ item.artistName }}</div>
              <div class="videoIcon">
                <van-icon name="video-o" />
                <span class="playCount">
                  {{formatCount(item.playCount)}}
                </span>
              </div>
              
            </van-swipe-item>
            <!-- 占位滑块，解决最后一个显示不全 -->
            <!-- <van-swipe-item style="width: 1rem; background: transparent;" /> -->
          </van-swipe>

        </div>
    </div>
</template>

<script setup>
import{getRecommendMV,getMVDetail,getMVAddress}from'@/request/api/video.js'
import{onMounted,ref}from'vue'
import{useRouter}from'vue-router'
const router=useRouter()   
const RecommendMV=ref(null)

onMounted(async()=>{
const res=await getRecommendMV()
console.log('mv',res)
RecommendMV.value=res.data.result
const mvdetail=await getMVDetail(RecommendMV.value[0].id)
console.log('mvdetail',mvdetail)
const mvAdd=await getMVAddress(RecommendMV.value[0].id)
console.log('mvAdd',mvAdd)
})
function gotoMVPage(item) {
  router.push({
    path: '/MVPage',
    query: {
      id: item.id,
      name:item.name,
      cover:item.cover
    }
  });
}
function formatCount(count) {
  if (count >= 10000) {
    return (count / 10000).toFixed(2).replace(/\.?0+$/, '') + '万'
  }
  return count
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
          height: 15rem; 
          width: 16rem !important; 
          position: relative;
          /* border-radius: 8px; */
          overflow: hidden;
          margin-right: 1rem;

          font-size: 1.5rem;
          img{
            width: 16rem;
            height: 10rem;
            border-radius: 8px;
            box-sizing: border-box;

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
          .artistName{
            color: #939191;
          }
          .videoIcon {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 1rem;
              color: white;
              /* background: rgba(0, 0, 0, 0.4); */
              border-radius: 50%;
              padding: 6px;
              .playCount{
                font-size: 1rem;
              }
            }
            }}
  }
}
</style>