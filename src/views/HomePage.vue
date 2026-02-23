<template>
    <div class="HomePage">
        <div class="HomePageContainer">
            <div class="topSearch">
                <div class="Left">
                    <i class="iconfont icon-liebiao2" @click="changePopupShow"></i>
                </div>
                <div class="Right">
                    <van-search
                        shape="round"
                        placeholder="请输入搜索关键词"
                        style="width: 30rem;"
                        @click="gotoSearchPage"
                    />

                </div>
            </div>
            <div class="Nav">
                <div @click="changeSelect(0)" :class="{ active: SelectIndex === 0 }" >推荐</div>
                <div @click="changeSelect(1)" :class="{ active: SelectIndex === 1 }" >音乐</div>
                <div @click="changeSelect(2)" :class="{ active: SelectIndex === 2 }" >播客</div>
                <div @click="changeSelect(3)" :class="{ active: SelectIndex === 3 }" >听书</div>
                <div @click="changeSelect(4)" :class="{ active: SelectIndex === 4 }" >免费听</div>
            </div>
            <!-- 推荐模块   -->
            <RecommendSelect v-if="SelectIndex===0"/>
            <!-- 音乐模块 -->
             <MusicSelect v-if="SelectIndex===1"/>
            <!-- 播客模块 -->
            <div v-else-if="SelectIndex===2" class="placeholder-section">
                <p class="placeholder-text">该模块为扩展预留</p>
                <p class="placeholder-sub">This section is reserved for future features.</p>
            </div>
            <!-- 听书模块 -->
            <div v-else-if="SelectIndex===3" class="placeholder-section">
                <p class="placeholder-text">该模块为扩展预留</p>
                <p class="placeholder-sub">This section is reserved for future features.</p>
            </div>
            <!-- 免费听模块 -->
            <div v-else-if="SelectIndex===4" class="placeholder-section">
                <p class="placeholder-text">该模块为扩展预留</p>
                <p class="placeholder-sub">This section is reserved for future features.</p>
            </div>
        </div>
        <BottomNav/>
        <div class="PlayControl" v-if="MusicDetail">
            <PlayControl/>
        </div>
        <!-- <PopupPage/> -->
    </div>
</template>

<script setup>
// 导入页面
// import PopupPage from '@/components/Public/PopupPage.vue'
import BottomNav from '@/components/HomePage/elements/BottomNav.vue'
import RecommendSelect from '@/components/HomePage/RecommendSelect/RecommendSelect.vue'
import MusicSelect from '@/components/HomePage/MusicSelect/MusicSelect.vue'
import PlayControl from '@/components/Public/PlayControl.vue'
import{computed}from'vue'
import{useStore}from'vuex'
const store=useStore()
import {useRouter} from 'vue-router'
const router = useRouter() 

//从vuex加载数据
const MusicDetail=computed(()=>
    store.getters['music/getMusicDetail']
)
const  SelectIndex=computed(()=>
    store.getters['PageControl/getSelectIndex']
)
const  PopupShow=computed(()=>
    store.getters['PopupShow/getPopupShow']
)
function changeSelect(index){
     store.dispatch('PageControl/updateSelectIndex',index)
}

function gotoSearchPage(){
    router.push('/SearchPage')
}

function changePopupShow(){
    console.log('点击了列表',!PopupShow.value)
    store.dispatch('PopupShow/updatePopupShow',!PopupShow.value)
}
</script>

<style lang="less" scoped>
.HomePageContainer{
padding: 2rem;
.topSearch{
    display: flex;
    align-items: center;
    justify-content: left;
    .Left{
        .iconfont{
            font-size: 2rem;
            font-weight: 800;
        }
    }
    .Right{
        flex: 1;
        min-width: 0;
        :deep(.van-search) {
            background-color: #f5f5f5;
        }
    }
}
.Nav{
    height: 4rem;
    line-height: 4rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    color: #95969b;
    border-bottom: solid 1px  #eeeef5;
    div{
        width: 20%;
        text-align: center; 
        &.active {
      font-weight: bold;
      color: #000;
      border-bottom: 2px solid red;
    }
    }
    
}
    }

.PlayControl{
    position: fixed;
    bottom: 8rem;
    width: 100%;
}

.placeholder-section {
    padding: 4rem 2rem;
    text-align: center;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
    border-radius: 0.8rem;
    margin-top: 1rem;
    .placeholder-text {
        font-size: 1.5rem;
        color: #666;
        margin: 0 0 0.6rem 0;
    }
    .placeholder-sub {
        font-size: 1.2rem;
        color: #999;
        margin: 0;
    }
}
</style>