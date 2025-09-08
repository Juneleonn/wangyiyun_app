import{createRouter,createWebHashHistory}from'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue' 
import DailyRecommendPage from '@/views/DailyRecommend/DailyRecommendPage.vue'
import MusicDetailPage from '@/views/MusicDetailPage/MusicDetailPage.vue'
import LyricPage from '@/views/MusicDetailPage/LyricPage.vue'
import MusicListDetail from '@/views/MusicListDetail.vue' 
import SoaringListPage from '@/views/MusicRank/SoaringListPage.vue' 
import OriginalListPage from '@/views/MusicRank/OriginalListPage.vue' 
import NewSongListPage from '@/views/MusicRank/NewSongListPage.vue' 
import HotSongListPage from '@/views/MusicRank/HotSongListPage.vue' 
import PrivateContentPage from '@/views/PrivateContentPage.vue'//独家放送
import MVPage from '@/views/MVPage.vue'//MV
import PersonalInfoPage from '@/views/PersonalInfoPage.vue'//MV
import PlayListShowPage from '@/views/PlayListShowPage.vue'
import RoamingPage from '@/views/RoamingPage.vue'
import NotePage from '@/views/NotePage.vue'
import SearchPage from '@/views/SearchPage.vue'
import SearchResultPage from '@/views/SearchResultPage.vue'

const routes=[
    {path:'/',name:'HomePage',component:HomePage},
    {path:'/RoamingPage',name:'RoamingPage',component:RoamingPage},//漫游页面
    {path:'/NotePage',name:'NotePage',component:NotePage},//笔记页面
    
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/daily', name: 'DailyRecommendPage', component: DailyRecommendPage }, // 每日推荐作为独立页面
    { path: '/detail', name: 'MusicDetailPage',component:MusicDetailPage},//歌曲详情页作为独立页面
    { path: '/lyric', name: 'LyricPage',component:LyricPage},//歌词
    { path: '/MusicListDetail', name: 'MusicListDetail', component: MusicListDetail },//歌单详情页
    { path: '/SoaringListPage', name: 'SoaringListPage', component: SoaringListPage },//飙升榜页面
    { path: '/OriginalListPage', name: 'OriginalListPage', component: OriginalListPage },//原创榜页面
    { path: '/NewSongListPage', name: 'NewSongListPage', component: NewSongListPage },//新歌榜页面
    { path: '/HotSongListPage', name: 'HotSongListPage', component: HotSongListPage },//热歌榜页面
    { path: '/PrivateContentPage', name: 'PrivateContentPage', component: PrivateContentPage },//独家放送
    { path: '/MVPage', name: 'MVPage', component: MVPage },//MV
    { path: '/PersonalInfoPage', name: 'PersonalInfoPage', component: PersonalInfoPage },//个人信息页
    { path: '/PlayListShowPage', name: 'PlayListShowPage', component: PlayListShowPage },//歌单列表展示
    { path: '/SearchPage', name: 'SearchPage', component: SearchPage },
    { path: '/SearchResultPage', name: 'SearchResultPage', component: SearchResultPage },//搜索结果
    
    
]
const router=createRouter({
    history:createWebHashHistory(),
    
    routes
})

export default router