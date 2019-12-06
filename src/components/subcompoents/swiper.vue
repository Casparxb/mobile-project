<template>
  <div>
    <mt-swipe :auto="4000">
      <!--谁使用轮播图组件，谁为我们传递lunbotuList-->
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item.img" :class="{full:isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!--分析商品详情中的轮播图那么丑-->
  <!--1.首页中的图片，他的宽和高，，都使用了百分之百-->
  <!--2.在商品详情页面中。轮播图的图片，这样页面不好看，可
  让高度是100%，宽度auto自适应-->
  <!--3.既然只有宽度有问题，那么我们可以定义一个属性，可以让轮播图的
  调用者，手动指定宽度-->
</template>

<script>
export default {
  props: ["lunbotuList","isfull"]
};
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
  text-align: center;
}
.full{
    width: 100%;
}
</style>