<template>
    <div class="LoginPageContainer">
        <h3>登录页</h3>
        <van-cell-group inset>
        <van-field
            v-model="phone"
            required
            label="手机号"
            placeholder="请输入手机号"
            error-message="手机号格式错误"
        />
        <van-cell-group inset>
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="AcquireSms">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <van-button round type="primary" block @click="handleLogin">登录</van-button>
        </van-cell-group>
    </div>
</template>

<script setup>
import{onMounted,ref}from'vue'
import{sendCaptcha,loginByCaptcha}from'@/request/api/Login.js'
import { useRouter } from 'vue-router' 
const router = useRouter() // 获取 router 实例
const phone=ref(null)
const CaptchaData=ref(null)//获取验证码的消息
const sms=ref(null)
const LoginResult=ref(null)
const LoginCookie=ref(null)
import{useStore}from'vuex'
const store=useStore()
// 获取验证码
async function AcquireSms(){
CaptchaData.value=await sendCaptcha(phone.value)


}
// 验证码登录
async function handleLogin(){
if(sms.value){
LoginResult.value=await loginByCaptcha(phone.value,sms.value)
console.log('LoginResult.value',LoginResult.value)

if(LoginResult.value.request.status===200){
    LoginCookie.value=LoginResult.value.data.token
    console.log('uid',LoginResult.value.data.account.id)

    store.commit('UserInfo/setUserID',LoginResult.value.data.account.id)
    localStorage.setItem('UserID',JSON.stringify(LoginResult.value.data.account.id))
    console.log('cookie',LoginCookie.value)
    localStorage.setItem('LoginCookie',LoginCookie.value)
    
    router.push('/')
}
}
}
onMounted(async()=>{


})


</script>