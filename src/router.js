import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import SearchContainer from './components/tabbar/Search.vue'
import ShopcarContainer from './components/tabbar/Shopcar.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/Photolist.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
var router = new VueRouter({
    routes:[
        {path:'/',redirect:HomeContainer},
        {path:'/home',component:HomeContainer,},
        {path:'/Member',component:Member},
        {path:'/Shopcar',component:ShopcarContainer},
        {path:'/Search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoinfo/:id',component:PhotoInfo},
    ],
    linkActiveClass:'mui-active'
})

export default router