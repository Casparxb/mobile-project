<template>
  <div>
  <!--轮播图区域-->
    <swiper :lunbotuList="lunbotuList"
    :full="true"></swiper>
    <!--九宫格到改造工程-->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu1.png" >
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../images/menu2.png" >
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../../images/menu3.png" >
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu4.png" >
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu5.png" >
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../images/menu6.png" >
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcompoents/swiper.vue'

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo")
        .then(res => {
          // console.log(res);
          if (res.body.status === 0) {
            this.lunbotuList = res.body.message;
            // Toast("加载轮播图成功!");
          } else {
            Toast("加载轮播图失败!");
          }
        });
    }
  },
  components:{
    swiper
  }
};
</script>

<style scoped >
body{
  background-color: white;
}
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: none;
}
img{
  height:60px;
  width:60px; 
}
</style>