<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" ref="numbox" @change="countChanged" class="mui-input-numbox" type="number" value="1" />
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
      countChanged(){
        console.log(this.$refs.numbox.value)
        //数据是整数num，用parseInt一下
        this.$emit("getcount",parseInt(this.$refs.numbox.value));
      }
    }
  
};
</script>

<style scoped>
</style>