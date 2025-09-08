<!-- 首页 --推荐 -->
<template>
    <div class="RecommendSelect">
      <MusicListSwipe/>
      <!-- 推荐歌单 -->
      <RecommenList v-if="UID"/>
      <!-- 独家放送 -->
       <PrivateContent/>
       <!-- 推荐mv -->
        <RecommendMV/>
        <!-- 最新音乐 -->
         <NewSong/>
    </div>
</template>

<script setup>
// 导入页面
import MusicListSwipe from '@/components/HomePage/RecommendSelect/elements/MusicListSwipe.vue'
import RecommenList from '@/components/HomePage/RecommendSelect/elements/RecommenList.vue'
import PrivateContent from '@/components/HomePage/RecommendSelect/elements/PrivateContent.vue'
import RecommendMV from '@/components/HomePage/RecommendSelect/elements/RecommendMV.vue'
import NewSong from '@/components/HomePage/RecommendSelect/elements/NewSong.vue'

// import{computed}from'vue'

// import{useStore}from'vuex'
// const store=useStore()

// const userID=computed(()=>
//     store.getters['UserInfo/getUserID']
// )

const UID=JSON.parse(localStorage.getItem('UserID'))
</script>

<style lang="less" scoped>
.RecommendSelect{
margin-bottom: 12rem;
}

</style>