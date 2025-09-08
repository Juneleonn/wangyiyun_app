<template>
    <div class="VoiceListPart">
        <div class="VoiceListContainer">

        </div>
    </div>
</template>

<script setup>
import{onMounted}from'vue'
 import{getVoicelist,getVoiceRank,getRadioRank,getRecordDJ,getVoicelistSearch}from'@/request/api/broadcast.js'   
 onMounted(async()=>{
    const res=await getVoicelist()
    console.log('播客列表',res)
    const rank=await getVoiceRank()
    console.log('播客排序',rank)
    const radiorank=await getRadioRank()
    console.log('radiorank',radiorank)
    const recentDJ=await getRecordDJ()
    console.log('recentDJ',recentDJ)
    const VoicelistSearch=await getVoicelistSearch()
    console.log('VoicelistSearch',VoicelistSearch)
 })
</script>