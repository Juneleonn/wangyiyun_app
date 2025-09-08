<!-- 第三部分 独家放送 -->
<template>
    <div class="PrivateContent">
        <div class="List">
          <div class="top">
            <h2>独家放送</h2>
            <van-icon name="arrow" />
          </div>
                <van-swipe :loop="false" :width="138" :show-indicators="false">
                  <van-swipe-item
                    v-for="(item, index) in PrivateContent"
                    :key="index"
                    @click="gotoPrivateContentPage(item)"
                  >
                    <img :src="item.picUrl" alt="封面图" class="cover-img" />
                    <div class="name">{{ item.name }}</div>
                    <van-icon name="video" class="video"/>
                  </van-swipe-item>
                  <!-- 占位滑块，解决最后一个显示不全 -->
                  <van-swipe-item style="width: 1rem; background: transparent;" />
                </van-swipe>

        </div>
    </div>
</template>

<script setup>
import{getPrivateContent}from'@/request/api/privatecontent.js'
import{getMVDetail}from'@/request/api/video.js'
import{getMVAddress}from'@/request/api/video.js'
import{onMounted,ref}from'vue'
import{useRouter}from'vue-router'
const router=useRouter()   
const PrivateContent=ref(null)//每日放送封面内容

onMounted(async()=>{
const res=await getPrivateContent()
PrivateContent.value=res.data.result
console.log('PrivateContentData.value',PrivateContent.value)
const temp=await getMVDetail(PrivateContent.value[1].id)
console.log('temp',temp)
const tempAdd=await getMVAddress(PrivateContent.value[1].id)
console.log('tempAdd',tempAdd)

})
function gotoPrivateContentPage(item) {
  router.push({
    path: '/PrivateContentPage',
    query: {
      id: item.id,
      name:item.name,
      cover:item.cover
    }
  });
}
</script>

<style lang="less" scoped>
.PrivateContent{
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
          box-sizing: border-box;
          font-size: 1.5rem;
          img{
            width: 16rem;
            height: 10rem;
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
          .video {
              position: absolute;
              top: 5px;
              left: 5px;
              font-size: 2rem;
              color: white;
              /* background: rgba(0, 0, 0, 0.4); */
              border-radius: 50%;
              padding: 6px;
            }
            }}
  }
}
</style>