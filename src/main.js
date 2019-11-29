
import Vue from 'vue'
import App from './App'
//路由模块私有化
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

import { Swipe, SwipeItem} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
//按需导入mint-ui组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//跨域请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

//导入格式化时间的插件
import moment from 'moment'
//全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
  //根据给的时间字符串，得到一个指定的对象，然后按照后面的格式格式化就行
   return moment(dataStr).format(pattern)
})
Vue.config.productionTip = false  
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
