<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9" style="height:25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" readonly ref="numbox" @change="countChanged" class="mui-input-numbox" type="number" :value="initcount" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>

  <!--分析子组件什么时候提交给父组件-->
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
    mounted() {
      //初始化数字选择框组件 
      mui(".mui-numbox").numbox();
    },
    methods:{
      //每当文本框数据改变时，数据传递给父组件
      //每当数量值改变，立即把最新的数量同步到购物车中，覆盖原来的
      countChanged(){
        // console.log(this.goodsid)
        // console.log(this.$refs.numbox.value)
        this.$store.commit('updateGoodsInfo',{
          id:this.goodsid,
          count:this.$refs.numbox.value
        });
      }
    },
    props:['initcount','goodsid']
  
};
</script>

<style scoped>

</style>