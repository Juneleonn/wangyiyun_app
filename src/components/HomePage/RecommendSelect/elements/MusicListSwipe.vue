<!-- 头部歌单组件 -->
 <template>
    <div class="MusicListSwipe">
        <div class="IntroductionList">
                <van-swipe :loop="false" :width="146" :show-indicators="false" class="rank-swipe">
                    <!-- 推荐歌曲 -->
                    <van-swipe-item v-if="firstdailySong" class="" @click="gotoDailyPage"> 
                        <!-- <div class="music-card"> -->
                          <!-- 封面图片 -->
                          <img :src="firstdailySong.al.picUrl" alt="封面图" class="cover-img" />

                          <!-- 顶部 Overlay -->
                          <div class="top-overlay">每日推荐</div>
                        
                          <!-- 底部 Overlay -->
                          <div class="bottom-overlay">
                            <span class="reason">{{ firstdailySong.reason }}</span>
                          </div>

                        <!-- </div> -->
                        <van-icon name="play" class="=playIcon"/>
                    </van-swipe-item>
                    <!-- 飙升榜  -->
                    <van-swipe-item v-if="SoaringList" @click="gotoSoaringListPage">
                        <!-- <div class="music-card"> -->
                          <!-- 封面图片 -->
                          <img :src="SoaringList.coverImgUrl" alt="封面图" class="cover-img" />

                          <!-- 顶部 Overlay -->
                          <div class="top-overlay">{{SoaringList.name}}</div>
                        
                          <!-- 底部 Overlay -->
                          <div class="bottom-overlay">
                            <span class="reason">云音乐官方top排行榜</span>
                          </div>

                        <!-- </div> -->
                        <van-icon name="play" class="=playIcon"/>                      
                    </van-swipe-item>
                    <van-swipe-item v-if="NewSongList" @click="gotoNewSongListPage">
                        <!-- <div class="music-card"> -->
                          <!-- 封面图片 -->
                          <img :src="NewSongList.coverImgUrl" alt="封面图" class="cover-img" />

                          <!-- 顶部 Overlay -->
                          <div class="top-overlay">{{NewSongList.name}}</div>
                        
                          <!-- 底部 Overlay -->
                          <div class="bottom-overlay">
                            <span class="reason">云音乐新歌榜</span>
                          </div>

                        <!-- </div> -->
                        <van-icon name="play" class="=playIcon"/>                      
                    </van-swipe-item>
                    <van-swipe-item v-if="OriginalList" @click="gotoOriginalListPage">
                        <!-- <div class="music-card"> -->
                          <!-- 封面图片 -->
                          <img :src="OriginalList.coverImgUrl" alt="封面图" class="cover-img" />

                          <!-- 顶部 Overlay -->
                          <div class="top-overlay">{{OriginalList.name}}</div>
                        
                          <!-- 底部 Overlay -->
                          <div class="bottom-overlay">
                            <span class="reason">云音乐独立原创</span>
                          </div>

                        <!-- </div> -->
                        <van-icon name="play" class="=playIcon"/>                      
                    </van-swipe-item>
                    <van-swipe-item v-if="HotSongList" @click="gotoHotSongListPage">
                        <!-- <div class="music-card"> -->
                          <!-- 封面图片 -->
                          <img :src="HotSongList.coverImgUrl" alt="封面图" class="cover-img" />

                          <!-- 顶部 Overlay -->
                          <div class="top-overlay">{{HotSongList.name}}</div>
                        
                          <!-- 底部 Overlay -->
                          <div class="bottom-overlay">
                            <span class="reason">云音乐新歌榜</span>
                          </div>

                        <!-- </div> -->
                        <van-icon name="play" class="=playIcon"/>                      
                    </van-swipe-item>
                    <!-- 占位滑块，解决最后一个显示不全 -->
                    <van-swipe-item style="width: 0rem; background: transparent;"/>
                </van-swipe>

        </div>   
    </div>
 </template>

 <script setup>
import{useRouter}from'vue-router'
const router=useRouter()    
import{getPersonalized,getDailyRecommendSongs}from'@/request/api/MusicIntroduction.js'
import{ref,onMounted,computed,watch}from'vue'
import{useStore}from'vuex'
const store=useStore()
const recommendMusicList=ref(null)//推荐的歌单
const recommendMusicListData=ref(null)
const cookie=ref(null)
const dailyReccommendSongs=ref(null)//每日推荐歌曲object
const dailySongsData=ref(null)//每日推荐歌曲data
const firstdailySong=ref(null)//每日推荐歌曲第一首
// const HeatDeatData=ref(null)//心动模式数据
// 从vuex加载数据
const SoaringList=computed(()=>
    store.getters['MusicRank/getSoaringList']
)
const NewSongList=computed(()=>
    store.getters['MusicRank/getNewSongList']
)
const OriginalList=computed(()=>
    store.getters['MusicRank/getOriginalList']
)
const HotSongList=computed(()=>
    store.getters['MusicRank/getHotSongList']
)
 // 跳转到每日推荐歌曲页面
function gotoDailyPage(){
router.push('/daily')
}   
function gotoSoaringListPage(){
  router.push('/SoaringListPage')
}
function gotoNewSongListPage(){
  router.push('/NewSongListPage')
}
function gotoOriginalListPage(){
  router.push('/OriginalListPage')
}
function gotoHotSongListPage(){
  router.push('/HotSongListPage')
}
onMounted(async()=>{
// 获取推荐的歌单
recommendMusicList.value=await getPersonalized()
recommendMusicListData.value=recommendMusicList.value.data.result
cookie.value=localStorage.getItem('LoginCookie')
//获取每日推荐的歌曲
dailyReccommendSongs.value=await getDailyRecommendSongs()
dailySongsData.value=dailyReccommendSongs.value.data.data.dailySongs
store.dispatch('music/updatedailySongsData',dailySongsData.value)
firstdailySong.value=dailySongsData.value[0]

})   
watch(
  [SoaringList, NewSongList, OriginalList, HotSongList],
  ([a, b, c, d]) => {
    console.log('soaring', a)
    console.log('NewSongList', b)
    console.log('OriginalList', c)
    console.log('HotSongList', d)
  },
  { immediate: true }
)


 </script>



 <style lang="less" scoped>
.MusicListSwipe{
/* 推荐歌单 start  */
.IntroductionList{
    margin-top: 1rem;
    .van-swipe{
        .van-swipe-item {
          width: 15rem !important; 
          height: 200px; 
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 1rem;
          box-sizing: border-box;
          .playIcon {
              position: absolute;
              bottom: 0;
              right: 10px;
              font-size: 2rem;
              color: white;
              background: rgba(0, 0, 0, 0.4);
              border-radius: 50%;
              padding: 6px;
            }

          .cover-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            position: absolute;
            top:25px
          }

        .top-overlay {
          position: absolute;
          top: 0;
          width: 100%;
          height: 40px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(6px);
          color: #fff;
          font-weight: bold;
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        }

  .bottom-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    text-align: center;
    box-sizing: border-box;
  }

  .reason {
    font-size: 1.2rem;
    font-weight: bold;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
  }
  .van-icon{
              position: absolute;
              bottom: 40px;
              right: 2px;
              font-size: 3rem;
              color: white;
              /* background: rgba(0, 0, 0, 0.4); */
  }
}

    }
}
}
/* 推荐歌单 end */


 </style>