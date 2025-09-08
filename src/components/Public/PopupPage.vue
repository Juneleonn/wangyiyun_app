<template>
    <div class="PopupPage"> 
            <van-popup v-model:show="show" position="left" :style="{ height: '100%' ,width:'80%'}" :close-on-click-overlay="true">
                <div class="PopupPageContainer">
                    <div class="topInfo">
                        <div class="left" v-if="UserInfo">
                            <img :src="UserInfo.avatarUrl" alt="">
                            <div class="nickname">{{UserInfo.nickname}}</div>
                            <van-icon name="arrow" />
                        </div>
                        <div class="right">
                            <van-icon name="scan" />
                        </div>
                    </div>
                    <div class="BottomFunction">
                        <div class="logout" @click="logoutFunction">
                            退出登录
                        </div>
                    </div>
                </div>
            </van-popup>
        
    </div>
</template>

<script setup>
import{watch,ref,onMounted}from'vue'
import{useStore}from'vuex'
import{logout}from'@/request/api/Login.js'
const store=useStore()
const show = ref(store.getters['PopupShow/getPopupShow'])
const UserInfo=store.getters['UserInfo/getuserinfo']
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(async()=>{
    // console.log('popup个人信息',UserInfo.value)

})

// show本来就有值
// watch 本地值变化 → 更新 Vuex
watch(show, (val) => {
  store.dispatch('PopupShow/updatePopupShow', val)
})

// 监听 Vuex 值变化 → 更新本地值
watch(
  () => store.getters['PopupShow/getPopupShow'],
  (val) => {
    console.log('val',val)
    show.value = val
  },
  { immediate: true }
)
async function logoutFunction(){
    const logoutres=await logout()
    localStorage.removeItem('LoginCookie')
    localStorage.removeItem('UserID')
    console.log('退出登录',logoutres)
    router.push('/login')
}
</script>

<style lang="less" scoped>
    .PopupPage{
        
        .van-popup{
            background-color: #f3f7fa;
            padding: 2rem;
            .PopupPageContainer{
                .topInfo{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .left{
                        height: 2rem;
                        line-height: 2rem;
                        display: flex;
                        /* width: 80%; */
                        font-size: 1.5rem;
                        img{
                            height: 3rem;
                            width: 3rem;
                            border-radius: 50%;
                        }
                        .nickname{
                            padding-left: 1rem;
                            font-size: 2rem;
                        }

                    }
                    .right{
                        font-size: 2rem;
                        /* width: 20%; */
                    }
                }
                .BottomFunction{
                    margin-top: 2rem;
                    background-color: #fff;
                    color: red;
                    font-size: 2rem;
                    border-radius: 10px;
                }
            }
        }
    }
</style>