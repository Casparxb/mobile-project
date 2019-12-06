import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import SearchContainer from './components/tabbar/Search.vue'
import ShopcarContainer from './components/tabbar/Shopcar.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/Photolist.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'


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
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
        
    ],
    linkActiveClass:'mui-active'
})

export default router