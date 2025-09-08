import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from'./store'
// 引入 Vant 组件库和样式
import Vant from 'vant'
import 'vant/lib/index.css'

const app=createApp(App)
app.use(router)
app.use(Vant)
app.use(store)
app.mount('#app')