<!-- 第四部分  -->
 <template>
    <div class="JapaneseList">
        <div class="JapaneseListContainer">
            <div class="top">
                <h2>日文</h2>
                <van-icon name="arrow" />
            </div>
                <van-swipe :loop="false" :show-indicators="false" :width="280">
                  <van-swipe-item v-for="(page, pIndex) in pageList" :key="pIndex">
                    <div class="grid">
                      <div
                        class="item"
                        v-for="(item, index) in page"
                        :key="index"
                        @click="AddToPlaylist(item)"
                      >
                        <img :src="item.album.picUrl" alt="封面图" class="cover-img" />
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="singer">{{item.artists[0].name}}</div>
                        </div>

                        <van-icon name="play" class="playIcon" />
                        
                      </div>
                    </div>
                  </van-swipe-item>
                </van-swipe>   
        </div>
    </div>

 </template>

  <script setup>
import { onMounted, ref, computed ,watch} from 'vue'
import { getTopSong } from '@/request/api/PlayList.js'
import{useStore}from'vuex'
const store=useStore()
const songList = ref([])
const musicID=ref(null)//点击要播放的音乐的id
const pageList = computed(() => {
  const pageSize = 9
  const pages = []
  for (let i = 0; i < songList.value.length; i += pageSize) {
    pages.push(songList.value.slice(i, i + pageSize))
  }
  return pages
})
const playList=computed(()=>
    store.getters['music/getplayList']
)
onMounted(async () => {
  const res = await getTopSong(8)
  console.log('res',res)
  songList.value = res.data.data
//   console.log('怎么回事',songList.value)
})
watch(()=>musicID.value,
async(newval)=>{
// 动态更新id
store.dispatch('music/updatemusicID',newval)
})
function AddToPlaylist(item){
  musicID.value=item.id
  console.log('最新歌曲，歌曲id',musicID.value)
  console.log('playList.value',playList.value)
    // 追加到 Vuex 里的播放列表
  const newPlayList = [item.id, ...playList.value]

  console.log('最新歌曲，播放列表',newPlayList)
  // 提交到 store（假设 mutation 名叫 updatePlayList）
  store.commit('music/setplayList', newPlayList) 
  // 同时可以把第一首歌设为当前播放
}
</script>

<style lang="less" scoped>
.JapaneseList{
    margin-top: 2rem;
    .JapaneseListContainer{
        .top{
        display: flex;
        align-items: center;
        /* justify-content: center; */
        .van-icon{
            font-size: 1.5rem;
      }
    }
    }
.grid {
  display: flex;
  flex-wrap: wrap;
  /* gap: 1rem; */
  /* padding: 1rem; */
  /* justify-content: space-between; */
    padding-right: 0.5rem;
  .item {
    position: relative;
    width: 25rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
    /* padding: 0.5rem; */

    .cover-img {
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
      object-fit: cover;
    }

    .info {
      flex: 1;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
  white-space: nowrap;         /* 不换行 */
  overflow: hidden;            /* 超出隐藏 */
  text-overflow: ellipsis;     /* 超出省略号 */
      .name {
        width: 90%;
        font-size: 1.2rem;
        color: #333;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
      }

      .singer {
        font-size: 0.9rem;
        color: #999;
        margin-top: 0.2rem;
      }
    }

    .playIcon {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      color: #999;
      font-size: 1.5rem;
    }
  }
}

  
}
</style>