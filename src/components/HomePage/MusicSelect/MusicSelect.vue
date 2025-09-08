<template>
    <div class="MusicSelect">

        <CategoryShow/>
        <ChineseList/>
        <EnglishList/>
        <JapaneseList/>
        <KoreaList/>
    </div>
</template>

<script setup>
import CategoryShow from'@/components/HomePage/MusicSelect/elements/CategoryShow.vue'
import ChineseList from'@/components/HomePage/MusicSelect/elements/ChineseList.vue'  
import EnglishList from'@/components/HomePage/MusicSelect/elements/EnglishList.vue'
import JapaneseList from'@/components/HomePage/MusicSelect/elements/JapaneseList.vue'
import KoreaList from'@/components/HomePage/MusicSelect/elements/KoreaList.vue'


</script>

<style lang="less" scoped>
.MusicSelect{
    margin-bottom: 12rem;
}
</style>