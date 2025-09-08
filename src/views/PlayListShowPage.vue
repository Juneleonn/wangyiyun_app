<!-- 歌单列表展示 -->
 <template>
    <div class="PlayListShowPage">
        <div class="container">
            <div class="top">
                <div class="left" @click="goback()">
                    <van-icon name="arrow-left" class="arrow-left" @click="gotoHome" style="cursor: pointer"/>
                </div>

                <div class="right" v-if="tagName">
                    <h3>{{tagName}}专区</h3>
                </div>

            </div>
            <div class="PlayList">
                <ul>
                    <li v-for="item in playlist" :key="item.id" @click="gotoMusicListDetail(item)">
                    <img :src="item.coverImgUrl" alt="cover" />
                    <div class="info">
                        <p class="name">{{ item.name }}</p>
                        <p class="count">播放量：{{ formatCount(item.playCount) }}</p>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
 </template>


 <script setup>
import{onMounted,ref,computed,watch}from'vue'
import{getTopPlayList}from'@/request/api/PlayList.js'
import { useRoute,useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tagId = computed(() => route.query.id)
const tagName = computed(() => route.query.name)
const playlist=ref(null)//音乐列表
 onMounted(async()=>{



 })
watch(()=>tagName.value,
async(newname)=>{
    console.log('name',newname)
    const temp=await getTopPlayList(newname)
    
    console.log('id',tagId)
    playlist.value=temp.data.playlists
    console.log('toplist',playlist.value)
}, { immediate: true })
 function goback(){
    router.back()
 }
 function formatCount(num) {
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
  if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  return num
}

function gotoMusicListDetail(item) {
  router.push({
    path: '/MusicListDetail',
    query: {
      id: item.id,
    }
  });
}


 </script>

 <style lang="less" scoped>
.PlayListShowPage{
    padding: 2rem;
   .container{
        .top{
        height: 2rem;
        line-height: 2rem;
        font-size: 2rem;
        color: #8590ab;
        .arrow-left{
            float: left;
            /* width: 20%; */
        }
        .right{
            width: 100%;
            text-align: center;
            color: black;
        }

    }
    .PlayList {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    list-style: none;
    padding: 0;
    margin: 2rem 0;

    li {
        height: 23rem;
        position: relative;
      background: #f9f9f9;
      border-radius: 0.5rem;
      overflow: hidden;
      /* text-align: center; */
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
      /* transition: transform 0.2s ease; */
      /* cursor: pointer; */
    
      &:hover {
        transform: translateY(-5px);
      }

      img {
        width: 100%;
        height: 15rem;
        border-radius: 5px;
        /* object-fit: cover; */
      }

      .info {
        padding: 0.5rem;
        .name {
        font-size: 1.4rem;
        font-weight: bold;
        margin: 0.5rem 0 0.2rem;
        color: #333;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 限制显示两行 */
        overflow: hidden;
        text-overflow: ellipsis;
}

        .count {
            position: absolute;
          font-size: 1.2rem;
          color: #888;
          bottom: 0;
            
        }
      }
    }
  }
}
   } 
}
 </style>