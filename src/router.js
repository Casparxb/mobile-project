import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import SearchContainer from './components/tabbar/Search.vue'
import ShopcarContainer from './components/tabbar/Shopcar.vue'
var router = new VueRouter({
    routes:[
        {path:'/',redirect:HomeContainer},
        {path:'/home',component:HomeContainer},
        {path:'/Member',component:Member},
        {path:'/Shopcar',component:ShopcarContainer},
        {path:'/Search',component:SearchContainer},
    ],
    linkActiveClass:'mui-active'
})

export default router