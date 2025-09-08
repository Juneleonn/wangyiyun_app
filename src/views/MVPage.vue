<template>
    <div class="MVPage">
        <div class="MV" v-if="PrivateContentName">
            <div class="top">
                <div class="left" @click="gotoHome">
                    <van-icon name="arrow-left" class="arrow-left" @click="gotoHome" style="cursor: pointer"/>
                </div>
            </div>
            <!-- 滚动标题区域 -->
            <div class="scroll-container" v-if="PrivateContentName">
              <div class="scroll-text">{{ PrivateContentName }}</div>
            </div>
            <!-- 视频播放器 -->
            <video
              :src="url"
              ref="videoRef"
              class="video"
              controls
              preload="metadata"
              :poster="PrivateContentcover"
            ></video>
            <!-- 热门评论区域 -->
            <div class="comments" v-if="hotComments?.length">
              <h3 class="comment-title">热门评论</h3>
              <div class="comment-item" v-for="(comment, index) in hotComments" :key="index">
                <img class="avatar" :src="comment.user.avatarUrl" alt="头像" />
                <div class="content">
                  <div class="name">{{ comment.user.nickname }}</div>
                  <div class="text">{{ comment.content }}</div>
                  <div class="like">
                    <van-icon name="good-job-o" />
                     {{ formatCount(comment.likedCount) }}</div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import{watch,computed,ref}from'vue'
import { useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()    
const PrivateContentID = computed(() => route.query.id)
const PrivateContentName = computed(() => route.query.name)
const PrivateContentcover = computed(() => route.query.cover)
const url=ref(null)
const comments=ref(null)
const hotComments=ref(null)
import{getMVAddress,getMVcomment}from'@/request/api/video.js'

function gotoHome(){
    router.push('/')
}
function formatCount(count) {
  if (count >= 10000) {
    return (count / 10000).toFixed(2).replace(/\.?0+$/, '') + '万'
  }
  return count
}
watch(()=>PrivateContentID.value,
async(newval)=>{
    console.log('独家放送id',newval)
    const tempAdd=await getMVAddress(newval)
    console.log('tempAdd',tempAdd)
    url.value=tempAdd.data.data.url
    const res=await getMVcomment(newval)
    console.log('评论',res)
    comments.value=res.data.comments
    hotComments.value=res.data.hotComments
    console.log('comments.value',comments.value)
    console.log('hotComments.value',hotComments.value)
}, { immediate: true })
</script>

<style lang="less" scoped>
    .MVPage{
        .MV{
            padding: 2rem;
            .top{
                position: relative;
                display: flex;
                justify-content: space-between;
                height: 2rem;
                font-size: 2rem;
                color: #8590ab;
            }
    /* 滚动标题样式 */
    .scroll-container {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      margin: 1rem 0;
    }

    .scroll-text {
      display: inline-block;
      padding-left: 100%;
      animation: scrollText 12s linear infinite;
      font-size: 1.6rem;
      font-weight: bold;
    }

    @keyframes scrollText {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .video {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: block;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .comments {
  margin-top: 2rem;

  .comment-title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .comment-item {
    display: flex;
    align-items: flex-start;
    padding: 1rem 0;
    border-bottom: 1px solid #eaeaea;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1rem;
      object-fit: cover;
    }

    .content {
      flex: 1;

      .name {
        font-weight: bold;
        color: #333;
        margin-bottom: 0.2rem;
      }

      .text {
        color: #666;
        font-size: 1.4rem;
      }

      .like {
        .van-icon{
            font-size: 2rem;
        }
        color: #999;
        font-size: 1.2rem;
        margin-top: 0.5rem;
      }
    }
  }
}
        }
    }
</style>