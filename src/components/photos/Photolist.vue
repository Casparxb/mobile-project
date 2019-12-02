<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id == 0 ?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/'+item.id"   tag='li' class="photo-render" v-for="item in list" :key="item.id" >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
//导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //所有分类的列表
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); //默认进入页面，就主动请求所有图片列表的数据
  },
  mounted() {
    //初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: "全部", id: 0 });
          this.cates = res.body.message;
        } else {
          Toast("获取图片列表失败");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
        } else {
          Toast("获取图片列表失败");
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  touch-action: none;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photo-render {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
img{
  width:100%;
  vertical-align: middle;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.info {
color: white;
text-align: left;
position: absolute;
bottom: 0;
background-color: rgba(0, 0, 0, 0.4);
max-height: 84px;
}
.info-title {
font-size: 14px;
}
.info-body {
font-size: 13px;
}
</style>