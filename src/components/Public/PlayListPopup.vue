<template>
  <div class="PlayListPopup">
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '70%', width: '100%' }"
      :close-on-click-overlay="true"
    >
      <h2 class="title">播放列表</h2>
      <ul class="list">
        <li 
          v-for="(item, index) in songDetails" 
          :key="index" 
          class="list-item" 
          @click="setmusicID(item)" 
          :class="{ activeItem: index === ActiveIndex }"
        >
          <div class="song-name" :title="item.songName">{{ item.songName }}</div>
          <div class="artist-name" :title="item.artistName">{{ item.artistName }}</div>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, computed } from 'vue'
import { getMusicDetail } from '@/request/api/musicplay.js'
import { useStore } from 'vuex'

const store = useStore()
const show = ref(store.getters['PlayListPopupControl/getPlayListPopup'])
const playList = computed(() => store.getters['music/getplayList'])
const MusicID = computed(() => store.getters['music/getmusicID'])
const songDetails = ref([])
const ActiveIndex = ref(null)

async function getSongDetail(id) {
  const res = await getMusicDetail(id)
  return {
    id: res.data.songs[0].id,
    songName: res.data.songs[0].name,
    artistName: res.data.songs[0].ar[0].name
  }
}

async function loadSongDetails() {
  songDetails.value = await Promise.all(
    playList.value.map(id => getSongDetail(id))
  )
  getActive()
}

function setmusicID(item) {
  store.dispatch('music/updatemusicID', item.id)
}

function getActive() {
  const index = playList.value.findIndex(id => id === MusicID.value)
  ActiveIndex.value = index
}

onMounted(() => {
  loadSongDetails()
})

watch(playList, () => {
  loadSongDetails()
})

watch(() => MusicID.value, () => {
  getActive()
})

// 绑定 show 和 Vuex
watch(show, val => {
  store.dispatch('PlayListPopupControl/updatePlayListPopup', val)
})
watch(() => store.getters['PlayListPopupControl/getPlayListPopup'], val => {
  show.value = val
}, { immediate: true })
</script>

<style lang="less" scoped>
.PlayListPopup {
  .van-popup {
    border-radius: 15px 15px 0 0;
    padding: 1.5rem 2rem;
    background-color: #fff;

    .title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
      text-align: center;
    }

    .list {
      max-height: calc(70vh - 60px);
      overflow-y: auto;
      padding: 0;
      margin: 0;
      list-style: none;

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem 0;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;

        &:last-child {
          border-bottom: none;
        }

        .song-name {
          font-size: 1.4rem;
          font-weight: 600;
          color: #222;
          flex: 1;
          margin-right: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist-name {
          padding-right: 1rem;
          font-size: 1.2rem;
          color: #999;
          white-space: nowrap;
          flex-shrink: 0;
        }

        &.activeItem {
          background-color: #f0f8ff;
          color: #007aff;

          .song-name,
          .artist-name {
            color: #007aff;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
