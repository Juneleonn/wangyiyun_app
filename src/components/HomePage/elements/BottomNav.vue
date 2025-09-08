<template>
    <div class="BottomNavContainer">
        <div class="NavList">
            <div class="recommend" :class="{active:PageIndex===0}" @click="gotoHomapage" >
                <i class="iconfont icon-apptubiao100-danse_wangyiyunyinle"></i>
                <span>推荐</span>
            </div>
            <div class="roam" :class="{active:PageIndex===1}" @click="gotoRoamingPage">
                <i class="iconfont icon-icon-test"></i>
                <span>漫游</span>
            </div>
            <div class="note" :class="{active:PageIndex===2}" @click="gotoNotePage">
                <i class="iconfont icon-bijijilu"></i>
                <span>笔记</span>
            </div>
            <div class="mine" :class="{active:PageIndex===3}" @click="gotoPersonalInfoPage">
                <i class="iconfont icon-font8"></i>
                <span>我的</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router' 
const router = useRouter() // 获取 router 实例
import{watch,computed}from'vue'
import{useStore}from'vuex'
const store=useStore()
const  PageIndex=computed(()=>
    store.getters['BottomNavControl/getPageIndex']
)

// 跳转到推荐页Homepage
function gotoHomapage(){
    store.dispatch('BottomNavControl/updatePageIndex',0)
    router.push('/')
}
// 跳转到漫游页
function gotoRoamingPage(){
    store.dispatch('BottomNavControl/updatePageIndex',1)
    router.push('/RoamingPage')
}
// 跳转到笔记页
function gotoNotePage(){
    store.dispatch('BottomNavControl/updatePageIndex',2)
    router.push('/NotePage')
}
// 跳转到个人信息页面
function gotoPersonalInfoPage(){
    store.dispatch('BottomNavControl/updatePageIndex',3)
    router.push('/PersonalInfoPage')
}

watch(()=>PageIndex.value,
(newindex)=>{
    console.log('PageIndex',newindex)
})
</script>

<style lang="less" scroped>
    .BottomNavContainer{
        /* position: relative;  */
        .NavList{
            width: 100%;
            background-color: #e8eefe;
            position: fixed;
            bottom: 0;
            height: 8rem;
            display: flex;
            /* align-items:; */
            justify-content: space-around;
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
                .iconfont{
                    margin-top: 0.5rem;
                font-size: 3rem;
                }
            &.active{
                font-weight: 600;
                
            }
            }

        }
    }
</style>