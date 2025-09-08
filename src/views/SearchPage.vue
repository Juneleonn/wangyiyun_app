<template>
    <div class="SearchPage">
        <div class="SearchPageContainer">
            <div class="topSearch">
                <div class="Left">
                    <van-icon name="arrow-left" class="arrow-left" @click="goback" style="cursor: pointer"/>
                </div>
                <div class="Right">
                    <van-search
                        v-model="SearchInput"
                        shape="round"
                        placeholder="请输入搜索关键词"
                        style="width: 30rem;"
                        @search="onSearch" 
                        autofocus
                    />

                </div>
            </div>   
            <div class="searchHistory">
                <div class="top">
                    <h2>搜索历史</h2>
                    <i class="iconfont icon-shanchu" @click="clearHistory"></i>
                </div>
                <div class="HistoryList">
                    <span v-for="(item, index) in HistoryList" :key="index" @click="goSearch(item)">
                      {{ item }}
                      <van-icon name="cross"  @click.stop="deleteItem(index)" class="deleteItem"/>
                    </span>
                </div>
                
            </div>         
        </div>
    </div>
</template>

<script setup>
import{ref,onMounted}from'vue'
import {useRouter} from 'vue-router'
const router = useRouter() 
const SearchInput=ref('')
const HistoryList=ref([])
function goback(){
    router.back()
}
function onSearch(){
    HistoryList.value.unshift(SearchInput.value)
    HistoryList.value=[...new Set(HistoryList.value)]//去重
    if(HistoryList.value.length>10){
        HistoryList.value.splice(HistoryList.value.length-1,1)
    }
    
    localStorage.setItem('keywordlist',JSON.stringify(HistoryList.value))//搜索列表保存到本地
    router.push({
        path:'/SearchResultPage',
        query:{
            keyword:SearchInput.value,
        }
    })
}
// 点击历史记录搜索
function goSearch(keyword) {
  SearchInput.value = keyword
  onSearch()
}
// 清空历史记录
function clearHistory(){
    HistoryList.value=[]
    localStorage.removeItem('keywordlist')
}
function deleteItem(){
    HistoryList.value.shift()
    localStorage.setItem('keywordlist',HistoryList.value)
}
// 加载历史记录
onMounted(() => {
  const saved = localStorage.getItem('keywordlist')//每次加载页面的时候加载搜索记录列表
  try {
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) {
      HistoryList.value = parsed//重新赋值，把本地存储的搜索记录赋值给HistoryList
    }
  } catch {
    HistoryList.value = []
  }
})
</script>

<style lang="less" scoped>
.SearchPage{
    .SearchPageContainer{
        padding: 2rem;
        .topSearch{
    display: flex;
    align-items: center;
    justify-content: left;
    .Left{
        /* width: 10%; */
        .van-icon{
            font-size: 2rem;
            font-weight: 800;
        }
        .Right{
            /* width: 90%; */

        }
    }
}
.searchHistory{
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .iconfont{
            font-size: 2rem
        }
    }
    .HistoryList{
        display: flex;
        flex-wrap: wrap; /* 自动换行 */
        gap: 8px;         /* 元素间距 */
        /* padding: 10px; */
        span{
            font-size: 1.5rem;
            padding: 6px 12px;
            background-color: #f0f0f0;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            white-space: nowrap; /* 防止文本换行 */
            .deleteItem{
                width: 2rem;
                height: 100%;
            }
        }
    }
}
    }
}
</style>