<!-- 第四部分 最新音乐 -->
<template>
  <div class="NewSong">
    <div class="top">
      <h2>最新音乐</h2>
      <van-icon name="arrow" />
    </div>
    <div class="NewSongList">
      <ul>
        <li v-for="(song, index) in NewSongList" :key="index" class="song-item" @click="AddToPlaylist(song)">

          <!-- 歌曲封面和信息 -->
          <img :src="song.picUrl" alt="歌曲封面" class="cover" />
          <div class="info">
            <p class="name">{{ song.name }}</p>
            <p class="artist">
              {{ song.song.artists.map(artist => artist.name).join(' / ') }}
            </p>
          </div>

          <!-- 右侧图标 -->
          <div class="more-icon">
            <i class="iconfont icon-sandian-down-copy"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


 <script setup>
import{getNewSong}from'@/request/api/MusicIntroduction.js'
import{onMounted,ref,watch,computed}from'vue'
import{useStore}from'vuex'
const store=useStore()
const NewSongList=ref(null)
const musicID=ref(null)//正在播放的音乐的id

const playList=computed(()=>
    store.getters['music/getplayList']
)

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

onMounted(async()=>{
    const res= await getNewSong()
    console.log('新音乐',res)
    NewSongList.value=res.data.result
    
})
watch(()=>musicID.value,
async(newval)=>{
// 动态更新id
store.dispatch('music/updatemusicID',newval)
})

 </script>

 <style lang="less" scoped>
.NewSong{
    margin-top: 2rem;
    .top{
      display: flex;
      align-items: center;
      /* justify-content: center; */
      .van-icon{
        font-size: 1.5rem;
      }
    }
   .NewSongList {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      .song-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0.5rem ;
        border-radius: 8px;
        transition: background 0.3s;

        &:hover {
          background-color: #f8f8f8;
        }


        .cover {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
          /* margin: 0 1rem; */
          flex-shrink: 0;
        }

        .info {
            padding-left: 1rem;
          flex: 1;

          .name {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 0.3rem;
            color: #333;
          }

          .artist {
            font-size: 0.95rem;
            color: #666;
          }
        }

        .more-icon {
          font-size: 1.2rem;
          color: #aaa;
          padding-left: 1rem;
        }
      }
    }
  }
}

 </style>