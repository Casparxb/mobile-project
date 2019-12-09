<template>
  <div class="goodsinfo-container">
    <!--因为是半场动画，只能用钩子函数，不能用类-->
    <transition @before-enter="beforeEnter" @enter="enter" , @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!--商品轮播图区域 -->
    <div class="mui-content">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
          </div>
        </div>
      </div>
    </div>
    <!--商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{getinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>￥{{getinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{getinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox v-on:getcount="getSelectdeCount"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
          <!--分析:如何实现加入购物车的时候 ，拿到选择的数量-->
          <!--1.经过分析：按钮属于goodsinfo页面，数字属于numbox组件-->
          <!--2.由于涉及到父子组件嵌套，所以无法直接在goodsinfo页面中获得选中商品数量值-->、
          <!--3.怎么解决这个问题？子向父事件传值-->
          </p>
        </div>
      </div>
    </div>
    <!--商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{getinfo.goods_no}}</p>
          <p>库存情况:{{getinfo.stock_quantity}}件</p>
          <p>上架时间:{{getinfo.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain v-on:click="goDesc(id)">图文介绍</mt-button>
        <!--这里提供了flex布局，所以br不生效，无法让2个竖着排列-->
        <br />
        <mt-button type="danger" size="large" plain v-on:click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcompoents/swiper.vue'
//导入数字选择框
import numbox from '../subcompoents/goodsinfo_numbox.vue'
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的id
      //挂载到data上，方便后期调用
      lunbotu:[], //轮播图数据
      getinfo:{},//获取商品的信息
      ballFlag:false,//控制小球隐藏和显示
      selectedCount:1,//保存用户选中的商品数量，默认买一个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
            //先循环轮播图数组的每一项，为item添加img属性，因为轮播
            //组件中。只认识item.img，不认识item.src
            result.body.message.forEach(item=>{
                item.img = item.src
            })
          this.lunbotu = result.body.message;
        } else {
          Toast("轮播图数据获取失败！");
        }
      });
    },
    getGoodsInfo(){
        //获取商品信息
        this.$http.get('api/goods/getinfo/'+ this.id)
        .then(res=>{
            if(res.body.status===0){
                this.getinfo = res.body.message[0];
            }else{
                Toast('获取商品信息失败!')
            }
        })
    },
    goDesc(id){
        //点击使用编程式导航跳转到 图文介绍页面
        this.$router.push({name:'goodsdesc',params:{id}});
    },
    goComment(id){
        //点击使用编程式导航跳转到 图文介绍页面
        this.$router.push({name:'goodscomment',params:{id}});
    },
    addToShopcar(){
      this.ballFlag = !this.ballFlag;
      //{id:商品id，count:购买的数量,price:商品的单价,selected:fales}
      //拼接出一个要保存到store中car数组里的 商品信息对象
      var goodsinfo = {
        id:this.id,
        count:this.selectedCount,
        price:this.getinfo.sell_price,
        selected:true
      };
      //调用store中的mutation来将商品加入购物车
      this.$store.commit('addToCar',goodsinfo)
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;
    //小球动画优化思路：
    //1.先分析导致动画不准确的原因：因为写死了在了固定位置之后，问题就出现了；
    //2.只要分辨率和测试的时候不一样或者，滚动条有滚动，就不对
    //3.应该根据不同情况，动态计算这个坐标值
    //4.解决思路：先得徽标的横纵坐标，再得到小球的横纵坐标，然后y-y,x-x
    //就得到了要位移的距离
    //5.如何获得徽标和小球的位置？domObject.getBoundingClientRect()


    //获取小球在页面中的位置
    const ballPosition = this.$refs.ball.getBoundingClientRect();
    const badgePosition = document
    .getElementById('badge')
    .getBoundingClientRect();

    const xDist = badgePosition.left - ballPosition.left;
    const yDist = badgePosition.top - ballPosition.top;

    //字符串拼接。es6模板字符串``
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3,1,.68)";
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    },
    getSelectdeCount(count){
      // console.log('父组件拿到的数量为:' + this.selectedCount);
      this.selectedCount = count;
      
    }
  },
  components:{
      swiper,
      numbox
  }
};
</script>

<style scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
.now_price {
  color: red;
  font-size: 14px;
}
.mui-card-footer {
  display: block;
  margin: 15px 0;
}
.ball {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: blueviolet;
  position: absolute;
  z-index: 99;
  top: 390px;
  left: 146px;
}


</style>