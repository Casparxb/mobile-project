
import Vue from 'vue'
import App from './App'
//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用main.js，在刚掉用的时候，先从本地存储中
//把数据读取出来，存到store中
var car = JSON.parse(localStorage.getItem('car') || [])
var store = new Vuex.Store({
  state: {//this.$store.state.
    car: car,//将购物车中的商品数据，用另一个数组存储起来，在car数组中
    //存储一些商品的对象，设计成如下：
    //{id:商品id，count:购买的数量,price:商品的单价,selected:fales是否参加此次结算}  

  },
  mutations: {//this.$store.commit('方法的名称','唯一参数')
    addToCar(state, goodsinfo) {
      //点击加入购物车，把商品信息，保存到store中的car上
      //分析：
      //1.如果购物车中，之前就有这个对应的商品，只要更新数据
      //2.如果没有，则直接把商品数据，push到car中
      //假设 在购物车中，没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      })
      //如果最终循环完毕，flag还是false，则直接push进去car
      if (!flag) {
        state.car.push(goodsinfo)
      }
      //当更新car后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      //修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));

    },
    removeFormCar(state,id){
      //根据id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        // console.log(item)
        if(item.id == id){
          state.car.splice(i,1)
          return true;
        }
      })
      //把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      //把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {//this.$store.getters.
    //相当于计算属性也相当于filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count
      });
      return o;
    },
    getGoodsSelected(state){
      var o = {};
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o 
    },
    getGoodsCountAndAmount(state){
      var o = {
        count : 0,//勾选的数量
        amount:0//勾选的总价
      }
      state.car.some(item=>{
        if(item.selected){
          o.count += item.count;
          o.amount += item.count * item.price
        }
      })
      return o
    }
  }
})

//路由模块私有化
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// import { Swipe, SwipeItem} from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);
// //按需导入mint-ui组件
// import { Header } from 'mint-ui';
// Vue.component(Header.name, Header);
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// import {Lazyload} from 'mint-ui';
// Vue.use(Lazyload);

//跨域请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候，表单数据格式
Vue.http.options.emulateHTTP = true;
//导入格式化时间的插件
import moment from 'moment'
//全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  //根据给的时间字符串，得到一个指定的对象，然后按照后面的格式格式化就行
  return moment(dataStr).format(pattern)
})

import { Switch } from 'mint-ui';

Vue.component(Switch.name, Switch);

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store//挂载
})
