<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>

    <hr />
    <!--缩略图区域-->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose" class="aaa"></vue-preview>
    </div>
    <!--图片内容区域-->
    <div class="content" v-html="photoinfo.content"></div>
    <!--放置一个现成的子组件-->
    <comment :id="id"></comment>
  </div>
</template>

<script>
//1导入评论子组件
import comment from "../subcompoents/comment.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的id
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        } else {
          Toast("获取失败！");
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          //循环每个数据，补全图片宽高
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src; //小图
          });
          //把完整数据保存到list中
          this.list = res.body.message;
        } else {
          Toast("获取缩略图失败！");
        }
      });
    },
    handleClose() {
      console.log("OK");
    }
  },
  components: {
    comment
  }
};
</script>

<style  scoped>
.photoinfo-container {
  padding: 3px;
}
h3 {
  color: #26A2FF;
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
}
.subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.content {
  font-size: 13px;
  line-height: 30px;
}
img {
  margin: 10px;
  box-shadow: 0 0 9px #999;
}
</style>