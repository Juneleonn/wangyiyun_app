// 注册到vuex根store
import {createStore}from'vuex'
import music from'./modules/music'
import MusicRank from'./modules/MusicRank'
import PageControl from'./modules/PageControl'
import UserInfo from'./modules/UserInfo'
import BottomNavControl from'./modules/BottomNavControl'
import PopupShow from'./modules/PopupShow'
import PlayListPopupControl from'./modules/PlayListPopupControl'

export default createStore({
    modules:{
        music,
        MusicRank,
        PageControl,
        UserInfo,
        BottomNavControl,
        PopupShow,
        PlayListPopupControl,
    }
})