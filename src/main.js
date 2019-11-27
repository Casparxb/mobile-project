
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.config.productionTip = false  
//按需导入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import VueResource from 'vue-resource'
Vue.use(VueResource)



new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
